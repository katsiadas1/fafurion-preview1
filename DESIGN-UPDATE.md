# Counter reference homepage — 28 September 2026

- New hero composition based on the supplied reference: silver Lineage II Counter on the left, blue dragon on the right, storm sea, three functional HTML actions.
- Existing navigation, notifications, four languages, account/admin sections and demo behavior retained.
- Shared CSS and reveal animations added to portal, Info, Download, player and clan pages. Reduced-motion users receive no new movement; content remains visible if JavaScript or IntersectionObserver is unavailable.
- Narrow screens show the dragon with an accessible HTML heading and vertically stacked actions.

Asset: `assets/counter-storm-reference.webp`. Created with the built-in image generation editor from the supplied reference, then encoded to WebP for delivery. Prompt: preserve dragon, sea, castles, lightning and silver LINEAGE II COUNTER lettering; remove navigation and button UI; restore scenery behind them; keep a 16:9 composition. The result follows the reference rather than claiming pixel-identical imagery.

Validation: JavaScript syntax; DOM checks for three actions, four languages, five routes, ten account sections, eleven admin sections and asset references. Visual browser QA could not be completed because the local browser installation download failed. No live DB/payment changes were made.

VPS deployment follows the existing setup: run `sudo deploy-l2counter` on the VPS. Updating GitHub does not itself prove the VPS has pulled the new commit.
