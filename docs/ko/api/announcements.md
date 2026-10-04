# 공지 사항

**Scope:** `moenotes:announcements`

게임 내 공지 목록과 공지 상세입니다.

## 엔드포인트

다음은 전체 API 경로 목록입니다. 호출하려는 엔드포인트에 맞춰 필요한 매개변수를 전달하세요.

### `/announcement`

```http
GET /api/open/v1/moenotes/{region}/announcement
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `id` | `query` | 필수 |

### `/announcement/{id}`

```http
GET /api/open/v1/moenotes/{region}/announcement/{id}
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `id` | `path` | 필수 |

### `/announcements`

```http
GET /api/open/v1/moenotes/{region}/announcements
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `selectedTab` | `query` | 선택 |

### `/announcements/{selectedTab}`

```http
GET /api/open/v1/moenotes/{region}/announcements/{selectedTab}
```

| 매개변수 | 위치 | 필수 |
| --- | --- | --- |
| `selectedTab` | `path` | 필수 |

## 매개변수

| 매개변수 | 설명 |
| --- | --- |
| `selectedTab` | 공지사항 분류 탭(카테고리). 쿼리 파라미터에서는 선택 사항이며 경로 파라미터 형식에서는 필수입니다. |
| `id` | 대상 공지사항 ID. 경로 파라미터 또는 ?id= 쿼리 파라미터 형식으로 지정합니다. |

## 리전 차이

공지사항은 리전별로 개별 게시되며 상호 번역본 관계가 아닙니다. 분류 탭, 공지 ID, 본문 내용이 모두 리전마다 상이하므로 특정 리전의 공지 ID는 다른 리전에서 조회되지 않습니다.

## 주의 사항

공지 본문 데이터에는 가공되지 않은 HTML 문자열이 포함되어 있습니다. XSS 보안 취약점을 방지하기 위해 렌더링 전 새니타이징(Sanitize) 처리를 거치거나, sandbox 속성이 적용된 iframe을 통해 렌더링하고 메인 DOM에 직접 삽입하지 마세요.

매개변수 오류 시 400 invalid_request, API 키가 유효하지 않으면 401 invalid_api_key, 키에 moenotes:announcements 권한이 없으면 403 insufficient_scope, 해당 공지가 존재하지 않으면 404 not_found가 반환됩니다.

## 예시

```sh
REGION=jp
curl --fail-with-body "https://passport.bdon.moe/api/open/v1/moenotes/$REGION/announcement/$ANNOUNCEMENT_ID" \
  -H "Authorization: Bearer $CLIENT_SECRET"
```
