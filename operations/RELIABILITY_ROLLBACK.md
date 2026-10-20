# State reliability release

Baseline GitHub main: 587b1c56046f231df1cf844c708e91330bd56e16.
Baseline Wix custom embed: 25ff93fb-a5b2-4729-b49a-8f19bced804f revision 1.

Scope: correct query precedence and consumed pair state, remove implicit pair defaults, synchronize parent history and iframe state, validate public query parameters. Horoscope calculations, CMS content, jobs and identity are unchanged.

Before publishing run `node --test state-regression.test.cjs` and `git diff --check`.

Rollback frontend: restore the seven changed frontend files from the baseline in a new commit; use normal Pages deployment. Do not reset unrelated later work. Keep the test and operation files if useful.

Rollback host: obtain current custom embed revision, then restore the complete original embedData.html from the captured baseline using that revision. Preserve name, enabled flag, position and loadOnce. The baseline broad-forwarding bridge must not be reused for private data.

Verify both deep links, latest selections, Back/Forward, refresh, share and cross-page links after deployment. Compare downloaded public assets with the release source. Do not claim mobile or browser checks from unit checks alone.

## Weekly freshness label and Venus date

The follow-up weekly UI change only labels a stale fallback. It does not generate,
archive or rewrite WeeklyHoroscopes. Restore mtys-live-astrology.js from commit
587b1c56046f231df1cf844c708e91330bd56e16 in a normal child commit to undo it.

Venus Retrogrades row `venus` endDate was conditionally changed from 2026-11-14
to 2026-11-13, derived from the unchanged stationDirect instant in Pacific Time.
Rollback: conditionally patch only endDate back to 2026-11-14 if still 2026-11-13
and stationDirect remains 2026-11-14T00:20:59.850Z. Preserve all other fields.
Full original record is in the operational Phase 0 snapshot, not the public repo.

Tests: node --test state-regression.test.cjs weekly-freshness.test.cjs
These are state and consumer/date-boundary tests, not generator execution tests.
