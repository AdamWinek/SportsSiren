
let Agenda = require("agenda");
const { CompositionPage } = require("twilio/lib/rest/video/v1/composition");

class AgendaJob {
  constructor() {
    this.agenda = new Agenda({
      db: {
        address:
          "mongodb+srv://AdamLeonHoulton:AdamLeonHoulton@sportssiren.rrbya.mongodb.net/SportsSiren?retryWrites=true&w=majority",
        collection: "jobs",
      },
    });


    require('./jobs/poll_external_live')(this.agenda);
    require('./jobs/populate_simulation_db')(this.agenda);
    this.agenda.on("ready", () => {
      console.log("agenda ready!");
      // Uncomment to run it live
      //this.agenda.every("5 minutes", "poll_external_live");
      this.agenda.start();
      //this.agenda.now('populate_simulation_db');
      //this.agenda.now('poll_external_live');
    });
  }

  getInstance() {
    console.log("triaaaaaaaaaaany asd asd asd");

    if (AgendaJob.singleton == null) {
      AgendaJob.singleton = new AgendaJob();
    }
    console.log("triny asd asd asd");
    return AgendaJob.singleton;
  }
  sendText(phone, message, time_to_schedule) { 
    require('./jobs/schedule_simulate_text')(this.agenda);
    if(time_to_schedule == "Now") { 
      this.agenda.now('schedule_simulate_text', {phone: phone, message: message});
    }
    else { 
      this.agenda.schedule(time_to_schedule, 'schedule_simulate_text', {phone: phone, message: message});

    }

  }
  sendEmail(email, message, time_to_schedule) { 
    console.log("in agenda send email"); 
    require('./jobs/schedule_simulate_email')(this.agenda);
    if(time_to_schedule == "Now") { 
      this.agenda.now('schedule_simulate_email', {email: email, message: message});
    }
    else { 
      this.agenda.schedule(time_to_schedule, 'schedule_simulate_email', {email: email, message: message});
    }
  }

}

const instance = new AgendaJob();
Object.freeze(instance);

module.exports = instance;
