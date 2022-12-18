import { observer } from 'mobx-react-lite'
import React from 'react'
import { Container, Header, Segment } from 'semantic-ui-react'
import { useStore } from '../../app/stores/store'

export default observer(function ServerError() {
     const { commonStore } = useStore()
     const { serverError } = commonStore
     return (
          <Container>
               <Header as='h1' content='Server Error' />
               <Header
                    sub
                    as='h5'
                    color='red'
                    content={serverError?.message}
               ></Header>
               {serverError?.details && (
                    <Segment>
                         <Header as='h4' color='teal' content='Stack Trace' />
                         <code style={{ margin: '10px' }}>
                              {serverError?.details}
                         </code>
                    </Segment>
               )}
          </Container>
     )
})
