/**
 * 차단 로직
 */
export function handleReject(site) {

    console.log(`${site.name} 차단`);

    // background.js로 메시지 보내서 탭 닫기 시도
    chrome.runtime.sendMessage("closeTab", () => {

        // background 연결 실패 시 fallback
        if (chrome.runtime.lastError) {
            console.log("탭 닫기 실패 → about:blank 이동");
            location.href = "about:blank";
        }
    });
}

/**
 * 허용 로직
 */
export function handleAccept(site) {
    console.log(`${site.name} 계속 사용`);
}