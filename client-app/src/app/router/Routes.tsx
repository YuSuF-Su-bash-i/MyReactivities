import { createBrowserRouter, Navigate, RouteObject } from "react-router-dom";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import SampleScreen from "../../features/activities/Sample/SampleScreen";
import NotFound from "../../features/Errors/NotFound";
import TestErrors from "../../features/Errors/TestError";
import App from "../layout/App";

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: 'activities', element: <ActivityDashboard /> },
      { path: 'activities/:id', element: <ActivityDetails /> },
      { path: 'createActivity', element: <ActivityForm key='create' /> },
      { path: 'sampleScreen/:id', element: <SampleScreen /> },
      { path: 'manage/:id', element: <ActivityForm key='manage' /> },
      { path: 'errors', element: <TestErrors /> },
      { path: 'not-found', element: <NotFound /> },
      { path: '*', element: <Navigate replace to='/not-found' /> }, //if user enters meaningles url like localhost:5000/qweqwewqe then navigate to notfound page
    ]
  }
]

export const router = createBrowserRouter(routes);