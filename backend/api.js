


// Get NFL Schedule 

export const getSchedule = async function(week, key) { 
    let url = 'https://api.sportradar.us/nfl/official/trial/v6/en/games/2020/REG/' + week + '/schedule.json?api_key='+key; 
    const result = await axios({
        method: "get",
        url: url,
      });
    return result.data;
  
}