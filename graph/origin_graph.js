var pivot7 = new WebDataRocks({
    container: "#pivot7",
    toolbar: false, //les boutons du bandeau de base sont masqués et remplacés par le bouton custom d'appel d'un csv local
    height: 400,
    width: 400,
    report: {
			"dataSource": {
          "dataSourceType": "csv",
					"filename": "https://zw6072.github.io/depot_data/MIORIGINCENTROIDPEDESTRIAN.csv" //seules les sources en ligne peuvent être lues, sauf à passer par le bouton d'appel d'un csv
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
            {
						"uniqueName": "ent", //champs "ent" en ligne
            "filter": { //ce champs est filtré pour retirer la valeur "0"
                "members": [
                    "ent.0"
                ],
                "negation": false
            		},
						},
        ],
				"rows": [
						{
						"uniqueName": "oid", //champs "ent" en ligne
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
						"uniqueName": "pedestriansIn",
						"aggregation": "sum",
						"format": "currency"
		 				}
	 			]
			}
		},
    reportcomplete: function() {
      pivot7.off("reportcomplete");
      createChart7(); //quand le pivot est créé, le chart peut être créé
    }
});

function createChart7() { //le chart est créé
        pivot7.getData({ //avec les données contenues dans le pivot
    		}, drawChart7, updateChart7);
    };

function prepareDataFunction7(rawData) {
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

function drawChart7(rawData) {
    var data = prepareDataFunction7(rawData);
    var data_for_charts = {
        datasets: [{
            data: data.data,
            backgroundColor: [
                'rgba(74, 216, 195, 0.4)',
                'rgba(56, 95, 220, 0.5)',
                'rgba(255, 87, 51, 0.5)',
                'rgba(88, 24, 69 , 0.5)',
                'rgba(218, 247, 166, 0.5)',
                'rgba(231, 76, 60, 0.5)',
            ]
        }],
        labels: data.labels
    };
    options = {
        plugins: {
          responsive: true,
          legend: {
              display: true,
              position: 'left',
          },
          title: {
              display: true,
              fontSize: 18,
              text: 'Top origins'
          },
          scale: {
              ticks: {
                  beginAtZero: true
              },
              reverse: false
          },
        },
    };

    var ctx = document.getElementById("chartcontainer7").getContext('2d');
		var chart = new Chart(ctx, {
        data: data_for_charts,
        type: 'polarArea',
        options: options
    });
};

function updateChart7(rawData) {
    chart.destroy7();
    drawChart7(rawData);
};
