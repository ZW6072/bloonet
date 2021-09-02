var pivot5 = new WebDataRocks({
    container: "#pivot5",
    toolbar: true,
    report: {
        "dataSource": {
            "dataSourceType": "csv",
            "filename": "https://cdn.webdatarocks.com/data/data.csv"
        },
        "slice": {
            "rows": [{
                "uniqueName": "Country",
                "sort": "asc"
            }],
            "columns": [{
                "uniqueName": "Category",
                "sort": "asc"
            }, {
                "uniqueName": "Measures"
            }],
            "measures": [{
                "uniqueName": "Revenue",
                "formula": "sum(\"Price\") * sum(\"Quantity\") ",
                "individual": true,
                "caption": "Revenue"
            }]
        },
        "formats": [{
            "name": "",
            "thousandsSeparator": " ",
            "decimalSeparator": ".",
            "decimalPlaces": 2,
            "maxSymbols": 20,
            "currencySymbol": "",
            "currencySymbolAlign": "left",
            "nullValue": " ",
            "infinityValue": "Infinity",
            "divideByZeroValue": "Infinity"
        }]
    },
    reportcomplete: function() {
        pivot5.off("reportcomplete");
        pivot5TableReportComplete = true;
        createGoogleChart();
    }
});

var pivot5TableReportComplete = false;
var googleChartsLoaded = false;

google.charts.load('current', {
    'packages': ['geochart'],
    'mapsApiKey': 'AIzaSyD-9tSrke72PouQMnMX-a7eZSW0jkFMBWY'
});
google.charts.setOnLoadCallback(onGoogleChartsLoaded);

function onGoogleChartsLoaded() {
    googleChartsLoaded = true;
    if (pivot5TableReportComplete) {
        createGoogleChart();
    }
}

function createGoogleChart() {
    if (googleChartsLoaded) {
        pivot5.googlecharts.getData({
                type: "bar"
            },
            drawChart5,
            drawChart5
        );
    }
}

function drawChart5(_data) {
    var data = google.visualization.arrayToDataTable(_data.data);

    var options = {
        colorAxis: {
            colors: ['#2f682f', '#367736', '#3d863d', '#449544']
        },
        backgroundColor: '#ffffff',
        datalessRegionColor: '#F9F1F3',
        defaultColor: '#F9F1F3'
    };

    var chart = new google.visualization.GeoChart(document.getElementById('googlechart-container5'));
    chart.draw(data, options);
}
