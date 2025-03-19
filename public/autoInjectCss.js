if (window.location.href.includes("moria.umcs.lublin.pl")) {
    chrome.runtime.sendMessage({action: "initCssInjection"}, (response) => {console.log("Successfully injected Syjonizer 2.0")})
}