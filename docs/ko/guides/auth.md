# 인증·scope·리전

## Bearer {#authentication}

공개 프로필 API에서 지원하는 region은 tw, jp, en, kr이며, ID는 정밀도 손실 방지를 위해 10진수 문자열로 전달해야 합니다. 모든 요청은 Authorization: Bearer &lt;Secret&gt; 헤더를 포함해야 하며 별도의 clientID 헤더는 요구되지 않습니다. 저장 데이터 다운로드 시에는 saveServer(intl 또는 jp)와 accountID(업로드된 파일 최상위의 _profileId)를 지정해야 하며, saves:read 권한 및 해당 저장 데이터에 대한 사용자의 명시적인 승인이 필수적입니다. 공개 API의 기본 호출 한도는 Passport 사용자 계정 단위로 모든 앱과 API 키에 걸쳐 분당 100회, 일일 10000회로 제한됩니다. 동시 요청 제한은 사용자당 4개, 플랫폼 전체 32개입니다(실제 배포 구성에 따라 세부 수치는 조정될 수 있습니다). 503은 서비스 일시 점검 또는 상위 서비스 장애를 나타냅니다. 오류 응답 구조의 경우 게임 API는 {error:{kind}} 형식을, 저장 데이터 및 플랫폼 관리 API는 {error:string} 형식을 반환합니다.

## scope별 게임 API {#scopesTitle}

메인 사이트 콘솔에서 생성한 앱에는 사용 가능한 모든 scope와 지역이 자동으로 부여됩니다. 추가 선택은 필요 없습니다. 키는 앱의 scope로 제한되며 범위를 벗어난 요청은 403을 반환합니다. 저장 데이터 읽기에는 여전히 사용자의 명시적 승인이 필요합니다.

- [프로필과 즐겨찾기](/ko/api/profiles) — `moenotes:profiles`: 한 플레이어의 공개 프로필, 여러 프로필 일괄 조회, 플레이어 즐겨찾기 목록을 가져옵니다.
- [프로필 카드 이미지](/ko/api/profile-images) — `moenotes:profile-images`: 플레이어 프로필 카드의 한 페이지를 PNG로 렌더링합니다.
- [순위표](/ko/api/rankings) — `moenotes:rankings`: 음악, 이벤트, 챌린지, 아레나 순위표입니다.
- [인기 편성](/ko/api/decks) — `moenotes:decks`: 이벤트 순위표의 편성 구성과 아레나 편성 추이.
- [서클](/ko/api/circles) — `moenotes:circles`: id로 서클을 조회하거나 이름과 조건으로 검색합니다.
- [가챠 확률](/ko/api/gacha) — `moenotes:gacha`: 가챠 풀과 픽업 카드의 공개 확률.
- [공지 사항](/ko/api/announcements) — `moenotes:announcements`: 게임 내 공지 목록과 공지 상세입니다.

`saves:read` — [원본 저장 데이터 다운로드](/ko/guides/saves)

## 리전 차이 {#regions}

모든 게임 API 경로는 /api/open/v1/moenotes/{region}로 시작하며 region은 필수입니다(tw/jp/en/kr). query 형식은 경로 형식과 동일하며 예로 /profile?playerProfileId=…, /event/ranking?eventId=1&amp;ranks=1&amp;ranks=100이 있습니다. OpenAPI 문서는 /api/open/openapi.json, 기계 판독 카탈로그는 /api/open/catalog에 있습니다.

region은 게임 서버를 선택하며, 같은 엔드포인트라도 서버마다 반환되는 데이터가 다릅니다. tw는 홍콩·마카오·대만 번체 서버, jp는 일본 서버, en은 국제(영어) 서버, kr은 한국 서버입니다. 숫자 id는 해당 리전 안에서만 의미가 있으므로 항상 계정이 속한 region을 전달하세요. 공지, 가챠, 이벤트, 순위표, 서클은 리전별로 관리되고 동기화되지 않으므로 한 리전의 id는 다른 리전에서 대개 유효하지 않습니다.

리전마다 같은 구조나 같은 데이터가 온다고 가정하지 마세요. region을 요청 URL, 캐시 키, 저장하는 모든 id에 포함하고, 특정 리전에서 데이터가 없는 것을 정상으로 취급하세요.

## 서버 전용 Secret, OAuth 아님 {#securityTitle}

Secret은 서버에만 보관하고 브라우저 코드, URL 또는 공개 저장소에 넣지 마세요. OAuth 인증 코드, 콜백 또는 사용자 액세스 토큰은 발급되지 않습니다. 새 키를 배포한 후 이전 키를 취소하세요.


```sh
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/jp/profile/$PROFILE_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
