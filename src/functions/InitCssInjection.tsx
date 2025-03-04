export const InitCssInjection = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (import.meta.env.VITE_MODE === 'dev') {
        console.log('initCssInjection');
        return;
    }

    chrome.runtime.sendMessage({action: "initCssInjection"}, (response) => {
        console.log(response);
    })
}