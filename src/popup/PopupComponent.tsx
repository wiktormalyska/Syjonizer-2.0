import {BlockComponent} from './components/BlockComponent.tsx';
import {FeatureComponent} from './components/FeatureComponent.tsx';
import {AutoHideSidebar} from '../functions/AutoHideSidebar.tsx';
import {useEffect, useState} from 'react';
import {PopupBody} from "./components/PopupBody.tsx";
import storage from "../helpers/storage.tsx";
import {AlternativeStyle} from "../functions/AlternativeStyle.tsx";

export const PopupComponent = () => {
    const [isHidden, setIsHidden] = useState<boolean>(true);
    const [isAlternativeStyle, setIsAlternativeStyle] = useState<boolean>(true);

    //Data Loading from local storage
    useEffect(() => {
        storage.get('isHidden', (data) => {
            if (data.isHidden === "true") { /* empty */
            } else {
                setIsHidden(false);
            }
        });

        storage.get('isAlternativeStyle', (data) => {
            if (data.isAlternativeStyle === "true") { /* empty */
            } else {
                setIsAlternativeStyle(false);
            }
        })
    }, []);

    const handleIsHiddenCheckboxChange = (value: boolean) => {
        storage.set({isHidden: value ? 'true' : 'false'}, () => {
            setIsHidden(value);
        });
    };

    const handleAlternativeStyleCheckboxChange = (value: boolean) => {
        storage.set({isAlternativeStyle: value ? 'true' : 'false'}, () => {
            setIsAlternativeStyle(value);
        });
    };


    return (
        <PopupBody>
            <BlockComponent title={'Funkcjonalności'}>
                <FeatureComponent
                    name={'Automatyczne ukrywanie paska'}
                    onChange={handleIsHiddenCheckboxChange}
                    initValue={isHidden}
                />
                <AutoHideSidebar isHidden={isHidden}/>
                <FeatureComponent
                    name={'Alternatywny wygląd kostek'}
                    onChange={handleAlternativeStyleCheckboxChange}
                    initValue={isAlternativeStyle}
                />
                <AlternativeStyle isAlternativeStyle={isAlternativeStyle}/>
            </BlockComponent>
        </PopupBody>
    );
};