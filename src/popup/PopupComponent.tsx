import {version} from '../../package.json'
import {BlockComponent} from "./components/BlockComponent.tsx";
import {FeatureComponent} from "./components/FeatureComponent.tsx";
import {AutoHideSidebar} from "../functions/AutoHideSidebar.tsx";
import {useEffect, useState} from "react";

export const PopupComponent = () => {
    const [isHidden, setIsHidden] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem("isHidden")) {
            localStorage.setItem("isHidden", "false");
        } else {
            localStorage.setItem("isHidden", "true");
            setIsHidden(true)
        }
    }, []);

    const handleCheckboxChange = (value: boolean) => {
        setIsHidden(value);
    };

    return (
        <div className={"w-64 h-max flex flex-col bg-neutral-100 items-center pt-5 pb-5"}>
            <div className={"text-3xl tracking-wider font-medium"}>Syjonizer 2.0</div>
            <div className={"text-xs opacity-50 flex flex-row justify-between w-full pl-9 pr-9"}>
                <div>by Wiktor Małyska</div>
                <div>{version}</div>
            </div>
            <div className={"mt-5 p-2 w-full"}>
                <BlockComponent title={"Funkcjonalności"}>
                    <FeatureComponent
                        name={"Automatyczne ukrywanie paska"}
                        onChange={handleCheckboxChange}
                        initValue={isHidden}/>
                    <AutoHideSidebar isHidden={isHidden}/>
                </BlockComponent>
            </div>

        </div>
    )
}