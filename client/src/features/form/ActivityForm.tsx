import React, {useEffect} from 'react';
import {FieldValues, useForm} from "react-hook-form";
import AppTextInput from "../../components/AppTextInput";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";
import AppSelectInput from "../../components/AppSelectInput";
import AppDateInput from "../../components/AppDateInput";
import LoadingButton from "../../components/LoadingButton";
import {Link, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {
    activitySelector,
    createActivityAsync,
    fetchActivityAsync,
    updateActivityAsync
} from "../activities/activitySlice";
import LoadingComponent from "../../components/LoadingComponent";
import moment from "moment-timezone";
import {Activity} from "../../app/models/Activity";
import {router} from "../../router/Routes";
import {v4 as uuid} from "uuid";


const categories = [
    {value: "drinks", text: "Drinks"},
    {value: "culture", text: "Culture"},
    {value: "film", text: "Film"},
    {value: "food", text: "Food"},
    {value: "music", text: "Music"},
    {value: "travel", text: "Travel"}
];

const inputStyle = "mt-3 rounded border border-gray-200 text-gray-800 text-sm w-full p-2.5 outline-none outline-0";

function ActivityForm() {
    const {id} = useParams<{ id: string }>();
    const dispatch = useAppDispatch();
    const selectedActivity = useAppSelector(state => activitySelector.selectById(state, id as string));
    const validationSchema = yup.object({
        title: yup.string().required(),
        description: yup.string().required(),
        category: yup.string().required(),
        date: yup.string().required(),
        venue: yup.string().required(),
        city: yup.string().required()
    } as FieldValues)
    
    const {control, handleSubmit, formState: {isValid, isSubmitting}, reset} = useForm<FieldValues>({
        resolver: yupResolver(validationSchema),
        mode: "all"
    });

    useEffect(() => {
        if (id && !selectedActivity) dispatch(fetchActivityAsync(id));
        reset(selectedActivity);
    }, [id, selectedActivity, dispatch, reset])

    const onSubmit = async (data: FieldValues) => {
        const date = moment(new Date(data.date)).format()
        if (id) {
            await dispatch(updateActivityAsync({...data, date, id} as Activity));
            await router.navigate(`/activities/${id}`);
        } else {
            const newActivity = {...data, date, id: uuid()} as Activity;
            await dispatch(createActivityAsync(newActivity));
            await router.navigate(`/activities/${newActivity.id}`);
        }
    }

    if (!selectedActivity && id && !isSubmitting) return <LoadingComponent/>;

    return (
        <div className={"min-h-screen"}>
            <form onSubmit={handleSubmit(onSubmit)} className={"w-[800px] shadow bg-white rounded mx-auto p-8"}>
                <h2 className={"font-medium text-primary"}>Activity Form</h2>
                <AppTextInput name={"title"} control={control} label={"Title"} className={inputStyle}/>
                <AppTextInput multiline={"yes"} rows={5} name={"description"} control={control} label={"Description"}
                              className={inputStyle}/>
                <AppSelectInput label={"Category"} items={categories} name={"category"} control={control}/>
                <AppDateInput name={"date"} control={control} label={"Date"} showTimeSelect timeCaption={"time"}
                              dateFormat={"d MMM, yyy h:mm aa"}/>
                <h2 className={"mt-3 font-medium text-primary"}>Location Details</h2>
                <AppTextInput name={"venue"} control={control} label={"Venue"} className={inputStyle}/>
                <AppTextInput name={"city"} control={control} label={"City"} className={inputStyle}/>
                <div className={"flex justify-end gap-3 mt-5 text-sm"}>
                    <Link to={`/activities/${id || ''}`} className={"bg-neutral-200 px-5 py-2 rounded"}>Cancel</Link>
                    <LoadingButton
                        isLoading={isSubmitting}
                        disabled={!isValid}
                        className={"bg-primary px-5 py-2 rounded text-white disabled:opacity-50"}
                    >
                        Submit
                    </LoadingButton>
                </div>
            </form>
        </div>
    )
}

export default ActivityForm;