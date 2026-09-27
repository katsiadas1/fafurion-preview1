# Fafurion — multilingual website and complete preview portal

This is the existing `fafurion-realm` Sites project. `.openai/hosting.json` selects the `dist` directory; no dependency installation, database or build step is required.

## Complete preview restoration

The portal was restored from `katsiadas1/fafurion-preview1`, commit `d23bd8d0bfab5e572241881647c98c13eb6ebbc3`, the complete implementation associated with the earlier multilingual panel work. Its 91 named JavaScript functions, original interface, high-resolution background assets and four language dictionaries were retained. Inline source was split into `dist/portal.css` and `dist/portal.js`.

The complete account has ten sections:

- Dashboard, characters, clan, events and Daily Wheel.
- Rewards, wallet, security, support and settings.

The complete admin has eleven sections:

- Overview, players, donations, support, content and Wheel Manager.
- Moderation, economy, staff and roles, server and audit logs.

Other restored features include notifications, daily/vote/referral rewards, promo codes, badges, activity records, launcher controls, combat statistics, public player profiles and public clan profiles with member links.

## Navigation and languages

`dist/portal-bridge.js` adds stable hash routes and browser history while retaining the original portal behavior:

- `index.html#account/dashboard`
- `index.html#account/wheel`
- `index.html#admin/overview`
- `index.html#admin/wheel`
- `index.html#rankings/pvp`
- `index.html#rankings/clans`

Use `?lang=en`, `?lang=el`, `?lang=pt` or `?lang=ru` before the hash to select English, Greek, Brazilian Portuguese or Russian. The preference is shared with the retained Info, Download and legacy community pages. Flag images are local SVG assets.

Admin is available in the desktop navigation and among the first mobile tabs. `admin.html`, `account.html`, `rankings.html` and the older `panel-preview` URLs redirect to their corresponding full portal sections. `portal-bridge.css` supplies keyboard focus outlines and mobile navigation touch targets.

## Demo behavior

This is a browser-based preview, not production authentication, staff authorization, payments or a game-server connection. The complete portal opens the original DemoAccount directly. The old demo login is no longer required to explore the restored account or admin.

The Daily Wheel refuses online demo characters, records one spin per browser-local day, and stores its editable reward configuration locally. Wheel probabilities must total 100% before saving. Rewards, donations, wallet delivery, security actions, support, moderation and staff controls retain their original demo behavior. No real character, payment or account is changed.

Production use would require a backend that verifies authentication, roles, reward eligibility, delivery and privacy. Local preferences and demo controls must not be used as security boundaries.

## Retained auxiliary pages

`info.html` and `download.html` retain the earlier Site's content and shared auxiliary scripts. Configure actual download URLs in `dist/config.js`. Existing server settings are proposed preview values, not verified game-server configuration. Older `player.html` and `clan.html` links continue to serve their original fictional community records; the complete portal has the profiles from the recovered implementation.

## Verification

The restored portal passed 45 DOM-based checks covering all ten account sections and eleven admin sections, desktop/mobile Admin navigation, the four translation dictionaries, deep links/history, character and public profile modals, player filtering, wheel probability validation, online-character blocking, a complete offline spin, the daily limit, reward claiming, security/support demos, notifications, duplicate IDs and local asset references. All JavaScript files passed syntax checks.

DOM verification does not replace visual browser QA. A compatible managed browser preview was unavailable for this buildless checkout. No game-server or payment integration was tested or claimed.

## Home and rankings presentation

The home route uses the original pre-migration `dragon-selected.webp` landing scene, with its gold call-to-action buttons and four-language copy. The complete account and admin remain in the portal. `dist/home-rankings.css` isolates the restored Home and the redesigned ranking tables from the other sections.

Ranking tabs are 76px tall on desktop and at least 80px on narrow screens, with 18px/16px labels, visible selected states and keyboard arrow navigation. Leaderboards use larger names, avatars, row spacing and podium cards. The tables retain keyboard-accessible horizontal scrolling on mobile and links to the existing public profiles. DOM checks verified Home translations, tab state/keyboard changes, profile links and account/admin navigation; no visual browser QA was available.

## Shared readability and heraldry theme

`realm-theme.css` unifies the portal and auxiliary public pages with dark-blue surfaces, cyan navigation, gold primary actions, larger text, roomier cards and 44px controls. Tiny type in the original styles has been normalized to rem units with a 12px metadata floor and larger regular labels. Responsive grids, modal scrolling and table overflow accommodate the new scale.

`realm-theme.js` replaces character initials with role icons and gives the five demo clans individual crests. Gold, silver and bronze trophy emblems identify the top three players and clans. The icons reuse the existing Font Awesome Free font in `panel-preview/assets/webfonts`; they are themed UI icons, not official Lineage II class artwork. Profile decoration updates when changing characters/clans and preserves the original demo actions. All icon codepoints were checked against the bundled font. DOM checks covered dynamic profiles, ranking emblems, the four languages, all account/admin sections and representative mobile text sizes. No visual browser QA was available.
