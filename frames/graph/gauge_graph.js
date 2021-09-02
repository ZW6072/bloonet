var pivot8 = new WebDataRocks({
    container: "#pivot8",
    toolbar: false, //les boutons du bandeau de base sont masqués et remplacés par le bouton custom d'appel d'un csv local
    height: 400,
    width: 400,
    report: {
      "dataSource": {
          "dataSourceType": "csv",
          "filename": "https://zw6072.github.io/depot_data/MISYS.csv" //seules les sources en ligne peuvent être lues, sauf à passer par le bouton d'appel d'un csv
      },
      "slice": {
        "reportFilters": [{
                "uniqueName": "sid", //filtre tout le rapport avec le champs "sid"
                "caption": "Vehicle type",
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
        "rows": [
            {
            "uniqueName": "ent", //champs "ent" en ligne
            "caption": "Time slot",
            "filter": {
                "members": [
                    "ent.0"  //filtre le rapport avec "sid" = "0"
                ],
              },
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
          "uniqueName": "speed",
          "aggregation": "average",
          "format": "currency",
          "caption": "Average speed",
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
      pivot8.off("reportcomplete");
      createChart14(); //quand le pivot est créé, le chart peut être créé
    }
});

// Create chart 1
var config = {
  type: 'gauge',
  data: {
    datasets: [{
      data: [1,2,3,4], //quadran
      value: [3], //position de l'aiguille
      backgroundColor: [
        'rgba(53, 165, 63, 0.8)',
        'rgba(241, 196, 15, 0.8)',
        'rgba(231, 76, 60, 0.8)',
        'rgba(216, 62, 106, 0.8)'],
      borderWidth: 2
    }]
  },
  options: {
    responsive: true,
    title: {
      display: true,
      text: 'Gauge chart'
    },
    layout: {
      padding: {
        bottom: 30
      }
    },
    needle: {
      // Needle circle radius as the percentage of the chart area width
      radiusPercentage: 2,
      // Needle width as the percentage of the chart area width
      widthPercentage: 3.2,
      // Needle length as the percentage of the interval between inner radius (0%) and outer radius (100%) of the arc
      lengthPercentage: 80,
      // The color of the needle
      color: 'rgba(0, 0, 0, 1)'
    },
    valueLabel: {
      formatter: Math.round
    }
  }
};

window.onload = function() {

var ctx = document.getElementById('chart').getContext('2d');
  window.myGauge = new Chart(ctx, config);
};

document.getElementById('chart').addEventListener(function() {
  config.data.datasets(function(dataset) {
    (dataset.data);
  });

  window.myGauge.update();
});
