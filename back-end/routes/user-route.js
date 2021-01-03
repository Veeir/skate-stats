const express = require('express');
const router = express.Router();
const User = require('../models/user-model');

router.get('/', async (req, res) => {
    try {
        const tests = await User.find();
        res.json(tests);
    }catch(err) {
        res.send("Error: ", err);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    }catch(err) {
        res.send("Error: ", err);
    }
});

router.get('/:id/tricks', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate("tricks");
        res.json(user);
    } catch(err) {
        res.send("Error: ", err);
    }
})

router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name,
    });

    try {
        await user.save();
        res.json(user);
    } catch(err) {
        res.send("Error: ", err);
    }
});

module.exports = router;