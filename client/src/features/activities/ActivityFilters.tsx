import React from 'react';
import {Calendar} from "react-calendar";

function ActivityFilters() {
    return (
        <>
            <div className={"bg-white divide-y-2 shadow mb-5"}>
                <header className={"text-primary text-lg font-bold p-3 pl-5"}>
                    <i className={"fa fa-filter text-2xl mr-2 "}></i> Filters
                </header>
                <ul className={"divide-y"}>
                    <li className={"p-3 pl-5"}>All Activities</li>
                    <li className={"p-3 pl-5"}>I'm going</li>
                    <li className={"p-3 pl-5"}>I'm hosting</li>
                </ul>
            </div>
            <Calendar className={"w-full border-0 shadow p-3"}/>
        </>
    )
}

export default ActivityFilters;