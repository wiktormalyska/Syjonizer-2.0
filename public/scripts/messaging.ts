import {initInjectCSS} from "./injectCss.js";
import {hideSidebarOff, hideSidebarOn} from "./features/hideSidebar.js";
import {alternativeStyleOff, alternativeStyleOn} from "./features/alternativeStyle.js";
import {weekendHiddenOff, weekendHiddenOn} from "./features/hideWeekends.js";
import MessageSender = chrome.runtime.MessageSender;
import {Message} from "postcss";

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