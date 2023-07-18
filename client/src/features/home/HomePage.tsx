import React from 'react';
import {Link} from "react-router-dom";
import {AiOutlineArrowRight} from "react-icons/ai";
import {useAppSelector} from "../../redux/store";
import ModalComponent from "../../components/ModalComponent";
import LoginForm from "../users/LoginForm";
import RegisterForm from "../users/RegisterForm";

function HomePage() {
    const {user} = useAppSelector(state => state.account);

    return (
        <div className="relative isolate bg-gray-900 h-screen flex flex-col items-center justify-center text-white">
            <img
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
                alt="Home Background"
                className="absolute inset-0 -z-10 h-full w-full object-cover object-right md:object-center"
            />

            <div className={"max-w-[850px] text-center space-y-8"}>
                <h3 className={"border border-white border-opacity-30 rounded-full px-5 py-2 w-fit inline-block text-gray-400"}>Welcome
                    to announcing our next round of funding.</h3>
                <h1 className={"text-7xl font-bold "}>Where Dreams Flourish, Events Blossom!</h1>
                <p className={"text-xl text-gray-400 px-20"}>Anim aute id magna aliqua ad ad non deserunt sunt. Qui
                    irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.</p>
                <div className={"flex justify-center gap-5 font-medium"}>
                    {user ?
                        <>
                            <Link to={'/activities'} className={"px-5 py-2 bg-primary rounded"}>Get Started</Link>
                            <Link to={'/'} className={"px-5 py-2 rounded"}>Learn more <AiOutlineArrowRight
                                className={"inline"}/></Link>
                        </> : 
                        <>
                            <ModalComponent buttonLabel={'Login'} children={<LoginForm/>} className={"w-32 py-2 bg-primary rounded"}/>
                            <ModalComponent buttonLabel={'Register'} children={<RegisterForm/>} className={"w-32 py-2 bg-orange-500 rounded"}/>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default HomePage;