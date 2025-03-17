chrome.runtime.onInstalled.addListener(() => {
    console.log('Syjonizer 2.0 Uruchomiony')
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Otrzymano akcję:", message.action)

    switch (message.action) {
        case 'autoHideSidebarOn':
            executeScript(hideSidebarOn)
            break

        case 'autoHideSidebarOff':
            executeScript(hideSidebarOff)
            break

        case 'initCssInjection':
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                initInjectCSS(tabs[0].id)
            });
            break;

        case 'alternativeStyleOn':
            executeScript(alternativeStyleOn)
            break

        case 'alternativeStyleOff':
            executeScript(alternativeStyleOff)
            break
    }

    sendResponse({status: "ok"})
    return true
})


function executeScript(func) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (!tabs[0] || !tabs[0].id) return

        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            func: func
        }).catch(err => console.error("Błąd w executeScript:", err))
    })
}


function initInjectCSS(tabId) {
    if (!tabId) return

    chrome.scripting.insertCSS({
        target: {tabId: tabId},
        files: ["customStyles.css"]
    }).catch(err => console.error("Błąd w insertCSS:", err))

    checkAndHideSidebar(tabId);
    checkAndTurnAlternativeStyle(tabId);
}

function checkAndHideSidebar(tabId) {
    chrome.storage.local.get("isHidden", (data) => {
        if (data.isHidden === "true") {
            console.log("Sidebar jest schowany, ukrywam...");
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                func: hideSidebarOn
            }).catch(err => console.error("Błąd w executeScript:", err));
        }
    });
}

function checkAndTurnAlternativeStyle(tabId) {
    chrome.storage.local.get("isAlternativeStyle", (data) => {
        if (data.isAlternativeStyle === "true") {
            console.log("Alternatywny styl jest włączony");
            chrome.scripting.executeScript({
                target: { tabId: tabId },
                func: alternativeStyleOn
            }).catch(err => console.error("Błąd w executeScript:", err));
        }
    });
}


function hideSidebarOn() {
    const sidebar = document.getElementById('side')
    if (sidebar) {
        sidebar.classList.add("sidebar-hide")
    }
    const main = document.getElementById('main')
    if (main) {
        main.classList.add("main-sidebar-hide")
    }
}

function hideSidebarOff() {
    const sidebar = document.getElementById('side')
    if (sidebar) {
        sidebar.classList.remove("sidebar-hide")
    }
    const main = document.getElementById('main')
    if (main) {
        main.classList.remove("main-sidebar-hide")
    }
}

function alternativeStyleOn() {
    const activityBlocks = document.getElementsByClassName("activity_block")
    if (activityBlocks.length <= 0) {
        return
    }
    for (let i = 0; i < activityBlocks.length; i++) {
        const activityBlock = activityBlocks[i]
        activityBlock.classList.add("alternative-style-activity-block")
    }
}

function alternativeStyleOff() {
    const activityBlocks = document.getElementsByClassName("activity_block")
    if (activityBlocks.length <= 0) {
        return
    }
    for (let i = 0; i < activityBlocks.length; i++) {
        const activityBlock = activityBlocks[i]
        activityBlock.classList.remove("alternative-style-activity-block")
    }
}