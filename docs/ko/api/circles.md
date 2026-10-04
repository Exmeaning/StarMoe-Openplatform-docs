# 서클

**Scope:** `moenotes:circles`

id로 서클을 조회하거나 이름과 조건으로 검색합니다.

## 엔드포인트

다음은 전체 API 경로 목록입니다. 호출하려는 엔드포인트에 맞춰 필요한 매개변수를 전달하세요.

### `/circle`

```http
GET /api/open/v1/moenotes/{region}/circle
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `circleId` | `query` | 필수 |

### `/circle/{circleId}`

```http
GET /api/open/v1/moenotes/{region}/circle/{circleId}
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `circleId` | `path` | 필수 |

### `/circles/search`

```http
GET /api/open/v1/moenotes/{region}/circles/search
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `options.name` | `query` | 선택 |
| `options.memberRange` | `query` | 선택 |
| `options.joinRule` | `query` | 선택 |
| `options.playStyle` | `query` | 선택 |

### `/circles/search/{name}`

```http
GET /api/open/v1/moenotes/{region}/circles/search/{name}
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `name` | `path` | 필수 |
| `options.memberRange` | `query` | 선택 |
| `options.joinRule` | `query` | 선택 |
| `options.playStyle` | `query` | 선택 |

## 매개변수

| 매개변수 | 설명 |
| --- | --- |
| `circleId` | 대상 서클 ID입니다. |
| `name` | 검색할 서클 이름(경로 파라미터 형식). |
| `options.name` | 검색할 서클 이름 필터(쿼리 파라미터 형식, 선택 사항). |
| `options.memberRange` | 멤버 수 범위 필터(선택 사항). |
| `options.joinRule` | 가입 조건 필터(선택 사항). |
| `options.playStyle` | 플레이 성향 필터(선택 사항). |

## 리전 차이

서클 데이터는 각 리전별로 완전히 분리되어 관리되며 서버 간에 공유되지 않습니다. 검색 결과와 필터링은 지정한 리전의 서클에만 적용됩니다.

## 주의 사항

검색 필터는 options. 접두사가 붙은 쿼리 파라미터로 지정합니다(예: ?options.name=…). 경로 파라미터 엔드포인트에서는 서클 이름만 전달합니다. 이름 검색은 게임 내에 저장된 값과 정확히 일치(Full Match)해야 하며, 부분 일치나 퍼지 검색을 지원하지 않고 결과 캐싱도 수행하지 않습니다.

파라미터 오류 시 400 invalid_request, API 키 누락 또는 유효하지 않은 경우 401 invalid_api_key, moenotes:circles 권한이 없으면 403 insufficient_scope, 일치하는 서클이 없으면 404 not_found가 반환됩니다.

## 예시

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/circles/search?options.name=$QUERY" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
