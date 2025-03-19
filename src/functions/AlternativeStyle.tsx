export const AlternativeStyle = (isAlternativeStyle: boolean) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (import.meta.env.VITE_MODE === 'dev') {
        console.log('AlternativeStyle', isAlternativeStyle);
        return;
    }

    if (isAlternativeStyle) {
        chrome.runtime.sendMessage({action: "alternativeStyleOn"}, (response) => {
            console.log(response);
        });
    } else {
        chrome.runtime.sendMessage({action: "alternativeStyleOff"}, (response) => {
            console.log(response);
        })
    }
}