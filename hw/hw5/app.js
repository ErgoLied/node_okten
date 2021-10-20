const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const {userRouter, authRouter} = require('./routers');
const {CONFIG} = require('./configs');

const app = express();

mongoose.connect(CONFIG.MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/authorization', authRouter);

// eslint-disable-next-line no-unused-vars
app.use('*', (err, req, res, next) => {
    res
        .status(err.status || 500)
        .json({message: err.message});
});

app.listen(CONFIG.PORT, () => {
    console.log(`listen ${CONFIG.PORT}`);
});
