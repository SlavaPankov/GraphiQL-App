import { object, ObjectSchema, string } from 'yup';

export interface ISDLSchemaQueryType {
  name: string;
}

export const SDLSchemaQueryTypeSchema: ObjectSchema<ISDLSchemaQueryType> =
  object({ name: string().defined() });
