const express = require('express');
const router = express.Router();
const Trick = require('../models/trick-model');
const User = require('../models/user-model');

router.get('/', async (req, res) => {
    try {
        const trick = await Trick.find();
        res.json(trick);
    }catch(err) {
        res.send("Error: ", err);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const trick = await Trick.findById(req.params.id);
        res.json(trick);
    }catch(err) {
        res.send("Error: ", err);
    }
});

router.get('/:id/trials', async (req, res) => {
    try {
        const trick = await Trick.findById(req.params.id).populate("trials");
        res.json(trick);
    } catch(err) {
        res.send("Error: ", err);
    }
})

router.post('/', async (req, res) => {
    const trick = new Trick({
        name: req.body.name,
        user: req.body.user
    });

    const user = await User.findById(req.body.user);

    try {
        const newTrick = await trick.save();
        user.tricks.push(newTrick._id);
        await user.save();
        res.json(trick);
    } catch(err) {
        res.send("Error: ", err)
    }
});


module.exports = router;