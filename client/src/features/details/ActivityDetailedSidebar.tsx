import React from 'react';
import {Link} from "react-router-dom";
import {Activity} from "../../app/models/Activity";

interface Props {
    activity: Activity
}

function ActivityDetailedSidebar({activity: {attendees, host}}: Props) {
    if (!attendees) return null;
    return (
        <div className={"rounded overflow-hidden bg-white shadow"}>
            <div
                className={"bg-primary flex items-center justify-center text-white py-3"}>{attendees.length} {attendees.length === 1 ? 'Person' : 'People'} going
            </div>
            <ul className={"p-5 flex flex-col gap-5"}>
                {attendees.map((attendee, index) => (
                    <li key={index} className={"flex gap-5 w-full"}>
                        <img src={attendee.image || "/assets/user.png"} alt="User" className={"w-20"}/>
                        <div className={"flex justify-between w-full items-center"}>
                            <div className={"flex flex-col"}>
                                <Link to={`/profiles/${attendee.username}`}
                                      className={"font-medium text-gray-600"}>{attendee.displayName}</Link>
                                {attendee.following && (
                                    <span className={"text-sm text-orange-500"}>Following</span>
                                )}
                            </div>
                            {attendee.username === host?.username && (
                                <span className={"bg-primary text-white text-sm rounded px-5 py-1 h-fit"}>Host</span>
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default ActivityDetailedSidebar;