# ランキング

**Scope:** `moenotes:rankings`

楽曲・イベント・チャレンジ・アリーナのランキング。

::: tip
イベントのボーダー・楽曲ランキング・チャレンジランキングには、秘密鍵不要の[公開データ API](../public-data)を優先してください。収集済みのスナップショットであり、Passport とは別の制限が適用されます。
:::

## エンドポイント

以下は完全な API パスの一覧です。呼び出すエンドポイントに応じて必要なパラメータを指定してください。

### `/arena/ranking`

```http
GET /api/open/v1/moenotes/{region}/arena/ranking
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `arenaSeasonId` | `query` | 必須 |
| `bandId` | `query` | 任意 |
| `rankingStart` | `query` | 必須 |
| `rankingEnd` | `query` | 必須 |

### `/arena/{arenaSeasonId}/ranking/{rankingStart}/{rankingEnd}`

```http
GET /api/open/v1/moenotes/{region}/arena/{arenaSeasonId}/ranking/{rankingStart}/{rankingEnd}
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `arenaSeasonId` | `path` | 必須 |
| `bandId` | `query` | 任意 |
| `rankingStart` | `path` | 必須 |
| `rankingEnd` | `path` | 必須 |

### `/arena/{arenaSeasonId}/ranking/{rankingStart}/{rankingEnd}/band/{bandId}`

```http
GET /api/open/v1/moenotes/{region}/arena/{arenaSeasonId}/ranking/{rankingStart}/{rankingEnd}/band/{bandId}
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `arenaSeasonId` | `path` | 必須 |
| `bandId` | `path` | 必須 |
| `rankingStart` | `path` | 必須 |
| `rankingEnd` | `path` | 必須 |

### `/event/challenge-ranking`

```http
GET /api/open/v1/moenotes/{region}/event/challenge-ranking
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `challengeMusicId` | `query` | 必須 |

### `/event/challenge/{challengeMusicId}/ranking`

```http
GET /api/open/v1/moenotes/{region}/event/challenge/{challengeMusicId}/ranking
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `challengeMusicId` | `path` | 必須 |

### `/event/ranking`

```http
GET /api/open/v1/moenotes/{region}/event/ranking
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `eventId` | `query` | 必須 |
| `ranks` | `query` | 必須 |

### `/event/{eventId}/ranking/{ranks}`

```http
GET /api/open/v1/moenotes/{region}/event/{eventId}/ranking/{ranks}
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `eventId` | `path` | 必須 |
| `ranks` | `path` | 必須 |

### `/music/ranking`

```http
GET /api/open/v1/moenotes/{region}/music/ranking
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `musicId` | `query` | 必須 |

### `/music/{musicId}/ranking`

```http
GET /api/open/v1/moenotes/{region}/music/{musicId}/ranking
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `musicId` | `path` | 必須 |

## パラメータ

| パラメータ | 説明 |
| --- | --- |
| `musicId` | 楽曲ランキングまたはアリーナ編成傾向の対象楽曲 ID。 |
| `eventId` | イベントランキングおよびイベント編成の対象イベント ID。 |
| `ranks` | 順位範囲（1 始まり・両端を含む）。クエリパラメータで複数回指定する形式（?ranks=1&amp;ranks=100）またはパス形式で指定します。 |
| `challengeMusicId` | チャレンジイベント楽曲 ID。通常の楽曲 ID とは異なります。 |
| `arenaSeasonId` | アリーナシーズン ID。 |
| `rankingStart` | アリーナランキング取得範囲の開始順位（1 始まり）。 |
| `rankingEnd` | アリーナランキング取得範囲の終了順位。 |
| `bandId` | アリーナランキングのバンド絞り込み（任意）。パス形式では /band/{bandId} を付与します。 |

## リージョンごとの違い

各リージョンでイベントの開催スケジュールや進行状況が異なるため、リージョン間でランキングデータを直接比較することはできません。あるリージョンで有効な eventId や arenaSeasonId は他のリージョンでは存在しないか別イベントを指し、楽曲 ID の体系もリージョンごとに異なります。

## 注意事項

順位範囲は 1 始まりの両端を含む閉区間であり、必須指定となります。キャッシュヒット率を高め負荷を抑えるため、適切な範囲を指定してください。

順位範囲の指定ミスや未定義パラメータの指定時は 400 invalid_request、API キーが無効または未指定の場合は 401 invalid_api_key、キーに moenotes:rankings スコープが付与されていない場合は 403 insufficient_scope、対象のランキングボードが存在しない場合は 404 not_found、リクエスト制限超過時は 429 が返されます。

## 例

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/event/ranking?eventId=$EVENT_ID&ranks=1&ranks=100" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
