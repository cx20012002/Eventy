import React from 'react';

function ActivityDetailedChat() {
    return (
        <div className={"mt-5 rounded overflow-hidden bg-white shadow"}>
            <div className={"bg-primary text-white p-3 flex justify-center items-center"}>
                Chat about this event
            </div>
            <div className={"p-5 text-sm"}>
                <textarea
                    name="chatbox"
                    rows={3}
                    className={"w-full border border-gray-300 rounded outline-none p-3"}
                    placeholder={"Enter your comment (Enter to submit, SHIFT + Enter for new line)"}
                />
                <ul className={"mt-5 flex flex-col gap-5"}>
                    <li className={"flex items-center gap-5"}>
                        <img src="/assets/user.png" alt="" className={"w-10 rounded-full"}/>
                        <div>
                            <div className={"font-medium"}>Bob <small className={"text-gray-500"}>5 month ago</small>
                            </div>
                            <p>This is a great activity!</p>
                        </div>
                    </li>
                    <li className={"flex items-center gap-5"}>
                        <img src="/assets/user.png" alt="" className={"w-10 rounded-full"}/>
                        <div>
                            <div className={"font-medium"}>Tom <small className={"text-gray-500"}>7 month ago</small>
                            </div>
                            <p>Perfect I love this!</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default ActivityDetailedChat;