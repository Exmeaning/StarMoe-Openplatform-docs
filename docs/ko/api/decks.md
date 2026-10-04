# 인기 편성

**Scope:** `moenotes:decks`

이벤트 순위표의 편성 구성과 아레나 편성 추이.

## 엔드포인트

다음은 전체 API 경로 목록입니다. 호출하려는 엔드포인트에 맞춰 필요한 매개변수를 전달하세요.

### `/arena/deck-trend`

```http
GET /api/open/v1/moenotes/{region}/arena/deck-trend
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `musicId` | `query` | 필수 |
| `arenaSeasonId` | `query` | 필수 |

### `/arena/{arenaSeasonId}/music/{musicId}/deck-trend`

```http
GET /api/open/v1/moenotes/{region}/arena/{arenaSeasonId}/music/{musicId}/deck-trend
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `musicId` | `path` | 필수 |
| `arenaSeasonId` | `path` | 필수 |

### `/event/deck`

```http
GET /api/open/v1/moenotes/{region}/event/deck
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `playerId` | `query` | 필수 |
| `eventId` | `query` | 필수 |

### `/event/{eventId}/deck/{playerId}`

```http
GET /api/open/v1/moenotes/{region}/event/{eventId}/deck/{playerId}
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `playerId` | `path` | 필수 |
| `eventId` | `path` | 필수 |

## 매개변수

| 매개변수 | 설명 |
| --- | --- |
| `eventId` | 대상 이벤트 ID입니다. |
| `playerId` | 편성을 조회할 플레이어 계정 ID입니다. |
| `arenaSeasonId` | 아레나 시즌 ID입니다. |
| `musicId` | 아레나 편성 추이 대상 곡 ID입니다. |

## 리전 차이

편성 데이터는 각 리전별로 완전히 분리되어 관리됩니다. 특정 리전의 playerId는 다른 리전에서 동일한 플레이어를 식별하지 않으며, 아레나 시즌과 대상 곡 목록 역시 리전마다 다릅니다.

## 주의 사항

아레나 편성 추이는 특정 시즌의 단일 곡에 채용된 편성의 통계 데이터를 반환합니다. 개별 플레이어의 특정 이벤트 편성을 조회하려면 이벤트 편성 엔드포인트를 사용하세요.

매개변수 누락 또는 형식 오류 시 400 invalid_request, API 키가 유효하지 않으면 401 invalid_api_key, 키에 moenotes:decks 권한이 없으면 403 insufficient_scope, 대상 이벤트·시즌·플레이어가 존재하지 않으면 404 not_found가 반환됩니다.

## 예시

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/event/$EVENT_ID/deck/$PLAYER_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
