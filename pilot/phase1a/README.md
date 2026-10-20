# Connected Discovery Pilot: Phase 1A preparation

Peppermint reports to Abby. Status: preparation only. No UI, runtime state adapter, analytics sender, Wix mount or backend is implemented here.

## Baseline and branch

- Production baseline: `fc887fe862b11e42cf53a3d36fcb48887a90418a`.
- Preparation branch: `peppermint/connected-discovery-phase1a-20261019`.
- Existing 37 blob files were copied and Git-blob-hash verified against the connected remote tree before preparation.
- No `main` update, Pages release, Wix edit, CMS write, workflow change, endpoint invocation or private collection is part of Phase 1A.

## Run the preparation checks

From the repository root, run:

```sh
node --test state-regression.test.cjs weekly-freshness.test.cjs pilot/phase1a/preparation.test.mjs pilot/phase1a/acceptance.todo.test.cjs
```

The 20 existing reliability tests and six preparation checks can pass. The 18 TODOs must remain explicitly unimplemented until Phase 1B; a green command is not pilot completion.

## Owned files and reuse

`know-your-chart-content.js` has 12 Moon and 12 Mercury readings with three sections each. Import the canonical module; do not copy or rewrite interpretation text. `mtys-know-your-chart.js` supplies rendering, selection and loading patterns, but is not the connected journey. Reuse bridge validation/history concepts from `mtys-host-bridge.js` and `operations/host-bridge.js`, preserving all existing routes and permanent sign keys. Their current payload handles only placement/sign or you/them, not a combined journey. `relationships-content.js` supplies approved general relationship examples, not 144 approved Moon/Mercury syntheses.

Proposed new runtime files after approval: a distinct entry HTML, journey component, pure state reducer, recovery adapter, content selector, event adapter and scoped styles. The exact entry route/mount and paired application content remain Abby decisions. No new Wix CLI app is required for this guest boundary.

## Proposed state and analytics

See `journey-state.proposed.json` and invented `fixtures.json`. Existing URLs keep their four-key allowlist. A separately versioned, opt-in bounded message protocol and namespaced host history payload are proposed for combined state; implementation requires the consolidated brief. Store only optional tab-scoped guest preferences with fixed 24-hour maximum expiry. Memory remains sufficient for the journey if sessionStorage is unavailable. Expiry is an application limit, not guaranteed browser retention; closing a tab may remove state earlier.

Proposed event hooks: `pilot_started`, `placement_confirmed`, `insight_received`, `connected_experience_started`, `pilot_activated`, `relationship_application_received`, `recommendation_selected`, `return_invitation_shown`, `account_invitation_shown`, `account_intent_selected`, `journey_completed`, `guest_state_recovered`, `guest_state_reset`, `pilot_error`, `pilot_performance`. Ginger approves names and semantics before a sender is built. Activation requires a visible Moon insight and an intentional Mercury continuation in the same journey. No sign values, free text, full URLs, birth data, email, identifiers from Wix members or raw error messages go to analytics. Any short-lived random journey/event IDs require measurement consent and may not become identity keys. No event sender or queue is included in Phase 1A.

## Rollback and release gate

Preparation rollback has no live effect: leave this branch unmerged. Do not delete other work. Phase 1B must snapshot current Wix mount, host embed revision and source commit; make normal child commits, never force-reset main. Revert only pilot changes and restore the captured mount/bridge with current-revision checks. Verify original four routes and published horoscopes after any release or rollback. Do not full-publish unrelated Harmony drafts. Cache-version entry/assets and wait for the deployed versions before judging live behavior.

No Phase 1B starts before Abby explicitly approves the consolidated UX, brand, application content, recommendation, measurement and mount brief. Private profiles, account saving, saved people, payments, natal calculation and refresh endpoint remain outside this pilot.
