import React, { useEffect, useState } from 'react'
import { Container } from 'semantic-ui-react'
import { Activity } from '../models/activity'
import NavBar from './NavBar'
import ActivityDashboard from '../../features/activities/dashboard/ActivityDashboard'
import { v4 as uuid } from 'uuid';
import agent from '../api/agent'
import LoadingComponent from './LoadingComponent'

function App() {
     const [activities, setActivities] = useState<Activity[]>([])
     const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
     const [editMode, setEditMode] = useState(false)
     const [loading, setLoading] = useState(true);
     const [submitting, setSubmitting] = useState(false);
     const [deleting, setDeleting] = useState(false);

     useEffect(() => {
          agent.Activities.list().then(resp => {
               let activities: Activity[] = [];
               resp.forEach(activity => {
                    activity.date = activity.date.split('T')[0]
                    activities.push(activity);
               })
               setActivities(activities);
               setLoading(false);
          })
          //V1
          // axios.get('http://localhost:5000/api/activities').then((resp) => {
          //      setActivities(resp.data)
          //V2
          // axios.get<Activity[]>('http://localhost:5000/api/activities').then((resp) => {
          //      setActivities(resp.data)
          // })
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
          setSubmitting(true);
          if (activity.id) {
               agent.Activities.update(activity).then(() => {
                    setActivities([...activities.filter(s => s.id !== activity.id), activity])
                    setSelectedActivity(activity);
                    setEditMode(false);
                    setSubmitting(false);
               })
          } else {
               activity.id = uuid();
               agent.Activities.create(activity).then(() => {
                    setActivities([...activities, activity]);
                    setSelectedActivity(activity);
                    setEditMode(false);
                    setSubmitting(false);
               })
          }

          //just using local
          // activity.id ?
          //      setActivities([...activities.filter(s => s.id !== activity.id), activity])
          //      : setActivities([...activities, { ...activity, id: uuid() }]);
          // setEditMode(false);
          // setSelectedActivity(activity);

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
          setDeleting(true);
          agent.Activities.delete(id).then(() => {
               setActivities([...activities.filter(s => s.id !== id)])
               setDeleting(false);
          })
     }

     if (loading) return <LoadingComponent content='Loading app' />

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
                         submitting={submitting}
                         deleting={deleting}
                    />
               </Container>
          </>
     )
}

export default App
