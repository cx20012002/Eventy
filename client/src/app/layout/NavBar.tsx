import React, {Fragment} from 'react'
import {Link} from "react-router-dom";
import {useAppSelector} from "../../redux/store";
import {Menu, Transition} from "@headlessui/react";
import {BiSolidDownArrow, BiSolidUser} from "react-icons/bi";
import {FiPower} from "react-icons/fi";
import {logout} from "../../features/users/accountSlice";

const menuList = [
    {name: 'Activities', url: '/activities', active: true},
    {name: 'Errors', url: '/errors', active: false},
    {name: 'Contact', url: '/contact', active: false},
    {name: 'About Us', url: '/blog', active: false},
]

function NavBar() {
    const {user} = useAppSelector(state => state.account);
    return (
        <header className={"bg-gray-800 text-sm"}>
            <div className={"container mx-auto h-16 flex items-center justify-between text-gray-100 sm:px-5 px-2"}>
                <div className={"flex items-center"}>
                    <div className={"mr-10"}>
                        <Link to={"/"}>
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Your Company"
                            />
                        </Link>
                    </div>
                    <div className={"flex gap-5"}>
                        {menuList.map((item, index) => (
                            <Link to={item.name} key={index}
                                  className={`${item.active ? 'bg-gray-900' : 'hover:bg-gray-700'} rounded-md px-3 py-2 font-medium`}>{item.name}</Link>
                        ))}
                    </div>
                </div>
                <div className={"flex items-center gap-5"}>
                    <Link to={"/createActivity"} className={"px-5 py-2 bg-primary rounded"}>Create Activity</Link>
                    <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />
                    {user ?
                        <Menu as={"div"} className={"relative text-gray-700"}>
                            <Menu.Button className={"text-white flex items-center gap-2"}>Welcome {user.displayName}
                                <BiSolidDownArrow size={10}/></Menu.Button>
                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items
                                    className={"absolute flex flex-col right-0 mt-2 p-3 w-56 origin-top-right divide-y divide-gray-200 rounded-md bg-white shadow-lg"}>
                                    <Menu.Item>
                                        {({active}) => (
                                            <Link to={"/"}
                                                  className={`${active && 'bg-gray-100 rounded'} w-full p-3 flex items-center gap-2`}><BiSolidUser
                                                size={17}/> My Profile</Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({active}) => (
                                            <button onClick={() => logout()}
                                                  className={`${active && 'bg-gray-100 rounded'} w-full p-3 flex items-center gap-2`}><FiPower
                                                size={17}/> Logout</button>
                                        )}
                                    </Menu.Item>
                                </Menu.Items>
                            </Transition>
                        </Menu>
                        : <button>Sign In</button>
                    }
                </div>
            </div>
        </header>
    )
}

export default NavBar