import { object, ObjectSchema, string } from 'yup';

export interface ISDLSchemaTypeField {
  name: string;
  description: string | null;
}

export const SDLSchemaTypeFieldSchema: ObjectSchema<ISDLSchemaTypeField> =
  object({
    name: string().defined(),
    description: string().defined().nullable(),
  });
