// @ts-nocheck
let originalActivityType = '';
let originalRepetitions = '';
let originalDescription = '';
let originalCheckInTime = '';

document.addEventListener('DOMContentLoaded', function () {
  var calendarEl = document.getElementById('calendar');
  var currentActivityId = null; // Almacena el ID de la actividad a actualizar

  // Obtener todas las asistencias del servidor
  fetch('/api/assistance/list/1')
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        const events = data.assistances.map((assistance) => {
          return {
            id: assistance.id,
            title:
              assistance.activity ||
              (assistance.check_in_time ? 'Asistido' : 'Faltó'),
            start: assistance.assistance_date,
            color: assistance.check_in_time ? 'green' : 'red',
            extendedProps: {
              checkInTime: assistance.check_in_time,
              activityType: assistance.activity_type,
              repetitions: assistance.repetitions,
              description: assistance.activity,
            },
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

            var detailsText = `<strong>Día seleccionado:</strong> ${selectedDay}`;
            if (eventsOnDay.length > 0) {
              eventsOnDay.forEach((event, index) => {
                var dateComplete = event.extendedProps.checkInTime;
                var dateFormated = dateComplete.slice(0, 5); // Formatear para comparar solo HH:MM
                detailsText += `<br><strong>Actividad ${index + 1}:</strong> ${event.title}`;
                if (event.extendedProps.activityType) {
                  detailsText += `<br><strong>Tipo de Actividad:</strong> ${event.extendedProps.activityType}`;
                }
                if (event.extendedProps.repetitions) {
                  detailsText += `<br><strong>Repeticiones:</strong> ${event.extendedProps.repetitions}`;
                }
                if (event.extendedProps.description) {
                  detailsText += `<br><strong>Descripción:</strong> ${event.extendedProps.description}`;
                }
                if (dateFormated) {
                  detailsText += `<br><strong>Hora de Entrada:</strong> ${dateFormated}`;
                }

                // Botones para Actualizar y Eliminar
                detailsText += `<br><button class="btn btn-warning" onclick="openUpdateModal(${event.id}, '${event.extendedProps.activityType}', ${event.extendedProps.repetitions}, '${event.extendedProps.description}', '${dateFormated}')">Actualizar</button>`;
                detailsText += `<button class="btn btn-danger" onclick="openDeleteModal(${event.id})">Eliminar</button>`;
                detailsText += `<hr>`;
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

// Función para abrir el modal de actualización con datos precargados
function openUpdateModal(id, activityType, repetitions, description, checkInTime) {
  currentActivityId = id; // Guardar el ID de la actividad que se va a actualizar

  // Precargar los valores en el formulario
  document.getElementById('activityTypeInput').value = activityType || '';
  document.getElementById('repetitionsInput').value = repetitions || '';
  document.getElementById('descriptionInput').value = description || '';
  document.getElementById('checkInTimeInput').value = checkInTime || '';

  // Guardar los valores originales para compararlos después
  originalActivityType = activityType || '';
  originalRepetitions = repetitions ? repetitions.toString() : ''; // Convertir a string para comparación
  originalDescription = description || '';
  originalCheckInTime = checkInTime || ''; // Convertir a formato uniforme si es necesario

  // Abrir el modal de actualización
  var updateModal = new bootstrap.Modal(document.getElementById('updateModal'));
  updateModal.show();
}

// Función para guardar los cambios de la actividad
function saveUpdatedActivity() {
  // Obtener los valores actuales del formulario
  const updatedActivityType = document.getElementById('activityTypeInput').value;
  const updatedRepetitions = document.getElementById('repetitionsInput').value;
  const updatedDescription = document.getElementById('descriptionInput').value;
  const updateCheckInTime = document.getElementById('checkInTimeInput').value;

  // Comparar los valores originales con los actuales
  const valuesChanged =
    updatedActivityType !== originalActivityType ||
    updatedRepetitions !== originalRepetitionrs ||
    updatedDescription !== originalDescription ||
    updateCheckInTime !== originalCheckInTime;

  if (!valuesChanged) {
    alert('Debe cambiar al menos un campo para actualizar la actividad.');
    return; // Detener la ejecución si no hay cambios
  }

  const bodyPostUpdate = {
    activity_type: updatedActivityType,
    repetitions: updatedRepetitions,
    activity: updatedDescription,
    check_in_time: updateCheckInTime,
  };

  // Enviar los datos actualizados al backend
  fetch(`/api/assistance/update/${currentActivityId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(bodyPostUpdate),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        alert('Actividad actualizada exitosamente');
        window.location.reload(); // Recargar la página para reflejar los cambios
      } else {
        alert('Error al actualizar la actividad');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Función para abrir el modal de confirmación de eliminación
function openDeleteModal(id) {
  currentActivityId = id; // Guardar el ID de la actividad que se va a eliminar
  var deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
  deleteModal.show();
}
