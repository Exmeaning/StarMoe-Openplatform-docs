# 人気編成

**Scope:** `moenotes:decks`

イベントランキングの編成構成とアリーナの編成傾向。

## エンドポイント

以下は完全な API パスの一覧です。呼び出すエンドポイントに応じて必要なパラメータを指定してください。

### `/arena/deck-trend`

```http
GET /api/open/v1/moenotes/{region}/arena/deck-trend
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `musicId` | `query` | 必須 |
| `arenaSeasonId` | `query` | 必須 |

### `/arena/{arenaSeasonId}/music/{musicId}/deck-trend`

```http
GET /api/open/v1/moenotes/{region}/arena/{arenaSeasonId}/music/{musicId}/deck-trend
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `musicId` | `path` | 必須 |
| `arenaSeasonId` | `path` | 必須 |

### `/event/deck`

```http
GET /api/open/v1/moenotes/{region}/event/deck
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `playerId` | `query` | 必須 |
| `eventId` | `query` | 必須 |

### `/event/{eventId}/deck/{playerId}`

```http
GET /api/open/v1/moenotes/{region}/event/{eventId}/deck/{playerId}
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `playerId` | `path` | 必須 |
| `eventId` | `path` | 必須 |

## パラメータ

| パラメータ | 説明 |
| --- | --- |
| `eventId` | 対象イベントの ID。 |
| `playerId` | 編成を取得する対象プレイヤーのアカウント ID。 |
| `arenaSeasonId` | アリーナシーズン ID。 |
| `musicId` | アリーナ編成傾向の対象楽曲 ID。 |

## リージョンごとの違い

編成データは各リージョンで完全に独立して管理されます。あるリージョンの playerId は他のリージョンでは同一人物を指さず、アリーナシーズンや対象楽曲のスケジュールもリージョンごとに異なります。

## 注意事項

アリーナ編成傾向は指定シーズン・指定楽曲で採用された編成の統計データを返します。個別プレイヤーの特定イベントにおける編成を取得したい場合は、イベント編成エンドポイントを利用してください。

パラメータが不正または未定義の場合は 400 invalid_request、API キーが無効または未指定の場合は 401 invalid_api_key、キーに moenotes:decks スコープが付与されていない場合は 403 insufficient_scope、対象のイベント・シーズン・プレイヤーが存在しない場合は 404 not_found が返されます。

## 例

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/event/$EVENT_ID/deck/$PLAYER_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
