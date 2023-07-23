import React from 'react';
import {Activity} from "../../app/models/Activity";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {updateAttendeeAsync} from "../activities/activitySlice";
import LoadingButton from "../../components/LoadingButton";

interface Props {
    activity: Activity;
}

function ActivityDetailedHeader({activity}: Props) {
    const dispatch = useAppDispatch();
    const {status} = useAppSelector(state => state.activity)
    
    return (
        <div className={"bg-white shadow rounded overflow-hidden"}>
            <div className={"relative w-full"}>
                <div
                    className={"h-[350px] bg-cover bg-center bg-no-repeat brightness-50 -z-0"}
                    style={{backgroundImage: `url('/assets/categoryImages/${activity.category}.jpg')`}}
                />
                <div className={"absolute z-10 bottom-10 left-10 text-white"}>
                    <h1 className={"text-2xl font-medium"}>{activity.title}</h1>
                    <small className={"block mb-4"}>{activity.date}</small>
                    <small className={"block"}>
                        Hosted by <Link to={`/profiles/${activity.host?.username}`}><strong>{activity.host?.displayName}</strong></Link>
                    </small>
                </div>
            </div>
            <div className={"p-3 text-white text-sm flex"}>

                {activity.isHost ? (
                    <Link 
                        to={`/manage/${activity.id}`} 
                        className={"px-5 py-2 bg-orange-500 rounded ml-auto"}
                    >
                        Manage Activity
                    </Link>
                ) : activity.isGoing ? (
                    <LoadingButton 
                        isLoading={status === 'updating'} 
                        onClick={()=>dispatch(updateAttendeeAsync(activity.id))} 
                        className={"px-5 py-2 bg-gray-200 rounded text-gray-700 mr-2"}
                    >
                        Cancel attendance
                    </LoadingButton>
                ) : (
                    <LoadingButton 
                        isLoading={status === 'updating'} 
                        onClick={()=>dispatch(updateAttendeeAsync(activity.id))} 
                        className={"px-5 py-2 bg-primary rounded"}
                    >
                        Join Activity
                    </LoadingButton>
                )}

            </div>
        </div>
    )
}

export default ActivityDetailedHeader;