import supertest from 'supertest';
import { expect } from 'chai';
import { restore, stub } from 'sinon';
import faker from '@faker-js/faker';
import { DeleteResult, Repository } from 'typeorm';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';

import { logger } from '../../../src/infra/logger/logger';
import { App } from '../../../src/application/setup/App';
import { doc } from '../../documentation';

const app = new App().app;
const client = supertest(app);

const route = '/workouts';

after(async () => {
  try {
    await doc.writeFile();
  } catch (error) {
    logger.error(error);
  }
});

afterEach(() => {
  restore();
});

describe('DELETE /workouts/:id', () => {
  it('should return 200 OK', async () => {
    const id = faker.datatype.uuid();

    const deleteResult = {
      affected: 1,
    } as DeleteResult;

    const del = stub(Repository.prototype, 'delete').resolves(deleteResult);

    const res = await client.delete(`${route}/${id}`);

    expect(res.status).to.be.equal(OK);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('affectedRows').to.be.equal(deleteResult.affected);
    expect(del).to.be.calledOnce;

    doc
      .path('/workouts')
      .verb('delete', { tags: ['Workouts'] })
      .fromSuperAgentResponse(res, 'success');
  });

  it('should return 500 INTERNAL_SERVER_ERROR when db fails', async () => {
    const id = faker.datatype.uuid();

    const message = faker.lorem.sentence();
    const del = stub(Repository.prototype, 'delete').rejects(new Error(message));

    const res = await client.delete(`${route}/${id}`);

    expect(res.status).to.be.equal(INTERNAL_SERVER_ERROR);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('message').to.be.equal(message);
    expect(del).to.be.calledOnce;

    doc
      .path('/workouts')
      .verb('delete', { tags: ['Workouts'] })
      .fromSuperAgentResponse(res, 'internal error');
  });
});
