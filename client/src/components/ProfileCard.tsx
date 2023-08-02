import React, {Fragment, useState} from 'react';
import {Popover, Transition} from "@headlessui/react";
import {Profile} from "../app/models/profile";
import {BiSolidUser} from "react-icons/bi";
import {Link} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../redux/store";
import {updateAttendeeFollowingAsync} from "../features/activities/activitySlice";
import LoadingButton from "./LoadingButton";

interface Props {
    attendee: Profile;
}

function ProfileCard({attendee}: Props) {
    const [isHovered, setIsHovered] = useState(false);
    const dispatch = useAppDispatch();
    const {status} = useAppSelector(state => state.activity)
    const {user} = useAppSelector(state => state.account)
    const handleHover = () => {
        setIsHovered(true);
    };
    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    
    return (
        <>
            <Popover className="relative">
                <>
                    <Link to={`/profiles/${attendee.username}`}>
                        <img 
                            className={`rounded-full w-12 h-12 ${attendee.following ? 'outline outline-primary' : ''}`} 
                            onMouseEnter={handleHover} 
                            onMouseLeave={handleMouseLeave}
                            src={attendee.image || "/assets/user.png"} 
                            alt=""
                        />
                    </Link>
                    <Transition
                        as={Fragment}
                        show={isHovered}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                    >
                        <Popover.Panel
                            onMouseEnter={handleHover}
                            onMouseLeave={handleMouseLeave}
                            className="absolute z-10 bg-white shadow-lg rounded p-3 w-52">
                            <div className="space-y-3">
                                <img className={"w-full"} src={attendee.image || '/assets/user.png'}
                                     alt={attendee.username}/>
                                <h3 className={"font-bold"}>{attendee.displayName}</h3>
                                <small>Bio goes here</small>
                                <hr className={"block my-3"}/>
                                 <small className={"flex items-center gap-2"}>
                                     <BiSolidUser size={15}/> {attendee.followersCount} Followers
                                 </small>
                                {user?.username !== attendee.username &&
                                    <LoadingButton
                                        isLoading={status === 'updating'}
                                        disabled={status === 'updating'}
                                        onClick={()=>dispatch(updateAttendeeFollowingAsync(attendee.username))}
                                        className={`w-full h-8 text-white text-sm disabled:opacity-50 ${attendee.following ? ' bg-orange-500' : 'bg-primary'}`}>
                                        {attendee.following ? 'Unfollowing' : 'Following'}
                                    </LoadingButton>
                                }
                            </div>
                        </Popover.Panel>
                    </Transition>
                </>
            </Popover>
        </>
    )
}

export default ProfileCard;