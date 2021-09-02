var pivot3 = new WebDataRocks({
    container: "#pivot3",
    toolbar: false, //les boutons du bandeau de base sont masqués et remplacés par le bouton custom d'appel d'un csv local
    height: 580,
    width: 900,
    report: {
			"dataSource": {
          "dataSourceType": "csv",
					"filename": "https://zw6072.github.io/depot_data/MISYS.csv" //seules les sources en ligne peuvent être lues, sauf à passer par le bouton d'appel d'un csv
      },
			"slice": {
        "reportFilters": [{
                "uniqueName": "sid", //filtre tout le rapport avec le champs "sid"
                "caption": "Vehicle type",
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
				"rows": [
						{
						"uniqueName": "ent", //champs "ent" en ligne
            "caption": "Time slot",
						},
						{
						"uniqueName": "mesures",
						}
				],
				"columns": [
						{
						}
				],
				"measures": [
          {
          "uniqueName": "speed",
          "aggregation": "average",
          "format": "currency",
          "caption": "Average speed",
          },
          {
					"uniqueName": "flow",
					"aggregation": "average",
					"format": "currency",
          "caption": "Average flow",
          },
          {
          "uniqueName": "density",
          "aggregation": "average",
          "format": "currency",
          "caption": "Average density",
          },
          {
          "uniqueName": "fuelc",
          "aggregation": "average",
          "format": "currency",
          "caption": "Average Fuel consumption",
          },
	 			],
      },
      "formats": [
        {
        "name": "",
        "decimalPlaces": 2
        },
      ],
      "options": {
        "showAggregationLabels": false
      },
		},
    reportcomplete: function() {
      pivot3.off("reportcomplete");
      createChart3(); //quand le pivot est créé, le chart peut être créé
    }
});

function createChart3() {
    pivot3.getData({}, drawChart3, updateChart3);
}

function prepareDataFunction3_1(rawData) { //c0 et v0 désignent le numéro de la colonne : ici colonne 0
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

function prepareDataFunction3_2(rawData) { //ici colonne 1
    var result2 = {};
    var labels2 = [];
    var data2 = [];
    for (var i = 0; i < rawData.data.length; i++) {
        var record = rawData.data[i];
        if (record.c1 == undefined && record.r0 !== undefined) {
            var _record = record.r0;
            labels2.push(_record);
        }
        if (record.c1 == undefined & record.r0 == undefined) continue;
        if (record.v1 != undefined) {
            data2.push(!isNaN(record.v1) ? record.v1 : null);
        }
    }
    result2.labels = labels2;
    result2.data = data2;
    return result2;
}

function drawChart3(rawData) {
    var data = prepareDataFunction3_1(rawData);
    var data2 = prepareDataFunction3_2(rawData);
    var data_for_charts = {
        datasets: [{
            type: 'line',
            data: data.data,
            backgroundColor: 'rgba(74, 216, 195, 0.5)',
            borderWidth: 0.1,
            fill: true,
            yAxisID: 'y',
            label: 'Speed (km/h)',
        },
        {
            type: 'line',
            data: data2.data,
            backgroundColor: 'rgba(56, 95, 220, 0.5)',
            borderWidth: 0.1,
            fill: true,
            yAxisID: 'y1',
            label: 'Flow (veh/h)',
        }
      ],
        labels: data.labels,
    };
    options = {
        responsive: true,
        plugins: {
          legend: {
              display: true,
              position: 'right',
              },
          title: {
              display: true,
              fontSize: 18,
              text: ''
              },
        },
        scales: {
            y: {
              position: 'left',
              min: 0,
            },
            y1: {
              position: 'right',
              min: 0,
              grid: {
                drawOnChartArea: false,
                display: false,
              },
            },
        },
        indexAxis: 'x',
        elements: {
          point: {
            pointStyle: 'cross',
          },
        },
    };
    var ctx = document.getElementById("chartcontainer3").getContext("2d");
    var chart = new Chart(ctx, {
        data: data_for_charts,
        type: 'line',
        options: options
    });
}

function updateChart3(rawData) {
    chart.destroy3();
    drawChart3(rawData);
}
