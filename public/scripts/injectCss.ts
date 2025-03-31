import {hideSidebarOn} from "./features/hideSidebar";
import {alternativeStyleOn} from "./features/alternativeStyle";
import {weekendHiddenOn} from "./features/hideWeekends";
import {activityBlockPickingOn} from "./features/activityBlockPicking";
import {showOnlySelectedBlocksOn} from "./features/showOnlySelectedBlocks";

export function initInjectCSS(tabId: number) {
    if (!tabId) return

    chrome.scripting.insertCSS({
        target: {tabId: tabId},
        files: ["customStyles.css"]
    }).catch(err => console.error("Błąd w insertCSS:", err))
    checkAndTurnActivityBlockPicking(tabId);
    checkAndHideSidebar(tabId);
    checkAndTurnAlternativeStyle(tabId);
    checkAndTurnHideWeekend(tabId);
    checkAndShowOnlySelectedBlocks(tabId);
}

function checkAndHideSidebar(tabId: number) {
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

function checkAndTurnAlternativeStyle(tabId: number) {
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

function checkAndTurnHideWeekend(tabId: number) {
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

function checkAndTurnActivityBlockPicking(tabId: number) {
    chrome.storage.local.get("isPickingActivityBlocks", (data) => {
        if (data.isPickingActivityBlocks === "true") {
            console.log("ActivityBlocks jest włączony");
            chrome.scripting.executeScript({
                target: {tabId: tabId},
                func: activityBlockPickingOn
            }).catch(err => console.error("Błąd w executeScript:", err));
        }
    })
}

function checkAndShowOnlySelectedBlocks(tabId: number) {
    chrome.storage.local.get("showOnlySelectedBlocks", (data) => {
        if (data.showOnlySelectedBlocks === "true") {
            console.log("Pokazuję tylko wybrane bloki");
            chrome.scripting.executeScript({
                target: {tabId: tabId},
                func: showOnlySelectedBlocksOn
            }).catch(err => console.error("Błąd w executeScript:", err));
        }
    });

    chrome.storage.local.get('selectedBlocks', (result) => {
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            func: (selectedBlocks) => {
                const blocks = JSON.parse(selectedBlocks || '[]');
                const blockData = [];
                const activityBlocks = document.getElementsByClassName("activity_block") as HTMLCollection;

                for (let i = 0; i < activityBlocks.length; i++) {
                    if (blocks.includes(String(i))) {
                        const block = activityBlocks.item(i) as HTMLElement;

                        blockData.push({
                            id: i,
                            left: block.style.left,
                            width: block.style.width,
                        });
                    }
                }

                chrome.storage.local.set({ blockData: JSON.stringify(blockData) }).then(r => console.log(r));
            },
            args: [result.selectedBlocks]
        }).catch(err => console.error("Błąd w executeScript:", err));
    });
}