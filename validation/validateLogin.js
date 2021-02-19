export default function validateLogin(values) {
  let errors = {};

  if (!values.email) {
    errors.email = 'El correo es obligatorio';
  } else if (
    !/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/i.test(
      values.email
    )
  ) {
    errors.email = 'El correo es incorrecto';
  }

  if (!values.password) {
    errors.password = 'La contraseña no es obligatorio';
  } else if (values.password.length < 6) {
    errors.password = 'La contrasela debe tener al menos 6 caracteres';
  }

  return errors;
}
