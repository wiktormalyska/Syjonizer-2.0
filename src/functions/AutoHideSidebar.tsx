import {useEffect, } from "react";

interface AutoHideSidebarProps {
  isHidden: boolean;
}


export const AutoHideSidebar = ({isHidden}:AutoHideSidebarProps) => {
    useEffect(() => {
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