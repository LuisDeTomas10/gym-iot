// @ts-nocheck
// function generateCaloriesData(start, end, type) {
//   let labels = [];
//   let data = [];
//   let currentDate = new Date(start);
//   while (currentDate <= end) {
//     if (type === 'daily') {
//       labels.push(currentDate.toLocaleDateString());
//       data.push(Math.floor(Math.random() * 500) + 200);
//     } else if (type === 'weekly' && currentDate.getDay() === 0) {
//       labels.push(`Semana ${getWeekNumber(currentDate)}`);
//       data.push(Math.floor(Math.random() * 2000) + 1500);
//     }
//     currentDate.setDate(currentDate.getDate() + 1);
//   }
//   return { labels, data };
// }

// function getWeekNumber(d) {
//   d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
//   d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
//   var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
//   var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
//   return weekNo;
// }

// function generateWeightData(period) {
//   let labels = [];
//   let data = [];
//   let endDate = new Date();
//   let startDate = new Date();
//   let interval = 1;

//   switch (period) {
//     case '1m':
//       startDate.setMonth(startDate.getMonth() - 1);
//       interval = 2;
//       break;
//     case '3m':
//       startDate.setMonth(startDate.getMonth() - 3);
//       interval = 7;
//       break;
//     case '6m':
//       startDate.setMonth(startDate.getMonth() - 6);
//       interval = 14;
//       break;
//     case '1y':
//       startDate.setFullYear(startDate.getFullYear() - 1);
//       interval = 30;
//       break;
//   }

//   let currentDate = new Date(startDate);
//   let currentWeight = 80;

//   while (currentDate <= endDate) {
//     labels.push(currentDate.toLocaleDateString());
//     data.push(currentWeight);
//     currentDate.setDate(currentDate.getDate() + interval);
//     currentWeight += (Math.random() - 0.5) * 0.5;
//   }

//   return { labels, data };
// }

// let caloriesChart;
// function initCaloriesChart() {
//   const ctx = document.getElementById('calories-chart').getContext('2d');
//   const startDate = new Date();
//   startDate.setDate(startDate.getDate() - 7);
//   const endDate = new Date();
//   const { labels, data } = generateCaloriesData(startDate, endDate, 'daily');

//   caloriesChart = new Chart(ctx, {
//     type: 'bar',
//     data: {
//       labels: labels,
//       datasets: [
//         {
//           label: 'Calorías quemadas',
//           data: data,
//           backgroundColor: 'rgba(255, 99, 132, 0.5)',
//           borderColor: 'rgb(255, 99, 132)',
//           borderWidth: 1,
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       scales: {
//         y: {
//           beginAtZero: true,
//         },
//       },
//     },
//   });
// }

// let weightChart;
// function initWeightChart() {
//   const ctx = document.getElementById('weight-chart').getContext('2d');
//   const { labels, data } = generateWeightData('1m');

//   weightChart = new Chart(ctx, {
//     type: 'line',
//     data: {
//       labels: labels,
//       datasets: [
//         {
//           label: 'Peso (kg)',
//           data: data,
//           borderColor: 'rgb(75, 192, 192)',
//           tension: 0.1,
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       scales: {
//         y: {
//           beginAtZero: false,
//         },
//       },
//     },
//   });
// }

// function updateCaloriesChart() {
//   const startDate = new Date(
//     document.getElementById('calories-start-date').value
//   );
//   const endDate = new Date(document.getElementById('calories-end-date').value);
//   const chartType = document.getElementById('calories-chart-type').value;
//   const { labels, data } = generateCaloriesData(startDate, endDate, chartType);

//   caloriesChart.data.labels = labels;
//   caloriesChart.data.datasets[0].data = data;
//   caloriesChart.update();
// }

// function updateWeightChart() {
//   const period = document.getElementById('weight-period').value;
//   const { labels, data } = generateWeightData(period);

//   weightChart.data.labels = labels;
//   weightChart.data.datasets[0].data = data;
//   weightChart.update();
// }

// document.addEventListener('DOMContentLoaded', function () {
//   initCaloriesChart();
//   initWeightChart();

//   document.getElementById('calories-start-date').valueAsDate = new Date(
//     new Date().setDate(new Date().getDate() - 7)
//   );
//   document.getElementById('calories-end-date').valueAsDate = new Date();

//   document
//     .getElementById('calories-start-date')
//     .addEventListener('change', updateCaloriesChart);
//   document
//     .getElementById('calories-end-date')
//     .addEventListener('change', updateCaloriesChart);
//   document
//     .getElementById('calories-chart-type')
//     .addEventListener('change', updateCaloriesChart);
//   document
//     .getElementById('weight-period')
//     .addEventListener('change', updateWeightChart);
// });

document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');

  fetch('/api/assistance/list/1')
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const events = data.assistances.map((assistance) => {
          return {
            title: assistance.check_in_time ? 'Asistido' : 'Faltó',
            start: assistance.assistance_date,
            color: assistance.check_in_time ? 'green' : 'red',
          };
        });

        var calendar = new FullCalendar.Calendar(calendarEl, {
          locale: 'es',
          initialView: 'dayGridMonth',
          events: events,
          dateClick: function (info) {
            var selectedDay = info.dateStr;
            var eventsOnDay = calendar
              .getEvents()
              .filter((event) => event.startStr === selectedDay);

            var detailsText = `Día seleccionado: ${selectedDay}`;
            if (eventsOnDay.length > 0) {
              eventsOnDay.forEach((event) => {
                detailsText += `<br>Estado: ${event.title}`;
              });
            } else {
              detailsText += `<br>No hay eventos registrados para este día.`;
            }

            document.getElementById('day-details').innerHTML = detailsText;

            var modal = new bootstrap.Modal(
              document.getElementById('dayModal')
            );
            modal.show();
          },
        });

        calendar.render();
      } else {
        console.error('Error al obtener las asistencias.');
      }
    })
    .catch((error) => {
      console.error('Error en la solicitud:', error);
    });
});
