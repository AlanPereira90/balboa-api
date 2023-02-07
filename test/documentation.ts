import { OpenAPIDocument } from 'easy-api-doc';

import { version } from '../package.json';

export const doc = new OpenAPIDocument(
  './doc/api-reference.yml',
  {
    version,
    title: 'Balboa API',
    description: 'Balboa API definitions',
  },
  [{ url: 'http://localhost:7000', description: 'Balboa API Server' }],
);
