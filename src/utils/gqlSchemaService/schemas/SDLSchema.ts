import {
  ISDLSchemaQueryType,
  SDLSchemaQueryTypeSchema,
} from '@utils/gqlSchemaService/schemas/SDLSchemaQueryType';
import {
  ISDLSchemaType,
  SDLSchemaTypeSchema,
} from '@utils/gqlSchemaService/schemas/SDLSchemaType';
import { array, object, ObjectSchema } from 'yup';

export interface ISDLSchema {
  queryType: ISDLSchemaQueryType;
  types: ISDLSchemaType[];
}

export const SDLSchema: ObjectSchema<ISDLSchema> = object({
  queryType: SDLSchemaQueryTypeSchema,
  types: array(SDLSchemaTypeSchema).defined(),
});
