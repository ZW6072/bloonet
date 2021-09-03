var pivot3 = new WebDataRocks({
    container: "#pivotA3",
    toolbar: true, //lepivs boutons du bandeau de base sont masqués et remplacés par le bouton custom d'appel d'un csv local
    height: 400,
    width: 400,
    report: {
			"dataSource": {
          "dataSourceType": "csv",
					"filename": "https://zw6072.github.io/depot_data/site_bretagne.csv" //seules les sources en ligne peuvent être lues, sauf à passer par le bouton d'appel d'un csv
      },
      "options": {
        "grid": {
            "showGrandTotals": "on"
        },
      },
			"slice": {
        "sorting": {
            "column": {
                "type": "asc",
                "tuple": [],
                "measure": "Population"
              },
        },
				"reportFilters": [
        ],
				"columns": [
				],
				"rows": [
          {
          "uniqueName": "Name", //champs "ent" en ligne
          "filter": {
              "type": "top",
              "quantity": 570,
              "measure": "Population"
            },
          },
        ],
				"measures": [
          {
          "uniqueName": "Population",
          "aggregation": "percent"
          }
	 			],
			},
		},
    reportcomplete: function() {
      pivotA3.off("reportcomplete");
      createChartA3(); //quand le pivot est créé, le chart peut être créé
    }
});

function createChartA3() { //le chart est créé
        pivot3.getData({}, drawChart3, updateChart3);
    };

function prepareDataFunctionA3(rawData) {
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

function drawChartA3(rawData) {
    var data = prepareDataFunctionA3(rawData);
    var data_for_charts = {
        datasets: [{
            data: data.data,
            borderWidth: 2,
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
            ],
            tension: 0.5,
            stepped: true,
            fill: false,
            cutout: "60%",
            //stack: ,
        },
      ],
        labels: data.labels,
    };
    options = {
        plugins: {
          responsive: true,
          legend: {
              display: false,
              position: 'bottom',
          },
          title: {
              display: true,
              fontSize: 18,
              text: 'Percentage of covered households by site'
          },
        },
        elements: {
          point: {
            pointStyle: 'dash',
          },
        },
    };

    var ctx = document.getElementById("chartcontainer3").getContext('2d');
		var chart = new Chart(ctx, {
        data: data_for_charts,
        type: 'doughnut',
        options: options
    });
};

function updateChartA3(rawData) {
    chart.destroyA3();
    drawChartA3(rawData);
};
