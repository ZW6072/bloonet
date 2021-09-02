var pivot13 = new WebDataRocks({
    container: "#pivot13",
    toolbar: false, //les boutons du bandeau de base sont masqués et remplacés par le bouton custom d'appel d'un csv local
    height: 400,
    width: 400,
    report: {
			"dataSource": {
          "dataSourceType": "csv",
					"filename": "https://zw6072.github.io/depot_data/MIPT.csv" //seules les sources en ligne peuvent être lues, sauf à passer par le bouton d'appel d'un csv
      },
			"slice": {
				"reportFilters": [
            {
                "uniqueName": "sid",
                "filter": {
                    "members": [
                        "sid.0"
                    ]
                }
            },
            {
						"uniqueName": "ent",
            "filter": {
                "members": [
                    "ent.0"
                ],
            		},
						},
        ],
        "sorting": {
            "column": {
                "type": "desc",
                "tuple": [],
                "measure": "flow"
              },
        },
				"rows": [
						{
						"uniqueName": "oid",
            "filter": {
                "type": "top",
                "quantity": 10,
                "measure": "flow"
              },
						},
				],
				"columns": [
				],
				"measures": [
          {
          "uniqueName": "flow"
          },
          {
          "uniqueName": "speed"
          },
          {
          "uniqueName": "travel"
          },
          {
          "uniqueName": "ttime",
          "formula": "(\"ttime\") /60 ",
          },
          {
          "uniqueName": "nstops"
          },
	 			]
			}
		},
    reportcomplete: function() {
      pivot13.off("reportcomplete");
      createChart13(); //quand le pivot est créé, le chart peut être créé
    }
});

function createChart13() { //le chart est créé
        pivot13.getData({ //avec les données contenues dans le pivot
    		}, drawChart13, updateChart13);
    };

    function prepareDataFunction13_1(rawData) {
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

    function prepareDataFunction13_2(rawData) {
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

    function prepareDataFunction13_3(rawData) {
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

    function prepareDataFunction13_4(rawData) {
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

    function prepareDataFunction13_5(rawData) {
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
    };

function drawChart13(rawData) {
    var data = prepareDataFunction13_1(rawData);
    var data2 = prepareDataFunction13_2(rawData);
    var data3 = prepareDataFunction13_3(rawData);
    var data4 = prepareDataFunction13_4(rawData);
    var data5 = prepareDataFunction13_5(rawData);
    var data_for_charts = {
        datasets: [
          {
            data: data.data,
            label: "Flow (buses/hour)",
            yAxisID: 'y',
            backgroundColor: [
                'rgba(74, 216, 195, 0.4)',
            ]
          },
          {
            data: data2.data,
            label: "Average speed (km/h)",
            yAxisID: 'y1',
            backgroundColor: [
                'rgba(56, 95, 220, 0.5)',
            ]
          },
          {
            data: data3.data,
            label: "Cumulated distance of all buses (km by hour)",
            yAxisID: 'y1',
            backgroundColor: [
                'rgba(255, 87, 51, 0.5)',
            ]
          },
          {
            data: data4.data,
            label: "Average travel time by bus (mn)",
            yAxisID: 'y',
            backgroundColor: [
                'rgba(18, 207, 238, 0.5)',
            ]
          },
          {
            data: data5.data,
            label: "Stops",
            yAxisID: 'y',
            backgroundColor: [
                'rgba(88, 24, 69 , 0.5)',
            ]
          },
      ],
        labels: data.labels
    };
    options = {
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
      plugins: {
          responsive: true,
          legend: {
              display: true,
              position: 'bottom',
          },
          title: {
              display: true,
              fontSize: 18,
              text: 'Stats by PT line'
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

    var ctx = document.getElementById("chartcontainer13").getContext('2d');
		var chart = new Chart(ctx, {
        data: data_for_charts,
        type: 'bar',
        options: options
    });
};

function updateChart13(rawData) {
    chart.destroy13();
    drawChart13(rawData);
};
