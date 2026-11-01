# Codebase review and development plan

Reviewed: October 31, 2026. Scope: repository source, configuration, existing documentation, static type checking, lint command, and attempted tests. This is a source review, not a production penetration test or a live database audit. No deployment or database changes were made.

## Current state

The project is a Next.js App Router site for Tailgates 4 Jesus, deployed through OpenNext to Cloudflare Workers. It already has useful building blocks: reusable UI primitives, Valibot schemas, server actions, a collection-driven admin dashboard, and editable site copy.

| Responsibility | Current implementation |
| --- | --- |
| Pages and routing | `src/app/` |
| Shared UI | `src/components/ui/`, using Radix/Base UI and Tailwind |
| Domain interfaces and validation | `src/types.ts`, `src/lib/schemas.ts` |
| Database reads and writes | `src/lib/actions.ts`, `src/lib/admin-actions.ts`, `src/lib/server-actions.ts`, `src/services/` |
| Application records | Cloudflare D1: signs, thoughts, links, sections, messages and comments |
| Authentication and profiles | Supabase clients and auth actions; legacy custom JWT/admin-key helpers also exist |
| Images and infrastructure | Cloudflare R2, OpenNext cache configuration, Redis/Upstash utilities |
| Editorial copy | Keystatic singleton in `keystatic.config.ts`, stored in `src/lib/content/site-content.json` |
| Dashboard configuration | `src/app/admin/dashboard/content.ts` and `use-collection-crud.ts` |

The biggest opportunity is to give each responsibility one clear owner. Adding another CMS before establishing ownership would increase duplication.

## 1. Steps to create AGENTS.md and what to include

No applicable `AGENTS.md` was found in the project or its ancestor directories during this review. Create a short root-level file after agreeing on the conventions below. This report proposes its contents; it does not create that file or impose new rules.

### Creation steps

1. Describe the actual product, runtime, and data ownership. Replace starter-template assumptions with this application's setup.
2. Record working local commands and required environment-variable names. Create a redacted `.env.example`; never copy credentials into documentation.
3. State import boundaries, schema conventions, authorization requirements, and content workflow.
4. Document checks that actually work. Fix lint before describing it as a passing requirement.
5. Add focused nested instructions only when an area needs different rules, such as Cloudflare integration tests. Keep the root file concise and link to maintained architecture documentation.
6. Update instructions in the same change that changes a command, storage boundary, or publishing workflow.

### Suggested AGENTS.md contents

```markdown
# Project guidance

## Product and stack
- Tailgates 4 Jesus: public signs, thoughts, resource links, and contact features.
- Next.js App Router, React, TypeScript, OpenNext, Cloudflare Workers.
- D1 owns application records; R2 owns application images.
- Supabase owns authentication and profiles.
- Keystatic currently owns editorial site copy in src/lib/content/site-content.json.

## Where code belongs
- src/app: route composition, layouts, loading/error boundaries.
- src/components/ui: reusable presentation primitives.
- src/components/<feature>: feature presentation.
- src/lib/schemas.ts: current validation schemas; infer types where practical.
- src/lib/content: editorial content access.
- Server actions authenticate, authorize, validate, call data services, and invalidate affected data.
- Keep database/runtime access out of client utilities and UI primitives.
- Reuse existing primitives and feature components before creating replacements.

## Data and security
- Every privileged action must verify the current user and admin permission on the server.
- A client-provided token or a protected dashboard page is not sufficient authorization.
- Validate mutation inputs with Valibot; bind SQL values and allowlist identifiers.
- Sanitize stored rich text before rendering HTML.
- Never log credentials, auth tokens, or private message bodies.
- Preserve record IDs, relationships, QR destinations, and public URLs during migrations.

## Workflow
- Use npm and preserve package-lock.json.
- Preserve unrelated working-tree changes.
- Do not deploy, seed remote databases, or run production migrations as routine validation.
- Keep secrets out of commits; document variable names and setup instead.
- Explain changed behavior, validation performed, and remaining limitations.

## Validation
- npm run dev: local Next.js development.
- npx tsc --noEmit --incremental false: type checking.
- npm test: current Cloudflare-backed Vitest suite; requires local runtime/network permissions.
- npm run lint: currently broken; replace next lint with an ESLint CLI script.
- npm run build: Next.js production build.
- npm run build:cf: Cloudflare adapter build; verify runtime changes with this too.
- Add targeted regression tests for authorization, SQL correctness, and state synchronization.
```

Once files move, update the path map to the actual structure. Do not document the proposed feature organization below as if it already exists.

## 2. Make the code more connected and reusable

Here, “connected” means shared contracts and predictable data flow, with fewer independent implementations of the same behavior.

### A. Separate browser utilities from server infrastructure

`src/components/ui/separator.tsx` is a reasonable small wrapper: it composes a Radix primitive, forwards props, and uses `cn()`. The larger problem is its dependency: `src/lib/utils.ts` combines `cn()` with `getCloudflareContext()`, runtime environment access, validation helpers, and other utilities.

Move environment access into a server-only module, leaving `cn()` in a browser-safe utility. Mark infrastructure modules with `server-only` where supported. Apply the same split to other client imports. Do not make presentation primitives depend on Cloudflare infrastructure.

### B. Use one data path per feature

Recommended flow:

```text
Route / component
  -> validated server action or server query
  -> feature service / repository
  -> D1 or CMS adapter

Successful mutation -> targeted server invalidation + client refresh
```

Start with links rather than reorganizing the entire repository at once:

```text
src/features/links/
  schemas.ts       # input and output contracts
  repository.ts    # server-only D1 queries
  actions.ts       # server authorization, validation, mutation
  components/      # reusable feature presentation
src/lib/server/
  env.ts
  auth.ts
```

Keep route files thin and share repositories between dashboard actions and public reads. Resolve Cloudflare bindings inside request-time functions; `admin-actions.ts` currently reads them at module scope.

### C. Connect types, schemas, and dashboard configuration

`src/types.ts`, `src/lib/schemas.ts`, dashboard field definitions, `FnMap`, and `ACTION_REGISTRY` independently describe overlapping entities. The dashboard also erases types with `any` and represents all rows as `Record<string, string>`.

- Infer entity types from Valibot schemas where practical. Keep separate create/update schemas for writable fields so counters and server-owned IDs cannot be overwritten inadvertently.
- Use one typed collection registry for each collection's label, fields, query, and mutation adapter. Avoid maintaining separate fetch/action maps with different supported keys; `FnMap.home` currently has no implementation.
- Share metadata and contracts without importing database infrastructure into client modules. A small client registry can reference server actions through explicit adapters.
- Standardize action results as a discriminated union, such as `{ success: true, data: T } | { success: false, error: string }`, and handle both branches in callers.
- Validate JSON content instead of asserting `rawContent as unknown as FullSiteContent`; a cast does not check the file at runtime.

### D. Keep dashboard state connected to saved data

`useCollections()` caches fetched collections independently of `useCollectionCrud()`, which creates its own rows from initial props. Later loads or collection changes can leave local rows out of sync. Save/delete failures returned as `{ success: false }` also do not receive explicit feedback in the CRUD hook.

Choose one state owner: use the already-installed SWR with collection keys and `mutate()`, or server-loaded data with `router.refresh()` and minimal local draft state. Do not layer both approaches onto a separate ad hoc cache. Render returned failures, keep the draft open after failure, and reconcile saved rows with the server response.

Acceptance example: create a link, switch collections, return, edit it, and reload. Each view should show the same stored record without a manual page reset.

### E. Establish one cache policy

`stableCache.ts` is currently a passthrough despite accepting cache options. `clearCache.ts` deletes the OpenNext incremental-cache prefix and does not await each delete. Admin writes combine path revalidation with broad cache clearing.

Decide which reads are dynamic and which use a supported Next/OpenNext cache mechanism. Document keys and affected paths per mutation. Prefer targeted invalidation over bucket-wide deletion; propagate invalidation failures appropriately. Test adapter behavior before selecting a Next caching API. Check whether build-phase empty arrays from `cacher.ts` can become prerendered empty public pages.

### F. Consolidate overlapping UI systems after checking callers

- Toast implementations exist under `src/hooks/`, `src/components/ui/`, and Sonner consumers. Choose a supported notification API and host arrangement.
- Theme providers exist in both `src/components/theme-provider.tsx` and `src/components/theme/ThemeProvider.tsx`. Define which owns theme state and which only emits styles.
- Mobile hooks and error components have overlapping locations. Consolidate by behavior after examining imports.
- Tailwind and CSS modules can coexist, but keep shared tokens centralized. Check whether both global stylesheet locations are still needed.
- Audit dependencies and imports before removal. An unused wrapper or installed package is not enough evidence by itself to justify deleting a whole subsystem.

## 3. Prioritized next steps

### Priority 0: protect writes and private data

| Finding from source | Recommended action and acceptance check |
| --- | --- |
| Admin CRUD, uploads, and cache actions in `src/lib/admin-actions.ts` accept token/admin-code arguments without checking them. | Add a shared server-side admin guard to every privileged action. Verify anonymous and ordinary authenticated users cannot invoke mutations directly. |
| `src/middleware.ts` gates admin paths by whether a user exists, without checking admin permission. `src/app/middleware.ts` contains another implementation with different protected routes. | Consolidate into the framework-recognized request hook and verify behavior against the installed Next version. Enforce admin authorization inside actions as well. The nested file should not be assumed to protect `/user`. |
| Publicly exported `getMessages()` in `src/lib/server-actions.ts` has no in-function authorization check. | Treat message retrieval as privileged; review every caller and test that unauthorized users receive no message data. |
| `signToken()` is exported from a `use server` module and signs supplied payloads without an in-function guard; custom admin-key auth coexists with Supabase. | Review server-action exposure and remove or restrict legacy token issuing. Consolidate identity and authorization; do not send long-lived admin secrets through client props. |
| Thoughts, comments, and dashboard previews render HTML using `dangerouslySetInnerHTML`. | Trace all write paths and add a shared allowlist sanitizer. Source review did not establish an effective sanitization boundary. Verify script/event-handler and unsafe URL payloads do not execute. |

These are code-level findings; live exploitability and deployed protection were not tested. A CMS migration does not fix these application boundaries.

### Priority 1: fix concrete correctness and validation issues

1. Fix `postMessage()` in `src/lib/server-actions.ts`: its INSERT names six columns but has four placeholders and supplies six bindings. Add input validation and an integration test for a persisted message.
2. Fix `isUsernameUnique()` in `src/lib/auth-actions.ts`: it currently rejects an empty result as “Username is taken.” Check query errors first, reject existing rows, and retain database uniqueness as the final concurrency guard. Test available and occupied usernames.
3. Audit `getQuery.ts` and `setQuery.ts`: their table guard rejects the all-valid case, identifiers/IDs are interpolated, and they use `SQL_DB` while current actions use `D1`. Source search found no external imports of these helpers. Confirm they are unused and remove them, or replace them with constrained, parameterized repositories before reuse.
4. Handle returned action failures and collection state synchronization as described above.
5. Review redirects in admin login and allow only intended internal destinations. Check logout's broad catch, which can catch the framework redirect exception.
6. Replace the lint script with an ESLint CLI command compatible with `eslint.config.mjs`, then resolve or explicitly triage the findings.
7. Separate pure unit tests from Cloudflare integration tests. `src/app/admin/dashboard/t.test.tsx` exports an editor demo but defines no tests; rename or move it if it is a playground.

### Priority 2: document and simplify

1. Add the agreed `AGENTS.md` and a redacted environment template.
2. Replace the starter README with real setup, local D1 initialization, auth setup, content editing, checks, and deployment instructions. `ARCHITECHTURE.md` currently lists routes rather than explaining data flow; expand or replace it and fix the filename when convenient.
3. Extract the links feature as the first example of shared schemas, repository, actions, and UI.
4. Standardize collection state, error handling, theme ownership, and notifications.
5. Exercise public signs, sign detail/QR visits, link search, contact submission, login/signup, authorized CRUD, and uploads. Add regression coverage at the broken boundaries rather than tests for trivial UI wrappers.

### Priority 3: implement the chosen editorial workflow

Decide whether editing from a developer's machine is acceptable. If yes, finish the existing Keystatic workflow. If editors need independent browser access, prototype Sanity with only site settings and homepage copy first. Verify preview, publication, cache refresh, and rollback before moving other content.

### Validation performed

- `npx tsc --noEmit --incremental false`: passed.
- `npm run lint`: failed because `next lint` is interpreted as a nonexistent `lint` project directory by the installed Next CLI.
- `npm test`: initial attempt could not start because the sandbox blocked Vitest's local listener (`listen EPERM 127.0.0.1`). The unrestricted rerun completed with **3 tests passing, 1 test file passing, and 1 test file failing**. The failing editor-demo suite cannot resolve `@/components/ui/toggle` from `rich-text-editor.tsx`. Configure Vitest's `@` alias and move the demo out of test discovery; then rerun to uncover any further issues.
- No production build, Cloudflare deployment, remote seed, or live Supabase/D1 audit was performed. Passing type checking does not establish runtime correctness.
- Existing edits to `admin-dashboard.tsx` and `sidebar.tsx` were present before this report and were left intact.

## 4. Which free content manager to use?

**Recommendation: keep Keystatic for the smallest change; choose Sanity if nontechnical editors need a hosted browser workflow.** Contentful is not my default recommendation for this project's free production setup.

The following vendor information was checked against official pages during this review. Free software, free hosted quotas, and zero operating cost are different things; hosting, builds, authentication, bandwidth, and maintenance may still cost money.

| Option | Free offering / constraints | Fit for this repository |
| --- | --- | --- |
| **Keystatic** | Open-source, repository/local content workflow; GitHub mode supports remote editing. Hosting and GitHub integration still require setup. | Best immediate fit: packages, schema, UI, API handler, and JSON content already exist. Local mode currently needs a developer-machine workflow and redeployment for bundled copy changes. [Introduction](https://keystatic.com/docs/introduction), [GitHub mode](https://keystatic.com/docs/github-mode). |
| **Sanity** | Hosted Free plan currently includes 20 seats, 10k documents, 250k monthly API requests, and 1m monthly API CDN requests. Free datasets are public and roles are Administrator/Viewer; fine-grained editor roles require a paid plan. | Best hosted alternative for public copy, related editorial records, and media. Keep private contact submissions and account data outside public datasets. Budget for mapping schemas, previews, rendering, and invalidation. [Official pricing](https://www.sanity.io/pricing). |
| **Contentful** | Pricing lists a Free plan with 10 users and 100k API calls/month. Its usage policy restricts Free to testing/learning and excludes commercial use; verify eligibility for this ministry's actual use before relying on it. | Familiar hosted CMS, but the free-use restriction and migration work make it a weaker default here. [Pricing](https://www.contentful.com/pricing/), [Usage policy](https://www.contentful.com/help/admin/usage/usage-limit/). |
| **Decap CMS** | Open-source editor backed by Git. Deployment, repository authentication, and publishing integration remain your responsibility. | Reasonable alternative for a new Git-based setup, but replacing existing Keystatic adds work with limited immediate benefit. [Official overview](https://decapcms.org/docs/intro/). |

### If you keep Keystatic

1. Keep editorial copy in `src/lib/content/site-content.json` and maintain one schema/type contract.
2. Choose local editing plus reviewed commits, or GitHub mode with authenticated access and a tested build/deploy workflow.
3. Correct the comment claiming the admin UI is never deployed: Keystatic routes and its API handler exist, so verify and explicitly implement production exclusion if local-only is the intention. Protect the API path too, rather than only checking `/keystatic` pages.
4. Demonstrate edit -> save -> commit -> preview -> deployment -> changed public page. Imported JSON does not automatically update an already-deployed bundle.

### If you choose Sanity

1. Model `siteSettings` and `homePage` first. Map CMS responses to application types behind a server content adapter instead of scattering CMS queries through UI components.
2. Keep D1 responsible for hits, QR analytics, messages, comments, and other mutable application data. Keep Supabase responsible for accounts.
3. Initially leave signs, thoughts, sections, and links in D1. Later, move editorial portions only if that removes enough custom dashboard work to justify migration. Preserve stable IDs and relationships, and avoid writing the same field to both systems.
4. Add validated publish-webhook invalidation, preview access, and error/fallback behavior. Keep write tokens server-side.
5. Reconcile exported/imported records, check rich-text rendering and images, and verify old URLs and QR codes. Retire overlapping editing screens only after the new workflow passes acceptance checks.

The practical first milestone is reliable authorized editing with consistent public reads. After that, the CMS choice can improve the editor experience without introducing another competing source of truth.
