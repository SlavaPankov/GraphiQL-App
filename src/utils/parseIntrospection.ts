import { mixed, object } from 'yup';
import { IntrospectionQuery } from 'graphql/utilities';

const introspectionSchema = mixed<IntrospectionQuery>().defined();
const responseSchema = object({ data: introspectionSchema });

export const parseIntrospection = async (response: unknown) => {
  const { data } = await responseSchema.validate(response);
  return data;
};
