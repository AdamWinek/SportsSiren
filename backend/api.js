// Get NFL Schedule 
export const getSchedule = async function(week, key) { 
    let url = 'https://api.sportradar.us/nfl/official/trial/v6/en/games/2020/REG/' + week + '/schedule.json?api_key='+key; 
    const result = await axios({
        method: "get",
        url: url,
      });
    return result.data;
  
}

// NFL Live Scores
export const getLiveNFLScores = async function() { 
    let url = 'https://static.nfl.com/liveupdate/scorestrip/ss.xml'
    const result = await axios({
        method: "get",
        url: url,
      });   
    // Gonna need to parse the XML 
    console.log(result.data); 
    return result.data;

}

// iSports Api 
export const getLiveSoccerScores = async function(key) { 
    let url = 'http://api.isportsapi.com/sport/football/livescores?api_key=' + key
    const result = await axios({
        method: "get",
        url: url,
      });   
    return result.data; 
}

// iSports Api 
export const getLiveBasketBallScores = async function(key) { 
    let url = 'http://api.isportsapi.com/sport/basketball/livescores?api_key=' + key
    const result = await axios({
        method: "get",
        url: url,
      });   
    return result.data; 
}

// NCAA Football Scores
export const getNCAAFootballScores = async function(week) { 
    let url = "https://api.collegefootballdata.com/games?year=2020&week="+week+"&seasonType=regular"
    const result = await axios({
        method: "get",
        url: url,
      });   
    return result.data; 

}