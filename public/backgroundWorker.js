chrome.runtime.onInstalled.addListener(() => {
    console.log('Syjonizer 2.0 Uruchomiony');
});

chrome.runtime.onMessage.addListener((message) => {
    console.log(message.action)
    switch (message.action) {
        case 'autoHideSidebarOn': {
            executeScript(hideSidebarOn);
            break;
        }
        case 'autoHideSidebarOff': {
            executeScript(hideSidebarOff);
            break;
        }
    }
});

function executeScript(func) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs[0] || !tabs[0].id) return;

        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: func,
        }).catch(err => console.error("Błąd w executeScript:", err));
    });
}
//TODO: Fix styles

function hideSidebarOn() {
    const sidebar = document.getElementById('side');
    if (sidebar) {
        sidebar.classList.add("w-[320px]","w-[10px]", "overflow-hidden", "transition-all", "duration-300", "ease-in-out");
    }
}

function hideSidebarOff() {
    const sidebar = document.getElementById('side');
    if (sidebar) {
        sidebar.classList.remove("w-[320px]","w-[10px]", "overflow-hidden", "transition-all", "duration-300", "ease-in-out");
    }
}
