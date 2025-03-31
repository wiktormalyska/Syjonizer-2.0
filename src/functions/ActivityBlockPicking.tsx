export const ActivityBlockPicking = (isActivityBlockPickingActive: boolean) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    if (import.meta.env.VITE_MODE === 'dev') {
        console.log('ActivityBlockPickingActive', isActivityBlockPickingActive);
        return;
    }

    if (isActivityBlockPickingActive){
        chrome.runtime.sendMessage({action: "activityBlockPickingActiveOn"}, (response) => {
            console.log(response);
        });
    } else {
        chrome.runtime.sendMessage({action: "activityBlockPickingActiveOff"}, (response) => {
            console.log(response);
        });
    }
}