var pivotA1bis = new WebDataRocks({
    container: "#pivotA1bis",
    toolbar: false, //les boutons du bandeau de base sont masqués et remplacés par le bouton custom d'appel d'un csv local
    height: 400,
    width: 400,
    report: {
			"dataSource": {
          "dataSourceType": "csv",
					"filename": "https://zw6072.github.io/depot_data/site_bretagne.csv" //seules les sources en ligne peuvent être lues, sauf à passer par le bouton d'appel d'un csv
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
		 				}
	 			]
			}
		},
    reportcomplete: function() {
      pivotA1bis.off("reportcomplete");
      createChartA1bis(); //quand le pivot est créé, le chart peut être créé
    }
});

function createChartA1bis() { //le chart est créé
        pivotA1bis.getData({ //avec les données contenues dans le pivot
    		}, drawChartA1bis, updateChartA1bis);
    };

function prepareDataFunctionA1bis(rawData) {
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

function drawChartA1bis(rawData) {
    var data = prepareDataFunctionA1bis(rawData);
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

    var ctx = document.getElementById("chartcontainerA1bis").getContext('2d');
		var chart = new Chart(ctx, {
        data: data_for_charts,
        type: 'polarArea',
        options: options
    });
};

function updateChartA1bis(rawData) {
    chart.destroyA1bis();
    drawChartA1bis(rawData);
};
