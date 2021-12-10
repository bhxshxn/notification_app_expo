const express = require('express');
const app = express();
const mongoose = require('mongoose');
const User = require('./userModel')
const cors = require('cors')


app.use(express.json())
app.use(cors({ origin: true, credentials: true }));
app.use(express.urlencoded({ extened: true }));


const url = "mongodb+srv://bhxshxn:bhxshxn%409@cluster0.ixoza.mongodb.net/MovietretryWrites=true&w=majority"
mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    console.log('Database is connected successfully on port 27017!!!');
});
app.get('/', (req, res) => {
    res.send('hello world')
})

app.post('/register', (req, res) => {
    const { user, token } = req.body;
    console.log(req.body)
    User.find({ token: token }).then((result) => {
        if (result.length !== 0) {
            console.log(result)
            res.send({ msg: "User already exists" })
        } else {
            const latestUser = new User({ username: user, token: token })
            latestUser
                .save()
                .then((result) => {
                    res.send({ msg: "Sucessfully Registered" });
                })
                .catch((err) => console.log(err));
        }
    }).catch(err => console.log(err))
})

app.get('/getAllUser', (req, res) => {
    User.find().then(result => {
        res.send(result)
    }).catch((err) => console.log(err));
})
app.listen(3000, () => {
    console.log('Server is running on : http://localhost:3000/')
})