import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Container } from 'semantic-ui-react'
import { Activity } from '../models/activity'
import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { v4 as uuid } from 'uuid';

function App() {
     const [activities, setActvities] = useState<Activity[]>([])
     const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
     const [editMode, setEditMode] = useState(false)

     useEffect(() => {
          axios.get<Activity[]>('http://localhost:5000/api/activities').then((resp) => {
               setActvities(resp.data)
          })
     }, [])

     function handleSelectActivity(id: string) {
          setSelectedActivity(activities.find(s => s.id === id));
     }

     function handleCancelSelectedActivity() {
          setSelectedActivity(undefined);
     }

     function handleOpenForm(id?: string) {
          id ? handleSelectActivity(id) : handleCancelSelectedActivity();
          setEditMode(true)
     }

     function handleCloseForm() {
          setEditMode(false);
     }


     function handleCreateOrEditActivity(activity: Activity) {
          activity.id ?
               setActvities([...activities.filter(s => s.id !== activity.id), activity])
               : setActvities([...activities, { ...activity, id: uuid() }]);

          setEditMode(false);
          setSelectedActivity(activity);

          // amator versionum
          // if (activity.id === undefined) {
          //      //create new activity
          //      console.log("new activity created");
          // } else {
          //      //modify existing one
          //      activities.map((it) => {
          //           if (it.id === activity.id) {
          //                it = activity
          //                console.log("IT:" + JSON.stringify(it))
          //           }
          //      })
          //      setActvities(activities);
          // }
     }

     //y
     function handleDeleteActivity(id: string) {
          setActvities([...activities.filter(s => s.id !== id)])
     }

     return (
          <>
               <NavBar openForm={handleOpenForm} />
               <Container style={{ marginTop: '7em' }}>
                    <ActivityDashboard
                         activities={activities}
                         selectedActivity={selectedActivity}
                         handleSelectActivity={handleSelectActivity}
                         handleCancelSelectedActivity={handleCancelSelectedActivity}
                         editMode={editMode}
                         openForm={handleOpenForm}
                         closeForm={handleCloseForm}
                         handleCreateOrEditActivity={handleCreateOrEditActivity}
                         handleDeleteActivity={handleDeleteActivity}
                    />
               </Container>
          </>
     )
}

export default App
