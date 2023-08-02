import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {getFollowingsAsync} from "./profileSlice";
import LoadingComponent from "../../components/LoadingComponent";
import {BiSolidUser} from "react-icons/bi";
import LoadingButton from "../../components/LoadingButton";
import {updateAttendeeFollowingAsync} from "../activities/activitySlice";

interface Props {
    predict: string;
}

function ProfileFollowings({predict}: Props) {
    const dispatch = useAppDispatch();
    const {status, followings} = useAppSelector(state => state.profile);
    
    useEffect(()=>{
        dispatch(getFollowingsAsync(predict));    
    }, [dispatch])
    
    if (status === 'loading-followings') return <LoadingComponent partial={true} />
    
    return (
        <div className={"flex gap-5"}>
            {followings.map((profile, index) => (
                <div className="w-40 p-3 shadow" key={index}>
                    <img className={"w-full"} src={profile.image || '/assets/user.png'}
                         alt={profile.username}/>
                    <h3 className={"font-bold"}>{profile.displayName}</h3>
                    <small>Bio goes here</small>
                    <hr className={"block my-3"}/>
                    <small className={"flex items-center gap-2"}>
                        <BiSolidUser size={15}/> {profile.followersCount} Followers
                    </small>
                    {/*<LoadingButton*/}
                    {/*    isLoading={status === 'updating'}*/}
                    {/*    disabled={status === 'updating'}*/}
                    {/*    onClick={()=>dispatch(updateAttendeeFollowingAsync(profile.username))}*/}
                    {/*    className={`w-full h-8 mt-2 text-white text-sm disabled:opacity-50 ${profile.following ? ' bg-orange-500' : 'bg-primary'}`}>*/}
                    {/*    {profile.following ? 'Unfollowing' : 'Following'}*/}
                    {/*</LoadingButton>*/}
                </div>
            ))}
        </div>
    )
}

export default ProfileFollowings;