import { version } from '../../../package.json';
import * as React from "react";


interface PopupBodyProps {
    children?: React.ReactNode;
    className?: string;
}

export const PopupBody = ({children, className} : PopupBodyProps) => {
    return (
        <div className={'w-64 h-max flex flex-col bg-neutral-100 items-center pt-5 pb-5 '+className!}>
            <div className={'text-3xl tracking-wider font-medium'}>Syjonizer 2.0</div>
            <div className={'text-xs opacity-50 flex flex-row justify-between w-full pl-9 pr-9'}>
                <div>by Wiktor Małyska</div>
                <div>{version}</div>
            </div>
            <div className={'mt-5 p-2 w-full'}>
                {children}
                <div className={"p-2"}>
                </div>
            </div>
        </div>
    )
}