# Open Platform documentation

Integrate public profiles, rankings, gacha data and authorized gzip archive downloads with the Moenotes API.

[Developer console](https://bdon.moe/en/open-platform) · [Account and save consent](https://bdon.moe/en/account)

## Overview {#overview}

Register an application to receive a client ID and secret immediately. No bot, verification code or review is required.

This platform is not an official game publisher API. Application registration, API key issuance, and key revocation are managed in the developer console on the main site (this static documentation site is for reference only). Applications do not require manual review. Each application may maintain up to two active keys at a time: update and verify your client services with the new key before explicitly revoking the old one.

## Public event and music rankings {#public-data}

For event, music, and challenge rankings, we recommend using the public service consumed by the main site at https://api.bdon.moe/api/v1. This service is independent of the Passport authentication system: all public endpoints accept unauthenticated GET requests without a clientSecret, and do not consume Passport's 100 requests/minute or 10000 requests/day quota. Please note that public endpoints do not guarantee a fixed refresh interval or arbitrary third-party browser CORS support, nor do they allow unlimited high-frequency polling. Please cache responses locally where appropriate.

[Public event and music rankings](/en/public-data)

## Getting started {#stepsTitle}

[Getting started](/en/quickstart) · [Authentication, scopes and regions](/en/guides/auth) · [Archive download](/en/guides/saves) · [Limits and security](/en/guides/limits) · [Error handling](/en/guides/errors)

## API reference {#scopesTitle}

- [Profiles and favorites](/en/api/profiles) — `moenotes:profiles`: Read one player's public profile, fetch several profiles at once, or list a player's favorites.
- [Profile card images](/en/api/profile-images) — `moenotes:profile-images`: Render one page of a player's profile card as a PNG image.
- [Rankings](/en/api/rankings) — `moenotes:rankings`: Music, event, challenge and arena ranking boards.
- [Top decks](/en/api/decks) — `moenotes:decks`: Deck composition used in event rankings and arena deck trends.
- [Circles](/en/api/circles) — `moenotes:circles`: Look up a circle by id or search circles by name and filters.
- [Gacha rates](/en/api/gacha) — `moenotes:gacha`: Published rates of a gacha pool and its pickup cards.
- [Announcements](/en/api/announcements) — `moenotes:announcements`: In-game announcement list and single announcement details.

