var pivot10 = new WebDataRocks({
    container: "#pivot10",
    toolbar: true, //les boutons du bandeau de base sont masqués et remplacés par le bouton custom d'appel d'un csv local
    height: 400,
    width: 400,
    report: {
			"dataSource": {
          "dataSourceType": "csv",
					"filename": "https://zw6072.github.io/depot_data/MISYSPO.csv" //seules les sources en ligne peuvent être lues, sauf à passer par le bouton d'appel d'un csv
      },
      "options": {
        "grid": {
            "showGrandTotals": "on"
        },
      },
      "formats": [
        {
        "name": "",
        "decimalPlaces": 0
        },
      ],
			"slice": {
				"reportFilters": [
            {
                "uniqueName": "sid",
                "filter": {
                    "members": [
                        "sid.0"  //filtre le rapport avec "sid" = "0"
                    ]
                }
            },
            {
            "uniqueName": "ent", //champs "ent" en ligne
            "filter": {
                "members": [
                    "ent.0"  //filtre le rapport avec "sid" = "0"
                ]
              }
            },
        ],
				"columns": [
				],
				"rows": [
          {
          "uniqueName": "npollutant_K",
          },
				],
				"measures": [
          {
          "uniqueName": "vpollutant",
          "aggregation": "sum",
          },
	 			],
			},
		},
    reportcomplete: function() {
      pivot10.off("reportcomplete");
      createChart10(); //quand le pivot est créé, le chart peut être créé
    }
});

function createChart10() { //le chart est créé
        pivot10.getData({}, drawChart10, updateChart10);
    };

function prepareDataFunction10(rawData) {
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
};

function drawChart10(rawData) {
    var data = prepareDataFunction10(rawData);
    var data_for_charts = {
        datasets: [{
            data: data.data,
            borderWidth: 2,
            backgroundColor: [
              'rgb(255, 99, 132, 0.7)',
              'rgba(74, 100, 195, 0.7)',
              'rgba(241, 196, 15, 0.7)',
              'rgba(14, 102, 85, 0.7)',
            ],
            tension: 0.5,
            stepped: true,
            fill: false,
            cutout: "60%",
            //stack: ,
        },
      ],
        labels: ['CO2 (kg)','NOX (kg)', 'VOC (kg)','PM (kg)'],
    };
    options = {
        plugins: {
          responsive: true,
          legend: {
              display: true,
              position: 'right',
          },
          title: {
              display: false,
              fontSize: 18,
              text: 'Profit by Countries'
          },
        },
        elements: {
          point: {
            pointStyle: 'dash',
          },
        },
    };

    var ctx = document.getElementById("chartcontainer10").getContext('2d');
		var chart = new Chart(ctx, {
        data: data_for_charts,
        type: 'doughnut',
        options: options
    });
};

function updateChart10(rawData) {
    chart.destroy10();
    drawChart10(rawData);
};
