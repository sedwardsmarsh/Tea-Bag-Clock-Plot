import Chart from "chart.js/auto";

/*
fetch('data.json')
    .then(response => response.json())
    .then(jsonData => {
        const secondsData = jsonData.map(timestamp => timestampToSecondsSinceMidnight(timestamp));
        // Use secondsData for plotting, as shown above
    })
    .catch(error => console.error('Error loading JSON data:', error));
*/

// Example dataset (you could load this dynamically as well)
const jsonData = [
  "2024-09-20T08:30:00Z",
  "2024-09-20T10:15:00Z",
  "2024-09-20T12:45:30Z",
  "2024-09-20T15:00:10Z",
  "2024-09-20T09:05:45Z",
  "2024-09-20T08:50:23Z",
  "2024-09-20T12:30:15Z",
  "2024-09-20T16:25:12Z",
  "2024-09-20T08:10:05Z",
  "2024-09-20T17:00:59Z",
];

// Helper function to convert timestamp to seconds since midnight
function timestampToSecondsSinceMidnight(timestamp) {
  const date = new Date(timestamp);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const seconds = date.getUTCSeconds();
  return hours * 3600 + minutes * 60 + seconds; // Convert to total seconds since midnight
}

// Convert all timestamps to seconds since midnight
const secondsData = jsonData.map((timestamp) =>
  timestampToSecondsSinceMidnight(timestamp)
);

// Normalize data to fit within a full 24-hour cycle (86400 seconds)
const maxSeconds = 86400; // 24 hours * 60 minutes * 60 seconds

// Prepare chart data using the seconds since midnight
const ctx = document.getElementById("clockPolarPlot").getContext("2d");
const data = {
  labels: secondsData.map((sec) =>
    new Date(sec * 1000).toISOString().substr(11, 8)
  ), // Format as HH:MM:SS
  datasets: [
    {
      label: "Timestamps",
      data: secondsData.map((sec) => sec / maxSeconds), // Normalize data to the [0, 1] range for plotting
      backgroundColor: "rgba(54, 162, 235, 0.5)", // Set a color for the data points
      borderWidth: 1,
    },
  ],
};

const options = {
  scale: {
    ticks: {
      display: false, // Remove radial scale labels (numbers)
    },
  },
  plugins: {
    legend: {
      display: false, // Remove the legend
    },
  },
};

// Create the Polar Area Chart
new Chart(ctx, {
  type: "polarArea",
  data: data,
  options: options,
});
