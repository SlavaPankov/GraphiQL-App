import { graphql, http, HttpResponse } from 'msw';
import ru from '../../../public/localization/ru/localization.json';
import en from '../../../public/localization/en/localization.json';
import mockSDLResponse from './mockSDLResponse.json';

export const handlers = [
  http.get('http://localhost:3000/localization/ru/localization.json', () =>
    HttpResponse.json(ru)
  ),
  http.get('http://localhost:3000/localization/en/localization.json', () =>
    HttpResponse.json(en)
  ),

  graphql.query('IntrospectionQuery', () => HttpResponse.json(mockSDLResponse)),
];
