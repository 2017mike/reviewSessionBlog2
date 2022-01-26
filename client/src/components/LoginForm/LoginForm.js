import {useState} from 'react'

import { FormControl, InputLabel, Input, FormHelperText, Button } from '@mui/material';
import axios from 'axios'

const LoginForm = () => {

  const [loginState, setLoginState] = useState({
    username: '',
    password: '',
  })

    const handleInputChange = ({ target: { name, value } }) => {
    setLoginState({ ...loginState, [name]: value })
  }

  const handleLogin = () => {
    let oldUser = {
      username: loginState.username,
      password: loginState.password
    }
    axios.post('/api/users/login', oldUser)
    .then(res=> {
      console.log(res.data)
      localStorage.setItem('token', res.data)
      window.location='/home'
    })
  }


  return (
    <>
    <h1>Login</h1>
      <FormControl>
       <InputLabel htmlFor="my-input">username</InputLabel>
       <Input 
       name="username"
       onChange={handleInputChange}
       />
      </FormControl>
      <br/>
      <br/>

      <FormControl>
       <InputLabel htmlFor="my-input">password</InputLabel>
       <Input 
       name="password"
       onChange={handleInputChange} />
      </FormControl>
      <br/>
      <br/>
    
      <Button onClick={handleLogin}>Login</Button>
    </>
  )
}

export default LoginForm