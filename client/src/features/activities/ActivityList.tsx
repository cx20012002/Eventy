import React, {Fragment} from 'react';
import {useAppSelector} from "../../redux/store";
import ActivityListItem from "./ActivityListItem";
import {Activity} from "../../app/models/Activity";
import {activitySelector} from "./activitySlice";
import moment from "moment/moment";

function ActivityList() {
    const activities = useAppSelector(activitySelector.selectAll);
    const groupedActivities = Object.entries(activities.reduce((activities, activity) => {
            const date = moment(activity.date, "DD MMM, YYYY").format('DD MMM, YYYY');
            activities[date] = activities[date] ? [...activities[date], activity] : [activity];
            return activities;
        }, {} as { [key: string]: Activity[] })
    ).sort((a, b) => Date.parse(a[0]) - Date.parse(b[0]));
    
    return (
        <section className={"flex flex-col gap-5 "}>
            {groupedActivities && groupedActivities.map(([group, activities]) => (
                <div key={group}>
                    <div className={"shadow p-10 bg-white rounded-lg"}>
                        <h2 className={"rounded text-xs font-bold text-gray-500 mb-3"}>{group}</h2>
                        <div className={"flex flex-col gap-y-16"}>
                            {activities.map((activity) => (
                                <ActivityListItem activity={activity} key={activity.id}/>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </section>
    )
}

export default ActivityList;