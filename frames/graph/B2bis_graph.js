var pivotB2bis = new WebDataRocks({
    container: "#pivotB2bis",
    toolbar: false, //les boutons du bandeau de base sont masqués et remplacés par le bouton custom d'appel d'un csv local
    height: 580,
    width: 900,
    report: {
			"dataSource": {
          "dataSourceType": "csv",
					"filename": "https://zw6072.github.io/depot_data/bloonet/sites_bretagne.csv" //seules les sources en ligne peuvent être lues, sauf à passer par le bouton d'appel d'un csv
      },
			"slice": {
        "reportFilters": [
        ],
        "sorting": {
            "column": {
                "type": "asc",
                "tuple": [],
                "measure": "Area"
              },
        },
				"rows": [
            {
						"uniqueName": "Name", //champs "ent" en ligne
            "filter": {
                "type": "top",
                "quantity": 200,
                "measure": "Area"
              },
						},
				],
				"columns": [
						{

						}
				],
				"measures": [
		 				{
						"uniqueName": "Area",
						"aggregation": "sum",
						"format": "currency"
		 				}
	 			]
			}
		},
    reportcomplete: function() {
      pivotB2bis.off("reportcomplete");
      createChartB2bis(); //quand le pivot est créé, le chart peut être créé
    }
});

function createChartB2bis() {
    pivotB2bis.getData({}, drawChartB2bis, updateChartB2bis);
}

function prepareDataFunctionB2bis(rawData) {
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

function drawChartB2bis(rawData) {
    var data = prepareDataFunctionB2bis(rawData);
    var data_for_charts = {
        datasets: [{
            data: data.data,
            barThickness: 1.5,
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
              display: false,
              position: 'right',
          },
          title: {
              display: true,
              fontSize: 18,
              text: 'Covered area, in km², site by site'
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

    var ctx = document.getElementById("chartcontainerB2bis").getContext("2d");
    var chart = new Chart(ctx, {
        data: data_for_charts,
        type: 'bar',
        options: options
    });

    var colorChangeValue = 92; //set this to whatever is the deciding color change value
    var dataset = chart.data.datasets[0];
    for (var i = 0; i < dataset.data.length; i++) {
      if (dataset.data[i] > colorChangeValue) {
        dataset.backgroundColor[i] = chartColors.red;
      }
    };
    for (var i = 0; i < dataset.data.length; i++) {
      if (dataset.data[i] < colorChangeValue) {
        dataset.backgroundColor[i] = chartColors.blue;
      }
    };
    chart.update();
}

function updateChartB2bis(rawData) {
    chart.destroyB2bis();
    drawChartB2bis(rawData);
}
