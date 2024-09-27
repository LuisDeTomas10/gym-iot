var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// @ts-nocheck
document.addEventListener('DOMContentLoaded', function () {
    const calendar = document.getElementById('calendar');
    const attendanceModal = new bootstrap.Modal(document.getElementById('attendanceModal'));
    const saveButton = document.getElementById('saveAttendance');
    const openAddAttendanceModalButton = document.getElementById('openAddAttendanceModal');
    // Event listeners
    setupEventListeners();
    /**
     * Configura los event listeners para los botones.
     */
    function setupEventListeners() {
        openAddAttendanceModalButton.addEventListener('click', openAddAttendanceModal);
        saveButton.addEventListener('click', saveAttendance);
    }
    /**
     * Muestra el modal de agregar asistencia.
     */
    function openAddAttendanceModal() {
        attendanceModal.show();
    }
    /**
     * Guarda una asistencia al hacer clic en el botón "Guardar Asistencia".
     */
    function saveAttendance() {
        return __awaiter(this, void 0, void 0, function* () {
            const activityType = document.getElementById('activityType').value;
            const repetitions = document.getElementById('repetitions').value;
            const activity = document.getElementById('activity').value;
            const userId = 1;
            if (!validateAttendanceForm(activity)) {
                showAlert('Por favor, ingresa la actividad realizada.', 'warning');
                return;
            }
            saveButton.disabled = true;
            saveButton.innerHTML = 'Guardando...';
            try {
                const response = yield registerAttendance(userId, activity, activityType, repetitions);
                const result = yield response.json();
                if (response.ok) {
                    showAlert('Asistencia guardada exitosamente', 'success');
                    attendanceModal.hide();
                    window.location.reload();
                }
                else {
                    showAlert('Error al guardar la asistencia: ' + result.message, 'danger');
                }
            }
            catch (error) {
                console.error('Error en la solicitud:', error);
                showAlert('Ocurrió un error al registrar la asistencia.', 'danger');
            }
            finally {
                resetSaveButton();
                document.getElementById('attendanceForm').reset();
            }
        });
    }
    /**
     * Valida el formulario de asistencia.
     * @param {string} activity
     * @returns {boolean}
     */
    function validateAttendanceForm(activity) {
        return activity.trim() !== '';
    }
    /**
     * Realiza la solicitud para registrar la asistencia.
     * @param {number} userId
     * @param {string} activity
     * @param {string} activityType
     * @param {number} repetitions
     * @returns {Promise<Response>}
     */
    function registerAttendance(userId, activity, activityType, repetitions) {
        return fetch('/api/assistance/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: userId,
                activity: activity,
                activityType: activityType,
                repetitions: repetitions,
            }),
        });
    }
    /**
     * Resetea el botón de guardar asistencia.
     */
    function resetSaveButton() {
        saveButton.disabled = false;
        saveButton.innerHTML = 'Guardar Asistencia';
    }
});
const alertContainer = document.getElementById('alert-container');
function createAlertElement(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.role = 'alert';
    alertDiv.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    return alertDiv;
}
function deleteActivity() {
    return __awaiter(this, void 0, void 0, function* () {
        const deleteButton = document.getElementById('deleteActivityButton');
        if (!currentActivityId) {
            showAlert('No se ha seleccionado una actividad válida para eliminar.', 'danger');
            return;
        }
        deleteButton.disabled = true;
        deleteButton.innerHTML = 'Eliminando...';
        try {
            const response = yield fetch(`/api/assistance/delete/${currentActivityId}`, {
                method: 'DELETE',
            });
            const result = yield response.json();
            console.log(result);
            if (response.ok) {
                showAlert('Actividad eliminada exitosamente', 'success');
                window.location.reload();
            }
            else {
                showAlert('Error al eliminar la actividad: ' + result.message, 'danger');
            }
        }
        catch (error) {
            console.error('Error en la solicitud:', error);
            showAlert('Ocurrió un error al eliminar la actividad.', 'danger');
        }
        finally {
            resetDeleteButton(deleteButton);
        }
    });
}
function showAlert(message, type) {
    const alertDiv = createAlertElement(message, type);
    alertContainer.appendChild(alertDiv);
    setTimeout(() => {
        alertDiv.classList.remove('show');
        alertDiv.classList.add('fade-out');
        setTimeout(() => alertDiv.remove(), 500);
    }, 2000);
}
function resetDeleteButton(deleteButton) {
    deleteButton.disabled = false;
    deleteButton.innerHTML = 'Eliminar';
}
