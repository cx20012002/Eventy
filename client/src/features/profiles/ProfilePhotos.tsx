import React, {useState} from 'react';
import {Photo, Profile} from "../../app/models/profile";
import {HiPhoto} from "react-icons/hi2";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {deletePhotoAsync, setMainPhotoAsync, uploadPhotoAsync} from "./profileSlice";
import PhotoUploadWidget from "../../app/imageUpload/PhotoUploadWidget";
import LoadingButton from "../../components/LoadingButton";

interface Props {
    profile: Profile;
}

function ProfilePhotos({profile}: Props) {
    const [target, setTarget] = useState<string>("");
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const {status} = useAppSelector(state => state.profile);
    const {user} = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();
    const isCurrentUser = user?.username === profile.username;
    
    async function handlePhotoUpload(file: Blob) {
        await dispatch(uploadPhotoAsync(file));
        setAddPhotoMode(false);
    }

    async function handleSetMainPhoto(photo: Photo) {
        setTarget(photo.id);
        await dispatch(setMainPhotoAsync(photo))
    }
    
    async function handleDeletePhoto(id: string) {
        setTarget(id);
        await dispatch(deletePhotoAsync(id));
    }

    return (
        <section>
            <div className={"flex gap-2 mb-5 justify-between"}>
                <div className={"flex gap-3 items-center"}>
                    <HiPhoto size={25}/>
                    <h3>Photos</h3>
                </div>
                {isCurrentUser &&
                    <button
                        onClick={() => setAddPhotoMode(!addPhotoMode)}
                        className={"text-white text-sm rounded bg-primary px-5 py-2"}
                    >
                        {addPhotoMode ? 'Cancel' : 'Add Photo'}
                    </button>
                }
            </div>
            <div className={"flex gap-5"}>
                {addPhotoMode ? (
                    <PhotoUploadWidget uploadPhoto={handlePhotoUpload} loading={status}/>
                ) : (
                    <>
                        {profile.photos?.map((photo, index) => (
                            <div key={index}>
                                <img className={"w-32 rounded"} src={photo.url} alt="Profile"/>
                                {isCurrentUser &&(
                                    <div className={"flex gap-2 mt-2"}>
                                        <LoadingButton
                                            isLoading={status === 'setting-main-photo' && target === photo.id}
                                            onClick={() => handleSetMainPhoto(photo)}
                                            disabled={photo.isMain}
                                            className={"bg-primary text-white text-xs py-1 w-full rounded disabled:bg-opacity-50"}
                                        >
                                            Main
                                        </LoadingButton>
                                        <LoadingButton
                                            isLoading={status === 'deleting-photo' && target === photo.id}
                                            onClick={() => handleDeletePhoto(photo.id)}
                                            disabled={photo.isMain}
                                            className={"bg-red-500 text-white text-xs py-1 w-full rounded disabled:bg-opacity-50"}
                                        >
                                            Delete
                                        </LoadingButton>
                                    </div>
                                )}
                                
                            </div>
                        ))}
                    </>
                )}

            </div>
        </section>
    )
}

export default ProfilePhotos;