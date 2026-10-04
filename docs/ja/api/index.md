# API リファレンス

メインサイトのコンソールで作成したアプリには、利用可能なすべての scope とリージョンが自動で付与されます。追加の選択は不要です。キーはアプリの scope に制限され、その範囲外へのリクエストは 403 になります。セーブの読み取りには引き続きユーザーの明示的な許可が必要です。

ゲーム API のパスはすべて /api/open/v1/moenotes/{region} で始まり、region は必須です（tw / jp / en / kr）。query 形式はパス形式と等価で、例として /profile?playerProfileId=… や /event/ranking?eventId=1&amp;ranks=1&amp;ranks=100 があります。OpenAPI 仕様は /api/open/openapi.json、機械可読カタログは /api/open/catalog にあります。

- [プロフィールとお気に入り](/ja/api/profiles) — `moenotes:profiles`: 1人の公開プロフィール、複数プロフィールの一括取得、プレイヤーのお気に入り一覧を取得します。
- [プロフィールカード画像](/ja/api/profile-images) — `moenotes:profile-images`: プレイヤーのプロフィールカードの1ページを PNG として描画します。
- [ランキング](/ja/api/rankings) — `moenotes:rankings`: 楽曲・イベント・チャレンジ・アリーナのランキング。
- [人気編成](/ja/api/decks) — `moenotes:decks`: イベントランキングの編成構成とアリーナの編成傾向。
- [サークル](/ja/api/circles) — `moenotes:circles`: id でサークルを取得、または名前と条件で検索します。
- [ガチャ確率](/ja/api/gacha) — `moenotes:gacha`: ガチャ池とピックアップカードの公開確率。
- [お知らせ](/ja/api/announcements) — `moenotes:announcements`: ゲーム内お知らせの一覧と詳細。

## 公開イベント・楽曲ランキング {#public-data}

イベントランキング、楽曲ランキング、チャレンジランキングなどのデータを取得する際は、メインサイトでも利用されている公開データサービス（https://api.bdon.moe/api/v1）の利用を推奨します。これは Passport 認証 API とは独立して運用されているサービスです。リクエストには認証ヘッダーを付与せず、通常の GET リクエストで行ってください（clientSecret を送信してはいけません）。このエンドポイントには Passport の「毎分100回／1日10,000回」制限は適用されませんが、専用クォータの保証、固定された更新間隔、および任意の外部ブラウザ環境からの CORS アクセスが保証されているわけではありません。節度あるキャッシュと呼び出し頻度を遵守してください。

[公開イベント・楽曲ランキング](/ja/public-data)

## リージョンごとの違い {#regions}

region はゲームサーバーを選択し、同じエンドポイントでも返るデータは異なります。tw は香港・マカオ・台湾向け繁体字サーバー、jp は日本サーバー、en は国際（英語）サーバー、kr は韓国サーバーです。数字の id は所属するリージョン内でのみ意味を持つため、必ず対象アカウントの region を指定してください。お知らせ、ガチャ、イベント、ランキング、サークルはリージョンごとに管理され同期されないため、あるリージョンの id は別のリージョンでは通常無効です。

リージョン間で同じ形や同じ行が返ると仮定しないでください。region をリクエスト URL、キャッシュキー、保存する id に必ず含め、あるリージョンでデータが無いことを正常な状態として扱ってください。


[OpenAPI](https://passport.bdon.moe/api/open/openapi.json) · [Catalog](https://passport.bdon.moe/api/open/catalog)
