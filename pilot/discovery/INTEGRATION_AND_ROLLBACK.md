# Controlled prototype integration and rollback

Status: source implementation only; not mounted on Wix, not publicly deployed, and not browser/device certified.

## Build and review

Run `python3 pilot/discovery/build_review.py` to regenerate the single-file `review.html` for offline review. Source modules import the unchanged canonical `know-your-chart-content.js`. The generated file contains no remote runtime dependency, backend call, cookie, permanent storage, or live text generation. It is not a hosted private application or a security boundary. Do not publish it on GitHub Pages during this assignment.

Run `node --test state-regression.test.cjs weekly-freshness.test.cjs pilot/phase1a/preparation.test.mjs pilot/discovery/verification.test.mjs` from the repository root. Current result: 74 pass, including 48 new runtime/fixture checks, 20 existing reliability checks and six preparation checks. The minimal DOM fixture is not a browser renderer, layout test or assistive-technology test. Historical Phase 1A TODOs are not included in this command and are not certified complete.

## Content boundary

All 12 Moon and 12 Mercury readings reuse existing canonical text unchanged. The only integrated application is the explicitly approved fictional Cancer Moon / Gemini Mercury example, available only in Example exploration mode. Personal combinations show unavailable state and retain earlier results. No reviewed 12 to 18 personal pair library was available in the inspected handoff. Do not remove the mode gate or relabel the example as personal without approval.

## Wix integration boundary

The optional host module is `protocol.mjs:installHostBridge`. It must be loaded only in the controlled Know Your Chart preview. It is inert on other routes. It accepts only the exact source-owned pilot child path and the actual configured frame window; it does not replace or modify the existing public `mtys-host-bridge.js` or `operations/host-bridge.js`.

The current exact child origin is the existing GitHub Pages origin, but this branch has NOT been deployed there. Therefore the integration is not mount-ready: do not point a Wix draft at the public Pages path and assume it serves this branch. A supported nonpublic preview/mount must be established and its actual child origin/path explicitly reviewed before configuration. Do not broaden origins, use wildcard targetOrigin, install a service, or publish assets as a workaround.

No Wix page, component, custom embed revision or draft was changed by this build. Existing editor UI was inspected; no direct supported source-code mount was established. The cloud browser denied local-file navigation under its URL policy. No alternate protocol or proxy was used to evade that denial. Desktop browser, all four mobile widths on the full Wix shell, VoiceOver, TalkBack, text zoom and rendered contrast remain untested.

## Measurement boundary

Hooks use Ginger Phase 1B contract 1.0 and are disabled by default. A test harness can supply an explicit pre-entry QA permission; the runtime does not invent consent. No analytics destination, SDK, network sender or pre-consent queue exists. The latest consolidated brief governs the one-second foreground/50%-visible or explicit-action receipt rule. It supersedes the earlier two-second proposal. Example mode is carried as a categorical exclusion. There is no client pilot_activated, account, save, share, email or paid event.

The final Ginger Phase 1B contract and Quinn Phase 1B QA report were read and reconciled. No approved collector or real consent mapping is connected. The visible entry owner and paired recovery operation emitters still require nonpublic integration; reserved names are not completed runtime emission. Only memory-only measurement is implemented. Cross-refresh analytics deduplication is not implemented: do not infer unique visitor or retention rates from these local events.

## Rollback

This work is isolated under `pilot/discovery` on the existing feature branch. Main remains at baseline `fc887fe862b11e42cf53a3d36fcb48887a90418a`. Rollback now requires no production action: leave the branch unmerged.

Before a future nonpublic Wix mount, capture draft page/component JSON or equivalent editor configuration, source version, mount URL and any host snippet revision. Restore only the captured pilot mount and its bridge configuration if needed, preserving unrelated draft work. Use a normal child commit to revert source changes. Do not force-reset main, remove apps, alter collections, dispatch a horoscope job or full-publish Harmony drafts. Public release remains prohibited pending Abby's later decision.
