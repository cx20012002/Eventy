import React from 'react';
import {useLocation} from "react-router-dom";

function ServerErrorPage() {
    const {state} = useLocation();

    if (state === null) return <h1>No error</h1>

    return (
        <div className={""}>
            <h1 className={"text-2xl font-bold pb-5"}>{state.error.message}</h1>
            <p className={"p-5 rounded-xl bg-white bg-opacity-80 text-red-400 text-sm leading-8"}>{state.error.details}</p>
        </div>
    )
}

export default ServerErrorPage;