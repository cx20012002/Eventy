import React, {useEffect, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../redux/store";
import {fetchActivitiesAsync, setPagingParams} from "./activitySlice";
import ActivityList from "./ActivityList";
import ActivityFilters from "./ActivityFilters";
import LoadingComponent from "../../components/LoadingComponent";
import {PagingParams} from "../../app/models/Pagination";
import InfiniteScroll from "react-infinite-scroller";

function Dashboard() {
    const {status, activitiesLoaded, pagination} = useAppSelector(state => state.activity);
    const dispatch = useAppDispatch();
    const [loadingNext, setLoadingNext] = useState(false);

    function handleGetNext() {
        setLoadingNext(true);
        dispatch(setPagingParams(new PagingParams(pagination!.currentPage + 1)));
        dispatch(fetchActivitiesAsync()).then(() => setLoadingNext(false));
    }

    useEffect(() => {
        if (!activitiesLoaded) dispatch(fetchActivitiesAsync());
    }, [dispatch, activitiesLoaded])

    if (status === 'loading' && !loadingNext) return <LoadingComponent/>

    return (
        <div className={"grid grid-cols-12 gap-10"}>
            <div className={"col-span-8"}>
                <InfiniteScroll
                    pageStart={0}
                    loadMore={handleGetNext}
                    hasMore={!loadingNext && !!pagination && pagination.currentPage < pagination.totalPages}
                    initialLoad={false}
                >
                    <ActivityList/>
                </InfiniteScroll>
            </div>
            <div className={"col-span-4"}>
                <ActivityFilters/>
            </div>
            <div className={"col-span-10 relative"}>
                {loadingNext && <LoadingComponent partial={true}/>}
            </div>
        </div>
    )
}

export default Dashboard;