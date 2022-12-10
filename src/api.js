const express = require('express');

const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const campus = require('./models/campus');
const router = require('./routes');
const bp = require('body-parser');

const authRouter = require('./authServer')

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

app.use(express.json())
app.use(router)

app.use(authRouter)

router.get('/', (req, res) => {
    console.log('/ route called');
    res.send('<h1>Welcome to my API, these are the available routes:</h1>');
});

router.get('/campus', async(req, res) => {
    console.log('/campus route called');
    try {
        res.json(await campus.find());
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
})

mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Successfully Connected to the database!');
        app.listen(process.env.PORT, () => {
            console.log(`server is up and running on ${process.env.PORT}`)
        })
    })

.catch((e) => console.log(`Faild to connect to database. error: ${e}`))