# 오류 처리 {#errorsTitle}

API 호출에서 오류가 발생한 경우 먼저 HTTP 상태 코드를 확인하세요. 400은 요청 파라미터나 형식의 수정이 필요하며, 401은 API 키 누락 또는 비활성화 여부를 점검해야 합니다. 403은 필요한 scope 권한이 누락되었음을 의미하고, 404는 요청 리소스가 존재하지 않거나 사용자의 승인이 없음을 나타냅니다. 429 오류 시에는 Retry-After 헤더에 명시된 시간만큼 대기한 후 요청을 재시도하고, 503 오류는 일시적인 장애 또는 점검 상태이므로 지수 백오프를 적용해 재시도하세요. 오류 응답 구조의 경우 게임 API는 {error:{kind}} 객체를 반환하고, 저장 데이터 및 플랫폼 관리 API는 {error:string} 형태의 문자열 메시지를 반환합니다. 인증 관련 오류(401/403)는 무차별적으로 재시도하지 마시고, 문제 분석을 위해 응답의 X-Request-Id 헤더 값을 로깅해 두는 것을 권장합니다.

| HTTP | error.kind / error |
|---|---|
| 400 | invalid_request |
| 401 | invalid_api_key |
| 403 | insufficient_scope |
| 404 | not_found |
| 413 | too_large |
| 429 | rate_limited / daily_quota_exceeded / concurrency_limited |
| 503 | open_platform_disabled / admission_unavailable |

## 원본 저장 데이터 다운로드 {#saves}

API 키에 saves:read 권한이 없는 경우 403 insufficient_scope가 반환됩니다. 사용자가 저장을 승인하지 않았거나, 해당 저장 데이터가 존재하지 않거나, 계정 소유권 상태가 변경된 경우에는 보안을 위해 403이 아닌 404 not_found가 반환됩니다. 저장 파일 크기는 압축 상태 기준 8 MiB, 압축 해제 후 원본 JSON 기준 32 MiB를 상한으로 하며, 이를 초과할 경우 413 페이로드 오류가 발생합니다. 사용자가 승인을 취소하면 취소 시점 이후의 신규 다운로드 요청이 즉시 차단되지만, 이미 진행 중인 전송 세션은 정상 완료될 수 있으며 이미 로컬로 수신된 파일은 회수되지 않습니다.

## 공개 이벤트 및 음악 순위표 {#public-data}

ETag와 If-None-Match를 사용해 304를 받고 Cache-Control을 준수하세요. X-Fetched-At은 실제 수집 시각이며 캐시 적중으로 바뀌지 않습니다. X-Stale: 1은 오래된 결과, X-Refreshing: 1은 갱신 대기 또는 진행 중입니다. 503 pending/upstream에는 Retry-After와 지수 백오프를 따르고 고정된 고빈도 재시도를 피하세요.

## 오류 및 요청 제한 {#limits}

공개 프로필 API에서 지원하는 region은 tw, jp, en, kr이며, ID는 정밀도 손실 방지를 위해 10진수 문자열로 전달해야 합니다. 모든 요청은 Authorization: Bearer &lt;Secret&gt; 헤더를 포함해야 하며 별도의 clientID 헤더는 요구되지 않습니다. 저장 데이터 다운로드 시에는 saveServer(intl 또는 jp)와 accountID(업로드된 파일 최상위의 _profileId)를 지정해야 하며, saves:read 권한 및 해당 저장 데이터에 대한 사용자의 명시적인 승인이 필수적입니다. 공개 API의 기본 호출 한도는 Passport 사용자 계정 단위로 모든 앱과 API 키에 걸쳐 분당 100회, 일일 10000회로 제한됩니다. 동시 요청 제한은 사용자당 4개, 플랫폼 전체 32개입니다(실제 배포 구성에 따라 세부 수치는 조정될 수 있습니다). 503은 서비스 일시 점검 또는 상위 서비스 장애를 나타냅니다. 오류 응답 구조의 경우 게임 API는 {error:{kind}} 형식을, 저장 데이터 및 플랫폼 관리 API는 {error:string} 형식을 반환합니다.

