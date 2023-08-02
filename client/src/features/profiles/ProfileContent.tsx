import React from 'react';
import {Tab} from "@headlessui/react";
import ProfilePhotos from "./ProfilePhotos";
import {Profile} from "../../app/models/profile";
import ProfileAbout from "./ProfileAbout";
import ProfileFollowings from "./ProfileFollowings";

interface Props {
    profile: Profile;
}

function ProfileContent({profile}: Props) {
    const tabs = [
        {id: '1', title: 'About', content: <ProfileAbout profile={profile}/>},
        {id: '2', title: 'Photos', content: <ProfilePhotos profile={profile}/>},
        {id: '3', title: 'Events', content: <div>Content for Tab 3</div>},
        {id: '4', title: 'Followers', content: <div><ProfileFollowings predict={'followers'}/></div>},
        {id: '5', title: 'Following', content: <div><ProfileFollowings predict={'following'}/></div>},
    ];
    
    return (
        <Tab.Group as={"div"} className={"flex gap-10"}>
            <Tab.Panels className={"basis-9/12 shadow p-5 bg-white h-fit"}>
                {tabs.map((tab, index) => (
                    <Tab.Panel key={index}>
                        {tab.content}
                    </Tab.Panel>
                ))}
            </Tab.Panels>
            <Tab.List className={"flex flex-col basis-3/12 shadow divide-y text-sm bg-white font-semibold h-fit"}>
                {tabs.map((tab, index) => (
                    <Tab key={index}>
                        {({selected}) => (
                            <div className={`py-4 ${selected ? 'bg-primary text-white' : ''}`}>{tab.title}</div>
                        )}
                    </Tab>
                ))}
            </Tab.List>
        </Tab.Group>
    )
}

export default ProfileContent;