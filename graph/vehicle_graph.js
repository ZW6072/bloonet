var pivot4 = new WebDataRocks({
    container: "#pivot4",
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
                "uniqueName": "ent",
                "caption": "Time slots",
            },
            {
                "uniqueName": "ent",
                "filter": {
                    "members": [
                        "ent.0"
                    ]
                }
            },
        ],
        "rows": [
          {
          "uniqueName": "sid",
          "caption": "Veh type",
          "filter": {
              "members": [
                  "sid.1",
                  "sid.2",
                  "sid.5",
                ],
            },
          },
        ],
        "columns": [
				],
				"measures": [
          {
          "uniqueName": "speed",
          "aggregation": "average",
          },
          {
          "uniqueName": "flow",
          "aggregation": "average",
          },
          {
          "uniqueName": "density",
          "aggregation": "average",
          },
          {
          "uniqueName": "fuelc",
          "aggregation": "average",
          },
          {
          "uniqueName": "total_lane_changes",
          "aggregation": "average",
          },
          {
          "uniqueName": "totalDistanceTraveledInside",
          "aggregation": "average",
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
      pivot4.off("reportcomplete");
      createChart4(); //quand le pivot est créé, le chart peut être créé
    }
});

function createChart4() {
    pivot4.getData({}, drawChart4, updateChart4);
}

function prepareDataFunction4_1(rawData) { //c0 et v0 désignent le numéro de la colonne : ici colonne 0
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

function prepareDataFunction4_2(rawData) { //ici colonne 1
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

function prepareDataFunction4_3(rawData) { //ici colonne 1
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
}

function prepareDataFunction4_4(rawData) { //ici colonne 1
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
}

function prepareDataFunction4_5(rawData) { //ici colonne 1
    var result5 = {};
    var labels5 = [];
    var data5 = [];
    for (var i = 0; i < rawData.data.length; i++) {
        var record = rawData.data[i];
        if (record.c4 == undefined && record.r0 !== undefined) {
            var _record = record.r0;
            labels5.push(_record);
        }
        if (record.c4 == undefined & record.r0 == undefined) continue;
        if (record.v4 != undefined) {
            data5.push(!isNaN(record.v4) ? record.v4 : null);
        }
    }
    result5.labels = labels5;
    result5.data = data5;
    return result5;
}

function prepareDataFunction4_6(rawData) { //ici colonne 1
    var result6 = {};
    var labels6 = [];
    var data6 = [];
    for (var i = 0; i < rawData.data.length; i++) {
        var record = rawData.data[i];
        if (record.c5 == undefined && record.r0 !== undefined) {
            var _record = record.r0;
            labels6.push(_record);
        }
        if (record.c5 == undefined & record.r0 == undefined) continue;
        if (record.v5 != undefined) {
            data6.push(!isNaN(record.v5) ? record.v5 : null);
        }
    }
    result6.labels = labels6;
    result6.data = data6;
    return result6;
}

function drawChart4(rawData) {
    var data = prepareDataFunction4_1(rawData);
    var data2 = prepareDataFunction4_2(rawData);
    var data3 = prepareDataFunction4_3(rawData);
    var data4 = prepareDataFunction4_4(rawData);
    var data5 = prepareDataFunction4_5(rawData);
    var data6 = prepareDataFunction4_6(rawData);
    var data_for_charts = {
        datasets: [{
            data: data.data,
            backgroundColor: 'rgba(74, 216, 195, 0.4)',
            borderWidth: 0,
            xAxisID: 'x',
            label: 'Speed (km/h)',
          },
          {
            data: data2.data,
            backgroundColor: 'rgba(56, 95, 220, 0.5)',
            borderWidth: 0,
            xAxisID: 'x',
            label: 'Flow (veh/h)',
          },
          {
            data: data3.data,
            backgroundColor: 'rgba(255, 87, 51, 0.5)',
            borderWidth: 0,
            xAxisID: 'x',
            label: 'Density (veh/km)',
          },
          {
            data: data4.data,
            backgroundColor: 'rgba(88, 24, 69 , 0.5)',
            borderWidth: 0,
            xAxisID: 'x',
            label: 'Fuel consumption (liters)',
          },
          {
            data: data5.data,
            backgroundColor: 'rgba(218, 247, 166, 0.5)',
            borderWidth: 0,
            xAxisID: 'x',
            label: 'Lane changes (number of changes)',
          },
          {
            data: data6.data,
            backgroundColor: 'rgba(231, 76, 60, 0.5)',
            borderWidth: 0,
            xAxisID: 'x',
            label: 'Distance (km)',
          },
        ],
        labels: ['Cars', 'Bus', 'BRT'] //data.labels c'],
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
            x: {
              position: 'bottom',
              min: 0,
              type: 'logarithmic',
              grid: {
                drawOnChartArea: false,
                display: false,
              },
            },
        },
        animation: {
            animateRotate: false,
            animateScale: true
        },
        ticks: {
          },
        indexAxis: 'y'
    };
    var ctx = document.getElementById("chartcontainer4").getContext("2d");
    var chart = new Chart(ctx, {
        data: data_for_charts,
        type: 'bar',
        options: options
    });
}

function updateChart4(rawData) {
    chart.destroy4();
    drawChart4(rawData);
}
