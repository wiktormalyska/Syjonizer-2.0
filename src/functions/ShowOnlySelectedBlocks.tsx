export function showOnlySelectedBlocks(isToggled: boolean) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (import.meta.env.VITE_MODE === 'dev') {
        console.log('ShowOnlySelectedBlocks', isToggled);
        return;
    }
    if (isToggled) {
        chrome.runtime.sendMessage({action: 'showOnlySelectedBlocksOn'}, (response) => {
            console.log(response);
        });
    } else {
        chrome.runtime.sendMessage({action: 'showOnlySelectedBlocksOff'}, (response) => {
            console.log(response);
        });
    }
}