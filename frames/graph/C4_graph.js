var ctx = document.getElementById("chartcontainerC4");
var chartcontainerC4 = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['High QoS', 'Minimum QoS'],
    datasets: [{
      label: '',
      data: [99.71, 100, 100],
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
      },
      title: {
          display: true,
          fontSize: 18,
          text: 'High QoS / Minimum QoS'
      },
    }
  }
});
