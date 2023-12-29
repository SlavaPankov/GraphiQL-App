import { object, ObjectSchema } from 'yup';
import {
  ISDLSchema,
  SDLSchema,
} from '@utils/gqlSchemaService/schemas/SDLSchema';

interface ISDLResponse {
  data: { __schema: ISDLSchema };
}

export const SDLResponseSchema: ObjectSchema<ISDLResponse> = object({
  data: object({ __schema: SDLSchema }),
}).json();
