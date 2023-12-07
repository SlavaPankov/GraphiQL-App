import { ObjectSchema, ValidationError } from 'yup';

type AnyObject = Record<string, string>;

export function validationForm<T extends AnyObject>(
  formData: Record<string, string>,
  schema: ObjectSchema<T>
): Promise<{ isValid: boolean; errors: Record<string, string> }> {
  return schema
    .validate(formData, { abortEarly: false })
    .then(() => ({ isValid: true, errors: {} }))
    .catch((err: ValidationError) => {
      const errors: Record<string, string> = {};

      err.inner.forEach((validationError) => {
        if (validationError.path) {
          errors[validationError.path] = validationError.message;
        }
      });

      return { isValid: false, errors };
    });
}
