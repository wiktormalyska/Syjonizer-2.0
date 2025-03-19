import {PopupBody} from "./components/PopupBody.tsx";

export const WrongWebsiteComponent = () => {

    return (
        <PopupBody className={"justify-center items-center text-center"}>
            <div>{"Ta strona nie jest morią!"}</div>
            <div className={"bg-primary/80 hover:bg-primary transition-all duration-200 " +
                "text-background p-3 rounded-md mt-3"} onClick={
                () => {
                    window.open("http://moria.umcs.lublin.pl/", "_blank")
                }
            }>
                <span className={"text-lg font-bold"}>Przejdź do moria</span>
            </div>
        </PopupBody>
    )
}