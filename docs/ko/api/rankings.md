# 순위표

**Scope:** `moenotes:rankings`

음악, 이벤트, 챌린지, 아레나 순위표입니다.

::: tip
이벤트 컷라인, 음악 순위표, 챌린지 순위표 등의 데이터를 조회할 때는 API 키 인증이 필요 없는 [공개 데이터 API](../public-data)를 우선적으로 이용하는 것을 권장합니다. 이는 사전에 수집 및 캐싱된 스냅샷이며 Passport와는 별도의 요청 제한이 적용됩니다.
:::

## 엔드포인트

다음은 전체 API 경로 목록입니다. 호출하려는 엔드포인트에 맞춰 필요한 매개변수를 전달하세요.

### `/arena/ranking`

```http
GET /api/open/v1/moenotes/{region}/arena/ranking
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `arenaSeasonId` | `query` | 필수 |
| `bandId` | `query` | 선택 |
| `rankingStart` | `query` | 필수 |
| `rankingEnd` | `query` | 필수 |

### `/arena/{arenaSeasonId}/ranking/{rankingStart}/{rankingEnd}`

```http
GET /api/open/v1/moenotes/{region}/arena/{arenaSeasonId}/ranking/{rankingStart}/{rankingEnd}
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `arenaSeasonId` | `path` | 필수 |
| `bandId` | `query` | 선택 |
| `rankingStart` | `path` | 필수 |
| `rankingEnd` | `path` | 필수 |

### `/arena/{arenaSeasonId}/ranking/{rankingStart}/{rankingEnd}/band/{bandId}`

```http
GET /api/open/v1/moenotes/{region}/arena/{arenaSeasonId}/ranking/{rankingStart}/{rankingEnd}/band/{bandId}
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `arenaSeasonId` | `path` | 필수 |
| `bandId` | `path` | 필수 |
| `rankingStart` | `path` | 필수 |
| `rankingEnd` | `path` | 필수 |

### `/event/challenge-ranking`

```http
GET /api/open/v1/moenotes/{region}/event/challenge-ranking
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `challengeMusicId` | `query` | 필수 |

### `/event/challenge/{challengeMusicId}/ranking`

```http
GET /api/open/v1/moenotes/{region}/event/challenge/{challengeMusicId}/ranking
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `challengeMusicId` | `path` | 필수 |

### `/event/ranking`

```http
GET /api/open/v1/moenotes/{region}/event/ranking
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `eventId` | `query` | 필수 |
| `ranks` | `query` | 필수 |

### `/event/{eventId}/ranking/{ranks}`

```http
GET /api/open/v1/moenotes/{region}/event/{eventId}/ranking/{ranks}
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `eventId` | `path` | 필수 |
| `ranks` | `path` | 필수 |

### `/music/ranking`

```http
GET /api/open/v1/moenotes/{region}/music/ranking
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `musicId` | `query` | 필수 |

### `/music/{musicId}/ranking`

```http
GET /api/open/v1/moenotes/{region}/music/{musicId}/ranking
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `musicId` | `path` | 필수 |

## 매개변수

| 매개변수 | 설명 |
| --- | --- |
| `musicId` | 음악 순위표 또는 아레나 편성 추이 조회를 위한 곡 ID입니다. |
| `eventId` | 이벤트 순위표 및 이벤트 편성 조회의 대상 이벤트 ID입니다. |
| `ranks` | 순위 범위(1부터 시작하는 양 끝 포함 폐구간). 쿼리 파라미터를 반복 지정(?ranks=1&amp;ranks=100)하거나 경로 형식으로 전달합니다. |
| `challengeMusicId` | 챌린지 이벤트 전용 곡 ID(일반 곡 ID와 구별됨). |
| `arenaSeasonId` | 아레나 시즌 ID입니다. |
| `rankingStart` | 아레나 순위 범위의 시작 순위(1부터 시작). |
| `rankingEnd` | 아레나 순위 범위의 종료 순위. |
| `bandId` | 아레나 순위표의 밴드 필터(선택 사항). 경로 형식에서는 /band/{bandId}를 덧붙입니다. |

## 리전 차이

각 리전의 이벤트 진행 일정과 주기가 상이하므로 리전 간에 순위표 데이터를 직접 비교할 수 없습니다. 특정 리전에서 유효한 eventId나 arenaSeasonId는 다른 리전에서 존재하지 않거나 다른 이벤트를 가리키며, 곡 ID 체계 또한 리전마다 다릅니다.

## 주의 사항

순위 범위는 1부터 시작하여 양 끝을 포함하는 폐구간이며 필수 입력 항목입니다. 캐시 적중률을 높이고 시스템 부하를 방지하기 위해 항상 명시적으로 범위를 지정하세요.

순위 범위 지정 오류 또는 미정의 매개변수 전달 시 400 invalid_request, API 키 누락 또는 유효하지 않은 경우 401 invalid_api_key, moenotes:rankings 권한이 없으면 403 insufficient_scope, 대상 순위표가 존재하지 않으면 404 not_found, 호출 제한 초과 시 429 오류가 반환됩니다.

## 예시

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/event/ranking?eventId=$EVENT_ID&ranks=1&ranks=100" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
