import { http, HttpResponse } from 'msw';
import ru from '../../../public/localization/ru/localization.json';
import en from '../../../public/localization/en/localization.json';
import mockGrapqhlResponse from './mockGraphqlResponse.json';

export const handlers = [
  http.get('http://localhost:3000/localization/ru/localization.json', () =>
    HttpResponse.json(ru)
  ),
  http.get('http://localhost:3000/localization/en/localization.json', () =>
    HttpResponse.json(en)
  ),
  http.post('https://rickandmortyapi.graphcdn.app/', () =>
    HttpResponse.json(mockGrapqhlResponse)
  ),
];
