import React, {ReactNode} from 'react';
import {AiOutlineLoading3Quarters} from "react-icons/ai";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement>{
    isLoading: boolean;
    onClick?: (e:any) => void;
    children?: ReactNode;
    className?: string;
    disabled?: boolean;
    label?: string;
    name?:string
}

function LoadingButton({isLoading, onClick, children, className, disabled, label, name}: Props) {
    return (
        <button
            name={name}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={className}>
            {
                isLoading ?
                    <div className={"flex justify-center"}>
                        <AiOutlineLoading3Quarters size={15} className={"animate-spin block"}/>
                        {label}
                    </div> : children
            }
        </button>
    )
}

export default LoadingButton;