import React, {useState} from 'react';
import {Profile} from "../../app/models/profile";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import AppTextInput from "../../components/AppTextInput";
import LoadingButton from "../../components/LoadingButton";
import * as yup from "yup";
import {FieldValues, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {BiSolidUser} from "react-icons/bi";
import {updateProfileAsync} from "./profileSlice";

interface Props {
    profile: Profile;
}

function ProfileAbout({profile}: Props) {
    const [editMode, setEditMode] = useState(false);
    const {user} = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();
    const {control, handleSubmit, formState: {isDirty, isSubmitting}} = useForm<FieldValues>({
        resolver: yupResolver(yup.object({
            displayName: yup.string().required("Display Name is required"),
        })) as any,
        mode: "all"
    });
    
    const onSubmit = async (data: FieldValues) => {
        await dispatch(updateProfileAsync(data));
        setEditMode(false);
    }

    return (
        <>
            <div className={"flex items-center gap-2 mb-5"}>
                <BiSolidUser size={20}/>
                <h3 className={"text-base font-bold"}>About {profile.displayName}</h3>
                {profile.username === user?.username &&
                    <button
                        onClick={() => setEditMode(!editMode)}
                        className={"text-neutral-600 border border-neutral-200 px-5 py-2 rounded ml-auto"}>
                        {editMode ? "Cancel" : "Edit Profile"}
                    </button>
                }
            </div>
            <hr className={"my-5"}/>
            <div>
                {editMode ?
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <AppTextInput
                            name={"displayName"}
                            className={"mt-3 rounded border border-gray-200 text-gray-800 text-sm w-full p-2.5 outline-none outline-0"}
                            control={control}
                            defaultValue={profile.displayName}
                            label={"Display Name"}
                        />
                        <AppTextInput
                            name={"bio"}
                            className={"mt-3 rounded border border-gray-200 text-gray-800 text-sm w-full p-2.5 outline-none outline-0"}
                            control={control}
                            defaultValue={profile.bio}
                            label={"Add your bio"}
                            multiline={'true'} rows={5}
                        />
                        <LoadingButton
                            disabled={!isDirty || isSubmitting}
                            isLoading={isSubmitting}
                            className={"bg-primary text-white w-28 h-10 rounded float-right mt-3 disabled:opacity-50 disabled:cursor-not-allowed"}
                        >
                            Submit
                        </LoadingButton>
                    </form> :
                    <p>{profile.bio || 'No Content'}</p>
                }
            </div>
        </>
    )
}

export default ProfileAbout;