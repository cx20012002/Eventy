import React from 'react';
import AppTextInput from "../../components/AppTextInput";
import {FieldValues, useForm} from "react-hook-form";
import {User} from "../../app/models/user";
import LoadingButton from "../../components/LoadingButton";
import {loginAsync} from "./accountSlice";
import {useAppDispatch} from "../../redux/store";

const inputStyle = "w-full bg-gray-200 p-2 rounded font-normal text-sm outline-none";

function LoginForm() {
    const dispatch = useAppDispatch();
    const {control, handleSubmit, formState: {isSubmitting}} = useForm<FieldValues>();
    const onSubmit = async (data: FieldValues) => {
        await dispatch(loginAsync(data as User));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"space-y-3 text-sm font-normal text-gray-700"}>
            <h2 className={"text-gray-700 text-xl font-bold text-left mb-5"}>Sign In</h2>
            <AppTextInput control={control} name={"email"} label={"Email"}
                          className={inputStyle}/>
            <AppTextInput control={control} name={"password"} label={"Password"} type={"password"}
                          className={inputStyle}/>
            <LoadingButton
                isLoading={isSubmitting}
                type={"submit"}
                className={"px-5 py-2 bg-primary text-white rounded w-full"}>
                Submit
            </LoadingButton>
        </form>
    )
}

export default LoginForm;