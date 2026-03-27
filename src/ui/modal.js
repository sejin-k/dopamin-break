import { getMessage } from "../config/message.js";
import styles from "./modal.css?inline";

/**
 * 중앙 모달 UI 생성 함수
 */
export function showModal(site, { onAccept, onReject }) {

    // 이미 모달이 있으면 중복 생성 방지
    if (document.getElementById("site-blocker-overlay")) return;

    // CSS 주입
    const styleEl = document.createElement("style");
    styleEl.textContent = styles;
    document.head.appendChild(styleEl);

    /**
     * 전체 화면 덮는 오버레이
     */
    const overlay = document.createElement("div");
    overlay.id = "site-blocker-overlay";

    /**
     * 실제 모달 박스
     */
    const modal = document.createElement("div");
    modal.id = "site-blocker-modal";

    modal.innerHTML = `
        <div id="site-blocker-message">
            ${getMessage(site)}
        </div>

        <button id="site-blocker-continue-btn">
            계속 보기
        </button>

        <button id="site-blocker-block-btn">
            차단
        </button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    /**
     * 계속 보기 버튼
     */
    document.getElementById("site-blocker-continue-btn").onclick = () => {
        overlay.remove();   // 모달 제거
        styleEl.remove();   // 스타일 제거
        onAccept();         // 허용 로직 실행
    };

    /**
     * 차단 버튼
     */
    document.getElementById("site-blocker-block-btn").onclick = () => {
        overlay.remove();   // 모달 제거
        styleEl.remove();   // 스타일 제거
        onReject();         // 차단 로직 실행
    };
}
