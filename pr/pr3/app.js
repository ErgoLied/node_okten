const express = require('express');
const mongoose = require('mongoose');

const carRouter = require('./routers/car.router');
const {MONGO_CONNECT_URL, PORT} = require("./configs/config");

const app = express();

mongoose.connect(MONGO_CONNECT_URL);

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/cars', carRouter);

app.listen(PORT, () => {
    console.log(`listen ${PORT}`);
});
