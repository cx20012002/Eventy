import React from 'react';
import {Calendar} from "react-calendar";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {fetchActivitiesAsync, setPredicate} from "./activitySlice";

function ActivityFilters() {
    const dispatch = useAppDispatch();

    return (
        <>
            <div className={"bg-white divide-y-2 shadow mb-5"}>
                <header className={"text-primary text-lg font-bold p-3 pl-5"}>
                    <i className={"fa fa-filter text-2xl mr-2 "}></i> Filters
                </header>
                <ul className={"divide-y"}>
                    <button
                        onClick={() => dispatch(setPredicate({key: 'all', value: true}))}
                        className={"p-3 pl-5 block w-full text-left"}>
                        All Activities
                    </button>
                    <button
                        onClick={() => dispatch(setPredicate({key: 'isGoing', value: true}))}
                        className={"p-3 pl-5 block w-full text-left"}>
                        I'm going
                    </button>
                    <button
                        onClick={() => dispatch(setPredicate({key: 'isHost', value: true}))}
                        className={"p-3 pl-5 block w-full text-left"}>
                        I'm hosting
                    </button>
                </ul>
            </div>
            <Calendar
                onChange={(date) => {
                    dispatch(setPredicate({key: 'startDate', value: date as Date}));
                    dispatch(fetchActivitiesAsync());
                }}
                className={"w-full border-0 shadow p-3"}/>
        </>
    )
}

export default ActivityFilters;