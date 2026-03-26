/**
 * URL 변경 감지 함수
 * SPA (YouTube 등)에서도 동작하도록 구현
 */
export function initRouter(callback) {

    let lastUrl = location.href;

    /**
     * 실제 실행 함수
     */
    function trigger() {
        callback(location.href);
    }

    // 최초 페이지 로드 시 실행
    window.addEventListener("load", trigger);

    /**
     * MutationObserver
     * → DOM 변경 감지
     * → SPA에서 URL 변경 감지
     */
    const observer = new MutationObserver(() => {

        // URL이 변경된 경우만 실행
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            trigger();
        }
    });

    // 전체 DOM 감시
    observer.observe(document, {
        subtree: true,
        childList: true
    });
}