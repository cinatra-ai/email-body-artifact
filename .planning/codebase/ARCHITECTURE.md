<!-- refreshed: 2026-06-09 -->
# Architecture

**Analysis Date:** 2026-06-09

## System Overview

```text
┌─────────────────────────────────────────────────────────────┐
│              @cinatra-ai/email-body-artifact                 │
│  Cinatra "artifact" extension — source mirror repo          │
└──────────────────────────┬──────────────────────────────────┘
                           │
          ┌────────────────┴─────────────────┐
          ▼                                  ▼
┌─────────────────────┐          ┌───────────────────────────┐
│  Manifest (TS)      │          │  Skill (LLM prompt)        │
│  `src/index.ts`     │          │  `skills/email-body-       │
│                     │          │   matcher/SKILL.md`        │
└─────────────────────┘          └───────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────┐
│  @cinatra-ai/sdk-extensions  (optional peer, monorepo-only) │
│  SemanticArtifactManifest type                              │
└─────────────────────────────────────────────────────────────┘
```

## Component Responsibilities

| Component | Responsibility | File |
|-----------|----------------|------|
| Artifact manifest | Declares accepted MIME types, matcher skill reference, and confidence threshold | `src/index.ts` |
| email-body-matcher skill | LLM prompt that classifies whether an attached resource is an email body | `skills/email-body-matcher/SKILL.md` |
| package.json cinatra block | Machine-readable duplicate of the manifest for the Cinatra platform registry | `package.json` |
| CI workflow | Validates package shape, type-checks, and runs kind-specific gates | `.github/workflows/ci.yml` |
| Release workflow | Handles versioned release automation | `.github/workflows/release.yml` |

## Pattern Overview

**Overall:** Cinatra "artifact" extension — declarative semantic classifier

**Key Characteristics:**
- A single exported TypeScript constant (`emailBodyArtifactManifest`) typed as `SemanticArtifactManifest` from the host SDK.
- All classification logic lives in a SKILL.md LLM-prompt file, not in imperative code.
- The repo is a source mirror: `@cinatra-ai/sdk-extensions` is an optional peer dependency resolved only inside the cinatra monorepo workspace. No standalone install, typecheck, or test runs in CI for first-party-peer repos.
- Package shape is duplicated in both `src/index.ts` (runtime) and the `cinatra` block of `package.json` (registry metadata).

## Layers

**Manifest layer:**
- Purpose: Declares the artifact's accepted file types and which matcher skill to invoke.
- Location: `src/index.ts`
- Contains: Single exported `SemanticArtifactManifest` object constant.
- Depends on: `@cinatra-ai/sdk-extensions` (type import only, optional peer).
- Used by: Cinatra platform runtime to route resources to this artifact type.

**Skill / prompt layer:**
- Purpose: Provides the LLM classification prompt that decides `matches:true/false` with a confidence score and rationale.
- Location: `skills/email-body-matcher/SKILL.md`
- Contains: Structured markdown prompt defining positive/negative examples, confidence bands, and a strict JSON output contract.
- Depends on: Nothing (plain text consumed by the Cinatra LLM runtime).
- Used by: Cinatra platform when `matcherConfidenceThreshold` evaluation is triggered.

**Registry metadata layer:**
- Purpose: Allows the Cinatra platform registry to read artifact configuration without executing TypeScript.
- Location: `package.json` (`cinatra` key)
- Contains: `apiVersion`, `kind`, `artifact` block mirroring the TS manifest.
- Depends on: Nothing.
- Used by: Cinatra platform tooling and extraction scripts.

## Data Flow

### Artifact Classification Path

1. Cinatra platform receives a resource (file with MIME type `text/markdown` or `text/plain`).
2. Platform reads `package.json` → `cinatra.artifact.skills.matchers` to resolve the matcher skill reference `@cinatra-ai/email-body-artifact:email-body-matcher`.
3. LLM is invoked with the prompt from `skills/email-body-matcher/SKILL.md` and the resource content.
4. LLM returns `{ "matches": <boolean>, "confidence": <0..1>, "rationale": "<string>" }`.
5. Platform compares `confidence` against `matcherConfidenceThreshold: 0.7` (declared in both `src/index.ts` and `package.json`).
6. Resource is accepted or rejected as an email-body artifact.

**State Management:**
- Stateless. No runtime state; all decisions are made per-invocation by the LLM prompt.

## Key Abstractions

**SemanticArtifactManifest:**
- Purpose: SDK type that shapes what an artifact extension must declare (accepted MIME types, matcher skill references, confidence threshold).
- Examples: `src/index.ts`
- Pattern: Single exported const; no class, no factory.

**SKILL.md prompt contract:**
- Purpose: Defines the classification criteria and output schema for the LLM matcher.
- Examples: `skills/email-body-matcher/SKILL.md`
- Pattern: Structured markdown with explicit positive/negative criteria, confidence bands, and a JSON-only output contract.

## Entry Points

**TypeScript export:**
- Location: `src/index.ts`
- Triggers: Imported by the cinatra monorepo workspace when the artifact is registered.
- Responsibilities: Exports `emailBodyArtifactManifest` as the single public symbol.

**Cinatra registry:**
- Location: `package.json` (`cinatra` block)
- Triggers: Read by Cinatra platform tooling at registration time.
- Responsibilities: Provides machine-readable artifact metadata without requiring TS compilation.

## Architectural Constraints

- **No standalone runtime:** This repo cannot be installed or run independently. `@cinatra-ai/sdk-extensions` is not published to any registry; it resolves only inside the cinatra monorepo.
- **Global state:** None. No module-level mutable state.
- **Circular imports:** None. Single source file with one type import.
- **MIME scope:** Only `text/markdown` and `text/plain` are accepted. `text/html` is explicitly excluded (not in the LLM capability registry, per comment in `src/index.ts`).
- **Confidence threshold:** Hard-coded at `0.7` in both `src/index.ts` and `package.json`. Must be kept in sync manually.

## Anti-Patterns

### Duplicate manifest definition

**What happens:** The artifact manifest is declared twice — once as a TypeScript object in `src/index.ts` and once as a JSON blob in the `cinatra` block of `package.json`.
**Why it's wrong:** The two copies can drift silently; there is no compile-time or test-time enforcement that they match.
**Do this instead:** Treat `src/index.ts` as the source of truth. If the platform tooling needs JSON, use a code-generation step or a validation script that reads the TS export and compares it to the `package.json` block.

## Error Handling

**Strategy:** Not applicable at this layer. The artifact package contains no imperative logic that can throw. Error handling for classification failures is the responsibility of the Cinatra platform runtime consuming this extension.

## Cross-Cutting Concerns

**Logging:** Not applicable — no runtime code.
**Validation:** CI enforces that first-party deps appear only as optional peerDependencies (see `.github/workflows/ci.yml`).
**Authentication:** Not applicable.

---

*Architecture analysis: 2026-06-09*
