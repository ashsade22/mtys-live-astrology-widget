# MTYS Connected Discovery Pilot Technical Plan

Recommendation: retain the current Wix shell and build one source-owned guest journey after Abby approves the consolidated pilot brief. Reuse canonical Moon and Mercury readings, the repaired public bridge, and the existing hosting boundary. No private backend, chart calculation or new service is needed for this pilot.

Technology serves the product vision: one connected, progressively personalized experience. Emotional needs lead to communication style, then a relationship application and one relevant next discovery. Sync your life with the stars.

## Preparation completed

Verified: the current remote main is fc887fe862b11e42cf53a3d36fcb48887a90418a. All 37 source blobs in the isolated preparation snapshot match that remote tree. A separate preparation branch exists: peppermint/connected-discovery-phase1a-20261019. The published source, Wix mount, CMS and protected automation remain unchanged during Phase 1A.

Prepared: proposed state contract, 20 invented input fixtures, six content/preparation checks, 18 explicit acceptance TODOs and rollback guidance. Tested: 26 checks pass with no failures, comprising 20 existing reliability regressions and six preparation checks. None of the TODOs is a completed pilot acceptance test.

## Approval boundary

Phase 1A can be reviewed now. Phase 1B must wait for Abby’s explicit approval of the consolidated brief incorporating Quinn’s UX, Carnelian’s brand and Ginger’s measurement plan. Final screens, relationship synthesis, recommendations, runtime persistence, event delivery and publication are not implemented.

Private birth data, durable profiles, saved people, member-owned records, payments, subscriptions, the refresh endpoint and a second account system remain excluded. An account invitation must never imply that this guest result has been saved to My MTYS.

# 1 Reuse map and implementation boundary

| Source asset | Verified reuse | Work after approval |
|---|---|---|
| know-your-chart-content.js | 12 Moon and 12 Mercury readings; three sections each; 72 placement readings overall. | Import canonical interpretations without rewriting or copying content. |
| mtys-know-your-chart.js | Custom element, selection, dynamic imports, loading and result rendering patterns. | Separate connected component; preserve current standalone experience. |
| mtys-host-bridge.js | Validated public selection and route messaging; later selections beat original query. | Versioned opt-in pilot protocol; retain existing consumer behavior. |
| operations/host-bridge.js | Four Wix routes; strict origin, frame-source and entry-filename checks; history handling. | Add only the approved pilot entry and bounded state messages; snapshot Wix embed revision. |
| relationships-content.js | Existing general examples for Moon, Mercury, Venus and Mars. | Approved combined application still needed; general copy is not paired synthesis. |
| know-your-chart-styles.js | Existing responsive styling and component isolation patterns. | Use Carnelian’s approved tokens and Quinn’s layouts; no final design selected now. |
| Regression suites | 12 state/bridge tests and eight weekly display/date tests. | Keep them in the release gate; add actual pilot runtime and browser coverage. |

Verified content anchor: know-your-chart-content.js Git blob a9bb553b59e4b8a9e6abcb7c947b1437c622dc26. The preparation checks cover every Moon and Mercury input and the availability of both readings for all 144 pairs. They do not validate 144 combined interpretations.

Proposed runtime modules: entry HTML, journey custom element, pure state reducer, recovery adapter, canonical content selector, consent-aware event adapter and scoped styles. Keep state and event code independent from rendering. No Wix CLI extension, collection, dependency installation or API integration was created for this preparation.

# 2 Proposed journey-state contract

The machine-readable proposal is pilot/phase1a/journey-state.proposed.json. It is a specification, not a production validator or implemented shared-state adapter.

| Field or rule | Proposed contract |
|---|---|
| Identity and version | schemaVersion 1; fixed journey key; random functional instanceId; revision; content and application versions. No member identity. |
| Selections | moon and mercury each contain sign, basis selected_sign and explicit confirmed boolean. Only the 12 permanent lowercase sign keys are accepted. |
| Steps | moon-select, moon-insight, mercury-select, mercury-insight, relationship-application, next. Required confirmed selections gate each result. |
| Time and size | UTC epoch milliseconds; createdAt and expiresAt; proposed fixed maximum 24 hours. Checkpoint limit 4 KiB; message limit 8 KiB. |
| Derived results | Resolve canonical content on demand. Do not store interpretation text. Changing a sign invalidates the application and recommendation without erasing the other confirmed placement. |
| Rejected state | Unknown fields/enums, duplicate URL keys, invalid signs, unsupported versions, future or nonfinite dates, expired snapshots and unsupported calculated-chart basis. |
| Data minimization | No names, birth dates/times/locations, people, free text, credentials, email, member IDs, raw URLs or interpretation text in the checkpoint. |

## Precedence must depend on the navigation event

A validated Back/Forward snapshot for the currently bound, unexpired instance governs history navigation. A current explicit user action beats bootstrap input or an older revision. On a new entry, validated explicit link context beats a conflicting checkpoint; it must still be confirmed. On reload, a valid current-instance checkpoint can recover progress. With neither, show empty selectors. Never infer Moon or Mercury from a Sun sign.

A selected sign is interpreted as visitor-supplied information, not a calculated natal placement. Exact result wording is Carnelian and Abby’s decision. Unknown Moon or Mercury leads to a clear nonpersonalized alternative or explanation defined by Quinn; no birth form or substitute default is introduced.

# 3 Temporary recovery and navigation

| Situation | Required behavior after approval |
|---|---|
| Normal use | Memory is authoritative for active interaction. Optionally mirror only validated small state to a namespaced sessionStorage key on the embedded origin. |
| Expiry | Maximum 24 hours from creation, not sliding; the browser may remove it sooner. Validate at load, resume, history restore and before rendering. At expiry remove the checkpoint and explain restart. |
| Refresh or interruption | Restore valid confirmed selections and the last eligible step; resolve current approved content. Do not duplicate a previously counted activation. Interrupted invitation must retain the guest result when recoverable. |
| Back and Forward | Host history controls navigation inside Wix. Preserve existing Wix history fields. Namespaced pilot snapshots must match the active instance and pass expiry/schema checks. Avoid duplicate iframe and host history entries. |
| Reset | Revoke the previous instance, purge its checkpoint and create empty state with a new instance. Old history or delayed messages cannot restore cleared signs. With no storage after reload, reject unbound historical snapshots. |
| Storage unavailable | Catch denial, quota and parse failures. Continue in memory and explain that reload/return recovery is unavailable. Do not switch silently to cookies, localStorage or a server. |
| Cross-page navigation | Preserve only allowed public context on existing routes. Temporary same-tab recovery is best effort across mounted iframe contexts; verify partitioned storage in real browsers. |
| New tab or device | No promised continuity. sessionStorage is tab scoped and may be copied by browser opening behavior; it is not a durable account or security boundary. |

Current gap: the published bridge transports placement/sign or you/them and recognizes four specific HTML filenames. It does not carry both Moon and Mercury, a journey step, or a pilot filename. Reusing its validated boundary requires a small explicit Phase 1B extension, not arbitrary query forwarding.

Proposal: keep the existing query allowlist unchanged and carry bounded combined snapshots in namespaced host history and opt-in postMessage payloads. Public outgoing placement links still carry only placement/sign. Combined share links and permanent result URLs are deferred unless Abby approves a separate safe contract. Pilot entry route and mount location require Abby’s brief.

# 4 Content, application and recommendations

## Canonical interpretation reuse

Use the current Moon sections What you need, When stress hits and What helps you reset. Use Mercury’s How your mind works, In conversation and What gets through to you. Labels may be presented according to the approved brand system, while interpretation text remains unchanged unless Abby approves a specific correction.

## Relationship application is new approved content

The pilot connects two placements belonging to one guest. It does not compare two people, calculate synastry, identify natal aspects or measure compatibility. The combined application must explain a useful relationship situation and action without claiming full-chart knowledge.

Abby must approve whether the application uses individually curated pairs, a small reviewed rule set with approved fragments, or another constrained content system. Engineering must map each rule to source readings, version the mapping and test all 144 pairs, including same-sign combinations. Availability of separate readings does not establish coverage of the combined result.

If an approved application is missing, retain the two valid readings and show an honest application-unavailable state with a useful next action. Do not generate substitute copy automatically, claim an aspect from signs alone, or insert generic filler as a personal synthesis.

## One relevant next recommendation

Use deterministic approved rules, not an external service or machine-learning model. Inputs are the explicit selections, completed step and optional public interest only if the brief includes it. Each recommendation has an ID, reason, eligibility rule, destination and fallback. Exclude already completed steps and unavailable destinations.

No universal Venus or other sign can be inferred from Moon/Mercury. A Venus recommendation may ask for that placement on the existing route without preselecting a guessed sign. Whether the next experience is Venus, a specific relationship example or another destination is Abby’s decision.

## Invitations after value

Offer the return or account invitation only at the approved point after useful results. Guest completion cannot require an account. No save button, saved-success state or return promise may imply durable My MTYS functionality. Any existing Members Area link is optional and must not depend on an unverified account handoff or backend.

# 5 Analytics hooks for Ginger

Proposed names and semantics below require Ginger’s measurement plan and Abby’s approval. No event sender, SDK, analytics service or queue has been installed. Page views alone do not count as activation.

| Hook | Trigger and payload restriction |
|---|---|
| pilot_started; placement_confirmed | Meaningful journey entry; explicit Moon or Mercury confirmation. placement may be an enum; do not send sign values. |
| insight_received | Canonical insight successfully rendered, foregrounded and visible under an agreed visibility rule. Proposed: 50% visible for 1 second. Never on selection, load or hidden rendering alone. |
| connected_experience_started | Explicit continuation to Mercury after a visible Moon insight. Returning via Back or automatic resume does not qualify. |
| pilot_activated | Once per measured journey after the above first-value and voluntary second-start sequence. Do not wait for an account or use a page view as the trigger. |
| relationship_application_received; journey_completed | Both confirmed readings and the approved application reach their visibility/completion conditions. Distinguish completion from activation. |
| recommendation_selected | Intentional recommendation click; recommendation/rule ID, destination enum and content version only. |
| return_invitation_shown; account_invitation_shown; account_intent_selected | Invitation actually visible after value, or explicit intent. No account_created or result_saved event is claimed by this guest component. |
| guest_state_recovered; guest_state_reset | Validated recovery or explicit reset; bounded reason enum and step only. |
| pilot_error; pilot_performance | Bounded error code, stage, retry outcome, build version and timing bucket. No raw exceptions, text, selectors, full URLs or tokens. |

Common allowlisted envelope: event name/version, pilot/build/content versions, step enum, timestamp, basis selected_sign, context source enum, and only consented short-lived random event/journey IDs. The measurement ID must not become an account key or expose the functional checkpoint instance. Reject unknown payload fields.

Dedupe milestones separately from functional recovery state. If permitted, keep a small consented same-tab measurement checkpoint with the same maximum expiry; no pre-consent queue or later replay. Without storage/consent, the journey still works and cross-reload deduplication and seven/thirty-day return measurement are limited. Ginger must define denominators, exclusions, visibility rules and acceptable measurement loss. Real event receipt must be checked before launch; a local event stub is not delivery evidence.

# 6 Test and acceptance plan

| Layer | Prepared now | Required Phase 1B evidence |
|---|---|---|
| Content and contract fixtures | Six preparation checks; 20 invented cases. | Runtime schema rejection, precedence, expiry, content invalidation and no default across all 12 sign keys. |
| Reliability regressions | 20 existing tests pass from the verified baseline. | Keep them passing after any bridge or mount change; no horoscope logic or CMS mutation. |
| Automated pilot acceptance | 18 explicit TODOs; no pilot runtime assertions pass yet. | Complete journey, all 144 applications, history/refresh/reset, race cases, storage denial, event order/consent and recovery. |
| Mobile layouts | Not tested in Phase 1A; final screens do not exist. | 320, 375, 390, 430 CSS pixel widths; text zoom, landscape, keyboard, reduced motion, touch and accessibility. |
| Mobile browsers | Not tested. | iPhone Safari and Android Chrome where available. Record real device, OS/browser, test date and limitations; viewport emulation is a separate result. |
| Desktop and integrations | Prior desktop repairs documented in Phase 0; no new live checks claimed. | Chrome/Safari or available browser matrix; four original routes, deep links, invalid parameters, Back/Forward, refresh, no accidental navigation. |
| Publication | No pilot release. | Pinned source/build, successful deployment, actual mounted entry/version, public route, visible journey and approved analytics receipt verified on live Wix. |

Error coverage: slow or failed dynamic imports, missing sign content, application unavailable, corrupt checkpoint, expired state, blocked storage, missing parent handshake, denied analytics, retry, repeated CTA, interrupted invitation and delayed messages. Keep valid selections during a content retry. No failed calculation flow is needed because no calculation exists; a future calculated-chart feature requires its own acceptance gate.

Completion requires usable and understandable connected value, voluntary activation, approved event delivery, mobile readiness, regression checks, publication and live verification. Loading alone is insufficient. The future Build and Verification Report must separate implemented, automated, mobile, desktop, published, live-verified, unpublished, deferred and unresolved work.

# 7 Mobile, performance and security boundaries

## Iframe and mobile risks

Wix shell plus iframe can create double scrolling, clipped variable-height results, unexpected focus movement and duplicate history. Measure the full Wix page, not only the standalone component. Propose bounded ResizeObserver notifications with strict origin/frame/type validation; do not add unrestricted resize or navigation messages. Test nested iframe access, dynamic remounting and back-forward cache.

On touch screens verify sign controls, focus visibility, screen-reader labels, loading announcements and result headings. Target at least 44 CSS pixel controls, no horizontal overflow at 320 pixels, text usable at 200% zoom and stable layout when messages or errors appear. Quinn owns final interaction acceptance.

Proposed performance budgets: no new third-party runtime dependencies or private API calls; pilot-specific transfer target under 100 KiB compressed, excluding existing Wix shell; user selection response under 100 ms on a representative mobile device. Measure full-page LCP target 2.5 seconds, INP 200 ms and CLS 0.1 at the 75th percentile when sufficient field data exists. Lab results are provisional and cannot certify those field percentiles.

## Boundaries that must remain enforced

Only the approved Wix parent origin and GitHub Pages child origin can communicate. Check event.source against the actual configured iframe, exact path/filename, supported protocol version, message size and field allowlists. Never use wildcard targetOrigin, trust caller-supplied routes, forward arbitrary parameters or execute content as HTML. Render approved text safely.

Functional state is a preference convenience, not authentication or authorization. Browser storage is not secure storage and must contain no private birth or account data. Do not read Wix member tokens into the public embed. No CMS writes, refresh POST, external synthesis calls, private collections or new credentials are required.

Consent, storage copy and retention need Abby’s approval with Ginger and the appropriate privacy owner. Nonessential measurement must honor the site’s actual consent state; essential guest recovery must be clearly explained. Reset deletes the pilot checkpoint. Automatic expiry is application enforced when resumed; the browser may retain dormant bytes until access or browser cleanup. Do not promise server deletion because the pilot has no server record.

# 8 Source control, deployment and rollback

The preparation branch begins at the production baseline fc887fe862b11e42cf53a3d36fcb48887a90418a. Only preparation files under pilot/phase1a are added. No main update, workflow change, Wix configuration update or deployment is authorized in Phase 1A. Existing source-owned items stay in GitHub; the technical plan is the review artifact.

## Phase 1B release preparation

Before the first live change, capture the current remote commit, mount URL/component configuration, host embed HTML and revision, and relevant public page behavior. Re-check for concurrent work and base the implementation on the then-current main. Version pilot assets together. Avoid importing an unversioned changed module into an old page.

Use a narrowly scoped normal commit and mount change after approval and QA. Do not publish unrelated Harmony drafts. Confirm which Pages branch deploys and what automation runs on push; creating a feature branch is not evidence of production publication. Keep the existing Know Your Chart entry intact until the approved integration location is established.

## Rollback path

Phase 1A rollback has no production effect: leave the preparation branch unmerged. For Phase 1B, remove only the pilot mount or restore its captured previous entry, restore the captured host bridge revision with the current revision guard, and use normal child commits reverting only pilot assets. Preserve all unrelated changes. Never force-reset the branch, delete collections, remove apps or dispatch a generator as rollback.

After rollback, confirm Pages deployment, cache-versioned assets, Know Your Chart and Compatibility state/history behavior, Relationships and Career + Money links, and public horoscope display. Preserve the existing weekly stale-data notice and corrected Venus Pacific date. A browser cache may continue serving old assets; inspect actual versions before declaring success or failure.

## Known release limits

No test account, paid service, private profile, CMS schema or production birth information was introduced. No pilot screens, runtime adapters, analytics delivery or published integration are part of this submission. No mobile tests have passed because the pilot is not built. Earlier Phase 0 member and backend gaps remain open.

# 9 Sequence, estimates and Abby decisions

| Stage | Engineering range | Exit requirement |
|---|---|---|
| Phase 1A preparation | Completed scope in this submission. | Source/asset review, proposed contract, fixtures, baseline tests, branch, rollback and technical plan. |
| Brief reconciliation | 0.5 to 1.5 engineer days after complete brief. | Abby approves entry, step flow, final copy, pairing rules, recommendation, recovery and measurement. |
| Guest component and state | 3 to 5 engineer days. | Approved rendering, strict reducer, bounded bridge extension, recovery/reset/history and accessible states. |
| Application and measurement | 1 to 3 engineer days. | Approved content/rules cover all inputs; consent-aware hooks and actual delivery integration. Editorial approval is separate. |
| QA and release | 2 to 4 engineer days. | Automated tests, mobile/device availability, desktop regressions, publication, live verification and rollback check. |

Indicative Phase 1B total: roughly 7 to 14 engineer days after a complete approved brief. This is a planning range, not a delivery or cost commitment. Device availability, pairing-content review, consent integration and Harmony mounting constraints may change it. No new paid service or plan purchase is proposed.

## Decisions Abby must settle in the consolidated brief

Approve the pilot entry route and mount; full step/Back/reset flow; exact result-basis wording; unknown-placement path; approved relationship application with its coverage method; the single next recommendation and eligibility; return/account invitation language and destination; 24-hour maximum recovery policy and reset behavior; consent/event definitions and event destination; accessibility and release acceptance criteria.

Quinn supplies interaction, navigation, empty/error and mobile specifications. Carnelian supplies tokens, typography, exact labels and presentation. Ginger supplies event taxonomy, visibility/activation rules, consent behavior, dedupe and decision thresholds. Abby reconciles these; engineering implements the approved product rather than deciding the product through technical shortcuts.

## Next authorized action

Review this plan alongside the other team specifications. Keep the guest preparation independent of unresolved private-backend work. Begin Phase 1B only when Abby explicitly approves the consolidated pilot brief. Report any scope, privacy or reliability issue to Abby before crossing its boundary.

# 10 Parallel investigations and evidence register

| Investigation | Current evidence and status | Next safe action |
|---|---|---|
| Weekly ownership | Still unresolved. Phase 0 found only Oct 5 to 11 records and no accessible producer. Historical contract and validator re-read in Phase 1A; they validate batch data and do not schedule or write CMS. | Recover actual Wix managed source, deployment and execution records; identify sole writer before a repair. Do not add another writer. |
| Retrogrades | Writer/schedule still unresolved. Prior Venus PT end-date correction is documented; it does not establish automated maintenance. | Trace source, station method, inner-planet coverage, cadence, logs and fallback without rewriting. |
| Managed backend and refresh | Source project mapping and server authorization remain unknown. The pilot does not mount or invoke the refresh route. | Inspect supported managed-source configuration and authenticated server code/logs; report unauthorized-write evidence immediately if found. |
| Identity and ownership | Sign-in, secure member resolution, owner-only access and cross-member denial remain unproved. No production profile system exists. | Continue controlled test-only verification within available authentication rules once a supported test backend is recovered. |
| Export and deletion | Private-account behavior not implemented or verified. Guest reset is a separate local capability. | Specify account data inventory, authenticated export, cascading deletion and retention once private architecture is authorized. |

## Evidence inspected for Phase 1A

October 19, 2026 approximately 8:56 to 9:02 PM Pacific, corresponding to October 20 UTC: current Library Phase 0 report version 1 read through its final evidence pages; remote main ref and recursive tree inspected through connected GitHub reads; all 37 local baseline blobs compared by Git hash; Moon, Mercury, relationship and bridge source inspected; preparation tests executed locally; historical generation-contract.json and validate-horoscopes.mjs read in full.

These establish the preparation baseline, reusable interpretation coverage, present bridge limitations and validation-only nature of those two historical files. They do not establish current CMS freshness, a weekly production root cause, backend authorization, mobile usability, completed authentication, deployment of the pilot or a fresh live-site test. Those findings must remain explicitly unresolved or untested.

Source anchors: github.com/ashsade22/mtys-live-astrology-widget at fc887fe; report MTYS Phase 0 Technical Verification and Reliability Report, version 1, especially sections 4, 7, 8, 10, 11 and the release/evidence registers. The preparation branch contains the exact proposal, fixtures, TODO inventory and test command. No secrets or customer information are included.

Completion status: Phase 1A preparation delivered for Abby’s review. Phase 1B implementation not started. Pilot not complete, not published and not live verified. Private saving and My MTYS account functionality remain blocked by the unresolved security and identity gates.
