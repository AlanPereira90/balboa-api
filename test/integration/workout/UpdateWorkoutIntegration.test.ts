import supertest from 'supertest';
import { expect } from 'chai';
import { restore, stub } from 'sinon';
import faker from '@faker-js/faker';
import { Repository, UpdateResult } from 'typeorm';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from 'http-status';

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

describe('PUT /workouts/:id', () => {
  it('should return 200 OK', async () => {
    const id = faker.datatype.uuid();
    const body = {
      name: faker.lorem.word(),
      details: [
        {
          name: faker.lorem.word(),
          order: faker.datatype.number({ min: 0, max: 10 }),
          items: [faker.lorem.word(), faker.lorem.word()],
        },
      ],
    };

    const updateResult = {
      affected: 1,
    } as UpdateResult;

    const update = stub(Repository.prototype, 'update').resolves(updateResult);

    const res = await client.put(`${route}/${id}`).send(body);

    expect(res.status).to.be.equal(OK);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('affectedRows').to.be.equal(updateResult.affected);
    expect(update).to.be.calledOnce;

    doc
      .path('/workouts')
      .verb('put', { requestBody: { content: body, mediaType: 'application/json' }, tags: ['Workouts'] })
      .fromSuperAgentResponse(res, 'success');
  });

  it('should return 400 BAD_REQUEST given an invalid body', async () => {
    const id = faker.datatype.uuid();
    const body = {
      name: faker.datatype.number(),
      details: [
        {
          name: faker.lorem.word(),
          order: faker.datatype.number({ min: 0, max: 10 }),
          items: [faker.lorem.word(), faker.lorem.word()],
        },
      ],
    };

    const res = await client.put(`${route}/${id}`).send(body);

    expect(res.status).to.be.equal(BAD_REQUEST);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('message').to.be.equal('"name" must be a string');

    doc
      .path('/workouts')
      .verb('put', { requestBody: { content: body, mediaType: 'application/json' }, tags: ['Workouts'] })
      .fromSuperAgentResponse(res, 'payload error');
  });

  it('should return 500 INTERNAL_SERVER_ERROR when db fails', async () => {
    const id = faker.datatype.uuid();
    const body = {
      name: faker.lorem.word(),
      details: [
        {
          name: faker.lorem.word(),
          order: faker.datatype.number({ min: 0, max: 10 }),
          items: [faker.lorem.word(), faker.lorem.word()],
        },
      ],
    };

    const message = faker.lorem.sentence();
    const update = stub(Repository.prototype, 'update').rejects(new Error(message));

    const res = await client.put(`${route}/${id}`).send(body);

    expect(res.status).to.be.equal(INTERNAL_SERVER_ERROR);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('message').to.be.equal(message);
    expect(update).to.be.calledOnce;

    doc
      .path('/workouts')
      .verb('put', { requestBody: { content: body, mediaType: 'application/json' }, tags: ['Workouts'] })
      .fromSuperAgentResponse(res, 'internal error');
  });
});
