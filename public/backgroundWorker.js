chrome.runtime.onInstalled.addListener(() => {
    console.log('Syjonizer 2.0 Uruchomiony')
})

chrome.runtime.onMessage.addListener((message, sender) => {
    console.log("Otrzymano akcję:", message.action)

    switch (message.action) {
        case 'autoHideSidebarOn':
            executeScript(hideSidebarOn)
            break

        case 'autoHideSidebarOff':
            executeScript(hideSidebarOff)
            break

        case 'initCssInjection':
            injectCSS(sender.tab.id)
            break
    }
})

function executeScript(func) {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
        if (!tabs[0] || !tabs[0].id) return

        chrome.scripting.executeScript({
            target: {tabId: tabs[0].id},
            func: func,
        }).catch(err => console.error("Błąd w executeScript:", err))
    })
}

function injectCSS(tabId) {
    if (!tabId) return

    chrome.scripting.insertCSS({
        target: {tabId: tabId},
        files: ["customStyles.css"]
    }).catch(err => console.error("Błąd w insertCSS:", err))

    chrome.scripting.executeScript({
        target: {tabId: tabId},
        func: checkAndHideSidebar
    }).catch(err => console.error("Błąd w executeScript:", err))
}

function checkAndHideSidebar() {
    chrome.storage.local.get("isHidden", (data) => {
        if (data.isHidden === "true") {
            console.log("Sidebar jest schowany, ukrywam...")
            const sidebar = document.getElementById('side');
            if (sidebar) {
                sidebar.classList.add("sidebar-hide");
            }
            const main = document.getElementById('main');
            if (main) {
                main.classList.add("main-sidebar-hide");
            }
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
