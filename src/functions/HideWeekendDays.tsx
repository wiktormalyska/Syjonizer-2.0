export const HideWeekendDays = (isHidden: boolean) => {

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (import.meta.env.VITE_MODE === 'dev') {
        console.log('HideWeekendDays', isHidden);
        return;
    }

    if (isHidden) {
        chrome.runtime.sendMessage({action: 'hideWeekendDaysOn'}, (response) => {
            console.log(response);
        });
    } else {
        chrome.runtime.sendMessage({action: 'hideWeekendDaysOff'}, (response) => {
            console.log(response);
        });
    }
}