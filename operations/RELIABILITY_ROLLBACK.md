# State reliability release

Baseline GitHub main: 587b1c56046f231df1cf844c708e91330bd56e16.
Baseline Wix custom embed: 25ff93fb-a5b2-4729-b49a-8f19bced804f revision 1.

Scope: correct query precedence and consumed pair state, remove implicit pair defaults, synchronize parent history and iframe state, validate public query parameters. Horoscope calculations, CMS content, jobs and identity are unchanged.

Before publishing run `node --test state-regression.test.cjs` and `git diff --check`.

Rollback frontend: restore the seven changed frontend files from the baseline in a new commit; use normal Pages deployment. Do not reset unrelated later work. Keep the test and operation files if useful.

Rollback host: obtain current custom embed revision, then restore the complete original embedData.html from the captured baseline using that revision. Preserve name, enabled flag, position and loadOnce. The baseline broad-forwarding bridge must not be reused for private data.

Verify both deep links, latest selections, Back/Forward, refresh, share and cross-page links after deployment. Compare downloaded public assets with the release source. Do not claim mobile or browser checks from unit checks alone.
