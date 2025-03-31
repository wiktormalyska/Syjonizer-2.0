import {BlockComponent} from './components/BlockComponent.tsx';
import {FeatureComponent} from './components/FeatureComponent.tsx';
import {AutoHideSidebar} from '../functions/AutoHideSidebar.tsx';
import {useEffect, useState} from 'react';
import {PopupBody} from "./components/PopupBody.tsx";
import storage from "../helpers/storage.tsx";
import {AlternativeStyle} from "../functions/AlternativeStyle.tsx";
import {HideWeekendDays} from "../functions/HideWeekendDays.tsx";
import {ActivityBlockPicking} from "../functions/ActivityBlockPicking.tsx";
import {showOnlySelectedBlocks} from "../functions/ShowOnlySelectedBlocks.tsx";

export const PopupComponent = () => {
    const [isSidebarHidden, setIsSidebarHidden] = useState<boolean | null>(null);
    const [isAlternativeStyle, setIsAlternativeStyle] = useState<boolean | null>(null);
    const [isWeekendHidden, setIsWeekendHidden] = useState<boolean | null>(null);
    const [isPickingActivityBlocks, setIsPickingActivityBlocks] = useState<boolean | null>(null);
    const [isShowingOnlySelected, setIsShowingOnlySelected] = useState<boolean>(false);

    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Ładowanie danych z localstorage
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

        storage.get('isPickingActivityBlocks', (data) => {
            if (data.isPickingActivityBlocks === "true") {
                setIsPickingActivityBlocks(true);
            } else {
                setIsPickingActivityBlocks(false);
            }
        })

        storage.get('showOnlySelectedBlocks', (data) => {
            if (data.showOnlySelectedBlocks === "true") {
                setIsShowingOnlySelected(true);
            } else {
                setIsShowingOnlySelected(false);
            }
        })

        setIsLoading(false);
    }, []);

    const handleIsSidebarHiddenCheckboxChange = (value: boolean) => {
        if (isSidebarHidden !== null) {
            storage.set({isSidebarHidden: value ? 'true' : 'false'}, () => {
                setIsSidebarHidden(value);
                AutoHideSidebar(value)
            });
        }
    };

    const handleAlternativeStyleCheckboxChange = (value: boolean) => {
        if (isAlternativeStyle !== null) {
            storage.set({isAlternativeStyle: value ? 'true' : 'false'}, () => {
                setIsAlternativeStyle(value);
                AlternativeStyle(value)
            });
        }
    };

    const handleIsWeekendHiddenCheckboxChange = (value: boolean) => {
        if (isWeekendHidden !== null) {
            storage.set({isWeekendHidden: value ? 'true' : 'false'}, () => {
                setIsWeekendHidden(value);
                HideWeekendDays(value);
            });
        }
    };

    const handleHidingAndPickingActivityBlocks = (value: boolean) => {
        if (isPickingActivityBlocks !== null) {
            storage.set({isPickingActivityBlocks: value ? 'true' : 'false'}, () => {
                setIsPickingActivityBlocks(value);
                ActivityBlockPicking(value);
            })
        }
        if (!value) {
            setIsShowingOnlySelected(false);
            showOnlySelectedBlocks(false);
        }
    }

    const handleShowingOnlySelectedSwitch = () => {
        if (!isPickingActivityBlocks) return
        if (isShowingOnlySelected) {
            storage.set({showOnlySelectedBlocks: "false"}, () => {
                setIsShowingOnlySelected(false);
                showOnlySelectedBlocks(false);
            })
        } else {
            storage.set({showOnlySelectedBlocks: "true"}, () => {
                setIsShowingOnlySelected(true);
                showOnlySelectedBlocks(true);
            })
        }

    }

    if (isLoading) {
        return <div>Loading...</div>;
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
                <FeatureComponent
                    name={'Wybieranie i ukrywanie niezaznaczonych zajęć'}
                    onChange={handleHidingAndPickingActivityBlocks}
                    initValue={isPickingActivityBlocks ?? false}>
                    <input type="button"
                           value={isShowingOnlySelected ? "Pokaż wszystkie" : "Pokaż tylko wybrane"}
                           className={(isPickingActivityBlocks ? "bg-primary/80 hover:bg-primary" : "bg-background/60") +
                               " transition-all duration-200 p-2 rounded-md text-base w-full z-9999"}
                           onClick={(e) => {
                               e.stopPropagation();
                               handleShowingOnlySelectedSwitch()
                           }}
                    />
                </FeatureComponent>
            </BlockComponent>
        </PopupBody>
    );
};