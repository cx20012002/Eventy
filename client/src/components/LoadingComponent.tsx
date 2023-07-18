import React from 'react';
import {AiOutlineLoading} from "react-icons/ai";

interface Props {
    content?: string;
    logo?: string;
    partial?: boolean;
}

function LoadingComponent({content, logo, partial = false}: Props) {
    return (
        <div
            className={`flex items-center justify-center ${partial ? 'absolute top-0 left-0 w-full h-full bg-opacity-50' : 'fixed inset-0 bg-opacity-80'}  bg-gray-50  z-10`}>
            <div className={"text-center"}>
                <AiOutlineLoading size={50} className={"animate-spin w-full mb-5"}/>
                <p>{content}</p>
                {logo && <img src={logo} alt="logo" className={"h-10"}/>}
            </div>
        </div>
    )
}

export default LoadingComponent;