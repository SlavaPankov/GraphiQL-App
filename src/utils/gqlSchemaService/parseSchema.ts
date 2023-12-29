import { SDLResponseSchema } from '@utils/gqlSchemaService/schemas/SDLResponse';

export const parseSchema = async (rawResponse: string) => {
  const response = await SDLResponseSchema.validate(rawResponse);
  return response.data.__schema;
};
