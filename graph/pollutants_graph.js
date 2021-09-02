var pivot6 = new WebDataRocks({
    container: "#pivot6",
    toolbar: true, //les boutons du bandeau de base sont masqués et remplacés par le bouton custom d'appel d'un csv local
    height: 400,
    width: 400,
    report: {
			"dataSource": {
          "dataSourceType": "csv",
					"filename": "https://zw6072.github.io/depot_data/MISECTIEM.csv" //seules les sources en ligne peuvent être lues, sauf à passer par le bouton d'appel d'un csv
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
				"columns": [
				],
				"rows": [
          {
          "uniqueName": "ent", //champs "ent" en ligne
          },
				],
				"measures": [
          {
          "uniqueName": "CO2",
          },
          {
          "uniqueName": "NOx",
          },
          {
          "uniqueName": "VOC",
          },
          {
          "uniqueName": "PM",
          },
	 			],
			},
		},
    reportcomplete: function() {
      pivot6.off("reportcomplete");
      createChart6(); //quand le pivot est créé, le chart peut être créé
    }
});

function createChart6() { //le chart est créé
        pivot6.getData({}, drawChart6, updateChart6);
    };

function prepareDataFunction6_1(rawData) {
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

function prepareDataFunction6_2(rawData) {
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
};

function prepareDataFunction6_3(rawData) {
    var result3 = {};
    var labels3 = [];
    var data3 = [];
    for (var i = 0; i < rawData.data.length; i++) {
        var record = rawData.data[i];
        if (record.c2 == undefined && record.r0 !== undefined) {
            var _record = record.r0;
            labels3.push(_record);
        }
        if (record.c2 == undefined & record.r0 == undefined) continue;
        if (record.v2 != undefined) {
            data3.push(!isNaN(record.v2) ? record.v2 : null);
        }
    }
    result3.labels = labels3;
    result3.data = data3;
    return result3;
};

function prepareDataFunction6_4(rawData) {
    var result4 = {};
    var labels4 = [];
    var data4 = [];
    for (var i = 0; i < rawData.data.length; i++) {
        var record = rawData.data[i];
        if (record.c3 == undefined && record.r0 !== undefined) {
            var _record = record.r0;
            labels4.push(_record);
        }
        if (record.c3 == undefined & record.r0 == undefined) continue;
        if (record.v3 != undefined) {
            data4.push(!isNaN(record.v3) ? record.v3 : null);
        }
    }
    result4.labels = labels4;
    result4.data = data4;
    return result4;
};

function drawChart6(rawData) {
    var data = prepareDataFunction6_1(rawData);
    var data2 = prepareDataFunction6_2(rawData);
    var data3 = prepareDataFunction6_3(rawData);
    var data4 = prepareDataFunction6_4(rawData);
    var data_for_charts = {
        datasets: [{
            data: data.data,
            borderWidth: 2,
            borderColor: 'rgba(74, 216, 195, 0.8)',
            backgroundColor: 'rgba(74, 216, 195, 0.5)',
            tension: 0.5,
            label: "CO2 (kg)",
            yAxisID: 'y1',
            stepped: true,
            fill: false,
            //stack: ,
        },
        {
            data: data2.data,
            borderWidth: 2,
            borderColor: 'rgba(74, 100, 195, 0.8)',
            backgroundColor: 'rgba(74, 100, 195, 0.5)',
            tension: 0.5,
            label: "NOx (kg)",
            yAxisID: 'y',
            stepped: true,
            fill: false,
            //stack: ,
        },
        {
            data: data3.data,
            borderWidth: 2,
            borderColor: 'rgba(14, 102, 85, 0.8)',
            backgroundColor: 'rgba(14, 102, 85, 0.5)',
            tension: 0.5,
            label: "VOC (kg)",
            yAxisID: 'y',
            stepped: true,
            fill: false,
            //stack: ,
        },
        {
            data: data4.data,
            borderWidth: 2,
            borderColor: 'rgba(241, 196, 15, 0.8)',
            backgroundColor: 'rgba(241, 196, 15, 0.5)',
            tension: 0.5,
            label: "PM (kg)",
            yAxisID: 'y',
            stepped: true,
            fill: false,
            //stack: ,
        },
      ],
        labels: data.labels,
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
        scales: {
          y: {
            position: 'left',
            min: 0,
            grid: {
              drawOnChartArea: false,
              display: false,
            },
            stacked: false,
          },
          y1: {
            position: 'right',
            min: 0,
            grid: {
              drawOnChartArea: false,
              display: false,
            },
            stacked: false,
          },
        },
        indexAxis: 'x',
        elements: {
          point: {
            pointStyle: 'dash',
          },
        },
    };

    var ctx = document.getElementById("chartcontainer6").getContext('2d');
		var chart = new Chart(ctx, {
        data: data_for_charts,
        type: 'line',
        options: options
    });
};

function updateChart6(rawData) {
    chart.destroy6();
    drawChart6(rawData);
};
