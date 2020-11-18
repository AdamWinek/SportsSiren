





import CanvasJSReact from './canvasjs.react';
var React = require('react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
var Component = React.Component;


class ScoreGraph extends Component {	
  /*
   Expects Tuples
   getData(home_scores, away_scores) 
   home_scores[i][0] == score
   home_scores[i][1] == time label 
 Ex: 
 home_scores = [ 
      {y: 0, label: "0:00"},
      {y: 3, label:"5:53"},
      {y: 3, label:"10:14"},
      {y: 9, label:"15:12"},
      {y: 10, label:"15:20"},
    ];
  away_scores = [ 
      {y: 0, label: "0:00"},
      {y:0, label:"5:53"},
      {y: 7, label:"10:14"},
      {y: 7, label:"15:12"},
      {y: 7, label:"15:20"},
    ];

  Will want to calculate excitement index and graph that along with scores. 
  */
	render() {
    console.log("setting score_graph")
    let home_scores = [ 
      {y: 0, label: "0:00"},
      {y: 3, label:"5:53"},
      {y: 3, label:"10:14"},
      {y: 9, label:"15:12"},
      {y: 10, label:"15:20"},
    ];

    let away_scores = [ 
      {y: 0, label: "0:00"},
      {y:0, label:"5:53"},
      {y: 7, label:"10:14"},
      {y: 7, label:"15:12"},
      {y: 7, label:"15:20"},
    ];
		const options = {
        animationEnabled: true,	
      	title:{
					text: ""
        },
        axisX: { 
          minimum: 0
        },
				axisY : {
          title: "Points",
          gridThickness: 0, 
          minimum: 0
				},
				toolTip: {
					shared: true
				},
				data: [{
          lineTension: 0,
					type: "line",
					name: "Eagles",
					showInLegend: true,
					dataPoints: home_scores
				},
				{
					type: "line",
					name: "Patriots",
					showInLegend: true,
					dataPoints: away_scores
        }]
		}
		
		return (
      <div className="scoreGraph">
		    <div >
			  <CanvasJSChart options = {options}  
				  /* onRef={ref => this.chart = ref} */
			  />
			  {/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		  </div>
    </div>
		);
	}
}

function getExcitementIndex(home_score, away_score, time_left) { 
  let score_diff = Math.abs(home_score - away_score); 
  let inital_excitement = ((100/score_diff) ** (1/1.85)) - 2.05;
  let time_remaining = (time_left / 60);
  let excitement_index = inital_excitement + (1/(time_remaining+0.05));
  return excitement_index; 
}

export default ScoreGraph; 