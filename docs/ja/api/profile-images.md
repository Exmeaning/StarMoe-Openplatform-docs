# プロフィールカード画像

**Scope:** `moenotes:profile-images`

プレイヤーのプロフィールカードの1ページを PNG として描画します。

## エンドポイント

以下は完全な API パスの一覧です。呼び出すエンドポイントに応じて必要なパラメータを指定してください。

### `/profile/{profileId}/card/{page}`

```http
GET /api/open/v1/moenotes/{region}/profile/{profileId}/card/{page}
```

| パラメータ | 場所 | 必須 |
| --- | --- | --- |
| `profileId` | `path` | 必須 |
| `page` | `path` | 必須 |

## パラメータ

| パラメータ | 説明 |
| --- | --- |
| `profileId` | 公開 profile ID。プロフィール取得エンドポイントで使用するものと共通です。 |
| `page` | 取得対象のカードページ番号（1 始まりの正の整数）。レスポンスは PNG 画像データ（最大 8 MiB）として返されます。 |

## リージョンごとの違い

4 つのリージョンすべてで利用可能ですが、生成されるカード画像の内容は各リージョンのデータに基づきます。有効なページ数はプレイヤーおよびリージョンによって異なるため、あるリージョンで有効なページ番号が他のリージョンでは範囲外（404）となる場合があります。

## 注意事項

本 API の呼び出しには `Authorization` ヘッダーが必要なため、フロントエンドの `<img>` タグの `src` 属性から直接呼び出すことはできません。必ずバックエンドサーバー経由で取得した画像バイナリを中継・配信し、ページ番号が有効範囲内であるかも事前に検証してください。

API キーが無効または未指定の場合は 401 invalid_api_key、キーに moenotes:profile-images スコープが付与されていない場合は 403 insufficient_scope、対象のプレイヤーまたは指定ページが存在しない場合は 404 not_found、リクエスト頻度・割当制限を超過した場合は 429 が返されます。

## 例

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/profile/$PROFILE_ID/card/1" \
  -H "Authorization: Bearer $CLIENT_SECRET" \
  --output card.png
```
