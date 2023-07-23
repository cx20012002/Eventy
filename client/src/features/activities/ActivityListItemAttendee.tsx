import React from 'react';
import {Profile} from "../../app/models/profile";
import {Link} from "react-router-dom";

interface Props {
    attendees: Profile[];
}

function ActivityListItemAttendee({attendees}: Props) {
    return (
        <div className={"mt-auto flex gap-2"}>
            {attendees.map((attendee, index) => (
                <Link to={`/profiles/${attendee.username}`} key={index} className={"w-9 rounded-full overflow-hidden"}>
                    <img src={attendee.image || "/assets/user.png"} alt="Event Avatar"/>
                </Link>
            ))}
        </div>
    )
}

export default ActivityListItemAttendee;