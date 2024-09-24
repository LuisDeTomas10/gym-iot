var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const handleLogin = () => {
    const loginForm = document.querySelector('#auth-login');
    if (!loginForm)
        return;
    const buttonSubmitLogin = loginForm.querySelector('button');
    const messageContainer = document.querySelector('#login-message-container');
    const showMessage = (message, isSuccess) => {
        messageContainer.innerText = message;
        messageContainer.classList.remove('d-none', 'alert-danger', 'alert-success');
        if (isSuccess) {
            messageContainer.classList.add('alert-success');
        }
        else {
            messageContainer.classList.add('alert-danger');
        }
        setTimeout(() => {
            messageContainer.classList.add('d-none');
            messageContainer.innerText = '';
        }, 2000);
    };
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        buttonSubmitLogin.disabled = true;
        const formData = new FormData(loginForm);
        const email = formData.get('email');
        const password = formData.get('password');
        if (!email || !password) {
            showMessage('Email y contraseña son requeridos.', false);
            buttonSubmitLogin.disabled = false;
            return;
        }
        fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
            .then((res) => res.json())
            .then((data) => {
            console.log('Login Response:', data);
            if (data.success) {
                const roleID = data.user.role.id;
                console.log(data.user);
                if (roleID === 2) {
                    window.location.href = '/admin/dashboard';
                }
                else if (roleID === 1) {
                    window.location.href = '/';
                }
            }
            else {
                if (data.type === 'INVALID_USER') {
                    showMessage('Usuario no encontrado.', false);
                }
                else {
                    showMessage(data.message || 'Credenciales incorrectas.', false);
                }
            }
        })
            .catch((error) => {
            console.error('Error en el login:', error);
            showMessage('Error en el servidor. Inténtalo más tarde.', false);
        })
            .finally(() => {
            buttonSubmitLogin.disabled = false;
        });
    });
};
const handleRegister = () => {
    const registerForm = document.querySelector('#auth-register');
    if (!registerForm)
        return;
    const buttonSubmitRegister = registerForm.querySelector('button');
    const messageContainer = document.querySelector('#message-container');
    const showMessage = (message, isSuccess) => {
        messageContainer.innerText = message;
        messageContainer.classList.remove('d-none', 'alert-danger', 'alert-success');
        if (isSuccess) {
            messageContainer.classList.add('alert-success');
        }
        else {
            messageContainer.classList.add('alert-danger');
        }
        setTimeout(() => {
            messageContainer.classList.add('d-none');
            messageContainer.innerText = '';
        }, 2000);
    };
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        buttonSubmitRegister.disabled = true;
        const formData = new FormData(registerForm);
        const first_name = formData.get('firstName');
        const last_name = formData.get('lastName');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');
        const termsAccepted = formData.get('termsAndConditions');
        const role = formData.get('role'); // Captura el valor del rol
        // Validación de campos
        if (!first_name ||
            !last_name ||
            !email ||
            !password ||
            !confirmPassword ||
            !role) {
            showMessage('Todos los campos son requeridos, incluido el rol.', false);
            buttonSubmitRegister.disabled = false;
            return;
        }
        if (!termsAccepted) {
            showMessage('Debes aceptar los términos y condiciones.', false);
            buttonSubmitRegister.disabled = false;
            return;
        }
        if (password !== confirmPassword) {
            showMessage('Las contraseñas no coinciden.', false);
            buttonSubmitRegister.disabled = false;
            return;
        }
        const userData = {
            first_name,
            last_name,
            email,
            password,
            role, // Incluye el rol en los datos del usuario
            terms_accepted: termsAccepted,
        };
        fetch('/api/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        })
            .then((res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield res.json();
            if (res.ok && data.success) {
                showMessage('Usuario registrado exitosamente.', true);
                setTimeout(() => {
                    window.location.href = '/auth/login';
                }, 1000);
            }
            else {
                if (data.type === 'USER_ALREADY_EXISTS') {
                    showMessage('El usuario ya existe.', false);
                }
                else {
                    const errorMessage = data.message || 'Hubo un error en el registro.';
                    showMessage(errorMessage, false);
                }
            }
        }))
            .catch((error) => {
            console.error('Error en el registro:', error);
            showMessage('Hubo un problema con la conexión. Inténtalo más tarde.', false);
        })
            .finally(() => {
            buttonSubmitRegister.disabled = false;
        });
    });
};
if (document.querySelector('#auth-login')) {
    handleLogin();
}
else if (document.querySelector('#auth-register')) {
    handleRegister();
}
