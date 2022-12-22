import { observer } from 'mobx-react-lite'
import React, { ChangeEvent, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button, Header, Segment } from 'semantic-ui-react'
import LoadingComponent from '../../../app/layout/LoadingComponent'
import { useStore } from '../../../app/stores/store'
import { v4 as uuid } from 'uuid'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import YTextInput from '../../../app/common/form/YTextInput'
import YTextArea from '../../../app/common/form/YTextArea'
import YSelectInput from '../../../app/common/form/YSelectInput'
import { categoryOptions } from '../../../app/common/form/options/categoryOptions'
import YDateInput from '../../../app/common/form/YDateInput'
import { Activity } from '../../../app/models/activity'

export default observer(function ActivityForm() {
   const { activityStore } = useStore()

   const { createActivity, updateActivity, loading, loadActivity, loadingInitial } = activityStore
   const { id } = useParams<{ id: string }>()
   const navigate = useNavigate()

   const [activity, setActivity] = useState<Activity>({
      id: '',
      title: '',
      category: '',
      description: '',
      date: null,
      city: '',
      venue: '',
   })

   const validationSchema = Yup.object({
      title: Yup.string().required('The activity title is required'),
      description: Yup.string().required('The activity description is required'),
      category: Yup.string().required('The activity category is required'),
      date: Yup.string().required('The activity date is required').nullable(),
      city: Yup.string().required('The activity city is required'),
      venue: Yup.string().required('The activity venue is required'),
   })

   useEffect(() => {
      if (id) loadActivity(id).then((activity) => setActivity(activity!))
   }, [id, loadActivity])

   function handleFormSubmit(activity: Activity) {
      if (!activity.id) {
         activity.id = uuid()
         createActivity(activity).then(() => navigate(`/activities/${activity.id}`))
      } else {
         updateActivity(activity).then(() => navigate(`/activities/${activity.id}`))
      }
   }

   function handleChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
      const { name, value } = event.target
      setActivity({ ...activity, [name]: value })
   }

   if (loadingInitial) return <LoadingComponent content='Loading activity...' />

   return (
      <Segment clearing>
         <Header content='Activity Details' sub color='teal' />
         <Formik validationSchema={validationSchema} enableReinitialize initialValues={activity} onSubmit={(values) => handleFormSubmit(values)}>
            {
               ({ handleSubmit, isSubmitting, dirty, isValid }) => (
                  <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
                     <YTextInput name='title' placeholder='Title' />
                     {/*we can use our own YTextInput.tsx component instead of these long code
                      <FormField>
                        <Field placeholder='Title' name='title' />
                        <ErrorMessage name='title' render={(error) => <Label basic color='red' content={error} />} />
                     </FormField> */}
                     <YTextArea name='description' placeholder='Description' rows={3} />
                     <YSelectInput options={categoryOptions} name='category' placeholder='Category' />
                     <YDateInput name='date' placeholderText='Date' showTimeSelect timeCaption='time' dateFormat='MMMM d, yyyy h:mm aa' />
                     <Header content='Location Details' sub color='teal' />
                     <YTextInput name='city' placeholder='City' />
                     <YTextInput name='venue' placeholder='Venue' />
                     <Button
                        disabled={isSubmitting || !dirty || !isValid}
                        loading={loading}
                        floated='right'
                        positive
                        type='submit'
                        content='Submit'
                     />
                     <Button as={Link} to='/activities' floated='right' type='button' content='Cancel' />
                  </Form>
               )
               /* 
                    import { Form } from 'semantic-ui-react'
                    {({ values: activity, handleChange, handleSubmit }) => (
                         <Form onSubmit={handleSubmit} autoComplete='off'>
                              <Form.Input
                                   placeholder='Title'
                                   value={activity.title}
                                   name='title'
                                   onChange={handleChange}
                              />
                              <Form.TextArea
                                   placeholder='Description'
                                   value={activity.description}
                                   name='description'
                                   onChange={handleChange}
                              />
                              <Form.Input
                                   placeholder='Category'
                                   value={activity.category}
                                   name='category'
                                   onChange={handleChange}
                              />
                              <Form.Input
                                   type='date'
                                   placeholder='Date'
                                   value={activity.date}
                                   name='date'
                                   onChange={handleChange}
                              />
                              <Form.Input
                                   placeholder='City'
                                   value={activity.city}
                                   name='city'
                                   onChange={handleChange}
                              />
                              <Form.Input
                                   placeholder='Venue'
                                   value={activity.venue}
                                   name='venue'
                                   onChange={handleChange}
                              />
                              <Button
                                   loading={loading}
                                   floated='right'
                                   positive
                                   type='submit'
                                   content='Submit'
                              />
                              <Button
                                   as={Link}
                                   to='/activities'
                                   floated='right'
                                   type='button'
                                   content='Cancel'
                              />
                         </Form>
                    )} */
            }
         </Formik>
      </Segment>
   )
})
