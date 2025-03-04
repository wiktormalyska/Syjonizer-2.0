import {version} from '../../package.json'

export const WrongWebsiteComponent = () => {

    return (
            <div className={"w-64 h-max flex flex-col bg-neutral-100 items-center pt-5 pb-5"}>
                <div className={"text-3xl tracking-wider font-medium"}>Syjonizer 2.0</div>
                <div className={"text-xs opacity-50 flex flex-row justify-between w-full pl-9 pr-9"}>
                    <div>by Wiktor Małyska</div>
                    <div>{version}</div>
                </div>
                <div className={"mt-5 p-2 w-full justify-center items-center text-center"}>
                    <div className={"text-xl"}>{"Ta strona nie jest morią!"}</div>
                    <div className={"bg-neutral-400 p-3 rounded-2xl mt-3"} onClick={
                        () => {
                            window.open("http://moria.umcs.lublin.pl/", "_blank")
                        }
                    }>
                        <span className={"text-2xl"}>Przejdź do moria</span>
                    </div>
                </div>
            </div>
    )
}