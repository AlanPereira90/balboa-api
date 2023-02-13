import 'reflect-metadata';
import chai from 'chai';
import sinonChai from 'sinon-chai';
import chaiAsPromised from 'chai-as-promised';
import { container } from 'tsyringe';
import { DataSource, Repository } from 'typeorm';
import { stub } from 'sinon';

import './setupEnvVars';

container.registerInstance('PostgresConnection', {
  //@ts-ignore
  getRepository: stub().returns(new Repository()),
} as unknown as DataSource);

import '../src/domain/config/di';
import '../src/application/config/di';

chai.use(sinonChai);
chai.use(chaiAsPromised);
