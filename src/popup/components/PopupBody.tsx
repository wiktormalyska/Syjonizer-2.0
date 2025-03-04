import {version} from '../../../package.json';
import * as React from "react";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import umcs_logo from "../../../public/icons/umcs_logo.png";

interface PopupBodyProps {
    children?: React.ReactNode;
    className?: string;
}

export const PopupBody = ({children, className}: PopupBodyProps) => {
    return (
        <div>
            <div className={'w-80 h-max flex flex-col bg-background text-text items-center pt-5 pb-5 ' + className!}>
                <div className={'flex flex-row '}>
                    <div className={'relative'}>
                        <img src={umcs_logo} alt={"umcs logo"} className={"w-10 mr-2 filter grayscale opacity-90"}/>
                        <div className="absolute inset-0 bg-primary mix-blend-multiply opacity-50"></div>
                    </div>
                    <div className={'text-3xl tracking-wider font-medium'}>Syjonizer 2.0</div>
                </div>

                <div className={'opacity-50 flex flex-row justify-between w-full pl-5 pr-5'}>
                    <div className={"hover:text-primary transition-all duration-200 text-xs"}
                        onClick={() => {
                        window.open("https://wiktormalyska.ovh/", "_blank")
                    }}>
                        by Wiktor Małyska
                    </div>
                    <div className={"text-xs"}>{version}</div>
                </div>
                <div className={'mt-5 p-2 w-full'}>
                    {children}
                    <div className={"p-2"}>
                    </div>
                </div>
            </div>
        </div>
    )
}