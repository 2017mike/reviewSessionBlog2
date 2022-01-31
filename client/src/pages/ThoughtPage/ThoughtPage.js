import {useEffect, useState} from 'react'
import {
  useParams
} from 'react-router-dom'
import axios from 'axios'
import {TextField, Button} from '@mui/material'



const ThoughtPage = () => {

  const [thoughtState, setThoughtState] = useState({
    body: '',
    user: '',
    createdAt: '',
    reactionBody: '',
    reactions: []
  })

  useEffect(() => {
    axios.get(`/api/thoughts/${params.id}`,  {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res=> {
        console.log(res)
        setThoughtState({...thoughtState, body: res.data.body,
        user: res.data.user.username,
        createdAt: res.data.createdAt,
        reactions: res.data.reactions
        })
      })
  }, [])

  const handleInputChange = ({ target: { name, value } }) => {
    setThoughtState({ ...thoughtState, [name]: value })
  }

  const handleSubmitReaction = () => {
    let newReaction = {
      body: thoughtState.reactionBody,
      thought_id: params.id
    }
    axios.post('/api/reactions', newReaction,  {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(res=> {
        console.log(res.data)
        let updatedReactions = JSON.parse(JSON.stringify(thoughtState.reactions))
        updatedReactions.push(res.data)
        setThoughtState({...thoughtState, reactions: updatedReactions})
      })
  }

  const params = useParams()
  console.log(params)

  return (
    <>
     <h1>{thoughtState.body}</h1>
     <h3>{thoughtState.user}</h3>
     <h5>{thoughtState.createdAt}</h5>

    <br></br>
      <TextField
          label="what's yo thought"
          multiline
          rows={4}
          name='reactionBody'
          onChange={handleInputChange}
        />
        <Button
        onClick={handleSubmitReaction}
        >Submit yo reaction boi</Button>
    {
        thoughtState.reactions.map(reaction => 
          <>
          <h4>{reaction.body}</h4>
          <hr/>
          </>
          )
    }
    </>
  )
}

export default ThoughtPage
