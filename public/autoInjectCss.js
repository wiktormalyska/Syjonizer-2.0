if (window.location.href.includes("moria.umcs.lublin.pl")) {
    chrome.runtime.sendMessage({action: "initCssInjection"});

    chrome.storage.local.get("isHidden", (data) => {
        if (data.isHidden === "true") {
        } else {
            chrome.storage.local.set({isHidden: "false"});
        }
    });
}