---
title: "Stripe Billing System for an AI Research Platform"
client: "Causalix AI"
summary: "Designed and built a complete subscription billing and credit system — from database schema to Stripe webhook processing and per-route entitlement enforcement."
date: "2026-08-14"
techStack: ["FastAPI", "PostgreSQL", "Redis", "Stripe", "React", "TypeScript", "Alembic"]
featured: true
---

## The Problem

Causalix is an Amsterdam-based AI research platform that lets users build causal graphs using large language models. When we joined the project, every AI feature was completely unmetered — users could generate as many graphs, run as many research plans, and consume as many LLM tokens as they wanted at no charge. There was no mechanism to track usage, enforce limits, or charge for the product.

The brief: build a complete billing and credit system that could go live with real Stripe payments by the end of the engagement.

## What We Built

### Database Schema

We designed and deployed seven new PostgreSQL tables covering the full billing domain:

- **billing_accounts** — links platform users to Stripe customers, tracks billing status
- **subscription_plans** — append-only catalog of subscription tiers with Stripe price mappings
- **subscriptions** — subscription state synced from Stripe in real time
- **credit_balances** — high-performance balance cache across three buckets (subscription, PAYG, promo)
- **credit_ledger** — append-only financial audit log, the authoritative source of truth for all credit movements
- **stripe_webhook_events** — idempotency guard and audit trail for incoming Stripe events
- **model_unit_prices** — versioned per-model pricing catalog ready for weighted credit calculations

All migrations were written with Alembic and include upgrade/downgrade paths.

### Credit System

We built a `CreditService` class that houses all credit business logic:

- **Three-bucket model:** subscription credits (resets monthly), PAYG credits (persistent), promo credits (persistent)
- **Deduction priority:** subscription → PAYG → promo
- **Flat-rate calculation:** `ceil(total_tokens × rate)` with minimum 1 credit per usage
- **Demo account bypass:** accounts marked `is_demo` skip all credit checks unconditionally
- **Global kill switch:** `BILLING_ENFORCEMENT_ENABLED=false` disables the entire system — useful for development

### Entitlement Enforcement

Every AI-consuming endpoint was protected with a FastAPI dependency that runs before any LLM work starts:

- Returns **HTTP 402** if the account has no credits
- Returns **HTTP 429** if a daily token limit is exceeded (see below)
- Works across 20+ graph generation, annotation, edge creation, and chat endpoints
- WebSocket routes get a `system_error` frame and a clean close rather than an HTTP error

### Stripe Integration

We built the complete Stripe webhook processing pipeline:

- **Signature verification** — HMAC validation using `Stripe-Signature` header, conditional on `STRIPE_WEBHOOK_SECRET` being set (dev-friendly, production-secure)
- **Double-layer idempotency** — event-level deduplication via `stripe_webhook_events.stripe_event_id`, plus ledger-level deduplication via `credit_ledger.idempotency_key`
- **Six event handlers:** `checkout.session.completed`, `customer.created/updated`, `customer.subscription.created/updated/deleted`, `invoice.paid`, `invoice.payment_failed`
- **Checkout Session endpoint** — `POST /v1/billing/checkout` creates a Stripe Checkout Session and returns a URL. Frontend redirects, user pays on Stripe's hosted page, webhooks handle the rest.

We tested the full flow end-to-end against a Stripe sandbox account: checkout URL generated → test card payment → customer linked → subscription created → 50,000 credits granted.

### Daily Usage Limit (CP-229)

An additional safety feature for tester and VIP accounts that have effectively unlimited credits:

- Optional `daily_token_limit` column on `billing_accounts` (NULL = no cap)
- Redis counter per account: `billing:daily_tokens:{id}` with a 24-hour TTL
- Atomic Lua script for the increment — handles race conditions and orphan keys
- `Retry-After` header on 429 responses using the exact TTL
- Graceful degradation: if Redis is unavailable, fails open with a warning log

### Billing REST API

Eight endpoints for frontend consumption: plans listing, account info, credit balance, active subscription, paginated ledger, plan change, plan cancel, and Stripe checkout.

## Results

- Full Stripe subscription billing live end-to-end in sandbox
- All AI routes gated — no unmetered usage possible
- 158 automated tests covering billing logic, webhook handlers, entitlement dependencies, and route integration
- Clean handover documentation for the Causalix team to flip to production: set API keys, register webhook URL, run seed script, enable enforcement flag

## Team

Olan Healy, Kevin Collins, Fionn Hourican, Dylan — BithDev Ltd.
