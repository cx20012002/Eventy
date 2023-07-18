import React, {useState} from 'react';
import AppTextInput from "../../components/AppTextInput";
import LoadingButton from "../../components/LoadingButton";
import {useAppDispatch} from "../../redux/store";
import {FieldValues, useForm} from "react-hook-form";
import {registerAsync} from "./accountSlice";
import {UserFormValues} from "../../app/models/user";

const inputStyle = "w-full bg-gray-200 p-2 rounded font-normal text-sm outline-none";

function RegisterForm() {
    const [errors, setErrors] = useState<string[]>([]);
    const dispatch = useAppDispatch();
    const {control, handleSubmit, formState: {isSubmitting}} = useForm<FieldValues>();
    const onSubmit = async (data: FieldValues) => {
        try {
            await dispatch(registerAsync(data as UserFormValues)).unwrap();
        } catch (err: any) {
            setErrors(err)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={"space-y-3 text-sm font-normal text-gray-700"}>
            <h2 className={"text-gray-700 text-xl font-bold text-left mb-5"}>Join Us for the Events</h2>
            <AppTextInput control={control} name={"displayName"} label={"Display Name"} className={inputStyle}/>
            <AppTextInput control={control} name={"username"} label={"Username"} className={inputStyle}/>
            <AppTextInput control={control} name={"email"} label={"Email"} className={inputStyle}/>
            <AppTextInput control={control} name={"password"} label={"Password"} type={"password"}
                          className={inputStyle}/>
            <LoadingButton
                isLoading={isSubmitting}
                type={"submit"}
                className={"px-5 py-2 bg-primary text-white rounded w-full"}>
                Sign Up
            </LoadingButton>
            {errors.length > 0 &&
                <div className={"bg-red-100 p-3 rounded space-y-1"}>
                    {errors.map((error, i) => (
                        <div key={i} className={"text-red-600 text-xs text-left"}>{error}</div>
                    ))}
                </div>
            }
        </form>
    )
}

export default RegisterForm;