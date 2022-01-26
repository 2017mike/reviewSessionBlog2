const router = require('express').Router()
const { Thought, User, Reaction } = require('../models')
const passport = require('passport')

router.get('/thoughts', passport.authenticate('jwt'), async function (req, res) {
  const thoughts = await Thought.find({}).populate('user reactions')
  res.json(thoughts)
})

router.get('/thoughts/:id', passport.authenticate('jwt'), (req, res) => {
  Thought.findById(req.params.id).populate('user reactions')
    .then(thought => res.json(thought))
    .catch(err => console.log(err))
})

router.post('/thoughts', passport.authenticate('jwt'), async function (req, res) {
  const thought = await Thought.create({ ...req.body, user: req.user._id })
  await User.findByIdAndUpdate(req.user._id, { $push: { thoughts: thought._id } })
  res.json(thought)
})

router.put('/thoughts/:id', passport.authenticate('jwt'), async function (req, res) {
  const thought = await Thought.findByIdAndUpdate(req.params.id, { $set: req.body } )
  // await User.findByIdAndUpdate(req.user._id, { $push: { thoughts: thought._id } })
  res.sendStatus(200)
})

router.delete('/thoughts/:id', passport.authenticate('jwt'), async function (req, res) {
  await Thought.findByIdAndDelete(req.params.id)
  res.sendStatus(200)
})

module.exports = router
