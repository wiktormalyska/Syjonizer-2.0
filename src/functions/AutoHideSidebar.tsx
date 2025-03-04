import {useEffect,} from "react";

interface AutoHideSidebarProps {
    isHidden: boolean;
}


export const AutoHideSidebar = ({isHidden}: AutoHideSidebarProps) => {
    useEffect(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        if (import.meta.env.VITE_MODE === 'dev') {
            console.log('AutoHideSidebar', isHidden);
            return;
        }

        if (isHidden) {
            chrome.runtime.sendMessage({action: "autoHideSidebarOn"}, (response) => {
                console.log(response);
            })
        } else {
            chrome.runtime.sendMessage({action: "autoHideSidebarOff"}, (response) => {
                console.log(response);
            })
        }
    }, [isHidden]);


    return null;
}