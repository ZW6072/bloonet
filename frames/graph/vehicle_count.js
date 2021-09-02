var pivot14 = new WebDataRocks({
    container: "#pivot14",
    toolbar: false, //les boutons du bandeau de base sont masqués et remplacés par le bouton custom d'appel d'un csv local
    height: 200,
    width: 820,
    report: {
			"dataSource": {
          "dataSourceType": "csv",
					"filename": "https://zw6072.github.io/depot_data/cctv_count_output.csv" //seules les sources en ligne peuvent être lues, sauf à passer par le bouton d'appel d'un csv
      },
      "options": {
        "configuratorButton": false,
        "grid": {
          "showTotals" : "off",
          "showGrandTotals" : "off",
          "showHeaders": false,
          "showFilter": false,
        }
      },
			"slice": {
				"reportFilters": [
            {
            },
        ],
				"columns": [
            {
						},
				],
				"rows": [
          {
          "uniqueName": "Time of entry",
          "caption": "Time of entry",
          },
				],
        "measures": [
          {
          "uniqueName": "Time of entry",
          "caption": "Converted time of entry",
          "formula": "('Time of entry') /24/60",
          },
          {
          "uniqueName": "Car",
          "aggregation": "count"
          }
        ],
			},
		},
    reportcomplete: function() {
      pivot14.off("reportcomplete");
      createChart14(); //quand le pivot est créé, le chart peut être créé
    }
});

function createChart14() { //le chart est créé
        pivot14.getData({ //avec les données contenues dans le pivot
    		}, drawChart14, updateChart14);
    };

function prepareDataFunction14(rawData) {
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

function drawChart14(rawData) {
    var data = prepareDataFunction14(rawData);
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
              display: false,
              position: 'right',
          },
          title: {
              display: false,
              fontSize: 18,
              text: ''
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

    var ctx = document.getElementById("chartcontainer14").getContext('2d');
		var chart = new Chart(ctx, {
        data: data_for_charts,
        type: 'bar',
        options: options
    });
};

function updateChart14(rawData) {
    chart.destroy14();
    drawChart14(rawData);
};
