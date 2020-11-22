const nock = require('nock')
const data = require("../example_api_responses/example_live_scores.json");
let nookObj = {}; 

function setUpSimulation() {
    for(let i=0; i<data.length; i+=1) { 
        try { 
            nookObj[i] = nock('http://static.nfl.com')
            .get('/liveupdate/scores/scores.json')
            .reply(200, {
                data: data[i]
        })
        console.log("success" + i); 
        } catch(err) { 
            console.log(err); 
        }
    }
}

async function testNook() { 
    //console.log(nock.activeMocks());

    for(let i=0; i<data.length; i+=1) { 
        console.log("grabbingnook"+i); 

        let url = 'http://static.nfl.com/liveupdate/scores/scores.json'
        const result = await axios({
            method: "get",
            url: url,
        });   
        //console.log(result.data); 
        
        let game_scores = result.data; 
    }
    //console.log(nock.isActive());
    //console.log(nock.activeMocks());

}
// Uncomment to test 
// testNook()
//console.log("checking for active")
// console.log(nock.isActive());

module.exports.testNook = testNook;
module.exports.setUpSimulation = setUpSimulation;
