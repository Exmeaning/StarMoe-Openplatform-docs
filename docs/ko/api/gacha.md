# 가챠 확률

**Scope:** `moenotes:gacha`

가챠 풀과 픽업 카드의 공개 확률.

## 엔드포인트

다음은 전체 API 경로 목록입니다. 호출하려는 엔드포인트에 맞춰 필요한 매개변수를 전달하세요.

### `/gacha/rates`

```http
GET /api/open/v1/moenotes/{region}/gacha/rates
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `gachaId` | `query` | 필수 |
| `productId` | `query` | 선택 |
| `selectedPickUp` | `query` | 선택 |

### `/gacha/{gachaId}/rates`

```http
GET /api/open/v1/moenotes/{region}/gacha/{gachaId}/rates
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `gachaId` | `path` | 필수 |
| `productId` | `query` | 선택 |
| `selectedPickUp` | `query` | 선택 |

### `/gacha/{gachaId}/rates/{selectedPickUp}`

```http
GET /api/open/v1/moenotes/{region}/gacha/{gachaId}/rates/{selectedPickUp}
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `gachaId` | `path` | 필수 |
| `productId` | `query` | 선택 |
| `selectedPickUp` | `path` | 필수 |

## 매개변수

| 매개변수 | 설명 |
| --- | --- |
| `gachaId` | 대상 가챠 풀 ID입니다. 파라미터를 생략하여 현재 진행 중인 풀을 자동 반환하는 기능은 없습니다. |
| `selectedPickUp` | 픽업 카드 인덱스 번호입니다. 쿼리 파라미터에서는 선택 사항이며 경로 파라미터 형식에서는 필수입니다. |
| `productId` | 확률표를 필터링하기 위한 상품 ID(선택 사항). |

## 리전 차이

가챠 풀의 진행 일정과 라인업은 리전마다 상이합니다. 따라서 gachaId는 반드시 조회 대상 리전의 ID를 사용해야 합니다. 배출 확률 및 픽업 구성 역시 리전별로 독립적입니다.

## 주의 사항

gachaId는 필수 파라미터입니다. 값을 생략할 경우 현재 진행 중인 가챠 풀을 자동으로 조회하는 대체 동작은 지원되지 않습니다.

필수 매개변수 누락 또는 미정의 매개변수 전달 시 400 invalid_request, API 키가 유효하지 않으면 401 invalid_api_key, moenotes:gacha 권한이 없으면 403 insufficient_scope, 지정한 가챠 풀이 존재하지 않으면 404 not_found가 반환됩니다.

## 예시

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/gacha/rates?gachaId=$GACHA_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
