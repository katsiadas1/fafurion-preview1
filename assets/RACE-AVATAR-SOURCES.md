# COUNTER Race Portraits V1

Six Lineage II playable race face portraits (Human, Elf, Dark Elf, Orc, Dwarf, Kamael).

Official NCSOFT/PLAYNC promotional character creation race/face sheet:
- https://lineage2.plaync.com/update/history/2012/121128_lindvior
- https://wstatic-cdn.plaync.com/promo/lineage2/history/2012/lindvior/content4_img2.jpg

For the first preview, the site loads a **single official external image** and shows one cropped
in-game face for each race in Rankings. The original class icons stay in place if the CDN
asset is unavailable. This does not embed or redistribute the source file in GitHub.

**Rights:** Lineage II game art is copyright NCSOFT. Linking to an image is not a
license to redistribute it. Confirm rights/hosting permission before replacing the
external source with a local copy, or supply images for which you have rights.

Rows are Human, Elf, Dark Elf, Orc, Dwarf, Kamael; the last column provides a face
from each row. Race is inferred from each listed 3rd-class name, with optional explicit
race values taking priority. Unknown classes retain their prior icon.

Scope: Rankings PvP table and top-three podium only. Account character cards and
public profiles are intentionally deferred to later phases.

## Public Profiles V2
The same official race sheet is now used by the Rankings public-player modal and the standalone player page, plus the public player cards opened from clan rosters. Existing character-class icons/initials are retained if the CDN image is unavailable. Account Character List remains unchanged for the next phase.

## Account Roster V3

The same six-race character creation face sheet is now used for race portraits on the Account Character List and the character detail modal. This is appearance-only. The existing game data, class graphics, logout/login functions and account operations remain untouched. The three current demo character classes (Duelist, Cardinal and Sagittarius) are all Human, so their portraits correctly match the same race.

## Male/Female V4

The official art sheet actually contains 6 columns per race: three female faces on the
left, three male faces on the right. The gender-aware CSS chooses the middle female
column (20% background position) or the original male column (100%) while using
the same six race rows. No additional images or network requests are needed.

Every gender selection comes from explicit character data. Accepted fields: `gender`,
`sex` (0=male, 1=female) or `isFemale`, with optional `data-gender` on dynamic cards.
No gender is inferred from name or class. Unknown genders retain the V1 race avatar.
In the fictional preview records, Athena and OceanSoul are set to female and
the remaining demo characters are set to male. These are demo metadata only,
not assertions about real players.

Applied to Rankings PvP avatars and podium, the public player modal,
standalone public player cards, Account character roster and character details.
