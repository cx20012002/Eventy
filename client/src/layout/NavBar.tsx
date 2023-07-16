import React from 'react'

const menuList = [
    {name: 'Activities', url: '/', active: true},
    {name: 'Errors', url: '/about', active: false},
    {name: 'Contact', url: '/contact', active: false},
    {name: 'About Us', url: '/blog', active: false},
]

function NavBar() {
    return (
        <header className={"bg-gray-800 text-sm"}>
            <div className={"container mx-auto h-16 flex items-center justify-between text-gray-100 sm:px-5 px-2"}>
                <div className={"flex items-center"}>
                    <div className={"mr-10"}>
                        <img
                            className="h-8 w-auto"
                            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                            alt="Your Company"
                        />
                    </div>
                    <ul className={"flex gap-5"}>
                        {menuList.map((item, index) => (
                            <li key={index} className={`${item.active ? 'bg-gray-900' : 'hover:bg-gray-700'} rounded-md px-3 py-2 font-medium`}>{item.name}</li>
                        ))}
                    </ul>
                </div>
                <div className={"flex items-center gap-5"}>
                    <button className={"px-5 py-2 bg-primary rounded"}>Create Activity</button>
                    <img
                        className="h-8 w-8 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                    />
                    <button>Sign In</button>
                </div>
            </div>
        </header>
    )
}

export default NavBar