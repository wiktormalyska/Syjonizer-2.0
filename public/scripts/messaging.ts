import {initInjectCSS} from "./injectCss.js";
import {hideSidebarOff, hideSidebarOn} from "./features/hideSidebar.js";
import {alternativeStyleOff, alternativeStyleOn} from "./features/alternativeStyle.js";
import {weekendHiddenOff, weekendHiddenOn} from "./features/hideWeekends.js";
import {Message} from "postcss";
import {activityBlockPickingOff, activityBlockPickingOn} from "./features/activityBlockPicking";
import {showOnlySelectedBlocksOff, showOnlySelectedBlocksOn} from "./features/showOnlySelectedBlocks";

export function handleMessage(message: Message) {
    switch (message.action) {
        case 'autoHideSidebarOn':
            executeScript(hideSidebarOn)
            break

        case 'autoHideSidebarOff':
            executeScript(hideSidebarOff)
            break

        case 'initCssInjection':
            chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
                initInjectCSS(tabs[0].id!)
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
        case 'activityBlockPickingActiveOn':
            executeScript(activityBlockPickingOn)
            break
        case 'activityBlockPickingActiveOff':
            executeScript(activityBlockPickingOff)
            break
        case 'showOnlySelectedBlocksOn':
            executeScript(showOnlySelectedBlocksOn)
            break
        case 'showOnlySelectedBlocksOff':
            executeScript(showOnlySelectedBlocksOff)
            break
    }

    return true
}

export function executeScript(func:()  => void) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (!tab || !tab.id) return;

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: func
        }).catch(err => console.error("Błąd w executeScript:", err));
    });
}