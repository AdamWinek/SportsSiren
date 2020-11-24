const axios = require('axios')
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://AdamLeonHoulton:AdamLeonHoulton@sportssiren.rrbya.mongodb.net/SportsSiren?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;

module.exports = (agenda) => {
    agenda.define("schedule_simulate_email", async (job, done) => {

        try {
            try {
                console.log("TRYING TO SEND EMAIL"); 
                let methodUrl = "https://sports-siren.herokuapp.com/api/";
                if (process.env.REACT_APP_DEV_ENV == "development") {
                    methodUrl = "http://localhost:3000/api/";
                }
                console.log(job.attrs.data.email);
                console.log(job.attrs.data.message);
                let body_obj = { 
                    email: job.attrs.data.email,
                    message: job.attrs.data.message,
                };
                //console.log(body_obj); 
                let response = await axios({
                    method: "POST",
                    url: methodUrl + "create/sendEmail",
                    data: {
                        email: job.attrs.data.email,
                        message: job.attrs.data.message,
                    },
                });
                console.log("email should be sent"); 
                //console.log(response); 
            } catch (err) {
                return err.toString();
            }
            

        } catch (err) {
            console.log(err.toString());
        }



        done();

    })






}