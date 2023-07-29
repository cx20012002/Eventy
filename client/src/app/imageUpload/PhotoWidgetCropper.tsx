import React from 'react';
import {Cropper} from "react-cropper";
import "cropperjs/dist/cropper.css";

interface Props {
    setCropper: (cropper: Cropper) => void;
    imagePreviews: string;
}

function PhotoWidgetCropper({setCropper, imagePreviews}: Props) {
    return (
        <Cropper
            src={imagePreviews}
            className={"h-52"}
            initialAspectRatio={1}
            aspectRatio={1}
            preview={".img-preview"}
            guides={false}
            viewMode={1}
            autoCropArea={1}
            background={false}
            onInitialized={cropper => setCropper(cropper)}
        />
    )
}

export default PhotoWidgetCropper;