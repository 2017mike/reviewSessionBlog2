import {useState} from 'react'
import RegisterForm from '../../components/RegisterForm'
import LoginForm from '../../components/LoginForm'
import HideMe from '../../components/HideMe'
import {Button} from '@mui/material'

const Auth = () => {


  const [hideState, setHideState] = useState(false)
  const handleHide = () => {
    setHideState(!hideState)
  }
  return (
    <>
      <RegisterForm></RegisterForm>
      <br/>
      <br/>
      <br/>
      <br/>
      <LoginForm></LoginForm>

      {
        hideState ? <HideMe /> : null
      }
    <Button onClick={handleHide}>Show</Button>

    
    </>
  )
}

export default Auth
