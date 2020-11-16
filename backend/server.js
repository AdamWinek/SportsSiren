const express = require('express')
require('dotenv').config()
const path = require('path');
const app = express()
const port = process.env.PORT || 3000
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://AdamLeonHoulton:AdamLeonHoulton@sportssiren.rrbya.mongodb.net/SportsSiren?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;
const User = require("./models/User")
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser')
let jwt = require('jsonwebtoken');
const twilio = require('twilio');
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

let twilioInstance = new twilio(accountSid, authToken)

db.once('open', function () {
    console.log('wereConnected')
});

// parse application/json
app.use(bodyParser.json())
// Serve the static files from the React app
app.use(express.static(path.join(__dirname, '../build')))


app.get('/api', (req, res) => {
    res.send('Dis da Server')
})



app.post('/api/registerUser', async (req, res) => {
    try {
        bcrypt.hash(req.body.password, 10, async function (err, hash) {

            let user = new User({
                name: req.body.name,
                email: req.body.email,
                phone: req.body.phone,
                password: hash
            })

            try {
                await user.save()
                res.json({
                    message: "User Added"
                })

            } catch (e) {
                res.json({
                    message: e.toString()
                })
            }
        })
    } catch (e) {
        res.json({
            message: e.toString()
        })

    }

})

app.post('/api/login', async (req, res) => {
    console.log(req.body)
    let currentUser = await User.findOne({ email: req.body.email }).exec();
    if (currentUser == undefined) {
        res.status(400)
        res.json({
            message: "No user associated with email"
        })
    } else if (req.body.password == undefined) {
        res.status(400)
        res.json({
            message: "wrong password"
        })
        return
    }



    bcrypt.compare(req.body.password, currentUser.password, function (err, result) {
        if (!result || err) {
            res.status(400)
            res.json({
                message: "Their was an error with your password"
            })
        } else {
            let token = jwt.sign({ email: req.body.email }, 'daSecretToken', { expiresIn: '1h' });

            res.status(200)
            res.json({
                token: token,
                email: req.body.email,
                name: currentUser.name,
                phone: currentUser.phone
            })
        }
    });
})


// to use a protected route you must include token in the body of the request
// inside a protected route you need to check if a token has been included and is correct
app.get('/api/sampleProtectedRoute', async (req, res) => {

    if (req.body.token == undefined) {
        res.json({
            message: "You need to login to use this route"
        })
    }
    try {
        let decoded = jwt.verify(req.body.token, 'daSecretToken');
        res.json({
            message: "ya did it"
        })

    } catch (err) {
        res.json({
            message: "wrong token"
        })
    }
})


app.get('/api/sendNotification', async (req, res) => {

    if (req.body.token == undefined) {
        res.json({
            message: "You need to login to use this route"
        })
    }
    try {
        let decoded = jwt.verify(req.body.token, 'daSecretToken');

        let msg = await twilioInstance.messages.create({
            body: req.body.message,
            to: req.body.phone,  // Text this number
            from: '+18285200670' // The number we bought
        })
        console.log(msg)
        console.log(decoded)

        res.json({
            error: msg.error_message,
            status: msg.status
        })




    } catch (err) {
        res.json({
            message: err.toString()
        })
    }
})






// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '../build/index.html'));
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})


