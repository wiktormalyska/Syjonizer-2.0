import {PopupBody} from "./components/PopupBody.tsx";

export const WrongWebsiteComponent = () => {

    return (
        <PopupBody className={"justify-center items-center text-center"}>
            <div className={"text-xl"}>{"Ta strona nie jest morią!"}</div>
            <div className={"bg-neutral-400 p-3 rounded-2xl mt-3"} onClick={
                () => {
                    window.open("http://moria.umcs.lublin.pl/", "_blank")
                }
            }>
                <span className={"text-2xl"}>Przejdź do moria</span>
            </div>
        </PopupBody>
    )
}