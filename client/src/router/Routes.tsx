import App from "../app/layout/App";
import {createBrowserRouter, RouteObject} from "react-router-dom";
import Dashboard from "../features/activities/Dashboard";
import ActivityDetails from "../features/details/ActivityDetails";
import ActivityForm from "../features/form/ActivityForm";
import ErrorsTest from "../features/errors/ErrorsTest";
import ServerErrorPage from "../features/errors/ServerErrorPage";
import NotFoundPage from "../features/errors/NotFoundPage";
import ProfilePage from "../features/profiles/ProfilePage";

const Routes: RouteObject[] = [
    {
        path: '/',
        element: <App/>,
        children: [
            {path: 'activities', element: <Dashboard/>},
            {path: 'activities/:id', element: <ActivityDetails/>},
            {path: 'createActivity', element: <ActivityForm/>},
            {path: 'manage/:id', element: <ActivityForm key={"manage"}/>},
            {path: 'profiles/:username', element: <ProfilePage/>},
            {path: 'errors', element: <ErrorsTest/>},
            {path: 'server-error', element: <ServerErrorPage/>},
            {path: 'not-found', element: <NotFoundPage/>},
        ]
    }
]

export const router = createBrowserRouter(Routes);