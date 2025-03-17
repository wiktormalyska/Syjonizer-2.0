import {ReactNode} from "react";

interface BlockComponentProps {
    title: string
    children?: ReactNode
}

export const BlockComponent = ({title, children}:BlockComponentProps) => {
    return (
        <div className={"bg-primary/80 hover:bg-primary transition-all duration-200 text-background rounded-lg p-3 flex flex-col gap-3 w-full justify-start"}>
            <span className={"font-extrabold tracking-wider text-center"}>{title}</span>
            {children}
        </div>
    )
}