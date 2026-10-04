# ガチャ確率

**Scope:** `moenotes:gacha`

ガチャ池とピックアップカードの公開確率。

## エンドポイント

以下は完全な API パスの一覧です。呼び出すエンドポイントに応じて必要なパラメータを指定してください。

### `/gacha/rates`

```http
GET /api/open/v1/moenotes/{region}/gacha/rates
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `gachaId` | `query` | 必須 |
| `productId` | `query` | 任意 |
| `selectedPickUp` | `query` | 任意 |

### `/gacha/{gachaId}/rates`

```http
GET /api/open/v1/moenotes/{region}/gacha/{gachaId}/rates
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `gachaId` | `path` | 必須 |
| `productId` | `query` | 任意 |
| `selectedPickUp` | `query` | 任意 |

### `/gacha/{gachaId}/rates/{selectedPickUp}`

```http
GET /api/open/v1/moenotes/{region}/gacha/{gachaId}/rates/{selectedPickUp}
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `gachaId` | `path` | 必須 |
| `productId` | `query` | 任意 |
| `selectedPickUp` | `path` | 必須 |

## パラメータ

| パラメータ | 説明 |
| --- | --- |
| `gachaId` | 対象のガチャ筐体（ガチャプール）ID。省略して現在開催中のプールを自動返却する機能はありません。 |
| `selectedPickUp` | ピックアップカードのインデックス番号。クエリパラメータでは任意、パスパラメータ形式では必須です。 |
| `productId` | 確率表を絞り込むための商品 ID（任意）。 |

## リージョンごとの違い

ガチャの開催日程やラインナップはリージョンごとに異なります。そのため、gachaId は必ず照会対象のリージョンに属するものを指定してください。排出確率やピックアップの構成内容もリージョンごとに独立しています。

## 注意事項

gachaId は必須パラメータです。パラメータを省略して現在開催中のガチャを自動取得するようなフォールバック動作は行われません。

必須パラメータの欠落や未定義パラメータの指定時は 400 invalid_request、API キーが無効または未指定の場合は 401 invalid_api_key、キーに moenotes:gacha スコープが付与されていない場合は 403 insufficient_scope、対象のガチャプールが存在しない場合は 404 not_found が返されます。

## 例

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/gacha/rates?gachaId=$GACHA_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
