import type { SemanticArtifactManifest } from "@cinatra-ai/sdk-extensions";

// `@cinatra-ai/email-body-artifact`: the body of a sent or uploaded email
// message retained for reuse and future drafting. Distinct from the
// operational email record, which tracks sender, recipient, and send-state as
// relational data, and from `email-draft-artifact`, which is byte-indistinguishable
// from body content but has a lifecycle-only distinction.
//
// Bytes-only matcher: text/markdown + text/plain. text/html is not in the LLM
// capability registry.
export const emailBodyArtifactManifest: SemanticArtifactManifest = {
  accepts: {
    file: {
      mimeTypes: ["text/markdown", "text/plain"],
    },
  },
  skills: {
    matchers: ["@cinatra-ai/email-body-artifact:email-body-matcher"],
  },
  matcherConfidenceThreshold: 0.7,
};
