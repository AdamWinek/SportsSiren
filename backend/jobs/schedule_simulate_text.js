const axios = require('axios')
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://AdamLeonHoulton:AdamLeonHoulton@sportssiren.rrbya.mongodb.net/SportsSiren?retryWrites=true&w=majority', { useNewUrlParser: true });
const db = mongoose.connection;

module.exports = (agenda) => {
    agenda.define("schedule_simulate_text", async (job, done) => {

        try {
            try {
               //console.log("TRYING TO SEND TEXT"); 
                let methodUrl = "https://sports-siren.herokuapp.com/api/";
                if (process.env.REACT_APP_DEV_ENV == "development") {
                    methodUrl = "http://localhost:3000/api/";
                }
               //console.log(job.attrs.data.phone);
               //console.log(job.attrs.data.message);
                let body_obj = { 
                    phone: job.attrs.data.phone,
                    message: job.attrs.data.message,
                };
                //console.log(body_obj); 
                let response = await axios({
                    method: "POST",
                    url: methodUrl + "create/sendNotification",
                    data: {
                        phone: job.attrs.data.phone,
                        message: job.attrs.data.message,
                    },
                });
               //console.log(response);
               //console.log("should be sent"); 
                //console.log(response); 
            } catch (err) {
               //console.log(err); 
                return err.toString();
            }
            

        } catch (err) {
           //console.log(err.toString());
        }



        done();

    })






}