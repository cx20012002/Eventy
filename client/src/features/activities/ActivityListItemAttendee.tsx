import React from 'react';
import {Profile} from "../../app/models/profile";
import ProfileCard from "../../components/ProfileCard";

interface Props {
    attendees: Profile[];
}

function ActivityListItemAttendee({attendees}: Props) {
    return (
        <div className={"mt-auto flex gap-3"}>
            {attendees.map((attendee, index) => (
                <ProfileCard key={index} attendee={attendee}/>
            ))}
        </div>
    )
}

export default ActivityListItemAttendee;