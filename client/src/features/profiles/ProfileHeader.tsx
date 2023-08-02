import React from 'react';
import {Profile} from "../../app/models/profile";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {updateAttendeeFollowingAsync} from "../activities/activitySlice";
import LoadingButton from "../../components/LoadingButton";

interface Props {
    profile: Profile;
}

function ProfileHeader({profile}: Props) {
    const dispatch = useAppDispatch();
    const {status} = useAppSelector(state => state.activity);
    const {user} = useAppSelector(state => state.account)

    return (
        <section className={"flex mb-10 gap-10"}>
            <div className={"basis-9/12 flex items-center gap-5"}>
                <img className={"w-32 h-32 rounded-full"} src={profile.image || "/assets/user.png"} alt=""/>
                <h3 className={"font-bold text-xl"}>{profile.displayName}</h3>
            </div>
            <div className={"basis-3/12 flex justify-end"}>
                <div className={"w-full"}>
                    <div className={"flex justify-between gap-5"}>
                        <div className={"flex flex-col items-center"}>
                            <div className={"text-5xl font-medium"}>{profile.followersCount}</div>
                            <small className={"uppercase font-semibold"}>Follower</small>
                        </div>
                        <div className={"flex flex-col items-center"}>
                            <div className={"text-5xl font-medium"}>{profile.followingCount}</div>
                            <small className={"uppercase font-semibold"}>Following</small>
                        </div>
                    </div>
                    <hr className={"my-5"}/>
                    {user?.username !== profile.username &&
                        <LoadingButton
                            isLoading={status === 'updating'}
                            disabled={status === 'updating'}
                            onClick={() => dispatch(updateAttendeeFollowingAsync(profile.username))}
                            className={"w-full h-10 bg-primary text-white rounded disabled:opacity-50"}>
                            {profile.following ? 'Unfollowing' : 'Following'}
                        </LoadingButton>
                    }
                </div>
            </div>
        </section>
    )
}

export default ProfileHeader;