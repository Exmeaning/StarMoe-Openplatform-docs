# 공개 이벤트 및 음악 순위표

이벤트 순위표, 음악 순위표, 챌린지 순위표 등의 데이터를 조회할 때는 메인 사이트에서도 사용 중인 공개 데이터 서비스(https://api.bdon.moe/api/v1)를 우선적으로 이용하는 것을 권장합니다. 이는 Passport 인증 API와는 독립적으로 운영되는 서비스입니다. 요청 시 인증 헤더를 포함하지 않는 일반 GET 요청을 사용해야 하며, clientSecret을 전송해서는 안 됩니다. 해당 엔드포인트에는 Passport의 '분당 100회 / 일일 10,000회' 호출 제한이 적용되지 않지만, 전용 할당량 보장, 고정된 갱신 주기, 외부 브라우저 환경에서의 무제한 CORS 접근을 보장하는 것은 아닙니다. 적절한 캐싱 정책과 호출 빈도를 준수해 주세요.

본 API에서 제공하는 데이터는 게임 서버에 실시간으로 직접 연결된 것이 아니라 사전에 캐싱 및 가공된 스냅샷 데이터입니다. server 파라미터는 리전에 따라 tw, jp, en, kr 중 하나를 지정하며 유효하지 않은 서버를 입력하면 404 오류가 반환됩니다. eventId, profileId 등의 64비트 정수(int64) ID는 정밀도 손실을 방지하기 위해 10진수 문자열 형태로 처리해야 합니다. 공지사항의 일부 상위 필드를 제외하면 타임스탬프는 원칙적으로 Unix 밀리초 단위로 표현됩니다.

`https://api.bdon.moe/api/v1`

## 엔드포인트 {#routes}

```http
GET /api/v1/{server}/music/{musicId}/ranking
GET /api/v1/{server}/events
GET /api/v1/{server}/events/current
GET /api/v1/{server}/events/{eventId}
GET /api/v1/{server}/events/{eventId}/latest
GET /api/v1/{server}/events/{eventId}/challenges
GET /api/v1/{server}/events/{eventId}/challenges/{challengeMusicId}/ranking
GET /api/v1/{server}/announcements
GET /api/v1/{server}/announcements/{id}?rev={lastUpdatedAt}
GET /api/v1/{server}/announcements/{id}/revisions
GET /api/v1/{server}/ranking/profile/{profileId}/card/{page}
```

```sh
curl --fail-with-body "https://api.bdon.moe/api/v1/jp/events/current"
curl --fail-with-body "https://api.bdon.moe/api/v1/jp/events/$EVENT_ID/latest"
curl --fail-with-body "https://api.bdon.moe/api/v1/jp/events/$EVENT_ID/challenges/$CHALLENGE_MUSIC_ID/ranking"
```

## latest {#latest}

latest는 병합 스냅샷입니다. 누락된 순위를 0으로 채우지 마세요. parts마다 fetchedAt이 있고 같은 순위의 여러 행에 dup가 표시될 수 있습니다. stale은 수집 중단 후 남은 과거 성공 결과, frozen은 집계 중 점수 동결을 뜻합니다. X-Server-Time과 updatedAt으로 데이터 나이를 계산하고 nextUpdateAt에 무작위 지연을 더해 폴링하세요.

## music {#music}

음악 순위표는 players 응답 순서를 유지하며 rank 필드가 없습니다. index + 1을 표시 순위로 쓰고 응답 순서에서 왔다고 명시하세요. 점수순으로 다시 정렬하거나 동점 규칙을 추정하지 말고 항상 100행이라고 가정하지 마세요. 빈 객체는 players ?? []로 처리합니다. musicId는 선택한 리전의 음악 카탈로그에 있어야 합니다.

## challenges {#challenges}

먼저 이벤트의 challenges 카탈로그를 조회한 뒤 일반 musicId가 아닌 challengeMusicId로 요청하세요. ranks, 페이지 구분, 난이도 매개변수는 없습니다. 포인트 순위표가 disabled여도 챌린지 곡까지 중단된 것은 아닙니다. 각 곡의 수집 상태와 시각은 독립적입니다. X-Final-Quality: lastSeen은 마지막 성공 관측일 뿐 확인된 공식 최종 순위가 아니며, 여러 곡의 결과도 같은 시각 스냅샷이 아닙니다.

## 공지 버전 {#announcements}

공지 목록의 category 필터링은 클라이언트에서 합니다. startAt, endAt, lastUpdatedAt은 Unix 초의 10진수 문자열이며 순위표의 밀리초와 다릅니다. rev는 저장된 버전을 선택하며 생략하면 최신을 반환합니다. X-Revision은 버전, X-Listed: 0은 목록에서 내려간 공지를 나타냅니다. 본문은 필터링되지 않은 완전한 HTML이므로 allow-scripts와 allow-same-origin 없는 sandbox iframe에서만 표시하고 메인 DOM에 넣지 마세요.

## 공개 응답과 캐시 {#cache}

ETag와 If-None-Match를 사용해 304를 받고 Cache-Control을 준수하세요. X-Fetched-At은 실제 수집 시각이며 캐시 적중으로 바뀌지 않습니다. X-Stale: 1은 오래된 결과, X-Refreshing: 1은 갱신 대기 또는 진행 중입니다. 503 pending/upstream에는 Retry-After와 지수 백오프를 따르고 고정된 고빈도 재시도를 피하세요.

[공개 응답과 캐시](/ko/public-ranking-contract)

