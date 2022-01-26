import {useState, useEffect} from 'react'
import {TextField, Button} from '@mui/material';
import axios from 'axios'

const Home = () => {

const [thoughtState, setThoughtState] = useState({
  body: '',
  thoughts: []
})
  const handleInputChange = ({ target: { name, value } }) => {
    setThoughtState({ ...thoughtState, [name]: value })
  }

  useEffect(() => {
   axios.get('/api/thoughts',  {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res=> {
        console.log(res.data)
        setThoughtState({...thoughtState, thoughts: res.data})
      })
  }, [])

  const handleSubmitThought = () => {
    let newThought = {
      body: thoughtState.body
    }
    axios.post('/api/thoughts', newThought,  {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res=> {
        console.log(res)
      })
  }
  const handleGoToThought = (id) => {
    console.log(id)
    window.location=`/thought/${id}`
  }


  return (
    <>
      <h1>welcome to the coder's lounge</h1>
      <TextField
          label="what's yo thought"
          multiline
          rows={4}
          name='body'
          onChange={handleInputChange}
        />
        <Button
        onClick={handleSubmitThought}
        >Submit yo thought boi</Button>
         {
    thoughtState.thoughts.map(thought=> 
      <>
      <h3>{thought.body}</h3>
      <h4>by {thought.user.username}</h4>
      <Button onClick={()=>handleGoToThought(thought._id)}>See More</Button>
     
      {/* this is how you need to write functions that take in parameters onClick */}
      </>
      )
        }
    </>
 
  )
}

export default Home
