
let Agenda = require("agenda");

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
      //this.agenda.every("1.5 minutes", "poll_external_live");
      this.agenda.start();
      //this.agenda.now('populate_simulation_db');
    });
  }

  getInstance() {
    if (AgendaJob.singleton == null) {
      AgendaJob.singleton = new AgendaJob();
    }
    return AgendaJob.singleton;
  }


}

const instance = new AgendaJob();
Object.freeze(instance);

module.exports = instance;
