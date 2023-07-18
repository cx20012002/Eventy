import React, {useState} from 'react';
import {BiSolidTimeFive} from "react-icons/bi";
import {FaLocationDot} from "react-icons/fa6";
import {Activity} from "../../app/models/Activity";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {deleteActivityAsync} from "./activitySlice";
import LoadingButton from "../../components/LoadingButton";

interface Props {
    activity: Activity;
}

function ActivityListItem({activity}: Props) {
    const [target, setTarget] = useState<string>("");
    const {status} = useAppSelector(state => state.activity);
    const dispatch = useAppDispatch();
    const handleDelete = (id: string) => {
        setTarget(id);
        dispatch(deleteActivityAsync(id));
    }

    return (
        <div className={"rounded flex md:gap-8 gap-3"}>
            <div className={"flex flex-col basis-2/12"}>
                <img src={"/assets/user.png"} alt="Event Avatar" className={" aspect-square rounded object-cover"}/>
                <span className={"text-xs bg-primary text-white px-2 py-1 rounded text-center mt-5"}>Hosting</span>
            </div>
            <div className={"flex flex-col basis-8/12"}>
                <h3 className={"flex items-center text-lg font-medium text-primary"}>{activity.title}</h3>
                <hr className={"my-2"}/>
                <span className={"text-xs text-gray-500"}>Hosted by Tom</span>
                <div className={"text-xs text-gray-500 my-3 flex gap-5"}>
                    <span 
                        className={"text-gray-500 flex items-center gap-1"}>
                        <BiSolidTimeFive size={15} className={"text-primary"}/>
                        {activity.date}
                    </span>
                    <span 
                        className={"flex items-center gap-1"}>
                        <FaLocationDot size={15} className={"text-primary"}/> 
                        <span>{activity.city} {activity.venue}</span>
                    </span>
                </div>

                <div className={"mt-auto flex gap-2"}>
                    <img src={"/assets/user.png"} alt="Event Avatar" className={"w-9 rounded-full"}/>
                    <img src={"/assets/user.png"} alt="Event Avatar" className={"w-9 rounded-full"}/>
                    <img src={"/assets/user.png"} alt="Event Avatar" className={"w-9 rounded-full"}/>
                </div>
            </div>
            <div className={"text-right flex-col flex basis-2/12"}>
                <div className={"text-sm font-medium text-red-300 bg-red-100 w-fit self-end rounded text-center px-5 py-1"}>Canceled</div>
                <div className={"mt-auto gap-2 flex"}>
                    <LoadingButton 
                        isLoading={status==='deleting' && target===activity.id} 
                        onClick={() => {handleDelete(activity.id)}} 
                        className={"px-5 py-2 bg-red-800 text-white text-sm w-20 text-center rounded"}>
                        Delete
                    </LoadingButton>
                    <Link to={`/activities/${activity.id}`} className={"px-5 py-2 bg-primary text-white text-sm text-center rounded"}>View</Link>
                </div>
            </div>
        </div>
    )
}

export default ActivityListItem;