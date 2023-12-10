/* eslint-disable import/no-extraneous-dependencies */
import { http, HttpResponse } from 'msw';
import ru from '../../../public/localization/ru/localization.json';
import en from '../../../public/localization/en/localization.json';

export const handlers = [
  http.get('http://localhost:3000/localization/ru/localization.json', () =>
    HttpResponse.json(ru)
  ),
  http.get('http://localhost:3000/localization/en/localization.json', () =>
    HttpResponse.json(en)
  ),
];
