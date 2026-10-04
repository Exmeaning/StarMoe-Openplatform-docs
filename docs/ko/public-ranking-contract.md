# 공개 응답과 캐시

본 API에서 제공하는 데이터는 게임 서버에 실시간으로 직접 연결된 것이 아니라 사전에 캐싱 및 가공된 스냅샷 데이터입니다. server 파라미터는 리전에 따라 tw, jp, en, kr 중 하나를 지정하며 유효하지 않은 서버를 입력하면 404 오류가 반환됩니다. eventId, profileId 등의 64비트 정수(int64) ID는 정밀도 손실을 방지하기 위해 10진수 문자열 형태로 처리해야 합니다. 공지사항의 일부 상위 필드를 제외하면 타임스탬프는 원칙적으로 Unix 밀리초 단위로 표현됩니다.

## latest {#latest}

latest는 병합 스냅샷입니다. 누락된 순위를 0으로 채우지 마세요. parts마다 fetchedAt이 있고 같은 순위의 여러 행에 dup가 표시될 수 있습니다. stale은 수집 중단 후 남은 과거 성공 결과, frozen은 집계 중 점수 동결을 뜻합니다. X-Server-Time과 updatedAt으로 데이터 나이를 계산하고 nextUpdateAt에 무작위 지연을 더해 폴링하세요.

## music / challenges {#rankings}

음악 순위표는 players 응답 순서를 유지하며 rank 필드가 없습니다. index + 1을 표시 순위로 쓰고 응답 순서에서 왔다고 명시하세요. 점수순으로 다시 정렬하거나 동점 규칙을 추정하지 말고 항상 100행이라고 가정하지 마세요. 빈 객체는 players ?? []로 처리합니다. musicId는 선택한 리전의 음악 카탈로그에 있어야 합니다.

먼저 이벤트의 challenges 카탈로그를 조회한 뒤 일반 musicId가 아닌 challengeMusicId로 요청하세요. ranks, 페이지 구분, 난이도 매개변수는 없습니다. 포인트 순위표가 disabled여도 챌린지 곡까지 중단된 것은 아닙니다. 각 곡의 수집 상태와 시각은 독립적입니다. X-Final-Quality: lastSeen은 마지막 성공 관측일 뿐 확인된 공식 최종 순위가 아니며, 여러 곡의 결과도 같은 시각 스냅샷이 아닙니다.

## ETag / Retry-After {#cache}

ETag와 If-None-Match를 사용해 304를 받고 Cache-Control을 준수하세요. X-Fetched-At은 실제 수집 시각이며 캐시 적중으로 바뀌지 않습니다. X-Stale: 1은 오래된 결과, X-Refreshing: 1은 갱신 대기 또는 진행 중입니다. 503 pending/upstream에는 Retry-After와 지수 백오프를 따르고 고정된 고빈도 재시도를 피하세요.

## 공지 버전 {#announcements}

공지 목록의 category 필터링은 클라이언트에서 합니다. startAt, endAt, lastUpdatedAt은 Unix 초의 10진수 문자열이며 순위표의 밀리초와 다릅니다. rev는 저장된 버전을 선택하며 생략하면 최신을 반환합니다. X-Revision은 버전, X-Listed: 0은 목록에서 내려간 공지를 나타냅니다. 본문은 필터링되지 않은 완전한 HTML이므로 allow-scripts와 allow-same-origin 없는 sandbox iframe에서만 표시하고 메인 DOM에 넣지 마세요.

## tiers / bundle {#curves}

컷라인 추이 엔드포인트(tiers)는 쿼리 파라미터로 tiers, res, from, to, since를 지원합니다. 데이터 해상도 res는 auto, raw, 10m, 1h를 지정할 수 있으며 가장 상세한 raw 해상도의 조회 범위는 최대 6시간입니다. 타임스탬프 t는 기준 시각 base로부터의 밀리초 오프셋을 나타냅니다. 관측되지 않은 구간의 데이터를 임의로 0으로 채우지 마세요. 또한 이벤트 종료 후 생성되는 아카이브 패키지 /bundle/{server}/event/{eventId}/v{n}/은 버전이 지정된 불변(immutable)의 정적 리소스로 제공됩니다.

```json
{"error":{"kind":"pending","message":"..."}}
```

ETag와 If-None-Match를 사용해 304를 받고 Cache-Control을 준수하세요. X-Fetched-At은 실제 수집 시각이며 캐시 적중으로 바뀌지 않습니다. X-Stale: 1은 오래된 결과, X-Refreshing: 1은 갱신 대기 또는 진행 중입니다. 503 pending/upstream에는 Retry-After와 지수 백오프를 따르고 고정된 고빈도 재시도를 피하세요.

[공개 이벤트 및 음악 순위표](/ko/public-data)
