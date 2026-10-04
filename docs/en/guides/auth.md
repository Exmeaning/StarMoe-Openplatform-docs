# Authentication, scopes and regions

## Bearer {#authentication}

When calling public game endpoints, region must be one of tw, jp, en, or kr, and IDs are formatted as decimal strings. Requests must include the Authorization: Bearer &lt;Secret&gt; header; no clientID header is required. When accessing archives, saveServer must be intl or jp, accountID corresponds to the top-level _profileId in the uploaded save, and the request requires both the saves:read scope and explicit user authorization for that specific save. By default, public API rate limits are shared per Passport account across all applications and keys: 100 requests per minute and 10000 requests per day, with concurrency limits of 4 per user and 32 globally (actual limits may vary by deployment configuration). HTTP 503 indicates that the service or admission gateway is temporarily unavailable. Game endpoints return errors formatted as {error:{kind}}, whereas archive and management endpoints return {error:string}.

## Game API by scope {#scopesTitle}

Applications created in the main-site console automatically receive all available scopes and regions. No extra selection is required. Keys remain constrained by their application scopes; requests outside those scopes return 403. Archive access still requires explicit user consent.

- [Profiles and favorites](/en/api/profiles) — `moenotes:profiles`: Read one player's public profile, fetch several profiles at once, or list a player's favorites.
- [Profile card images](/en/api/profile-images) — `moenotes:profile-images`: Render one page of a player's profile card as a PNG image.
- [Rankings](/en/api/rankings) — `moenotes:rankings`: Music, event, challenge and arena ranking boards.
- [Top decks](/en/api/decks) — `moenotes:decks`: Deck composition used in event rankings and arena deck trends.
- [Circles](/en/api/circles) — `moenotes:circles`: Look up a circle by id or search circles by name and filters.
- [Gacha rates](/en/api/gacha) — `moenotes:gacha`: Published rates of a gacha pool and its pickup cards.
- [Announcements](/en/api/announcements) — `moenotes:announcements`: In-game announcement list and single announcement details.

`saves:read` — [Archive download](/en/guides/saves)

## Region differences {#regions}

Every game API path starts with /api/open/v1/moenotes/{region}, and region is required: tw, jp, en or kr. Query forms are equivalent, for example /profile?playerProfileId=… or /event/ranking?eventId=1&amp;ranks=1&amp;ranks=100. The OpenAPI document lives at /api/open/openapi.json and a machine-readable catalog at /api/open/catalog.

Region selects the game server, and the same endpoint returns different data for each: tw is the Traditional Chinese server for Hong Kong, Macau and Taiwan, jp is the Japanese server, en is the international (English) server, and kr is the Korean server. A numeric id only means something inside its own region, so always pass the region the account belongs to. Announcements, gacha pools, events, rankings and circles are maintained per region and are not synced, so an id taken from one region is not valid in another.

Never assume the regions return the same shape or the same rows. Build the region into your request URL, cache keys and any id you store, and treat missing data in one region as normal.

## Server-side secrets, not OAuth {#securityTitle}

Keep the Secret only on your server, never in browser bundles, URLs or public repositories. This is not an OAuth flow: no authorization code, redirect callback or user access token is issued. Rotate keys by deploying the new secret before revoking the old one.


```sh
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/jp/profile/$PROFILE_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
