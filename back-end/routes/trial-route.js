const express = require('express');
const router = express.Router();
const Trial = require('../models/trial-model');
const Trick = require('../models/trick-model');

router.get('/', async (req, res) => {
    try {
        const trial = await Trial.find();
        res.json(trial);
    }catch(err) {
        res.send("Error: ", err);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const trial = await Trial.findById(req.params.id);
        res.json(Trial);
    }catch(err) {
        res.send("Error: ", err);
    }
});

router.post('/', async (req, res) => {
    let trialReq = req.body.trial;
    const trial = new Trial({
        trial: trialReq,
        date: Date.now(),
        trick: req.body.trick
    });

    const trick = await Trick.findById(req.body.trick);

    try {
        const newTrial = await trial.save();
        trick.trials.push(newTrial._id);
        trick.attempts += trialReq.length;
        trick.successes += getSuccesses(trialReq);
        trick.failures += getFailures(trialReq);
        await trick.save();
        res.json(trial);
    } catch(err) {
        res.send("Error: ", err)
    }
});

function getSuccesses(trial) {
    let successes = trial.filter((attempt) => attempt);
    return successes.length;
}

function getFailures(trial) {
    let failures = trial.filter((attempt) => !attempt);
    return failures.length;
}


module.exports = router;