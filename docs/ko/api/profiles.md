# 프로필과 즐겨찾기

**Scope:** `moenotes:profiles`

한 플레이어의 공개 프로필, 여러 프로필 일괄 조회, 플레이어 즐겨찾기 목록을 가져옵니다.

## 엔드포인트

다음은 전체 API 경로 목록입니다. 호출하려는 엔드포인트에 맞춰 필요한 매개변수를 전달하세요.

### `/player/{playerId}/favorites`

```http
GET /api/open/v1/moenotes/{region}/player/{playerId}/favorites
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `playerId` | `path` | 필수 |

### `/profile`

```http
GET /api/open/v1/moenotes/{region}/profile
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `playerProfileId` | `query` | 필수 |

### `/profile/favorites`

```http
GET /api/open/v1/moenotes/{region}/profile/favorites
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `playerId` | `query` | 필수 |

### `/profile/{profileId}`

```http
GET /api/open/v1/moenotes/{region}/profile/{profileId}
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `profileId` | `path` | 필수 |

### `/profiles`

```http
GET /api/open/v1/moenotes/{region}/profiles
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `accountIds` | `query` | 필수 |

### `/profiles/{accountIds}`

```http
GET /api/open/v1/moenotes/{region}/profiles/{accountIds}
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `accountIds` | `path` | 필수 |

## 매개변수

| 매개변수 | 설명 |
| --- | --- |
| `profileId` | 공개 profile ID입니다. 일본 서버 외 지역은 2, 3, 4로 시작하는 11자리 숫자이며 일본 서버는 양의 int64입니다. 항상 10진수 문자열로 전달하세요. |
| `playerProfileId` | 단일 프로필 조회용 profile ID(쿼리 파라미터 형식)입니다. playerId와 혼용할 수 없습니다. |
| `accountIds` | 일괄 조회할 계정 ID 목록(쉼표로 구분, 최대 100개). |
| `playerId` | 즐겨찾기 목록을 조회할 대상 계정 ID입니다. profileId와 혼용할 수 없습니다. |

## 리전 차이

4개 리전 모두에서 지원되지만 profileId의 형식 규칙이 리전마다 다릅니다. jp는 양의 int64이며, tw/en/kr은 11자리 숫자(각각 2, 3, 4로 시작)입니다. 동일한 계정이라도 리전마다 고유 ID가 다르며, 즐겨찾기 데이터 역시 리전별로 독립 관리됩니다.

## 주의 사항

profileId, playerId, accountId는 서로 다른 식별자이며 상호 대체하여 사용할 수 없습니다. 경로 파라미터 형식과 쿼리 파라미터 형식은 동일한 데이터를 반환합니다.

필수 매개변수 누락, 형식 오류 또는 정의되지 않은 매개변수 전달 시 400 invalid_request가 반환되며, API 키가 유효하지 않거나 누락된 경우 401 invalid_api_key가 반환됩니다. 키에 moenotes:profiles 권한이 없으면 403 insufficient_scope가 반환되고, 요청한 플레이어가 존재하지 않거나 비공개 프로필인 경우 404 not_found가 반환됩니다.

## 예시

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/profile/$PROFILE_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
