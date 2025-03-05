if (window.location.href.includes("moria.umcs.lublin.pl")) {
    chrome.runtime.sendMessage({action: "initCssInjection"})
}