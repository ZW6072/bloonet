var ctx = document.getElementById("chartcontainerA4");
var chartcontainerA4 = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['High QoS', 'Minimum QoS'],
    datasets: [{
      label: 'High QoS"/"Minimum QoS',
      data: [85.36, 98.78, 100],
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(60, 198, 205, 0.5)',
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(60, 198, 205, 1)',
      ],
      borderWidth: 0,
      barThickness: 80,
    }]
  },
  options: {
    indexAxis: 'y',
    responsive: false,
    scales: {
      y: {
          max: 100,
          min: 0,
        },
      },
    plugins: {
      legend: {
        display: false
      }
    }
  }
});
