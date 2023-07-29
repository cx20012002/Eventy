import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {BiUpload} from "react-icons/bi";

interface Props {
    setFiles: (files: any) => void;
}

function PhotoWidgetDropzone({setFiles}: Props) {
    const onDrop = useCallback((acceptedFiles: any) => {
        setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })));
    }, [setFiles])

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div 
            {...getRootProps()}
            className={`border-2 border-dashed border-gray-500 text-gray-500 rounded text-center h-52 justify-center items-center flex flex-col ${isDragActive && 'border-primary'}`}
        >
            <input {...getInputProps()} />
            <BiUpload className={"inline"} size={30}/>
            <p className={"text-2xl font-normal"}>Drop image here</p>
        </div>
    )
}

export default PhotoWidgetDropzone