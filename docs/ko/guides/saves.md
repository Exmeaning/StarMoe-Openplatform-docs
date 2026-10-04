# 원본 저장 데이터 다운로드 {#archiveTitle}

JSON이 아닌 원본 gzip 바이트를 반환합니다. .gz 파일로 저장한 뒤 직접 압축을 해제하세요.

[개발자 콘솔](https://bdon.moe/ko/open-platform) · [계정 및 저장 데이터 승인](https://bdon.moe/ko/account)

?invite=clientID가 포함된 링크를 보내세요. 사용자가 로그인 후 업로드한 특정 저장 데이터를 선택하여 명시적으로 승인합니다. 링크를 열기만 해서는 승인되지 않습니다.

[계정 및 저장 데이터 승인](https://bdon.moe/ko/account?invite=CLIENT_ID)

승인된 saveServer/accountID 조합만 다운로드할 수 있습니다. 사용자는 언제든 권한을 취소할 수 있습니다.

`GET /api/open/v1/saves/{saveServer}/{accountID}`

`saves:read`

```sh
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/saves/$SAVE_SERVER/$ACCOUNT_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET" --output save.json.gz
```

## 리전 차이 {#saveServer}

저장 데이터 API는 게임 API의 region을 쓰지 않습니다. saveServer는 intl(국제 서버: 대만, 국제/영어, 한국 포함)과 jp(일본 서버) 두 값뿐이며 tw, en, kr은 없습니다. 어떤 국제 서버에서 업로드한 저장 데이터든 intl에 속하므로, 게임 API에서 쓰는 region이 아니라 계정이 실제로 플레이하는 서버를 기준으로 고르세요.

- `intl`: 국제 서버: 대만, 국제/영어, 한국.
- `jp`: 일본 서버.

## 응답 {#gzip}

API 응답 헤더는 application/gzip 및 Cache-Control: no-store를 포함하며, Content-Encoding: gzip 헤더는 포함되지 않습니다. 이는 일반적인 HTTP 전송 수준 압축이 아닌 파일 본문 자체가 gzip 형식의 바이너리 데이터임을 의미하므로, 클라이언트의 Accept-Encoding 설정에 영향을 받지 않습니다. 연동 시에는 애플리케이션의 Secret과 경로 파라미터인 saveServer 및 accountID만 있으면 되며, 복잡한 사용자 토큰, OAuth 리다이렉션 콜백, Passport 내부 사용자 ID 등은 요구되지 않습니다.

## 오류 처리 {#errors}

API 키에 saves:read 권한이 없는 경우 403 insufficient_scope가 반환됩니다. 사용자가 저장을 승인하지 않았거나, 해당 저장 데이터가 존재하지 않거나, 계정 소유권 상태가 변경된 경우에는 보안을 위해 403이 아닌 404 not_found가 반환됩니다. 저장 파일 크기는 압축 상태 기준 8 MiB, 압축 해제 후 원본 JSON 기준 32 MiB를 상한으로 하며, 이를 초과할 경우 413 페이로드 오류가 발생합니다. 사용자가 승인을 취소하면 취소 시점 이후의 신규 다운로드 요청이 즉시 차단되지만, 이미 진행 중인 전송 세션은 정상 완료될 수 있으며 이미 로컬로 수신된 파일은 회수되지 않습니다.

## 서버 전용 Secret, OAuth 아님 {#securityTitle}

Secret은 서버에만 보관하고 브라우저 코드, URL 또는 공개 저장소에 넣지 마세요. OAuth 인증 코드, 콜백 또는 사용자 액세스 토큰은 발급되지 않습니다. 새 키를 배포한 후 이전 키를 취소하세요.

