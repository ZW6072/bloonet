var pivot9 = new WebDataRocks({
    container: "#pivot9",
    toolbar: false, //les boutons du bandeau de base sont masqués et remplacés par le bouton custom d'appel d'un csv local
    height: 200,
    width: 820,
    report: {
			"dataSource": {
          "dataSourceType": "csv",
					"filename": "https://zw6072.github.io/depot_data/MIDESTINATIONCENTROIDPEDESTRIAN.csv" //seules les sources en ligne peuvent être lues, sauf à passer par le bouton d'appel d'un csv
      },
      "options": {
        "configuratorButton": false,
        "grid": {
          "showTotals" : "off",
          "showGrandTotals" : "off",
          "showHeaders": false,
          "showFilter": false
        }
      },
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
        ],
				"columns": [
        {
						"uniqueName": "ent", //champs "ent" en ligne
            "caption" : "Time slots - cumulative frequency",
            "filter": {
                "members": [
                    "ent.1",
                    "ent.2",
                    "ent.3",
                    "ent.4",
                    "ent.5",
                    "ent.6"
                ]
              }
						},
				],
				"rows": [
          {
          "uniqueName": "oid",
          "caption": "Destination"
          },
				],
        "measures": [
          {
          "uniqueName": "pedestriansIn",
          }
        ],
			},
		},
    reportcomplete: function() {
      pivot9.off("reportcomplete");
      createChart9(); //quand le pivot est créé, le chart peut être créé
    }
});

function createChart9() { //le chart est créé
        pivot9.getData({ //avec les données contenues dans le pivot
    		}, drawChart9, updateChart9);
    };

function prepareDataFunction9(rawData) {
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

function drawChart9(rawData) {
    var data = prepareDataFunction9(rawData);
    var data_for_charts = {
        datasets: [{
            data: data.data,
            backgroundColor: [
                'rgba(74, 216, 195, 0.4)',
            ],
            borderColor: [
                'rgba(74, 216, 195, 0.4)',
            ],
        }],
        labels: data.labels
    };
    options = {
        plugins: {
          responsive: true,
          legend: {
              display: true,
              position: 'right',
          },
          title: {
              display: true,
              fontSize: 18,
              text: 'Waves of arrival'
          },
          scales: {
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

    var ctx = document.getElementById("chartcontainer9").getContext('2d');
		var chart = new Chart(ctx, {
        data: data_for_charts,
        type: 'line',
        options: options
    });
};

function updateChart9(rawData) {
    chart.destroy9();
    drawChart9(rawData);
};
