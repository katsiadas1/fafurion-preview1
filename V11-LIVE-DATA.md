# V11A — COUNTER Real GameServer Public Data Integration

V11A is additive: the website remains a working DEMO until a separate private read-only service is installed.
Source of the API lives in the user's **private** repository katsiadas1/fafurion-live
at website-live-api/; do not serve backend source files or any .env in the public webroot.

## Public endpoints and contract
GET /api/public/realm on the same origin l2counter.com returns:
  {ok:true,source:'gameserver-db',asOf:'ISO-8601',online:0,pvp:[],clans:[]}

Only public character fields (class, level, clan, PvP, PK, online, optional
gender and PvP deaths) plus clan name, leader, level, members, online,
reputation and castle. No account names, credentials, IPs, HWID or other
sensitive fields are sent.

## Behavior
- If no backend or the API fails: existing preview remains with a DEMO label.
- If a valid read-only response arrives: Home Online Players, Main PvP Rankings
  and Main Clan Rankings switch to game database records and show LIVE.
- A temporary outage after successful live data retains the last verified snapshot
  with an unavailable/stale label; fictional data are not mixed in.
- Refreshes once per minute, while the private bridge caches for 30 seconds.
- Clicking a real name opens a separate public-stats card using ONLY fields
  included in the DB snapshot; fabricated achievements/hero status are not shown.
- Existing Account, Admin, Events and Siege are still demo modules at V11A.
- Legacy community player.html/clan.html pages remain preview until later stage.

## VPS setup (not automatic)
Read the private website-live-api/README.md and verify Mobius database schema.
Install the private service under /opt (outside nginx webroot), create a
SELECT-only MariaDB user and proxy the path in the l2counter.com nginx server.
Public website deploy: sudo deploy-l2counter
Separate API installation and nginx reload are REQUIRED for LIVE mode.

## Validation
  curl -i https://l2counter.com/api/public/realm
Expected: 200 JSON with source gameserver-db. HTML, 404 or 503 means
the site must remain DEMO. Never put SQL passwords in config.js or portal.js.
