import React from 'react';
import { useController, UseControllerProps } from "react-hook-form";

interface Props<T extends { value: string; text: string }> extends UseControllerProps {
    label: string;
    items: T[];
}

function AppSelectInput<T extends { value: string; text: string }>(props: Props<T>) {
    const { field, fieldState: { error } } = useController({ ...props, defaultValue: '' });

    return (
        <>
            <select
                {...field}
                {...props}
                className={`mt-3 rounded appearance-none border border-gray-300 text-gray-900 text-sm block w-full p-2.5 focus:outline-none focus:border-gray-400 ${error ? "border-red-300 bg-red-50 placeholder:text-red-300" : ""}`}
            >
                <option value="" disabled>Select your category</option>
                {props.items.map((item, index) => (
                    <option key={index} value={item.value}>{item.text}</option>
                ))}
            </select>
            {error && <span className="text-sm text-red-600 py-1 px-5 inline-block rounded border border-red-600 mt-2">{error.message}</span>}
        </>
    )
}

export default AppSelectInput;
