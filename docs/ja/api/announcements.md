# お知らせ

**Scope:** `moenotes:announcements`

ゲーム内お知らせの一覧と詳細。

## エンドポイント

以下は完全な API パスの一覧です。呼び出すエンドポイントに応じて必要なパラメータを指定してください。

### `/announcement`

```http
GET /api/open/v1/moenotes/{region}/announcement
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `id` | `query` | 必須 |

### `/announcement/{id}`

```http
GET /api/open/v1/moenotes/{region}/announcement/{id}
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `id` | `path` | 必須 |

### `/announcements`

```http
GET /api/open/v1/moenotes/{region}/announcements
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `selectedTab` | `query` | 任意 |

### `/announcements/{selectedTab}`

```http
GET /api/open/v1/moenotes/{region}/announcements/{selectedTab}
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `selectedTab` | `path` | 必須 |

## パラメータ

| パラメータ | 説明 |
| --- | --- |
| `selectedTab` | お知らせの分類タブ（カテゴリ）。クエリパラメータ形式では任意、パスパラメータ形式では必須です。 |
| `id` | 対象のお知らせ ID。パス形式または ?id= のクエリパラメータ形式で指定します。 |

## リージョンごとの違い

お知らせデータはリージョンごとに独自に配信されており、相互の多言語翻訳関係にはありません。分類タブの構成、お知らせ ID、本文内容のすべてがリージョンごとに独立しているため、あるリージョンで取得したお知らせ ID は他リージョンでは参照できません。

## 注意事項

お知らせの本文データには生の HTML 文字列が含まれています。XSS 等の脆弱性を防ぐため、描画前に適切なサニタイズ処理を施すか、sandbox 属性を付与した iframe 経由で描画し、メインの DOM ツリーにそのまま挿入することは避けてください。

パラメータが不正または未定義の場合は 400 invalid_request、API キーが無効または未指定の場合は 401 invalid_api_key、キーに moenotes:announcements スコープが付与されていない場合は 403 insufficient_scope、対象のお知らせが存在しない場合は 404 not_found が返されます。

## 例

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/announcement/$ANNOUNCEMENT_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
