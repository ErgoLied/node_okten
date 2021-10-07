const express = require('express');
const mongoose = require('mongoose');

const carRouter = require('./routers/car.router');

const app = express();

mongoose.connect('mongodb://localhost:27017/okten-pr-node');

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/cars', carRouter);

app.listen(5000, () => {
    console.log('listen 5000');
});
