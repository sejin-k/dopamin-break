# Dopamin Break

중독성 있는 특정 사이트 접속 시 경고 모달을 띄워 중독을 방지하는 Chrome 확장프로그램입니다.

## 주요 기능

- 팝업에서 차단할 사이트를 자유롭게 등록/삭제
- 등록된 사이트 접속 시 경고 모달 표시
- SPA(YouTube 등) URL 변경도 감지하여 동작
- 설정은 `chrome.storage.sync`에 저장되어 기기 간 동기화

## 동작 방식

1. 팝업에서 사이트 이름과 주소를 입력해 등록
2. 등록된 사이트에 접속하면 경고 모달이 표시됨
3. **계속 보기** — 모달을 닫고 사이트 이용 계속
4. **차단** — 현재 탭을 닫음

## 프로젝트 구조

```
src/
├── background.js               # Service Worker — 탭 닫기 처리
├── content.js                  # Content Script 진입점
├── popup.html                  # 팝업 UI
├── config/
│   ├── message.js              # 기본 경고 메시지 생성
│   └── sites.js                # 정적 사이트 설정 (참고용)
├── core/
│   ├── blocker.js              # 허용 / 차단 로직
│   ├── router.js               # URL 변경 감지 (MutationObserver)
│   └── site-controler.js       # chrome.storage CRUD
├── popup/
│   ├── popup.js                # 팝업 스크립트
│   └── popup.css               # 팝업 스타일
└── ui/
    ├── modal.js                # 경고 모달 생성
    └── modal.css               # 모달 스타일
```

## 설치 방법

### 빌드

```bash
npm install
npm run build
```

### 크롬에 로드

1. Chrome 주소창에 `chrome://extensions` 입력
2. 우측 상단 **개발자 모드** 활성화
3. **압축해제된 확장 프로그램을 로드합니다** 클릭
4. `dist/` 폴더 선택

## 개발

변경 사항을 실시간으로 빌드합니다.

```bash
npm run dev
```

빌드 후 `chrome://extensions`에서 확장프로그램 새로고침 버튼을 눌러야 변경 사항이 반영됩니다.

## 기술 스택

- Manifest V3
- Vite (빌드 도구)
- Vanilla JS

---

## 릴리즈 기록

### v1.0

- 중독 방지 사이트 등록으로 접속 시 경고 메시지 표시
- 경고 확인 후 계속 보기 또는 탭 닫기 선택 가능
- 확장프로그램 팝업에서 URL 등록 / 삭제 가능

### v1.1 (예정)

- 사이트별 하루 최대 접속 가능 시간 설정
- 설정한 시간을 초과하면 자동으로 탭 차단
