let Agenda = require("agenda");
let url = "mongodb+srv://AdamLeonHoulton:AdamLeonHoulton@sportssiren.rrbya.mongodb.net/SportsSiren?retryWrites=true&w=majority"
const mongoose = require('mongoose');
const poll_external_live = require("./jobs/poll_external_live");

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb+srv://AdamLeonHoulton:AdamLeonHoulton@sportssiren.rrbya.mongodb.net/SportsSiren?retryWrites=true&w=majority', { useNewUrlParser: true });
//const db = mongoose.connection;
let agenda =  new Agenda({ db: {address: "mongodb+srv://AdamLeonHoulton:AdamLeonHoulton@sportssiren.rrbya.mongodb.net/SportsSiren?retryWrites=true&w=majority", collection: 'jobs'}}); 

let jobTypes = ["poll_external_live"];
console.log("in agenda")

jobTypes.forEach( type => {
    // the type name should match the file name in the jobs_list folder
    console.log('./jobs/'+ type)
    require('./jobs/'+ type)(agenda);
})


if(jobTypes.length) {
    // if there are jobs in the jobsTypes array set up 
    console.log("started")
    agenda.on('ready', function() {
          agenda.start(); 
          // uncomment the next line to let the game poller run once
          // agenda.now('poll_external_live');
    })

}



let graceful = () => {
    agenda.stop(() => process.exit(0));
}



process.on("SIGTERM", graceful);
process.on("SIGINT", graceful);


module.exports = agenda;