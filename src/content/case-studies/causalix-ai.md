---
title: "Stripe Billing System for an AI Research Platform"
client: "Causalix AI"
summary: "Designed and built a complete subscription billing and credit system — from database schema to Stripe webhook processing and per-route entitlement enforcement."
date: "2026-08-14"
techStack: ["FastAPI", "PostgreSQL", "Redis", "Stripe", "React", "TypeScript", "Alembic"]
featured: true
---

## The Problem

Causalix is an AI research platform helping teams explore causal relationships through LLM-assisted workflows. When we joined the project, usage was effectively unmetered: users could run AI actions without tracking, limits, or payment controls. The goal was to put a proper billing foundation in place so the product could move from a free demo model to a real, monetisable SaaS product.

## What We Built

We created a practical billing and credit system that let Causalix operate the product in a more controlled and scalable way.

- Stripe-ready subscription flows and customer mapping
- Credit tracking and ledger-based auditability
- Entitlement checks before AI features could be used
- Daily usage controls for tester and VIP accounts
- A backend API for plans, balances, subscriptions, and checkout flows

This gave the platform a way to govern AI usage without disrupting the product experience.

## Why It Mattered

Before this work, the platform had no reliable way to:

- limit AI usage by account
- enforce billing rules before expensive actions ran
- charge for access in a consistent way
- keep usage predictable as adoption grew

The system introduced structure and accountability without making the product feel heavy or bureaucratic.

## Outcome

We delivered a working billing foundation designed for real Stripe testing and near-term launch readiness. The platform moved from unlimited, untracked AI usage to a system that was measured, gated, and ready for monetisation.

For more information on Causalix, visit https://causalix.ai/about.
