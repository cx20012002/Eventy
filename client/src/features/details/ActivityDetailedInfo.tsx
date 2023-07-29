import React from 'react';
import {AiFillCalendar} from "react-icons/ai";
import {FaLocationDot} from "react-icons/fa6";
import {FaInfo} from "react-icons/fa";
import {Activity} from "../../app/models/Activity";

interface Props {
    activity: Activity;
}

function ActivityDetailedInfo({activity}: Props) {
    return (
        <div className={"bg-white mt-5 divide-y rounded text-sm shadow"}>
            <div className={"flex gap-5 items-center p-3"}>
                <FaInfo size={20} className={"text-primary"}/> <span>Activity 8 months in future future</span>
            </div>
            <div className={"flex gap-5 items-center p-3"}>
                <AiFillCalendar size={20} className={"text-primary"}/> <span>{activity.date}</span>
            </div>
            <div className={"flex gap-5 items-center p-3"}>
                <FaLocationDot size={20} className={"text-primary"}/> <span>{activity.venue}, {activity.city}</span>
            </div>
        </div>
    )
}

export default ActivityDetailedInfo;