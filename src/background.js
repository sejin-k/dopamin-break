/**
 * content script에서 메시지 받는 곳
 */
chrome.runtime.onMessage.addListener((msg, sender) => {

    // "closeTab" 메시지일 경우
    if (msg === "closeTab") {

        // 현재 탭 ID 존재하면 삭제
        if (sender.tab?.id) {
            chrome.tabs.remove(sender.tab.id);
        }
    }
});