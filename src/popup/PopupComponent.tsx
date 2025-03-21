import {BlockComponent} from './components/BlockComponent.tsx';
import {FeatureComponent} from './components/FeatureComponent.tsx';
import {AutoHideSidebar} from '../functions/AutoHideSidebar.tsx';
import {useEffect, useState} from 'react';
import {PopupBody} from "./components/PopupBody.tsx";
import storage from "../helpers/storage.tsx";
import {AlternativeStyle} from "../functions/AlternativeStyle.tsx";
import {HideWeekendDays} from "../functions/HideWeekendDays.tsx";

export const PopupComponent = () => {
    const [isSidebarHidden, setIsSidebarHidden] = useState<boolean | null>(null);
    const [isAlternativeStyle, setIsAlternativeStyle] = useState<boolean | null>(null);
    const [isWeekendHidden, setIsWeekendHidden] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Ładowanie danych z localStorage
    useEffect(() => {
        storage.get('isSidebarHidden', (data) => {
            if (data.isSidebarHidden === "true") {
                setIsSidebarHidden(true);
            } else {
                setIsSidebarHidden(false);
            }
        });

        storage.get('isAlternativeStyle', (data) => {
            if (data.isAlternativeStyle === "true") {
                setIsAlternativeStyle(true);
            } else {
                setIsAlternativeStyle(false);
            }
        });

        storage.get('isWeekendHidden', (data) => {
            if (data.isWeekendHidden === "true") {
                setIsWeekendHidden(true);
            } else {
                setIsWeekendHidden(false);
            }
        });

        setIsLoading(false); // Po załadowaniu ustawiamy loading na false
    }, []);

    const handleIsSidebarHiddenCheckboxChange = (value: boolean) => {
        if (isSidebarHidden !== null) {
            storage.set({ isSidebarHidden: value ? 'true' : 'false' }, () => {
                setIsSidebarHidden(value);
                AutoHideSidebar(value)
            });
        }
    };

    const handleAlternativeStyleCheckboxChange = (value: boolean) => {
        if (isAlternativeStyle !== null) {
            storage.set({ isAlternativeStyle: value ? 'true' : 'false' }, () => {
                setIsAlternativeStyle(value);
                AlternativeStyle(value)
            });
        }
    };

    const handleIsWeekendHiddenCheckboxChange = (value: boolean) => {
        if (isWeekendHidden !== null) {
            storage.set({ isWeekendHidden: value ? 'true' : 'false' }, () => {
                setIsWeekendHidden(value);
                HideWeekendDays(value);
            });
        }
    };

    if (isLoading) {
        return <div>Loading...</div>; // Możesz dodać wskaźnik ładowania
    }

    return (
        <PopupBody>
            <BlockComponent title={'Funkcjonalności'}>
                <FeatureComponent
                    name={'Automatyczne ukrywanie paska'}
                    onChange={handleIsSidebarHiddenCheckboxChange}
                    initValue={isSidebarHidden ?? false}
                />
                <FeatureComponent
                    name={'Alternatywny wygląd kostek'}
                    onChange={handleAlternativeStyleCheckboxChange}
                    initValue={isAlternativeStyle ?? false}
                />
                <FeatureComponent
                    name={'Ukrywanie soboty i niedzieli'}
                    onChange={handleIsWeekendHiddenCheckboxChange}
                    initValue={isWeekendHidden ?? false}
                />
            </BlockComponent>
        </PopupBody>
    );
};