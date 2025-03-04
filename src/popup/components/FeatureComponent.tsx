import {useEffect, useState} from "react";
import * as React from "react";

interface FeatureComponentProps {
    name: string,
    onChange: (value: boolean) => void
    initValue: boolean
}

export const FeatureComponent = ({name, onChange, initValue}: FeatureComponentProps) => {
    const [isChecked, setIsChecked] = useState(initValue);

    useEffect(() => {
        setIsChecked(initValue);
    }, [initValue]);

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.checked;
        setIsChecked(value);
        onChange(value);
    };

    return (
        <div className="flex items-center">
            <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="mr-2"
            />
            <span>{name}</span>
        </div>
    );
};