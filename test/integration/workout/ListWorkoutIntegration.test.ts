import supertest from 'supertest';
import { expect } from 'chai';
import { restore, stub } from 'sinon';
import faker from '@faker-js/faker';
import { Repository } from 'typeorm';
import { INTERNAL_SERVER_ERROR, OK } from 'http-status';

import { logger } from '../../../src/infra/logger/logger';
import { App } from '../../../src/application/setup/App';
import { doc } from '../../documentation';
import WorkoutEntityBuilder from '../../helpers/workout/WorkoutEntityBuilder';

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

describe('GET /workouts', () => {
  it('should return 200 OK and a valid workouts list', async () => {
    const workouts = [WorkoutEntityBuilder.build(), WorkoutEntityBuilder.build()];

    const findBy = stub(Repository.prototype, 'findBy').resolves(workouts);

    const res = await client.get(route);

    expect(res.status).to.be.equal(OK);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('items').to.be.an('array').to.have.property('length', 2);
    expect(findBy).to.be.calledOnceWith({});

    doc
      .path('/workouts')
      .verb('get', { tags: ['Workouts'] })
      .fromSuperAgentResponse(res, 'success');
  });

  it('should return 200 OK and an empty workouts list', async () => {
    const findBy = stub(Repository.prototype, 'findBy').resolves([]);

    const res = await client.get(route);

    expect(res.status).to.be.equal(OK);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('items').to.be.an('array').to.have.property('length', 0);
    expect(findBy).to.be.calledOnceWith({});
  });

  it('should return 500 INTERNAL_SERVER_ERROR when db fails', async () => {
    const message = faker.lorem.sentence();
    const findBy = stub(Repository.prototype, 'findBy').rejects(new Error(message));

    const res = await client.get(route);

    expect(res.status).to.be.equal(INTERNAL_SERVER_ERROR);
    expect(res.body).to.be.an('object');
    expect(res.body).to.have.property('message').to.be.equal(message);
    expect(findBy).to.be.calledOnce;

    doc
      .path('/workouts')
      .verb('get', { tags: ['Workouts'] })
      .fromSuperAgentResponse(res, 'internal error');
  });
});
