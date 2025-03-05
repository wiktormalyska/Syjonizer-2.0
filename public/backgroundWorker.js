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
                if (!tabs[0] || !tabs[0].id) return;

                chrome.scripting.insertCSS({
                    target: {tabId: tabs[0].id},
                    files: ["customStyles.css"]
                }).catch(err => console.error("Błąd w insertCSS:", err))

                chrome.scripting.executeScript({
                    target: {tabId: tabs[0].id},
                    func: checkAndHideSidebar
                }).catch(err => console.error("Błąd w executeScript:", err))

                chrome.scripting.executeScript({
                    target: {tabId: tabs[0].id},
                    func: checkAndTurnAlternativeStyle
                }).catch(err => console.error("Błąd w insertCSS:", err))
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

    chrome.scripting.executeScript({
        target: {tabId: tabId},
        func: checkAndHideSidebar
    }).catch(err => console.error("Błąd w executeScript:", err))

    chrome.scripting.executeScript({
        target: {tabId: tabId},
        func: checkAndTurnAlternativeStyle
    }).catch(err => console.error("Błąd w insertCSS:", err))
}

function checkAndHideSidebar() {
    chrome.storage.local.get("isHidden", (data) => {
        if (data.isHidden === "true") {
            console.log("Sidebar jest schowany, ukrywam...")
            executeScript(hideSidebarOn)
        }
    });
}

function checkAndTurnAlternativeStyle() {
    chrome.storage.local.get("isAlternativeStyle", (data) => {
        if (data.isAlternativeStyle === "true") {
            console.log("Alternatywny styl jest włączony")
            executeScript(alternativeStyleOn)
        }
    })
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