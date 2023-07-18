import React from 'react';

interface Props {
    errors: string[];
}

function ValidationError({ errors }: Props) {
    return (
        <div className={"bg-red-50 p-3 text-sm rounded border border-red-300 text-red-800 mt-5"}>
            {errors &&
                <ul className={"list-inside list-disc m-auto space-y-1"}>
                    {errors.map((error, i) => (
                        <li key={i}>{error}</li>
                    ))}
                </ul>
            }
        </div>
    )
}

export default ValidationError;