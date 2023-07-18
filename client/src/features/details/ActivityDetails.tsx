import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {activitySelector, fetchActivityAsync} from "../activities/activitySlice";
import LoadingComponent from "../../components/LoadingComponent";
import ActivityDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailedInfo from "./ActivityDetailedInfo";
import ActivityDetailedChat from "./ActivityDetailedChat";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";

function ActivityDetails() {
    const {id} = useParams<{ id: string }>();
    const selectedActivity = useAppSelector(state => activitySelector.selectById(state, id as string));
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!selectedActivity && id) dispatch(fetchActivityAsync(id as string));
    }, [id, selectedActivity, dispatch])

    if (!selectedActivity) return <LoadingComponent/>

    return (
        <div className={"grid grid-cols-12 gap-5 min-h-screen"}>
            <div className={"col-span-7"}>
                <ActivityDetailedHeader activity={selectedActivity}/>
                <ActivityDetailedInfo activity={selectedActivity}/>
                <ActivityDetailedChat/>
            </div>
            <div className={"col-span-5"}>
                <ActivityDetailedSidebar/>
            </div>
        </div>
    )
}

export default ActivityDetails;