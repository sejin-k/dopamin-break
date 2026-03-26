import { getSites } from "./core/site-controler.js"; // 등록된 중독 방지 사이트 목록
import { initRouter } from "./core/router.js"; // URL 변경 감지 (SPA 대응)
import { showModal } from "./ui/modal.js"; // UI (모달)
import { handleReject, handleAccept } from "./core/blocker.js"; // 행동 처리 (차단/허용)

/**
 * 앱 시작 지점
 * URL 변경 시마다 실행됨
 */
initRouter(async (currentUrl) => {

    // 현재 URL에 맞는 사이트 설정 찾기
    // const site = SITE_CONFIG.find(site => site.match.test(currentUrl));
    const sites = await getSites();
    if (!sites) return;

    const site = sites.find(site => site.match.test(currentUrl));
    // 해당 사이트 없으면 종료
    if (!site) return;

    // 모달 UI 표시
    showModal(site, {
        // 사용자가 "계속 보기" 클릭
        onAccept: () => handleAccept(site),

        // 사용자가 "차단" 클릭
        onReject: () => handleReject(site)
    });
});