import { observer } from 'mobx-react-lite'
import { Link, NavLink } from 'react-router-dom'
import { Button, Container, Menu, Image, Dropdown, DropdownItem } from 'semantic-ui-react'
import { useStore } from '../stores/store'

export default observer(function NavBar() {
   const {
      userStore: { user, logout },
   } = useStore()
   return (
      <Menu inverted fixed='top'>
         <Container>
            <Menu.Item as={NavLink} to='/' header>
               <img src='/assets/logo.png' alt='logo' style={{ marginRight: '10px' }} />
               Reactivities
            </Menu.Item>
            <Menu.Item as={NavLink} name='Activities' to='/activities' />
            <Menu.Item>
               <Button as={NavLink} to='/createActivity' positive content='Create Activity' />
            </Menu.Item>
            <Menu.Item as={NavLink} name='Sample Screen' to='/sampleScreen/ThisIsAThing' />
            <Menu.Item as={NavLink} name='Errors' to='/errors' />
            <Menu.Item position='right'>
               <Image src={user?.image || '/assets/user.png'} avatar spaced='right' />
               <Dropdown pointing='top left' text={user?.displayName}>
                  <Dropdown.Menu>
                     <DropdownItem as={Link} to={`/profile/${user?.username}`} text='My Profile' icon='user' />
                     <DropdownItem onClick={logout} text='Logout' icon='power' />
                  </Dropdown.Menu>
               </Dropdown>
            </Menu.Item>
         </Container>
      </Menu>
   )
})
