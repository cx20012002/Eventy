import React from 'react';
import {FaFilter} from "react-icons/fa";

function ActivityFilters() {
    return (
        <div className={"shadow rounded-lg bg-white h-20 p-5 text-primary"}>
            <h2 className={"flex items-center gap-3"}>
                <FaFilter/> Activities Filters
            </h2>
        </div>
    )
}

export default ActivityFilters;