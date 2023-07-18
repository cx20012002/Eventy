import React from 'react';
import {useController, UseControllerProps} from "react-hook-form";
import Datepicker, {ReactDatePickerProps} from 'react-datepicker';

interface Props extends UseControllerProps {
    label?: string;
}

function AppDateInput(props: Props & Partial<ReactDatePickerProps>) {
    const {field, fieldState: {error}} = useController(props);
    return (
        <>
            <Datepicker
                {...field}
                {...props}
                placeholderText={props.label}
                selected={(field.value && new Date(field.value)) || null}
                className={`mt-3 rounded border border-gray-300 text-gray-900 text-sm block w-full p-2.5 focus:outline-none focus:border-gray-400 ${error ? "border-red-300 bg-red-50 placeholder:text-red-300" : ""}`}
            />
            {error && <span
                className="text-sm text-red-600 py-1 px-5 inline-block rounded border border-red-600 mt-2">{error.message}</span>}
        </>
    )
}

export default AppDateInput;