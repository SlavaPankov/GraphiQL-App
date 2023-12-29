import { array, object, ObjectSchema, string } from 'yup';
import {
  ISDLSchemaTypeField,
  SDLSchemaTypeFieldSchema,
} from '@utils/gqlSchemaService/schemas/SDLSchemaTypeField';

export interface ISDLSchemaType {
  kind: string;
  name: string;
  description: string;
  fields: ISDLSchemaTypeField[] | null;
}

export const SDLSchemaTypeSchema: ObjectSchema<ISDLSchemaType> = object({
  kind: string().defined(),
  name: string().defined(),
  description: string().defined(),
  fields: array(SDLSchemaTypeFieldSchema).defined().nullable(),
});
