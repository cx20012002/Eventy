import React, {useEffect, useState} from 'react';
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import {BiCheck} from "react-icons/bi";
import {CgClose} from "react-icons/cg";
import LoadingButton from "../../components/LoadingButton";

interface Props {
    uploadPhoto: (file: Blob) => void;
    loading: string;
}

function PhotoUploadWidget({uploadPhoto, loading}: Props) {
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
        }
    }

    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview));
        }
    }, [files])

    return (
        <div className={"grid grid-cols-12 w-full gap-10"}>
            <div className={"col-span-4 text-primary font-semibold"}>
                <h5 className={"mb-5"}>Step 1 - Add Photo</h5>
                <PhotoWidgetDropzone setFiles={setFiles}/>
            </div>
            <div className={"col-span-4 text-primary font-semibold"}>
                <h5 className={"mb-5"}>Step 2 - Resize image</h5>
                {files && files.length > 0 && (
                    <PhotoWidgetCropper setCropper={setCropper} imagePreviews={files[0].preview} />
                )}
            </div>
            <div className={"col-span-4 text-primary font-semibold"}>
                <h5 className={"mb-5"}>Step 3 - Preview & Upload</h5>
                {files && files.length > 0 && (
                    <>
                        <div className={"img-preview overflow-hidden min-h-[200px]"}></div>
                        <div className={"flex rounded overflow-hidden w-[200px]"}>
                            <LoadingButton isLoading={loading==='image-uploading'} onClick={onCrop} className={"w-full py-1 bg-orange-600 text-white"}><BiCheck size={20} className={"inline"}/></LoadingButton>
                            <button disabled={loading === 'image-uploading'} onClick={() => setFiles([])} className={"w-full py-1 bg-gray-200"}><CgClose className={"inline"}/></button>
                        </div>
                    </>
                )}
               
            </div>
        </div>
    )
}

export default PhotoUploadWidget;