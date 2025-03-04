import {createRoot} from "react-dom/client";
import {PopupComponent} from "./popup/PopupComponent.tsx";
import {WrongWebsiteComponent} from "./popup/WrongWebsiteComponent.tsx";

createRoot(document.getElementById("root")!).render(
    <div className={"flex flex-row gap-5 w-full"}>
        <PopupComponent/>
        <WrongWebsiteComponent/>
    </div>
)



