# Testing Patterns

**Analysis Date:** 2026-06-09

## Test Framework

**Runner:**
- Not detected — no test runner (Jest, Vitest, Mocha, etc.) is configured in `package.json`
- No `jest.config.*`, `vitest.config.*`, or equivalent config files present

**Assertion Library:**
- Not applicable

**Run Commands:**
```bash
# No test script defined in package.json
# CI runs: corepack pnpm test --if-present  (no-op for this repo)
```

## Test File Organization

**Location:**
- No test files exist in this repository

**Naming:**
- Not applicable

## Test Structure

**Suite Organization:**
- Not applicable — no tests exist

**Patterns:**
- Not applicable

## Mocking

**Framework:** Not applicable

**Patterns:**
- Not applicable

**What to Mock:**
- Not applicable

**What NOT to Mock:**
- Not applicable

## Fixtures and Factories

**Test Data:**
- Not applicable

**Location:**
- Not applicable

## Coverage

**Requirements:** None enforced — no coverage tooling configured

**View Coverage:**
```bash
# Not configured
```

## Test Types

**Unit Tests:**
- Not present

**Integration Tests:**
- Not present

**E2E Tests:**
- Not present

## CI Validation (Substitute for Tests)

This repo is a **source mirror** — it declares `@cinatra-ai/sdk-extensions` as an optional peer dependency, which means:
- Standalone `install`, `typecheck`, and `test` steps are **skipped** in CI (`.github/workflows/ci.yml`)
- The cinatra monorepo owns building, typechecking, and testing this extension
- The only CI validation that runs standalone is the **first-party dependency shape gate** (inline `node -e` script in `.github/workflows/ci.yml`) and **`npm pack --dry-run`** for package shape validation

**Dependency shape gate logic (`.github/workflows/ci.yml`):**
- Fails with exit 2 if any `@cinatra-ai/*` or `@cinatra/*` package appears in `dependencies`, `devDependencies`, or `optionalDependencies`
- Fails if any first-party peer is not marked `peerDependenciesMeta.<pkg>.optional: true`
- This is the primary correctness enforcement for this repo type

## Common Patterns

**Async Testing:**
- Not applicable

**Error Testing:**
- Not applicable

---

*Testing analysis: 2026-06-09*
