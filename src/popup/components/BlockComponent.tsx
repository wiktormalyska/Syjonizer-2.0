import {ReactNode} from "react";

interface BlockComponentProps {
    title: string
    children?: ReactNode
}

export const BlockComponent = ({title, children}:BlockComponentProps) => {
    return (
        <div className={"bg-neutral-400 rounded-2xl p-3 flex flex-col gap-3 w-full justify-start"}>
            {title}
            {children}
        </div>
    )
}