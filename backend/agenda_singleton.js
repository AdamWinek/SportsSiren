
let Agenda = require("agenda");

class AgendaJob {
    constructor(){
        this.agenda = new Agenda({
            db: {
              address:
                "mongodb+srv://AdamLeonHoulton:AdamLeonHoulton@sportssiren.rrbya.mongodb.net/SportsSiren?retryWrites=true&w=majority",
              collection: "jobs",
            },
          });
          require('./jobs/poll_external_live')(this.agenda);

            console.log("creating"); 
            this.agenda.on("ready", () => {
                console.log("agenda ready!");
                // Uncomment to run it live
                //this.agenda.every("1.5 minutes", "poll_external_live");
                this.agenda.start();
                // this.agenda.now('poll_external_live');
            });
    }
  
        getInstance() {
        if (AgendaJob.singleton == null) {
            console.log("inited");
          AgendaJob.singleton = new AgendaJob();
        }
        return AgendaJob.singleton;
      }
    
    
  }
  
  const instance = new AgendaJob();
  Object.freeze(instance);
  
  module.exports = instance;
