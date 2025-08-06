const ctx = document.getElementById("priceChart").getContext("2d");


const labels = [
  "Nov 10", "Nov 11", "Nov 12", "Nov 13", "Nov 14",
  "Nov 15", "Nov 16", "Nov 17", "Nov 18", "Nov 19"
];
const datasets = [
  {
    label: "Saraku (₹/Quintal)",
    data: [68000, 54000, 52100, 55100, 61600, 58009, 52100, 51100, 58009, 52100],
    borderColor: "rgba(255, 99, 132, 1)",
    backgroundColor: "rgba(255, 99, 132, 0.2)",
    tension: 0.3,
    pointRadius: 5,
    pointHoverRadius: 8,
    pointHitRadius: 15,
  },
  {
    label: "Bette (₹/Quintal)",
    data: [50400, 54300, 46200, 47010, 55000, 46900, 46200, 50100, 46900, 46200],
    borderColor: "rgba(54, 162, 235, 1)",
    backgroundColor: "rgba(54, 162, 235, 0.2)",
    tension: 0.3,
    pointRadius: 5,
    pointHoverRadius: 8,
    pointHitRadius: 15,
  },
  {
    label: "Raashi (₹/Quintal)",
    data: [47500, 42070, 42070, 40870, 40570, 41600, 42070, 40070, 41600, 42070],
    borderColor: "rgba(75, 192, 192, 1)",
    backgroundColor: "rgba(75, 192, 192, 0.2)",
    tension: 0.3,
    pointRadius: 5,
    pointHoverRadius: 8,
    pointHitRadius: 15,
  },
  {
    label: "Gorublu (₹/Quintal)",
    data: [30200, 30900, 30200, 30800, 30600, 28200, 30200, 30600, 28200, 30200],
    borderColor: "rgba(255, 206, 86, 1)",
    backgroundColor: "rgba(255, 206, 86, 0.2)",
    tension: 0.3,
    pointRadius: 5,
    pointHoverRadius: 8,
    pointHitRadius: 15,
  }
];


const priceChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: labels,
    datasets: datasets,
  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        enabled: true,
        callbacks: {
          label: function (context) {
            return `${context.dataset.label}: ₹${context.raw}`;
          },
        },
      },
      legend: {
        display: true,
        position: "top",
      },
      title: {
        display: true,
        text: "Arecanut Price Trends (₹/Quintal)",
        font: {
          size: 18,
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Price (₹/Quintal)",
        },
        beginAtZero: true,
      },
    },
  },
});


document.getElementById("filter").addEventListener("change", (event) => {
  const selectedValue = event.target.value;

  if (selectedValue === "all") {
   
    priceChart.data.datasets = datasets;
  } else {
    
    priceChart.data.datasets = datasets.filter(dataset =>
      dataset.label.toLowerCase().includes(selectedValue.toLowerCase())
    );
  }

  
  priceChart.update();
});

const priceData = {
  Saraku: [68000, 54000, 52100, 55100,  61600,  58009,  52100 , 51100, 58009, 52100],
  Bette: [50400, 54300, 46200, 47010, 55000, 46900, 46200, 50100, 46900, 46200],
  Raashi: [47500, 42070, 42070, 40870, 40570, 41600, 42070, 40070, 41600, 42070],
  Gorublu: [30200, 30900, 30200, 30800, 30600, 28200, 30200, 30600, 28200, 30200],
};

 
function predictPrice(data) {
  const lastTenDays = data.slice(-10); 
  const sum = lastTenDays.reduce((acc, price) => acc + price, 0);
  return (sum / lastTenDays.length).toFixed(2); 
}

function updatePredictions() {
  document.getElementById("Saraku-prediction").textContent = predictPrice(priceData.Saraku);
  document.getElementById("Bette-prediction").textContent = predictPrice(priceData.Bette);
  document.getElementById("Raashi-prediction").textContent = predictPrice(priceData.Raashi);
  document.getElementById("Gorublu-prediction").textContent = predictPrice(priceData.Gorublu);
}


updatePredictions();