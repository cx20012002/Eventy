import React, {useEffect} from 'react';
import ProfileHeader from "./ProfileHeader";
import ProfileContent from "./ProfileContent";
import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {getProfileAsync} from "./profileSlice";
import LoadingComponent from "../../components/LoadingComponent";

function ProfilePage() {
    const {username} = useParams<{ username: string }>();
    const dispatch = useAppDispatch();
    const {profile, status} = useAppSelector(state => state.profile);

    useEffect(() => {
        dispatch(getProfileAsync(username!));
    }, [dispatch, username])
    
    if (status === 'loading') return <LoadingComponent content={"Loading profile..."}/>

    return (
        <>
            {profile &&
                <>
                    <ProfileHeader profile={profile}/>
                    <ProfileContent profile={profile}/>
                </>
            }
        </>
    )
}

export default ProfilePage;