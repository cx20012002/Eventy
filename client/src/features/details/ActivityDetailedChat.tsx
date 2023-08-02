import React, {useEffect} from 'react';
import {createHubConnection, sendComment, stopHubConnect} from "../activities/commentSlice";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import AppTextInput from "../../components/AppTextInput";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from "yup";
import {FieldValues, useForm} from "react-hook-form";
import {formatDistanceToNow} from "date-fns";

interface Props {
    activityId: string;
}

function ActivityDetailedChat({activityId}: Props) {
    const dispatch = useAppDispatch();
    const {comments} = useAppSelector(state => state.comment);
    const {handleSubmit, control, reset, formState: {isValid}} = useForm<FieldValues>({
        resolver: yupResolver(yup.object({
            body: yup.string().required('Comment is required')
        } as FieldValues)),
        mode: "onSubmit"
    });

    const onSubmit = async (values: FieldValues) => {
        values.activityId = activityId;
        await dispatch(sendComment(values))
        reset();
    }

    useEffect(() => {
        if (activityId) {
            dispatch(createHubConnection(activityId));
            return () => {
                dispatch(stopHubConnect())
            }
        }
    }, [activityId, dispatch])

    return (
        <div className={"mt-5 rounded overflow-hidden bg-white shadow"}>
            <div className={"bg-primary text-white p-3 flex justify-center items-center"}>
                Chat about this event
            </div>
            <div className={"p-5 text-sm"}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <AppTextInput
                        control={control}
                        name="body"
                        multiline={'true'}
                        rows={3}
                        className={"w-full border border-gray-300 rounded outline-none p-3"}
                        label={"Enter your comment (Enter to submit, SHIFT + Enter for new line)"}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && e.shiftKey) {
                                return;
                            }
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                isValid && handleSubmit(onSubmit)();
                            }
                        }}
                    />
                </form>

                <ul className={"mt-5 flex flex-col gap-5"}>
                    {comments && comments.map(comment => (
                        <li key={comment.id} className={"flex items-center gap-5"}>
                            <img src={comment.image || "/assets/user.png"} alt="" className={"w-10 rounded-full"}/>
                            <div>
                                <div className={"font-medium"}>{comment.displayName} <small
                                    className={"text-gray-500"}>{formatDistanceToNow(comment.createdAt)} ago</small></div>
                                <p>{comment.body}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default ActivityDetailedChat;