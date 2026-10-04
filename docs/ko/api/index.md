# API 레퍼런스

메인 사이트 콘솔에서 생성한 앱에는 사용 가능한 모든 scope와 지역이 자동으로 부여됩니다. 추가 선택은 필요 없습니다. 키는 앱의 scope로 제한되며 범위를 벗어난 요청은 403을 반환합니다. 저장 데이터 읽기에는 여전히 사용자의 명시적 승인이 필요합니다.

모든 게임 API 경로는 /api/open/v1/moenotes/{region}로 시작하며 region은 필수입니다(tw/jp/en/kr). query 형식은 경로 형식과 동일하며 예로 /profile?playerProfileId=…, /event/ranking?eventId=1&amp;ranks=1&amp;ranks=100이 있습니다. OpenAPI 문서는 /api/open/openapi.json, 기계 판독 카탈로그는 /api/open/catalog에 있습니다.

- [프로필과 즐겨찾기](/ko/api/profiles) — `moenotes:profiles`: 한 플레이어의 공개 프로필, 여러 프로필 일괄 조회, 플레이어 즐겨찾기 목록을 가져옵니다.
- [프로필 카드 이미지](/ko/api/profile-images) — `moenotes:profile-images`: 플레이어 프로필 카드의 한 페이지를 PNG로 렌더링합니다.
- [순위표](/ko/api/rankings) — `moenotes:rankings`: 음악, 이벤트, 챌린지, 아레나 순위표입니다.
- [인기 편성](/ko/api/decks) — `moenotes:decks`: 이벤트 순위표의 편성 구성과 아레나 편성 추이.
- [서클](/ko/api/circles) — `moenotes:circles`: id로 서클을 조회하거나 이름과 조건으로 검색합니다.
- [가챠 확률](/ko/api/gacha) — `moenotes:gacha`: 가챠 풀과 픽업 카드의 공개 확률.
- [공지 사항](/ko/api/announcements) — `moenotes:announcements`: 게임 내 공지 목록과 공지 상세입니다.

## 공개 이벤트 및 음악 순위표 {#public-data}

이벤트 순위표, 음악 순위표, 챌린지 순위표 등의 데이터를 조회할 때는 메인 사이트에서도 사용 중인 공개 데이터 서비스(https://api.bdon.moe/api/v1)를 우선적으로 이용하는 것을 권장합니다. 이는 Passport 인증 API와는 독립적으로 운영되는 서비스입니다. 요청 시 인증 헤더를 포함하지 않는 일반 GET 요청을 사용해야 하며, clientSecret을 전송해서는 안 됩니다. 해당 엔드포인트에는 Passport의 '분당 100회 / 일일 10,000회' 호출 제한이 적용되지 않지만, 전용 할당량 보장, 고정된 갱신 주기, 외부 브라우저 환경에서의 무제한 CORS 접근을 보장하는 것은 아닙니다. 적절한 캐싱 정책과 호출 빈도를 준수해 주세요.

[공개 이벤트 및 음악 순위표](/ko/public-data)

## 리전 차이 {#regions}

region은 게임 서버를 선택하며, 같은 엔드포인트라도 서버마다 반환되는 데이터가 다릅니다. tw는 홍콩·마카오·대만 번체 서버, jp는 일본 서버, en은 국제(영어) 서버, kr은 한국 서버입니다. 숫자 id는 해당 리전 안에서만 의미가 있으므로 항상 계정이 속한 region을 전달하세요. 공지, 가챠, 이벤트, 순위표, 서클은 리전별로 관리되고 동기화되지 않으므로 한 리전의 id는 다른 리전에서 대개 유효하지 않습니다.

리전마다 같은 구조나 같은 데이터가 온다고 가정하지 마세요. region을 요청 URL, 캐시 키, 저장하는 모든 id에 포함하고, 특정 리전에서 데이터가 없는 것을 정상으로 취급하세요.


[OpenAPI](https://passport.bdon.moe/api/open/openapi.json) · [Catalog](https://passport.bdon.moe/api/open/catalog)
