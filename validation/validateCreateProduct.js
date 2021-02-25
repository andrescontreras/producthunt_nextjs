export default function validateCreateAccount(values) {
  let errors = {};
  if (!values.name) {
    errors.name = 'El nombre es obligatorio';
  }

  if (!values.company) {
    errors.company = 'La empresa es requerida';
  }

  if (!values.url) {
    errors.url = 'La URL del producto es obligatoria';
  } else if (!/^(ftp|http|https):\/\/[^""]+$/.test(values.url)) {
    errors.url = 'URL incorrecta';
  }

  if (!values.description) {
    errors.description = 'Agrega una descripcion del producto';
  }

  return errors;
}
