import { createBrowserRouter, RouteObject } from "react-router-dom";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import ActivityForm from "../../features/activities/form/ActivityForm";
import SampleScreen from "../../features/activities/Sample/SampleScreen";
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
    ]
  }
]

export const router = createBrowserRouter(routes);