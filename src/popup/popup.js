import { getSites, addSite, removeSite } from "../core/site-controler.js";

const siteNameInput = document.getElementById("siteNameInput");
const siteUrlInput = document.getElementById("siteUrlInput");
const addBtn = document.getElementById("addBtn");
const list = document.getElementById("siteList");

// 리스트 렌더링
function render(sites) {
    list.innerHTML = "";

    sites.forEach((site) => {
        const li = document.createElement("li");
        li.className = "list-item";

        // 사이트 이름
        const nameDiv = document.createElement("div");
        nameDiv.className = "site-name";
        nameDiv.textContent = site.name;

        // 사이트 주소
        const urlDiv = document.createElement("div");
        urlDiv.className = "site-url";
        urlDiv.textContent = site.url;

        // 삭제 버튼
        const deleteDiv = document.createElement("div");
        deleteDiv.className = "delete-btn";

        const btn = document.createElement("button");
        btn.textContent = "삭제";

        btn.onclick = async () => {
            await removeSite(site.url);
            load();
        };

        deleteDiv.appendChild(btn);

        li.appendChild(nameDiv);
        li.appendChild(urlDiv);
        li.appendChild(deleteDiv);

        list.appendChild(li);
    });
}

// 데이터 로드
async function load() {
    const sites = await getSites();
    render(sites);
}

// 추가
addBtn.addEventListener("click", async () => {
    const name = siteNameInput.value.trim();
    const url = siteUrlInput.value.trim();

    if (!name || !url) {
        alert("사이트 이름과 주소를 모두 입력하세요.");
        return;
    }

    await addSite({
        name,
        url
    });

    siteNameInput.value = "";
    siteUrlInput.value = "";

    load();
});

// Enter 키로 추가
[siteNameInput, siteUrlInput].forEach((input) => {
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") addBtn.click();
    });
});

// 초기 실행
load();