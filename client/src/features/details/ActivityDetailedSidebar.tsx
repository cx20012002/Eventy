import React from 'react';

function ActivityDetailedSidebar() {
    return (
        <div className={"rounded overflow-hidden bg-white shadow"}>
            <div className={"bg-primary flex items-center justify-center text-white py-3"}>5 People going</div>
            <ul className={"p-5 flex flex-col gap-5"}>
                <li className={"flex gap-5 w-full"}>
                    <img src="/assets/user.png" alt="User" className={"w-20"}/>
                    <div className={"flex justify-between w-full items-center"}>
                        <div>Sam</div>
                        <span className={"bg-primary text-white text-sm rounded px-5 py-1 h-fit"}>Host</span>
                    </div>
                </li>
                <li className={"flex gap-5 w-full"}>
                    <img src="/assets/user.png" alt="User" className={"w-20"}/>
                    <div className={"flex justify-between w-full items-center"}>
                        <div>Bob</div>
                        <span className={"bg-primary text-white text-sm rounded px-5 py-1 h-fit"}>Host</span>
                    </div>
                </li>
                <li className={"flex gap-5 w-full"}>
                    <img src="/assets/user.png" alt="User" className={"w-20"}/>
                    <div className={"flex justify-between w-full items-center"}>
                        <div>Tom</div>
                        <span className={"bg-primary text-white text-sm rounded px-5 py-1 h-fit"}>Host</span>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default ActivityDetailedSidebar;