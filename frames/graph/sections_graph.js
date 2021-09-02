var pivot2 = new WebDataRocks({
    container: "#pivot2",
    toolbar: false, //les boutons du bandeau de base sont masqués et remplacés par le bouton custom d'appel d'un csv local
    height: 580,
    width: 900,
    report: {
			"dataSource": {
          "dataSourceType": "csv",
					"filename": "https://zw6072.github.io/depot_data/MISECT.csv" //seules les sources en ligne peuvent être lues, sauf à passer par le bouton d'appel d'un csv
      },
			"slice": {
				"reportFilters": [{
                "uniqueName": "sid" //filtre tout le rapport avec le champs "sid"
            },
            {
                "uniqueName": "sid",
                "filter": {
                    "members": [
                        "sid.0"  //filtre le rapport avec "sid" = "0"
                    ]
                }
            }
        ],
        "sorting": {
            "column": {
                "type": "asc",
                "tuple": [],
                "measure": "flow"
              },
        },
				"rows": [
            {
						"uniqueName": "oid", //champs "ent" en ligne
            "filter": {
                "type": "top",
                "quantity": 300,
                "measure": "flow"
              },
						},
				],
				"columns": [
						{
						}
				],
				"measures": [
		 				{
						"uniqueName": "flow",
						"aggregation": "sum",
						"format": "currency"
		 				}
	 			]
			}
		},
    reportcomplete: function() {
      pivot2.off("reportcomplete");
      createChart2(); //quand le pivot est créé, le chart peut être créé
    }
});

function createChart2() {
    pivot2.getData({}, drawChart2, updateChart2);
}

function prepareDataFunction2(rawData) {
    var result = {};
    var labels = [];
    var data = [];
    for (var i = 0; i < rawData.data.length; i++) {
        var record = rawData.data[i];
        if (record.c0 == undefined && record.r0 !== undefined) {
            var _record = record.r0;
            labels.push(_record);
        }
        if (record.c0 == undefined & record.r0 == undefined) continue;
        if (record.v0 != undefined) {
            data.push(!isNaN(record.v0) ? record.v0 : null);
        }
    }
    result.labels = labels;
    result.data = data;
    return result;
}

function drawChart2(rawData) {
    var data = prepareDataFunction2(rawData);
    var data_for_charts = {
        datasets: [{
            data: data.data,
            barThickness: 1.5,
            backgroundColor: [
                "#FF6384",
                "#4BC0C0",
                "#FFCE56",
                "#E7E9ED",
                "#36A2EB",
                "#9ccc65",
                "#b3e5fc"
            ]
        }],
        labels: data.labels
    };
    options = {
        plugins: {
          responsive: true,
          legend: {
              display: false,
              position: 'right',
          },
          title: {
              display: false,
              fontSize: 18,
              text: 'Profit by Countries'
          },
          scale: {
              ticks: {
                  beginAtZero: true
              },
              reverse: false
          },
          animation: {
              animateRotate: false,
              animateScale: true
          },
      },
    };

    var chartColors = { //color shortcut, useful for the function colorChangeValue
      red: 'rgb(255, 99, 132, 0.8)',
      blue: 'rgb(54, 162, 235, 0.8)'
    };

    var ctx = document.getElementById("chartcontainer2").getContext("2d");
    var chart = new Chart(ctx, {
        data: data_for_charts,
        type: 'bar',
        options: options
    });

    var colorChangeValue = 14; //set this to whatever is the deciding color change value
    var dataset = chart.data.datasets[0];
    for (var i = 0; i < dataset.data.length; i++) {
      if (dataset.data[i] > colorChangeValue) {
        dataset.backgroundColor[i] = chartColors.red;
      }
    };
    chart.update();
}

function updateChart2(rawData) {
    chart.destroy2();
    drawChart2(rawData);
}
