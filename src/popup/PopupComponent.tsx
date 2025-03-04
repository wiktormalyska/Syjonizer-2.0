import {BlockComponent} from './components/BlockComponent.tsx';
import {FeatureComponent} from './components/FeatureComponent.tsx';
import {AutoHideSidebar} from '../functions/AutoHideSidebar.tsx';
import {useEffect, useState} from 'react';
import {InitCssInjection} from '../functions/InitCssInjection.tsx';
import {PopupBody} from "./components/PopupBody.tsx";
import storage from "../helpers/storage.tsx";

export const PopupComponent = () => {
    const [isHidden, setIsHidden] = useState<boolean>(true);

    //Data Loading from local storage
    useEffect(() => {
       storage.get('isHidden', (data) => {
            if (data.isHidden === "true") { /* empty */
            } else {
                setIsHidden(false);
            }
        });
        InitCssInjection();
    }, []);

    const handleCheckboxChange = (value: boolean) => {
        storage.set({isHidden: value ? 'true' : 'false'}, () => {
            setIsHidden(value);
        });
    };

    return (
        <PopupBody>
            <BlockComponent title={'Funkcjonalności'}>
                <FeatureComponent
                    name={'Automatyczne ukrywanie paska'}
                    onChange={handleCheckboxChange}
                    initValue={isHidden}
                />
                <AutoHideSidebar isHidden={isHidden}/>
            </BlockComponent>
        </PopupBody>
    );
};