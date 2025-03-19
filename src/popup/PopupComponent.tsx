import {BlockComponent} from './components/BlockComponent.tsx';
import {FeatureComponent} from './components/FeatureComponent.tsx';
import {AutoHideSidebar} from '../functions/AutoHideSidebar.tsx';
import {useEffect, useState} from 'react';
import {PopupBody} from "./components/PopupBody.tsx";
import storage from "../helpers/storage.tsx";
import {AlternativeStyle} from "../functions/AlternativeStyle.tsx";
import {HideWeekendDays} from "../functions/HideWeekendDays.tsx";

export const PopupComponent = () => {
    const [isSidebarHidden, setIsSidebarHidden] = useState<boolean>(true);
    const [isAlternativeStyle, setIsAlternativeStyle] = useState<boolean>(true);
    const [isWeekendHidden, setIsWeekendHidden] = useState<boolean>(true);

    //Data Loading from local storage
    useEffect(() => {
        storage.get('isSidebarHidden', (data) => {
            if (data.isSidebarHidden === "true") { /* empty */
            } else {
                setIsSidebarHidden(false);
            }
        });

        storage.get('isAlternativeStyle', (data) => {
            if (data.isAlternativeStyle === "true") { /* empty */
            } else {
                setIsAlternativeStyle(false);
            }
        })

        storage.get('isWeekendHidden', (data) => {
            if (data.isWeekendHidden === "true") { /* empty */
            } else {
                setIsWeekendHidden(false);
            }
        })
    }, []);

    const handleIsSidebarHiddenCheckboxChange = (value: boolean) => {
        storage.set({isSidebarHidden: value ? 'true' : 'false'}, () => {
            setIsSidebarHidden(value);
        });
    };

    const handleAlternativeStyleCheckboxChange = (value: boolean) => {
        storage.set({isAlternativeStyle: value ? 'true' : 'false'}, () => {
            setIsAlternativeStyle(value);
        });
    };

    const handleIsWeekendHiddenCheckboxChange = (value: boolean) => {
        storage.set({isWeekendHidden: value ? 'true' : 'false'}, () => {
            setIsWeekendHidden(value);
        })
    }


    return (
        <PopupBody>
            <BlockComponent title={'Funkcjonalności'}>
                <FeatureComponent
                    name={'Automatyczne ukrywanie paska'}
                    onChange={handleIsSidebarHiddenCheckboxChange}
                    initValue={isSidebarHidden}
                />
                <AutoHideSidebar isHidden={isSidebarHidden}/>
                <FeatureComponent
                    name={'Alternatywny wygląd kostek'}
                    onChange={handleAlternativeStyleCheckboxChange}
                    initValue={isAlternativeStyle}
                />
                <AlternativeStyle isAlternativeStyle={isAlternativeStyle}/>
                <FeatureComponent
                    name={'Ukrywanie soboty i niedzieli'}
                    onChange={handleIsWeekendHiddenCheckboxChange}
                    initValue={isWeekendHidden}
                    />
                <HideWeekendDays isHidden={isWeekendHidden}/>
            </BlockComponent>
        </PopupBody>
    );
};