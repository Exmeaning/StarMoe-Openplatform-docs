# 프로필 카드 이미지

**Scope:** `moenotes:profile-images`

플레이어 프로필 카드의 한 페이지를 PNG로 렌더링합니다.

## 엔드포인트

다음은 전체 API 경로 목록입니다. 호출하려는 엔드포인트에 맞춰 필요한 매개변수를 전달하세요.

### `/profile/{profileId}/card/{page}`

```http
GET /api/open/v1/moenotes/{region}/profile/{profileId}/card/{page}
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `profileId` | `path` | 필수 |
| `page` | `path` | 필수 |

## 매개변수

| 매개변수 | 설명 |
| --- | --- |
| `profileId` | 공개 profile ID입니다. 프로필 조회 엔드포인트에서 사용하는 값과 동일합니다. |
| `page` | 렌더링할 카드 페이지 번호(1부터 시작). PNG 이미지 데이터 스트림으로 반환됩니다(최대 8 MiB). |

## 리전 차이

4개 리전 모두에서 지원되며, 생성되는 카드 이미지는 해당 리전의 데이터에 기반합니다. 유효 페이지 수는 플레이어 및 리전별로 다르므로 한 리전에서 유효한 페이지 번호가 다른 리전에서는 범위를 벗어날(404) 수 있습니다.

## 주의 사항

본 API 호출 시에는 Authorization 헤더가 필수이므로 프론트엔드의 `<img>` 태그 src 속성으로 직접 호출할 수 없습니다. 반드시 백엔드 서버에서 이미지 바이너리를 수신하여 중계 전달해야 하며, 사전에 페이지 유효 범위를 검증하세요.

API 키가 유효하지 않거나 누락된 경우 401 invalid_api_key, 키에 moenotes:profile-images 권한이 없으면 403 insufficient_scope, 대상 플레이어 또는 페이지가 존재하지 않으면 404 not_found, 호출 빈도 및 할당량 제한 초과 시 429 오류가 반환됩니다.

## 예시

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/profile/$PROFILE_ID/card/1" \
  -H "Authorization: Bearer $CLIENT_SECRET" \
  --output card.png
```
