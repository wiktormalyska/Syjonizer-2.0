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

        case 'hideWeekendDaysOn':
            executeScript(weekendHiddenOn)
            break

        case 'hideWeekendDaysOff':
            executeScript(weekendHiddenOff)
            break
    }

    sendResponse({status: "ok"})
    return true
})


function executeScript(func) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (!tab || !tab.id) return;

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: func
        }).catch(err => console.error("Błąd w executeScript:", err));
    });
}


function initInjectCSS(tabId) {
    if (!tabId) return

    chrome.scripting.insertCSS({
        target: {tabId: tabId},
        files: ["customStyles.css"]
    }).catch(err => console.error("Błąd w insertCSS:", err))

    checkAndHideSidebar(tabId);
    checkAndTurnAlternativeStyle(tabId);
    checkAndTurnHideWeekend(tabId);
}

function checkAndHideSidebar(tabId) {
    chrome.storage.local.get("isSidebarHidden", (data) => {
        if (data.isSidebarHidden === "true") {
            console.log("Sidebar jest schowany, ukrywam...");
            chrome.scripting.executeScript({
                target: {tabId: tabId},
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
                target: {tabId: tabId},
                func: alternativeStyleOn
            }).catch(err => console.error("Błąd w executeScript:", err));
        }
    });
}

function checkAndTurnHideWeekend(tabId) {
    chrome.storage.local.get("isWeekendHidden", (data) => {
        if (data.isWeekendHidden === "true") {
            console.log("Weekend jest ukryty")
            chrome.scripting.executeScript({
                target: {tabId: tabId},
                func: weekendHiddenOn
            }).catch(err => console.error("Błąd w executeScript:", err));
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

function weekendHiddenOn() {
    const weekDaysContainerHeader = document.getElementsByClassName("weekdayscontainer")[0]
    if (!weekDaysContainerHeader) return

    const saturday = weekDaysContainerHeader.children[5]
    const sunday = weekDaysContainerHeader.children[6]

    saturday.classList.add("weekend-day-hidden")
    sunday.classList.add("weekend-day-hidden")

    const weekdayEntries = weekDaysContainerHeader.getElementsByClassName("weekdayentry")
    for (let i = 0; i < 5; i++) {
        const entry = weekdayEntries[i]
        if (entry) {
            entry.style.left = (i * 20) + "%"
            entry.style.width = "20%"  // Each weekday gets 20% width (100% / 5)
        }
    }

    const verticalDividers = document.getElementsByClassName("planvline")
    for (let i = 6; i < 8; i++) {
        verticalDividers[i].classList.add("weekend-day-hidden")
    }

    for (let i = 0; i < 6; i++) {
        verticalDividers[i].style = ""
        verticalDividers[i].style.left = (i * 20) + "%";
    }

    const activityBlocks = document.getElementsByClassName("activity_block")
    const sevenDayColumnWidth = 14.2857; // 100% / 7
    const fiveDayColumnWidth = 20;      // 100% / 5
    const ratio = fiveDayColumnWidth / sevenDayColumnWidth;

    for (let i = 0; i < activityBlocks.length; i++) {
        const element = activityBlocks[i];

        // Only process elements with style properties
        if (element.style.left && element.style.width) {
            const leftStyle = parseFloat(element.style.left);
            const widthStyle = parseFloat(element.style.width);

            // Convert position: multiply by ratio to maintain relative position
            if (leftStyle !== 0) {
                element.style.left = (leftStyle * ratio) + "%";
            }

            // Convert width: multiply by ratio to maintain proportional width
            element.style.width = (widthStyle * ratio) + "%";
        }
    }
}

function weekendHiddenOff() {
    const weekDaysContainerHeader = document.getElementsByClassName("weekdayscontainer")[0]
    if (!weekDaysContainerHeader) return

    const saturday = weekDaysContainerHeader.children[5]
    const sunday = weekDaysContainerHeader.children[6]

    saturday.classList.remove("weekend-day-hidden")
    sunday.classList.remove("weekend-day-hidden")

    const weekdayEntries = weekDaysContainerHeader.getElementsByClassName("weekdayentry")
    for (let i = 0; i < 5; i++) {
        const entry = weekdayEntries[i]
        if (entry) {
            entry.style.left = (i * 14.2857) + "%"
            entry.style.width = "14.2857%"
        }
    }

    const verticalDividers = document.getElementsByClassName("planvline")
    for (let i = 6; i < 8; i++) {
        verticalDividers[i].classList.remove("weekend-day-hidden")
    }

    for (let i = 0; i < 6; i++) {
        verticalDividers[i].style = ""
        verticalDividers[i].style.left = (i * 14.2857) + "%";
    }

    const activityBlocks = document.getElementsByClassName("activity_block")

    const sevenDayColumnWidth = 14.2857; // 100% / 7
    const fiveDayColumnWidth = 20;      // 100% / 5
    const ratio = sevenDayColumnWidth / fiveDayColumnWidth;

    for (let i = 0; i < activityBlocks.length; i++) {
        const element = activityBlocks[i];

        // Only process elements with style properties
        if (element.style.left && element.style.width) {
            const leftStyle = parseFloat(element.style.left);
            const widthStyle = parseFloat(element.style.width);

            // Convert position back
            if (leftStyle !== 0) {
                element.style.left = (leftStyle * ratio) + "%";
            }

            // Convert width back
            element.style.width = (widthStyle * ratio) + "%";
        }
    }
}

//TODO: naprawic rozszerzenia na otwarcie popupa