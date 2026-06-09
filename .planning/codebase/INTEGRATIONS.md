# External Integrations

**Analysis Date:** 2026-06-09

## APIs & External Services

**Cinatra Marketplace:**
- Service: `registry.cinatra.ai` — target registry for published extension packages
  - Interaction: publish-on-release via marketplace MCP proxy (extension-submit-for-review → approve → promotion saga)
  - Auth: `CINATRA_MARKETPLACE_VENDOR_TOKEN` org secret (GitHub Actions); never used at runtime
  - Workflow: `.github/workflows/release.yml`

**Cinatra Monorepo Reusable Workflow:**
- Service: `cinatra-ai/.github/.github/workflows/reusable-extension-release.yml@main`
  - Interaction: called by `.github/workflows/release.yml` on GitHub Release publish or `workflow_dispatch`
  - Handles: build, pack, gate validation, and marketplace submission logic centrally

## Data Storage

**Databases:**
- Not applicable — this package is a pure type/manifest export with no runtime data access

**File Storage:**
- Not applicable

**Caching:**
- Not applicable

## Authentication & Identity

**Auth Provider:**
- Not applicable at runtime
- CI/CD: GitHub Actions OIDC (`id-token: write` permission) used for build-provenance attestation during release; `CINATRA_MARKETPLACE_VENDOR_TOKEN` inherited from org secrets for marketplace submission

## Monitoring & Observability

**Error Tracking:**
- Not detected

**Logs:**
- Not applicable — no runtime process

## CI/CD & Deployment

**Hosting:**
- `registry.cinatra.ai` (Cinatra Marketplace) — production artifact registry

**CI Pipeline:**
- GitHub Actions
  - `.github/workflows/ci.yml` — runs on push/PR to `main`; validates first-party dep shape, conditionally installs, typechecks, tests, and dry-run packs
  - `.github/workflows/release.yml` — triggers on GitHub Release publish or manual `workflow_dispatch`; delegates to cinatra-ai org reusable workflow for release

## Environment Configuration

**Required env vars:**
- None at runtime
- CI/release: `CINATRA_MARKETPLACE_VENDOR_TOKEN` (org secret, injected by GitHub Actions via `secrets: inherit`)

**Secrets location:**
- GitHub Actions org-level secrets (`cinatra-ai` organization)

## Webhooks & Callbacks

**Incoming:**
- Not applicable

**Outgoing:**
- Not applicable — marketplace submission is initiated by CI push, not via inbound webhook

---

*Integration audit: 2026-06-09*
