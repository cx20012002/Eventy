import React, {useEffect} from 'react';
import './styles.css';
import NavBar from "./NavBar";
import {Outlet, useLocation} from "react-router-dom";
import {ToastContainer} from "react-toastify";
import HomePage from "../../features/home/HomePage";
import {useAppDispatch} from "../../redux/store";
import {fetchUserAsync, setUser} from "../../features/users/accountSlice";

function App() {
    const location = useLocation();
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (localStorage.getItem('jwt')) {
            dispatch(fetchUserAsync());
        } else {
            dispatch(setUser(undefined));
        }
    }, [dispatch])

    return (
        <>
            <ToastContainer position={'bottom-right'} hideProgressBar theme={'colored'}/>
            {location.pathname === '/' ? <HomePage/> : (
                <div className={"bg-gray-50"}>
                    <NavBar/>
                    <div className={"container sm:px-5 px-2 mt-16 mx-auto"}>
                        <Outlet/>
                    </div>
                </div>
            )}
        </>
    )
}

export default App;
