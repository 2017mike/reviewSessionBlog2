const router = require('express').Router()
const { Thought, User, Reaction } = require('../models')
const passport = require('passport')

router.get('/reactions', passport.authenticate('jwt'), async function (req, res) {
  const reactions = await Reaction.find({}).populate('thought')
  res.json(reactions)
})

router.post('/reactions', passport.authenticate('jwt'), async function (req, res) {
  const reaction = await Reaction.create({ ...req.body, user: req.user._id, thought: req.body.thought_id })
  await User.findByIdAndUpdate(req.user._id, { $push: { reactions: reaction._id } })
  await Thought.findByIdAndUpdate(req.body.thought_id, { $push: { reactions: reaction._id } })
  res.json(reaction)
})

router.delete('/reactions/:id', passport.authenticate('jwt'), async function (req, res) {
  await Reaction.findByIdAndDelete(req.params.id)
  res.sendStatus(200)
})



module.exports = router