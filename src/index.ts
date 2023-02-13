import 'reflect-metadata';

import './infra/config/di';
import './domain/config/di';
import './application/config/di';

import { connectDB } from './infra/database/postgresConnection';

connectDB().then(() => {
  const { App } = require('./application/setup/App');

  const app = new App();
  app.listen();
});
