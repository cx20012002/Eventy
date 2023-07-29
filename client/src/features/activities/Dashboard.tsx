import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {fetchActivitiesAsync} from "./activitySlice";
import ActivityList from "./ActivityList";
import ActivityFilters from "./ActivityFilters";
import LoadingComponent from "../../components/LoadingComponent";

function Dashboard() {
    const {status, activitiesLoaded} = useAppSelector(state => state.activity);
    const dispatch = useAppDispatch();

    useEffect(() => {
        console.log(123)
        if (!activitiesLoaded) dispatch(fetchActivitiesAsync());
    }, [dispatch, activitiesLoaded])
    
    if (status === 'loading') return <LoadingComponent/>
 
    
    return (
        <div className={"flex gap-10"}>
            <div className={"basis-8/12"}>
                <ActivityList/>
            </div>            
            <div className={"basis-4/12"}>
                <ActivityFilters/>
            </div>            
        </div>
    )
}

export default Dashboard;