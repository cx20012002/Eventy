import React from 'react';
import {useController, UseControllerProps} from "react-hook-form";

interface Props extends UseControllerProps {
    label?: string;
    multiline?: string;
    rows?: number;
    type?: string;
    onKeyDown?: (event: React.KeyboardEvent) => void;
    className?: string;
}
function AppTextInput(props: Props) {
    const {field, fieldState: {error}} = useController({...props, defaultValue: props.defaultValue || ''});
    return (
        <div className={"w-full"}>
            {props.multiline
                ?
                <textarea
                    {...field}
                    onKeyDown={props.onKeyDown}
                    rows={props.rows}
                    placeholder={props.label}
                    className={`${props.className} ${error ? "border-red-300 bg-red-50 placeholder:text-red-300" : "placeholder:text-neutral-400"}`}
                    value={field.value || ''}
                />
                :
                <>
                    <input
                        {...field}
                        type={props.type}
                        className={`${props.className} ${error ? "border-red-300 bg-red-50 placeholder:text-red-300" : "placeholder:text-neutral-400"}`}
                        placeholder={props.label}
                        value={field.value}
                    />
                </>
            }
            {error && <div className="text-sm text-red-600 py-1 px-5 w-fit rounded border border-red-600 mt-2">{error.message}</div>}
        </div>
    )
}

export default AppTextInput;