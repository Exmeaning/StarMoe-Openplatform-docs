# 연동 절차 {#stepsTitle}

[개발자 콘솔](https://bdon.moe/ko/open-platform) · [계정 및 저장 데이터 승인](https://bdon.moe/ko/account)

본 플랫폼은 게임 개발사의 공식 API가 아닙니다. 애플리케이션 생성 및 API 키 관리(발급/취소)는 메인 사이트 콘솔에서 진행해 주세요(본 정적 문서 사이트는 열람 전용입니다). 애플리케이션 생성 시 별도의 수동 심사 절차는 없습니다. 애플리케이션당 유지 가능한 유효 키는 최대 2개입니다. 키를 교체할 때는 먼저 호출 서비스에 새 키를 적용하여 정상 동작을 확인한 후 기존 키를 명시적으로 취소하세요.

1. 로그인 후 콘솔에 앱 이름을 입력하여 생성하세요. 사용 가능한 모든 권한과 지역이 자동으로 활성화되므로 별도 선택이 필요 없습니다. clientID와 한 번만 표시되는 Secret을 저장하세요.
2. 서버에서 Secret으로 공개 게임 API를 호출하세요. 공개 프로필에는 저장 데이터 승인이 필요하지 않습니다.

```sh
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/jp/profile/$PROFILE_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```

3. ?invite=clientID가 포함된 링크를 보내세요. 사용자가 로그인 후 업로드한 특정 저장 데이터를 선택하여 명시적으로 승인합니다. 링크를 열기만 해서는 승인되지 않습니다.

[계정 및 저장 데이터 승인](https://bdon.moe/ko/account?invite=CLIENT_ID)

4. 승인된 saveServer/accountID 조합만 다운로드할 수 있습니다. 사용자는 언제든 권한을 취소할 수 있습니다.

```sh
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/saves/$SAVE_SERVER/$ACCOUNT_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET" --output save.json.gz
```

## 서버 전용 Secret, OAuth 아님 {#securityTitle}

Secret은 서버에만 보관하고 브라우저 코드, URL 또는 공개 저장소에 넣지 마세요. OAuth 인증 코드, 콜백 또는 사용자 액세스 토큰은 발급되지 않습니다. 새 키를 배포한 후 이전 키를 취소하세요.

## 공개 이벤트 및 음악 순위표 {#public-data}

이벤트 순위표, 음악 순위표, 챌린지 순위표 등의 데이터를 조회할 때는 메인 사이트에서도 사용 중인 공개 데이터 서비스(https://api.bdon.moe/api/v1)를 우선적으로 이용하는 것을 권장합니다. 이는 Passport 인증 API와는 독립적으로 운영되는 서비스입니다. 요청 시 인증 헤더를 포함하지 않는 일반 GET 요청을 사용해야 하며, clientSecret을 전송해서는 안 됩니다. 해당 엔드포인트에는 Passport의 '분당 100회 / 일일 10,000회' 호출 제한이 적용되지 않지만, 전용 할당량 보장, 고정된 갱신 주기, 외부 브라우저 환경에서의 무제한 CORS 접근을 보장하는 것은 아닙니다. 적절한 캐싱 정책과 호출 빈도를 준수해 주세요.

[공개 이벤트 및 음악 순위표](/ko/public-data)

