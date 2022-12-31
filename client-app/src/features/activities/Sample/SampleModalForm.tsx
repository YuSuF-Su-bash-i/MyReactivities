import { Form, Formik } from 'formik'
import { Button } from 'semantic-ui-react'
import YTextInput from '../../../app/common/form/YTextInput'
import { store } from '../../../app/stores/store'

export default function SampleModalForm() {
   return (
      <Formik initialValues={{ title: '', name: '', age: '' }} onSubmit={(values) => SubmitWorkBabe(values.title, values.name, values.age)}>
         {({ handleSubmit }) => (
            <Form className='ui form' onSubmit={handleSubmit} autoComplete='off'>
               <YTextInput placeholder='Title' name='title' />
               <YTextInput placeholder='Name' name='name' />
               <YTextInput placeholder='Age' name='age' />
               <Button positive content='Do Sample Thing' type='submit' fluid />
            </Form>
         )}
      </Formik>
   )
}

function SubmitWorkBabe(title: string, name: string, age: string) {
   let combinedString = `Title:${title} - Name:${name} - Age:${age}`
   localStorage.setItem('sampleModalWork', combinedString)
   store.modalStore.closeModal()
}
