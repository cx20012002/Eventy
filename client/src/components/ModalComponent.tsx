import React, {ReactNode, useState} from 'react';
import {CgClose} from "react-icons/cg";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

const Modal = ({isOpen, onClose, children}: ModalProps) => {
    const modalClassName = isOpen ? 'fixed inset-0 flex items-center justify-center z-50 transition-all duration-200 visible opacity-100' : 'fixed inset-0 flex items-center justify-center z-50 transition-all duration-200 invisible opacity-0';
    const overlayClassName = 'fixed inset-0 bg-black transition-opacity opacity-80';

    return (
        <div className={modalClassName}>
            <div className={overlayClassName} onClick={onClose}></div>
            <div className="bg-white w-[400px] rounded p-8 z-10 relative">
                {children}
                <button className="text-lg text-primary absolute top-5 right-5" onClick={onClose}>
                    <CgClose/>
                </button>
            </div>
        </div>
    );
};

type ToggleModalProps = {
    buttonLabel: string;
    children?: ReactNode;
    className?: string;
};

const ToggleModal = ({buttonLabel, children, className}: ToggleModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const handleToggle = () => setIsOpen(!isOpen);
    const handleClose = () => setIsOpen(false);
    

    return (
        <div>
            <button className={className} onClick={handleToggle}>
                {buttonLabel}
            </button>
            <Modal isOpen={isOpen} onClose={handleClose}>
                {children}
            </Modal>
        </div>
    );
};

type AppProps = {
    children?: ReactNode;
    buttonLabel: string;
    className?: string;
};

const App = ({children, buttonLabel, className}: AppProps) => {
    return <ToggleModal buttonLabel={buttonLabel} className={className}>{children}</ToggleModal>;
};

export default App;
