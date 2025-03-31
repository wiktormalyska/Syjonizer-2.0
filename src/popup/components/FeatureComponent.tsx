import {useEffect, useState} from "react";
import * as React from "react";
import {FaCheck, FaXmark} from "react-icons/fa6";

interface FeatureComponentProps {
    name: string,
    onChange: (value: boolean) => void
    initValue: boolean
    children?: React.ReactNode
}

export const FeatureComponent = ({name, onChange, initValue, children}: FeatureComponentProps) => {
    const [isChecked, setIsChecked] = useState(initValue);

    useEffect(() => {
        setIsChecked(initValue);
    }, [initValue]);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
        onChange(!isChecked);
    };

    return (
        <>
            <div className="flex flex-col bg-primary/70 p-2 rounded-md"
                 onClick={handleCheckboxChange}>
                <div className="flex items-center">
                    <div>
                        <button
                            className={"w-5 h-5 p-1 mr-1 " +
                                "bg-background " +
                                "rounded-full flex items-center " +
                                "justify-center text-text"}
                        >
                            {isChecked ? <FaCheck/> : <FaXmark/>}
                        </button>
                    </div>
                    <span className={"text-base font-medium text-left"}>{name}</span>


                </div>
                <div className="w-full">
                    {children}
                </div>
            </div>
        </>
    )
        ;
};