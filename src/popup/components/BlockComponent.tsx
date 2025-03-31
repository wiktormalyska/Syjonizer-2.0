import {ReactNode} from "react";

interface BlockComponentProps {
    title: string
    children?: ReactNode
}

export const BlockComponent = ({title, children}: BlockComponentProps) => {
    return (
        <div
            className={" transition-all duration-200 text-background rounded-md p-2 flex flex-col gap-3 w-full justify-start"}>
            <div className={"bg-primary p-2 rounded-md"}>
                <span className={"font-extrabold tracking-wider text-center"}>{title}</span>
            </div>
            <div className={"flex flex-col gap-2 font-medium text-xl"}>
                {children}
            </div>
        </div>
    )
}