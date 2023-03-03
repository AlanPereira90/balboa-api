import supertest from 'supertest';
import { expect } from 'chai';
import { restore, stub } from 'sinon';
import faker from '@faker-js/faker';
import { Repository } from 'typeorm';
import { INTERNAL_SERVER_ERROR, NOT_FOUND, OK } from 'http-status';

import { logger } from '../../../src/infra/logger/logger';
import { App } from '../../../src/application/setup/App';
import { doc } from '../../documentation';

import WorkoutEntityBuilder from '../../helpers/workout/WorkoutEntityBuilder';
import { WorkoutErrorCodes } from '../../../src/domain/common/utils/error-codes';

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

describe('GET /workouts/:id', () => {
  it('should return 200 OK and a valid workout', async () => {
    const id = faker.datatype.uuid();
    const workout = WorkoutEntityBuilder.build({ id });

    const findOneBy = stub(Repository.prototype, 'findOneBy').resolves(workout);

    const res = await client.get(`${route}/${id}`);

    expect(res.status).to.be.equal(OK);
    expect(res.body).to.be.an('object');
    expect(res.body).to.be.deep.equal({
      ...workout,
      createdAt: workout.createdAt.toISOString(),
      updatedAt: workout.updatedAt.toISOString(),
    });
    expect(findOneBy).to.be.calledOnceWith({ id });

    doc
      .path('/workouts/:id')
      .verb('get', { tags: ['Workouts'] })
      .fromSuperAgentResponse(res, 'success');
  });

  it('should return 404 NOT_FOUND when workout is not found', async () => {
    const id = faker.datatype.uuid();

    const findOneBy = stub(Repository.prototype, 'findOneBy').resolves(null);

    const res = await client.get(`${route}/${id}`);

    expect(res.status).to.be.equal(NOT_FOUND);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('message', 'workout not found');
    expect(res.body).to.have.property('code', WorkoutErrorCodes.WorkoutNotFound);
    expect(findOneBy).to.be.calledOnceWith({ id });

    doc
      .path('/workouts/:id')
      .verb('get', { tags: ['Workouts'] })
      .fromSuperAgentResponse(res, 'not found');
  });

  it('should return 500 INTERNAL_SERVER_ERROR when db fails', async () => {
    const id = faker.datatype.uuid();

    const message = faker.lorem.sentence();
    const findOneBy = stub(Repository.prototype, 'findOneBy').rejects(new Error(message));

    const res = await client.get(`${route}/${id}`);

    expect(res.status).to.be.equal(INTERNAL_SERVER_ERROR);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('message', message);
    expect(findOneBy).to.be.calledOnceWith({ id });

    doc
      .path('/workouts/:id')
      .verb('get', { tags: ['Workouts'] })
      .fromSuperAgentResponse(res, 'internal error');
  });
});
