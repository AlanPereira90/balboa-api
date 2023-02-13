import { describe, it } from 'mocha';
import { expect } from 'chai';
import { stub } from 'sinon';

import WorkoutRepositoryBuilder from '../../helpers/workout/WorkoutRepositoryBuilder';
import WorkoutEntityBuilder from '../../helpers/workout/WorkoutEntityBuilder';
import faker from '@faker-js/faker';

describe('WorkoutRepository', () => {
  describe('create()', () => {
    it('should create a workout successfully', async () => {
      const workout = WorkoutEntityBuilder.build();

      const daoSaveStub = stub().resolves(workout);

      const instance = WorkoutRepositoryBuilder.build({ save: daoSaveStub });

      const result = await instance.create(workout);

      expect(result).to.be.equal(workout.id);
      expect(daoSaveStub).to.be.calledOnceWith(workout);
    });

    it('should fail when dao fails', async () => {
      const workout = WorkoutEntityBuilder.build();
      const message = faker.lorem.sentence();

      const save = stub().rejects(new Error(message));
      const instance = WorkoutRepositoryBuilder.build({ save });

      const promise = instance.create(workout);

      await expect(promise).to.be.eventually.rejected.with.property('message', message);
      expect(save).to.be.calledOnceWith(workout);
    });
  });
});
