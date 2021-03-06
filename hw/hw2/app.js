const express = require('express');
const userRouter = require('./routers/user.router');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/users', userRouter);

app.listen(5000, () => {
    console.log('listen 5000');
})