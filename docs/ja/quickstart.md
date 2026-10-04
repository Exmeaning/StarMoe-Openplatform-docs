# 導入手順 {#stepsTitle}

[開発者コンソール](https://bdon.moe/ja/open-platform) · [アカウントとセーブ許可](https://bdon.moe/ja/account)

本プラットフォームはゲーム運営会社の公式 API ではありません。アプリの作成や API キーの管理（発行・失効）はメインサイトのコンソールで行ってください（本静的ドキュメントサイトは閲覧専用です）。アプリの作成に手動審査は不要です。各アプリで保持できる有効なキーは最大2つまでです。キーのローテーションを行う際は、先にクライアント側を新しいキーへ切り替えて動作確認した上で、古いキーを明示的に失効させてください。

1. ログイン後、コンソールにアプリ名を入力して作成します。利用可能なすべての権限とリージョンが自動で有効になり、選択は不要です。clientID と一度だけ表示される Secret を保存してください。
2. サーバーから Secret で公開ゲーム API を呼び出します。公開プロフィールにセーブの許可は不要です。

```sh
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/jp/profile/$PROFILE_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```

3. ?invite=clientID を含むリンクを送ります。ユーザーがログインし、アップロード済みセーブを選択して許可します。リンクを開くだけでは許可されません。

[アカウントとセーブ許可](https://bdon.moe/ja/account?invite=CLIENT_ID)

4. 許可済みの saveServer/accountID のみダウンロードできます。ユーザーはいつでも許可を取り消せます。

```sh
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/saves/$SAVE_SERVER/$ACCOUNT_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET" --output save.json.gz
```

## サーバー専用の Secret・OAuth ではありません {#securityTitle}

Secret はサーバーのみで保管し、ブラウザーのコード、URL、公開リポジトリには含めないでください。OAuth の認可コード、コールバック、ユーザートークンは発行されません。新しいキーの導入後に古いキーを取り消してください。

## 公開イベント・楽曲ランキング {#public-data}

イベント・楽曲・チャレンジランキングのデータ取得には、メインサイトでも利用されている公開サービス https://api.bdon.moe/api/v1 の利用を推奨します。本サービスは Passport 認証システムから独立しており、すべての公開エンドポイントは認証情報なし（clientSecret 不要）の GET リクエストを受け付けます。Passport の毎分 100 回 / 毎日 10000 回の制限も消費しません。なお、公開サービスでは固定の更新間隔やサードパーティ製ブラウザ向けの CORS 対応は保証されておらず、無制限のリクエストを許容するものでもありません。適切な頻度で呼び出し、ローカルキャッシュを活用してください。

[公開イベント・楽曲ランキング](/ja/public-data)

