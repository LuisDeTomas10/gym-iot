const handleLogin = () => {
  const loginForm = document.querySelector('#auth-login') as HTMLFormElement;
  if (!loginForm) return;

  const buttonSubmitLogin = loginForm.querySelector(
    'button'
  ) as HTMLButtonElement;

  const messageContainer = document.querySelector(
    '#login-message-container'
  ) as HTMLElement;

  const showMessage = (message: string, isSuccess: boolean) => {
    messageContainer.innerText = message;
    messageContainer.classList.remove(
      'd-none',
      'alert-danger',
      'alert-success'
    );

    if (isSuccess) {
      messageContainer.classList.add('alert-success');
    } else {
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
    const email: string = formData.get('email') as string;
    const password: string = formData.get('password') as string;

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
          if (roleID === 1) {
            window.location.href = '/admin/dashboard';
          } else if (roleID === 2) {
            window.location.href = '/';
          }
        } else {
          if (data.type === 'INVALID_USER') {
            showMessage('Usuario no encontrado.', false);
          } else {
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
  const registerForm = document.querySelector(
    '#auth-register'
  ) as HTMLFormElement;
  if (!registerForm) return;

  const buttonSubmitRegister = registerForm.querySelector(
    'button'
  ) as HTMLButtonElement;

  const messageContainer = document.querySelector(
    '#message-container'
  ) as HTMLElement;

  const showMessage = (message: string, isSuccess: boolean) => {
    messageContainer.innerText = message;
    messageContainer.classList.remove(
      'd-none',
      'alert-danger',
      'alert-success'
    );

    if (isSuccess) {
      messageContainer.classList.add('alert-success');
    } else {
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
    const first_name: string = formData.get('firstName') as string;
    const last_name: string = formData.get('lastName') as string;
    const email: string = formData.get('email') as string;
    const password: string = formData.get('password') as string;
    const confirmPassword: string = formData.get('confirmPassword') as string;
    const termsAccepted = formData.get('termsAndConditions') as string;
    const role: string = formData.get('role') as string; // Captura el valor del rol

    // Validación de campos
    if (
      !first_name ||
      !last_name ||
      !email ||
      !password ||
      !confirmPassword ||
      !role
    ) {
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
      .then(async (res) => {
        const data = await res.json();
        if (res.ok && data.success) {
          showMessage('Usuario registrado exitosamente.', true);

          setTimeout(() => {
            window.location.href = '/auth/login';
          }, 1000);
        } else {
          if (data.type === 'USER_ALREADY_EXISTS') {
            showMessage('El usuario ya existe.', false);
          } else {
            const errorMessage =
              data.message || 'Hubo un error en el registro.';
            showMessage(errorMessage, false);
          }
        }
      })
      .catch((error) => {
        console.error('Error en el registro:', error);
        showMessage(
          'Hubo un problema con la conexión. Inténtalo más tarde.',
          false
        );
      })
      .finally(() => {
        buttonSubmitRegister.disabled = false;
      });
  });
};

if (document.querySelector('#auth-login')) {
  handleLogin();
} else if (document.querySelector('#auth-register')) {
  handleRegister();
}
