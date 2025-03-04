import {createRoot} from "react-dom/client";
import {PopupComponent} from "./popup/PopupComponent.tsx";
import {WrongWebsiteComponent} from "./popup/WrongWebsiteComponent.tsx";

chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const tab = tabs[0];

    if (!tab.url) {
        return;
    }

    const url = new URL(tab.url);

    const pattern = '*://moria.umcs.lublin.pl/*';
    const matches = new RegExp(pattern.replace('*', '.*')).test(url.href);

    if (matches) {
        createRoot(document.getElementById("root")!).render(
            <PopupComponent/>
        )
    } else {
        createRoot(document.getElementById("root")!).render(
            <WrongWebsiteComponent/>
        )
    }
})


