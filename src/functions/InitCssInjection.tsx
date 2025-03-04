export const InitCssInjection = () => {
    chrome.runtime.sendMessage({action: "initCssInjection"}, (response) => {
        console.log(response);
    })
}