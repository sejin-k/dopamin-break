# DEV_LOG

개발자 관점의 기능 단위 개발 기록입니다.

---

## v1.0

### 2026-03-26 `기획`
- Manifest V3 기반 프로젝트 세팅 (Vite 빌드 환경 구성)
- 중독 방지 사이트 등록 / 삭제 / 목록 조회 구조 설계

### 2026-03-26 `기능 구현`
- Content Script 진입점 구성 (`content.js`)
- Service Worker 구성 (`background.js`) — 탭 닫기 메시지 처리
- 팝업 UI 구성 — 사이트 등록 / 목록 / 삭제 (`popup.js`, `popup.html`)
- URL 변경 감지 라우터 구현 (`router.js`) — MutationObserver로 SPA 대응
- `chrome.storage.sync` 기반 사이트 CRUD 구현 (`site-controler.js`)
- 경고 모달 UI 구현 (`modal.js`) — 계속 보기 / 차단 버튼
- 허용 / 차단 로직 구현 (`blocker.js`)

### 2026-03-26 `버그 수정`
- `RegExp` 직렬화 버그 수정 — storage 저장 시 `match` 제거, 조회 시 재생성
- 사용자 등록 사이트 `message` 미설정 문제 수정 — 기본 메시지 fallback 적용 (`message.js`)
- Content Script ES 모듈 오류 수정 — IIFE 포맷으로 단독 번들링, `"type": "module"` 제거

### 2026-03-26 `리팩터링`
- 모달 스타일 분리 — 인라인 스타일 → `modal.css` (`?inline` import 후 `<style>` 태그 주입)

### 2026-03-27 `UI 개선`
- 팝업 사이트 등록 입력 필드에 Enter 키 트리거 추가 — 사이트 이름 / 주소 입력 후 Enter 시 추가 버튼 동작 (`popup.js`)
- 중독 방지 모달 버튼 디자인 개선 (`modal.css`)
  - 버튼 테두리 pill 형태로 변경 (`border-radius: 50px`)
  - 폰트 변경 — `Segoe UI` / `Apple SD Gothic Neo`, `font-weight: 600`
  - hover 효과 강화 — 배경색 전환 + `translateY(-2px)` + `box-shadow` 적용
  - 차단 버튼 hover 시 붉은 그림자(`rgba(229, 57, 53, 0.45)`)로 위험 강조

### 2026-03-28 `버그 수정`
- 사이트별 모달 글씨 간격 불일치 수정 (`modal.css`)
  - **원인**: 모달을 호스트 페이지 DOM에 직접 삽입하면 YouTube(`Roboto`), Naver(`NanumGothic`) 등 각 사이트의 전역 CSS(`font-family`, `line-height`, `letter-spacing`, `word-spacing`)가 모달 요소에 상속되어 사이트마다 글씨 간격이 달라지는 문제
  - **해결**: `#site-blocker-modal`에 `font-family`, `line-height: 1.5`, `letter-spacing: normal`, `word-spacing: normal`, `color` 명시 → 하위 요소 전체가 상속받아 사이트 무관하게 일관된 스타일 유지

---

## v1.1 (예정)

### `기획`
- 사이트별 하루 최대 허용 접속 시간 설정 UI (팝업)
- 접속 시간 누적 측정 및 `chrome.storage` 저장
- 허용 시간 초과 시 자동 탭 차단 처리
