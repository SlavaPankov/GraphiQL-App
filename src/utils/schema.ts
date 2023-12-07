import { object, ObjectSchema, ref, string } from 'yup';
import { IFormData } from '@type/interfaces/IFormData';

export const schema: ObjectSchema<IFormData> = object({
  name: string().required(),
  email: string().email().required(),
  password: string().required(),
  confirmPassword: string()
    .oneOf([ref('password')], 'dd')
    .required(),
});
