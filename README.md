# Email Body

The body content of an email message — what the reader actually sees. Email Body covers both real sent messages saved for later reference and reusable templates kept in the library to inform future drafts, so proven message language stays searchable and easy to adapt.

Install this artifact from the marketplace. No credentials or external service configuration are required; the extension registers itself automatically once installed. When you attach a plain-text or Markdown file to a cinatra workspace, the artifact matcher reads the file and decides whether it is an email body (a greeting, 1–6 paragraphs of conversational prose, and a sign-off) at a confidence threshold of 0.70. Template files that use placeholder variables score slightly lower (0.65–0.75); only scores at or above the 0.70 threshold are accepted, so well-structured templates with a clear greeting and sign-off will match while minimal stubs may not. Files that are longer newsletter-style documents, blog posts, transcripts, changelogs, or legal contracts are rejected by the matcher. For development and testing, clone this repository, install dependencies with your package manager, and run the extension-kind gate (`node extension-kind-gate.mjs`) to verify the manifest and README contract locally before publishing. Common failure mode: a file attached as context is not matched if it lacks both a greeting and a sign-off line; check that the document opens with "Hi", "Dear", "Hello", or a similar salutation and closes with "Best,", "Thanks,", or "Regards,".

## Works with

- Any cinatra workspace where file attachments are used as drafting context

## Capabilities

- Save the body of a real or template email for future reuse
- Search past messages to find proven language for a new draft
- Adapt a successful past email when writing a similar one
- Attach as reference context when briefing a drafting agent
