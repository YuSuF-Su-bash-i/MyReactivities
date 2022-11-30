import React from "react";
import { Grid } from "semantic-ui-react";
import { Activity } from "../../../app/models/activity";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import ActivityList from "./ActivityList";

interface inputData {
  activities: Activity[];
  selectedActivity: Activity | undefined
  handleSelectActivity: (id: string) => void
  handleCancelSelectedActivity: () => void
  editMode: boolean
  openForm: (id: string) => void
  closeForm: () => void
  handleCreateOrEditActivity: (activity: Activity) => void;
  handleDeleteActivity: (id: string) => void;
  submitting: boolean;
  deleting: boolean;
}


export default function ActivityDashboard({ activities, 
                                            selectedActivity, 
                                            handleSelectActivity, 
                                            handleCancelSelectedActivity, 
                                            editMode, 
                                            openForm, 
                                            closeForm, 
                                            handleCreateOrEditActivity, 
                                            handleDeleteActivity, 
                                            submitting,
                                            deleting }: inputData) {
  return (
    <Grid>
      <Grid.Column width='10'>
        <ActivityList
          activities={activities}
          selectedActivity={selectedActivity}
          handleSelectActivity={handleSelectActivity}
          handleDeleteActivity={handleDeleteActivity}
          deleting={deleting} />
      </Grid.Column>
      <Grid.Column width='6'>
        {selectedActivity && !editMode &&
          < ActivityDetails
            activity={selectedActivity}
            handleCancelSelectedActivity={handleCancelSelectedActivity}
            openForm={openForm}
          />}
        {editMode &&
          <ActivityForm closeForm={closeForm}
            activity={selectedActivity}
            handleCreateOrEditActivity={handleCreateOrEditActivity}
            submitting={submitting} />
        }
      </Grid.Column>
    </Grid>
  )
}