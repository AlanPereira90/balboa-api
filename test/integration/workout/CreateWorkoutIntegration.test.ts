import supertest from 'supertest';
import { expect } from 'chai';
import { restore, stub } from 'sinon';
import faker from '@faker-js/faker';
import { Repository } from 'typeorm';
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR } from 'http-status';

import { logger } from '../../../src/infra/logger/logger';
import { App } from '../../../src/application/setup/App';
import { doc } from '../../documentation';
import WorkoutEntity from '../../../src/domain/workout/entities/WorkoutEntity';

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

describe('POST /workouts', () => {
  it('should return 201 CREATED', async () => {
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

    const savedWorkout: WorkoutEntity = {
      id: faker.datatype.uuid(),
      name: body.name,
      details: body.details.map((detail) => ({ ...detail, id: faker.datatype.uuid() })),
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent(),
    };

    const save = stub(Repository.prototype, 'save').resolves(savedWorkout);

    const res = await client.post(route).send(body);

    expect(res.status).to.be.equal(CREATED);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('id').to.be.equal(savedWorkout.id);
    expect(save).to.be.calledOnce;

    doc
      .path('/workouts')
      .verb('post', { requestBody: { content: body, mediaType: 'application/json' }, tags: ['Workouts'] })
      .fromSuperAgentResponse(res, 'success');
  });

  it('should return 400 BAD_REQUEST given an invalid body', async () => {
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

    const res = await client.post(route).send(body);

    expect(res.status).to.be.equal(BAD_REQUEST);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('message').to.be.equal('"name" must be a string');

    doc
      .path('/workouts')
      .verb('post', { requestBody: { content: body, mediaType: 'application/json' }, tags: ['Workouts'] })
      .fromSuperAgentResponse(res, 'payload error');
  });

  it('should return 500 INTERNAL_SERVER_ERROR when db fails', async () => {
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
    const save = stub(Repository.prototype, 'save').rejects(new Error(message));

    const res = await client.post(route).send(body);

    expect(res.status).to.be.equal(INTERNAL_SERVER_ERROR);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('message').to.be.equal(message);
    expect(save).to.be.calledOnce;

    doc
      .path('/workouts')
      .verb('post', { requestBody: { content: body, mediaType: 'application/json' }, tags: ['Workouts'] })
      .fromSuperAgentResponse(res, 'internal error');
  });
});
