# 오픈 플랫폼 API 문서

Moenotes API로 공개 프로필, 순위표, 가챠 정보, 승인된 gzip 저장 데이터를 가져옵니다.

[개발자 콘솔](https://bdon.moe/ko/open-platform) · [계정 및 저장 데이터 승인](https://bdon.moe/ko/account)

## 개요 {#overview}

앱 등록 즉시 clientID와 Secret이 발급됩니다. 봇, 인증 코드, 심사가 필요 없습니다.

본 플랫폼은 게임 개발사의 공식 API가 아닙니다. 애플리케이션 생성 및 API 키 관리(발급/취소)는 메인 사이트 콘솔에서 진행해 주세요(본 정적 문서 사이트는 열람 전용입니다). 애플리케이션 생성 시 별도의 수동 심사 절차는 없습니다. 애플리케이션당 유지 가능한 유효 키는 최대 2개입니다. 키를 교체할 때는 먼저 호출 서비스에 새 키를 적용하여 정상 동작을 확인한 후 기존 키를 명시적으로 취소하세요.

## 공개 이벤트 및 음악 순위표 {#public-data}

이벤트 순위표, 음악 순위표, 챌린지 순위표 등의 데이터를 조회할 때는 메인 사이트에서도 사용 중인 공개 데이터 서비스(https://api.bdon.moe/api/v1)를 우선적으로 이용하는 것을 권장합니다. 이는 Passport 인증 API와는 독립적으로 운영되는 서비스입니다. 요청 시 인증 헤더를 포함하지 않는 일반 GET 요청을 사용해야 하며, clientSecret을 전송해서는 안 됩니다. 해당 엔드포인트에는 Passport의 '분당 100회 / 일일 10,000회' 호출 제한이 적용되지 않지만, 전용 할당량 보장, 고정된 갱신 주기, 외부 브라우저 환경에서의 무제한 CORS 접근을 보장하는 것은 아닙니다. 적절한 캐싱 정책과 호출 빈도를 준수해 주세요.

[공개 이벤트 및 음악 순위표](/ko/public-data)

## 연동 절차 {#stepsTitle}

[연동 절차](/ko/quickstart) · [인증·scope·리전](/ko/guides/auth) · [원본 저장 데이터 다운로드](/ko/guides/saves) · [제한 및 보안](/ko/guides/limits) · [오류 처리](/ko/guides/errors)

## API 레퍼런스 {#scopesTitle}

- [프로필과 즐겨찾기](/ko/api/profiles) — `moenotes:profiles`: 한 플레이어의 공개 프로필, 여러 프로필 일괄 조회, 플레이어 즐겨찾기 목록을 가져옵니다.
- [프로필 카드 이미지](/ko/api/profile-images) — `moenotes:profile-images`: 플레이어 프로필 카드의 한 페이지를 PNG로 렌더링합니다.
- [순위표](/ko/api/rankings) — `moenotes:rankings`: 음악, 이벤트, 챌린지, 아레나 순위표입니다.
- [인기 편성](/ko/api/decks) — `moenotes:decks`: 이벤트 순위표의 편성 구성과 아레나 편성 추이.
- [서클](/ko/api/circles) — `moenotes:circles`: id로 서클을 조회하거나 이름과 조건으로 검색합니다.
- [가챠 확률](/ko/api/gacha) — `moenotes:gacha`: 가챠 풀과 픽업 카드의 공개 확률.
- [공지 사항](/ko/api/announcements) — `moenotes:announcements`: 게임 내 공지 목록과 공지 상세입니다.

