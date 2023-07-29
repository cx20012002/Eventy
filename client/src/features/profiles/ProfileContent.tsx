import React from 'react';
import {Tab} from "@headlessui/react";
import ProfilePhotos from "./ProfilePhotos";
import {Profile} from "../../app/models/profile";
import ProfileAbout from "./ProfileAbout";

interface Props {
    profile: Profile;
}

function ProfileContent({profile}: Props) {
    return (
        <Tab.Group as={"div"} className={"flex gap-10"}>
            <Tab.Panels className={"basis-9/12 shadow p-5 bg-white h-fit"}>
                <Tab.Panel><ProfileAbout profile={profile}/></Tab.Panel>
                <Tab.Panel><ProfilePhotos profile={profile}/></Tab.Panel>
                <Tab.Panel>Content 3</Tab.Panel>
                <Tab.Panel>Content 4</Tab.Panel>
                <Tab.Panel>Content 5</Tab.Panel>
            </Tab.Panels>
            <Tab.List className={"flex flex-col basis-3/12 shadow divide-y text-sm bg-white font-semibold h-fit"}>
                <Tab className={"py-3"}>About</Tab>
                <Tab className={"py-3"}>Photos</Tab>
                <Tab className={"py-3"}>Events</Tab>
                <Tab className={"py-3"}>Followers</Tab>
                <Tab className={"py-3"}>Following</Tab>
            </Tab.List>
        </Tab.Group>
    )
}

export default ProfileContent;