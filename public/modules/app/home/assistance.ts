// @ts-nocheck
document.addEventListener('DOMContentLoaded', function () {
  const calendar = document.getElementById('calendar');
  const daysInMonth = new Date().getDate();

  const attendanceModal = new bootstrap.Modal(
    document.getElementById('attendanceModal')
  );

  document
    .getElementById('openAddAttendanceModal')
    .addEventListener('click', function () {
      attendanceModal.show();
    });

  document
    .getElementById('saveAttendance')
    .addEventListener('click', async function () {
      const activity = document.getElementById('activity').value;
      const userId = 1;
      const saveButton = document.getElementById('saveAttendance');

      if (activity.trim() !== '') {
        try {
          saveButton.disabled = true;
          saveButton.innerHTML = 'Guardando...';

          const response = await fetch('/api/assistance/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: userId,
              activity: activity,
            }),
          });

          const result = await response.json();
          if (response.ok) {
            showAlert('Asistencia guardada exitosamente', 'success');

            attendanceModal.hide();
          } else {
            showAlert(
              'Error al guardar la asistencia: ' + result.message,
              'danger'
            );
          }
        } catch (error) {
          console.error('Error en la solicitud:', error);
          showAlert('Ocurrió un error al registrar la asistencia.', 'danger');
        } finally {
          saveButton.disabled = false;
          saveButton.innerHTML = 'Guardar Asistencia';
          document.getElementById('attendanceForm').reset();
        }
      } else {
        showAlert('Por favor, ingresa la actividad realizada.', 'warning');
      }
    });

  function showAlert(message, type) {
    const alertContainer = document.getElementById('alert-container');

    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    alertContainer.appendChild(alertDiv);

    setTimeout(() => {
      alertDiv.classList.remove('show');
      alertDiv.classList.add('fade-out');
      setTimeout(() => alertDiv.remove(), 500);
    }, 2000);
  }
});
