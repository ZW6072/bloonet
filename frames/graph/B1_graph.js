var pivotB1 = new WebDataRocks({
    container: "#pivotB1",
    toolbar: false, //les boutons du bandeau de base sont masqués et remplacés par le bouton custom d'appel d'un csv local
    height: 400,
    width: 400,
    report: {
			"dataSource": {
          "dataSourceType": "csv",
					"filename": "https://zw6072.github.io/depot_data/bloonet/sites_bretagne.csv" //seules les sources en ligne peuvent être lues, sauf à passer par le bouton d'appel d'un csv
      },
			"slice": {
				"reportFilters": [
        ],
				"rows": [
						{
						"uniqueName": "Name",
            "filter": {
                "type": "top",
                "quantity": 20,
                "measure": "Population"
              },
						},
				],
				"columns": [
						{
						}
				],
				"measures": [
		 				{
						"uniqueName": "Population",
		 				}
	 			]
			}
		},
    reportcomplete: function() {
      pivotB1.off("reportcomplete");
      createChartB1(); //quand le pivot est créé, le chart peut être créé
    }
});

function createChartB1() { //le chart est créé
        pivotB1.getData({ //avec les données contenues dans le pivot
    		}, drawChartB1, updateChartB1);
    };

function prepareDataFunctionB1(rawData) {
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

function drawChartB1(rawData) {
    var data = prepareDataFunctionB1(rawData);
    var data_for_charts = {
        datasets: [{
            data: data.data,
            backgroundColor: [
                'rgba(0, 170, 255, 0.4)',
                'rgba(105, 175, 35, 0.5)',
                'rgba(255, 195, 0, 0.5)',
                'rgba(230, 45, 135, 0.5)',
                'rgba(85, 35, 130, 0.5)',
                'rgba(68, 74, 106, 0.5)',
                'rgba(190, 205, 0, 0.5)',
                'rgba(0, 85, 127, 0.5)',
                'rgba(53, 87, 18, 0.5)',
                'rgba(123, 15, 67, 0.5)',
                'rgba(231, 230, 230, 0.5)',
            ]
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
              text: 'Number of covered households'
          },
          scale: {
              ticks: {
                  beginAtZero: true
              },
              reverse: false
          },
        },
    };

    var ctx = document.getElementById("chartcontainerB1").getContext('2d');
		var chart = new Chart(ctx, {
        data: data_for_charts,
        type: 'polarArea',
        options: options
    });
};

function updateChartB1(rawData) {
    chart.destroyB1();
    drawChartB1(rawData);
};
