import {useState} from 'react'

import { FormControl, InputLabel, Input, FormHelperText, Button } from '@mui/material';
import axios from 'axios'

const RegisterForm = () => {

  const [registerState, setRegisterState] = useState({
    username: '',
    password: '',
    email: ''
  })

    const handleInputChange = ({ target: { name, value } }) => {
    setRegisterState({ ...registerState, [name]: value })
  }

  const handleRegister = () => {
    let newUser = {
      username: registerState.username,
      password: registerState.password,
      email: registerState.email
    }
    axios.post('/api/users/register', newUser)
    .then(res=> {
      console.log(res)
    })

  }


  return (
    <>

    <h1>Register</h1>
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
      <FormControl>
       <InputLabel htmlFor="my-input">email</InputLabel>
       <Input  
       name="email"
       onChange={handleInputChange}
       />
      </FormControl>
      <br/>
      <Button onClick={handleRegister}>Register</Button>
    </>
  )
}

export default RegisterForm
