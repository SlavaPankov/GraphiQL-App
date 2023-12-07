import { ObjectSchema, ValidationError } from 'yup';

type AnyObject = Record<string, string>;

export async function validationForm<T extends AnyObject>(
  formData: Record<string, string>,
  schema: ObjectSchema<T>
): Promise<{ isValid: boolean; errors: Record<string, string> }> {
  try {
    await schema.validate(formData, { abortEarly: false });
    return { isValid: true, errors: {} };
  } catch (err) {
    const validationErrors = err as ValidationError;
    const errors: Record<string, string> = {};

    validationErrors.inner.forEach((validationError) => {
      if (validationError.path) {
        errors[validationError.path] = validationError.message;
      }
    });

    return { isValid: false, errors };
  }
}
