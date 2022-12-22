import { useField } from 'formik'
import React from 'react'
import { Form, Label } from 'semantic-ui-react'
import DatePicker, { ReactDatePickerProps } from 'react-datepicker'

/* 
We use Partial<ReactDatePickerProps> instead of ReactDatePickerProps only. 
It's because some of the props of ReactDatePickerProps (you can see them via hitting F12 after clicking on it) are not optional (at least onChange event is not optional)
So we're telling that we want to make all of those properties are optional via using Partial<..>
*/
export default function YDateInput(props: Partial<ReactDatePickerProps>) {
   const [field, meta, helpers] = useField(props.name!)

   return (
      <Form.Field error={meta.touched && !!meta.error}>
         <DatePicker {...field} {...props} selected={(field.value && new Date(field.value)) || null} onChange={(value) => helpers.setValue(value)} />
         {meta.touched && meta.error ? (
            <Label basic color='red'>
               {meta.error}
            </Label>
         ) : null}
      </Form.Field>
   )
}
