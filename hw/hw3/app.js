const express = require('express');
const mongoose = require('mongoose');

const userRouter = require('./routers/user.router');
const authRouter = require('./routers/authorization.router');
const {MONGO_CONNECT_URL, PORT} = require("./configs/config");

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);
app.use('/authorization', authRouter);

app.listen(PORT, () => {
    console.log(`listen ${PORT}`);
});
