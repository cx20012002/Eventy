import React from 'react';
import {Profile} from "../../app/models/profile";

interface Props {
    profile: Profile;
}

function ProfileHeader({profile}: Props) {
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
                            <div className={"text-5xl font-medium"}>5</div>
                            <small className={"uppercase font-semibold"}>Follower</small>
                        </div>
                        <div className={"flex flex-col items-center"}>
                            <div className={"text-5xl font-medium"}>42</div>
                            <small className={"uppercase font-semibold"}>Following</small>
                        </div>
                    </div>
                    <hr className={"my-5"}/>
                    <button className={"w-full py-2 bg-primary text-white rounded"}>Following</button>
                </div>
            </div>
        </section>
    )
}

export default ProfileHeader;