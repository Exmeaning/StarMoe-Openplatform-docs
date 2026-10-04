# 元のセーブをダウンロード {#archiveTitle}

JSON ではなく元の gzip バイト列を返します。.gz ファイルとして保存して解凍してください。

[開発者コンソール](https://bdon.moe/ja/open-platform) · [アカウントとセーブ許可](https://bdon.moe/ja/account)

?invite=clientID を含むリンクを送ります。ユーザーがログインし、アップロード済みセーブを選択して許可します。リンクを開くだけでは許可されません。

[アカウントとセーブ許可](https://bdon.moe/ja/account?invite=CLIENT_ID)

許可済みの saveServer/accountID のみダウンロードできます。ユーザーはいつでも許可を取り消せます。

`GET /api/open/v1/saves/{saveServer}/{accountID}`

`saves:read`

```sh
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/saves/$SAVE_SERVER/$ACCOUNT_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET" --output save.json.gz
```

## リージョンごとの違い {#saveServer}

セーブ API はゲーム API の region を使いません。saveServer は intl（国際サーバー。台湾・国際／英語・韓国を含む）と jp（日本サーバー）の2値だけで、tw・en・kr はありません。国際サーバーでアップロードされたセーブはすべて intl に属するため、ゲーム API で使う region ではなく、アカウントが実際にプレイしているサーバーで選んでください。

- `intl`: 国際サーバー：台湾・国際／英語・韓国。
- `jp`: 日本サーバー。

## レスポンス {#gzip}

レスポンスヘッダーには Content-Type: application/gzip および Cache-Control: no-store が含まれ、Content-Encoding: gzip は付与されません。返却データ自体が gzip バイナリファイルであり、HTTP 転送層の圧縮ではないため、リクエストヘッダーの Accept-Encoding によって形式が変わることはありません。開発者はサーバー側で自身の Secret と URL パス内の saveServer/accountID を指定するだけでダウンロードでき、ユーザーアクセストークンや OAuth コールバック、Passport ユーザー ID は不要です。

## エラー処理 {#errors}

セーブデータ API の呼び出し時、キーに saves:read スコープが付与されていない場合は 403 insufficient_scope が返されます。ユーザーの明示的な許可が無い場合やセーブデータが存在しない場合、データの所有権が無効化した場合は 403 ではなく 404 not_found が返されます。アーカイブのファイルサイズには制限があり、gzip 形式で最大 8 MiB、展開後の JSON で最大 32 MiB までとなります（超過時は 413 エラー）。ユーザーが許可を取り消した場合、以降の新規リクエストのみがブロックされます。すでに受付を通過し転送中のダウンロードは完了することがあり、ダウンロード済みのデータは回収できません。

## サーバー専用の Secret・OAuth ではありません {#securityTitle}

Secret はサーバーのみで保管し、ブラウザーのコード、URL、公開リポジトリには含めないでください。OAuth の認可コード、コールバック、ユーザートークンは発行されません。新しいキーの導入後に古いキーを取り消してください。

