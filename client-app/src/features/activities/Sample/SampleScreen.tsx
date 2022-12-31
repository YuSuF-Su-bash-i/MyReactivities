import { observer } from 'mobx-react-lite'
import React from 'react'
import { useParams } from 'react-router-dom'
import { Button } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import SampleModalForm from './SampleModalForm'

export default observer(function SampleScreen() {
   const { id } = useParams<{ id: string }>()
   console.log(id)
   const { modalStore } = useStore()
   return (
      <>
         <h1>{id}</h1>
         <Button onClick={() => modalStore.openModal(<SampleModalForm />)} size='big' inverted>
            Sample Modal Test
         </Button>
      </>
   )
})
