# 認証・スコープ・リージョン

## Bearer {#authentication}

公開 profile を呼び出す際、region は tw/jp/en/kr を指定し、ID は10進数の文字列で渡します。リクエストヘッダーには Authorization: Bearer &lt;Secret&gt; を指定し、clientID ヘッダーは不要です。セーブデータ API を利用する場合、saveServer は intl/jp を指定し、accountID はアップロードしたセーブの最上位にある _profileId を指定します（saves:read スコープおよび対象セーブに対するユーザーの明示的な許可が必要です）。公開 API のレート制限は Passport ユーザー単位（名下の全アプリ・キー間で共有）で管理され、既定値は毎分 100 回、毎日 10000 回、同時実行数はユーザーごと 4 件、全体 32 件です（制限値はデプロイ設定により異なる場合があります）。503 はサービスまたは受付ゲートウェイが一時的に利用不可であることを示します。ゲーム API のエラー形式は {error:{kind}}、セーブおよび管理 API は {error:string} です。

## スコープ別ゲーム API {#scopesTitle}

メインサイトのコンソールで作成したアプリには、利用可能なすべての scope とリージョンが自動で付与されます。追加の選択は不要です。キーはアプリの scope に制限され、その範囲外へのリクエストは 403 になります。セーブの読み取りには引き続きユーザーの明示的な許可が必要です。

- [プロフィールとお気に入り](/ja/api/profiles) — `moenotes:profiles`: 1人の公開プロフィール、複数プロフィールの一括取得、プレイヤーのお気に入り一覧を取得します。
- [プロフィールカード画像](/ja/api/profile-images) — `moenotes:profile-images`: プレイヤーのプロフィールカードの1ページを PNG として描画します。
- [ランキング](/ja/api/rankings) — `moenotes:rankings`: 楽曲・イベント・チャレンジ・アリーナのランキング。
- [人気編成](/ja/api/decks) — `moenotes:decks`: イベントランキングの編成構成とアリーナの編成傾向。
- [サークル](/ja/api/circles) — `moenotes:circles`: id でサークルを取得、または名前と条件で検索します。
- [ガチャ確率](/ja/api/gacha) — `moenotes:gacha`: ガチャ池とピックアップカードの公開確率。
- [お知らせ](/ja/api/announcements) — `moenotes:announcements`: ゲーム内お知らせの一覧と詳細。

`saves:read` — [元のセーブをダウンロード](/ja/guides/saves)

## リージョンごとの違い {#regions}

ゲーム API のパスはすべて /api/open/v1/moenotes/{region} で始まり、region は必須です（tw / jp / en / kr）。query 形式はパス形式と等価で、例として /profile?playerProfileId=… や /event/ranking?eventId=1&amp;ranks=1&amp;ranks=100 があります。OpenAPI 仕様は /api/open/openapi.json、機械可読カタログは /api/open/catalog にあります。

region はゲームサーバーを選択し、同じエンドポイントでも返るデータは異なります。tw は香港・マカオ・台湾向け繁体字サーバー、jp は日本サーバー、en は国際（英語）サーバー、kr は韓国サーバーです。数字の id は所属するリージョン内でのみ意味を持つため、必ず対象アカウントの region を指定してください。お知らせ、ガチャ、イベント、ランキング、サークルはリージョンごとに管理され同期されないため、あるリージョンの id は別のリージョンでは通常無効です。

リージョン間で同じ形や同じ行が返ると仮定しないでください。region をリクエスト URL、キャッシュキー、保存する id に必ず含め、あるリージョンでデータが無いことを正常な状態として扱ってください。

## サーバー専用の Secret・OAuth ではありません {#securityTitle}

Secret はサーバーのみで保管し、ブラウザーのコード、URL、公開リポジトリには含めないでください。OAuth の認可コード、コールバック、ユーザートークンは発行されません。新しいキーの導入後に古いキーを取り消してください。


```sh
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/jp/profile/$PROFILE_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
