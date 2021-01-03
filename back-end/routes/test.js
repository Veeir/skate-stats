const express = require('express');
const router = express.Router();
const Test = require('../models/test');

router.get('/', async (req, res) => {
    try {
        const tests = await Test.find();
        res.json(tests);
    }catch(err) {
        res.send("Error: ", err);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);
        res.json(test);
    }catch(err) {
        res.send("Error: ", err);
    }
})

router.post('/', async (req, res) => {
    const test = new Test({
        name: req.body.name,
        tech: req.body.tech,
        sub: req.body.sub
    });

    try {
        await test.save();
        res.json(test);
    } catch(err) {
        res.send("Error: ", err)
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const test = await Test.findById(req.params.id);
        test.sub = req.body.sub;
        const updatedTest = await test.save();
        res.json(updatedTest);
    } catch(err) {
        res.send("Error: ", err);
    }
})


module.exports = router;