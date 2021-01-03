const express = require('express');
const mongoose = require('mongoose');
const url = 'mongodb://localhost/SkateStatistics'

// ROUTES
const userRouter = require('./routes/user-route');
const trickRouter = require('./routes/trick-route');
const trialRouter = require('./routes/trial-route');

const app = express();
mongoose.connect(url, {useNewUrlParser: true});
const con = mongoose.connection;

con.on('open', () => {
    console.log('Connected to Database.')
});

app.use(express.json());

app.use('/user', userRouter);
app.use('/trick', trickRouter);
app.use('/trial', trialRouter);

app.listen(9000, () => {
    console.log('Server Started.')
})