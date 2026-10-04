# API reference

Applications created in the main-site console automatically receive all available scopes and regions. No extra selection is required. Keys remain constrained by their application scopes; requests outside those scopes return 403. Archive access still requires explicit user consent.

Every game API path starts with /api/open/v1/moenotes/{region}, and region is required: tw, jp, en or kr. Query forms are equivalent, for example /profile?playerProfileId=… or /event/ranking?eventId=1&amp;ranks=1&amp;ranks=100. The OpenAPI document lives at /api/open/openapi.json and a machine-readable catalog at /api/open/catalog.

- [Profiles and favorites](/en/api/profiles) — `moenotes:profiles`: Read one player's public profile, fetch several profiles at once, or list a player's favorites.
- [Profile card images](/en/api/profile-images) — `moenotes:profile-images`: Render one page of a player's profile card as a PNG image.
- [Rankings](/en/api/rankings) — `moenotes:rankings`: Music, event, challenge and arena ranking boards.
- [Top decks](/en/api/decks) — `moenotes:decks`: Deck composition used in event rankings and arena deck trends.
- [Circles](/en/api/circles) — `moenotes:circles`: Look up a circle by id or search circles by name and filters.
- [Gacha rates](/en/api/gacha) — `moenotes:gacha`: Published rates of a gacha pool and its pickup cards.
- [Announcements](/en/api/announcements) — `moenotes:announcements`: In-game announcement list and single announcement details.

## Public event and music rankings {#public-data}

For event, music, and challenge rankings, we recommend using the public service consumed by the main site at https://api.bdon.moe/api/v1. This service is independent of the Passport authentication system: all public endpoints accept unauthenticated GET requests without a clientSecret, and do not consume Passport's 100 requests/minute or 10000 requests/day quota. Please note that public endpoints do not guarantee a fixed refresh interval or arbitrary third-party browser CORS support, nor do they allow unlimited high-frequency polling. Please cache responses locally where appropriate.

[Public event and music rankings](/en/public-data)

## Region differences {#regions}

Region selects the game server, and the same endpoint returns different data for each: tw is the Traditional Chinese server for Hong Kong, Macau and Taiwan, jp is the Japanese server, en is the international (English) server, and kr is the Korean server. A numeric id only means something inside its own region, so always pass the region the account belongs to. Announcements, gacha pools, events, rankings and circles are maintained per region and are not synced, so an id taken from one region is not valid in another.

Never assume the regions return the same shape or the same rows. Build the region into your request URL, cache keys and any id you store, and treat missing data in one region as normal.


[OpenAPI](https://passport.bdon.moe/api/open/openapi.json) · [Catalog](https://passport.bdon.moe/api/open/catalog)
