import { ValidationError } from 'yup';

interface ErrorInterface {
  [type: string]: string;
}

export default function getValidationErrors(
  err: ValidationError,
): ErrorInterface {
  const validationErrors: ErrorInterface = {};

  err.inner.forEach((error) => {
    validationErrors[error.path] = error.message;
  });

  return validationErrors;
}
