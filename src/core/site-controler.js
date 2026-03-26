// --------------------------------------------------
// 중독 방지 사이트 리스트 가져오는 함수
// --------------------------------------------------
export const getSites = () =>
    new Promise((resolve) => {
        chrome.storage.sync.get({ checkedSites: [] }, (data) => {
            const sites = data.checkedSites.map(site => ({
                ...site,
                match: new RegExp(escapeRegExp(site.url))
            }));
            resolve(sites);
        });
    });

// --------------------------------------------------
// 중독 방지 사이트 리스트 저장하는 함수
// --------------------------------------------------
export const setSites = (sites) =>
    chrome.storage.sync.set({ checkedSites: sites });

// --------------------------------------------------
// 중독 방지 사이트 리스트 추가하는 함수
// --------------------------------------------------
export const addSite = async (site) => {
    const sites = await getSites();

    if (!sites.some(s => s.url === site.url)) {
        sites.push(site);
        await setSites(sites);
    }
    else {
        console.log("이미 추가된 사이트입니다.");
        alert("이미 추가된 사이트입니다.");
    }
};

// --------------------------------------------------
// 중독 방지 사이트 리스트 삭제하는 함수
// --------------------------------------------------
export const removeSite = async (url) => {
    const sites = await getSites();
    const newSites = sites.filter((s) => s.url !== url);
    await setSites(newSites);
};

// --------------------------------------------------
// 중독 방지 사이트 리스트에서 호스트가 일치하는지 확인하는 함수
// --------------------------------------------------
export const isMatchedDomain = (host, site) =>
    host === site || host.endsWith("." + site);

// --------------------------------------------------
// 문자열을 정규식으로 변환하는 함수
// --------------------------------------------------
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}