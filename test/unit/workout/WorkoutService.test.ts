import faker from '@faker-js/faker';
import { expect } from 'chai';
import { describe } from 'mocha';
import { stub } from 'sinon';

import WorkoutEntityBuilder from '../../helpers/workout/WorkoutEntityBuilder';
import WorkoutServiceBuilder from '../../helpers/workout/WorkoutServiceBuilder';

describe('WorkoutService', () => {
  describe('createWorkout', () => {
    it('should generate data and create a workout successfully', async () => {
      const workout = WorkoutEntityBuilder.build();

      const create = stub().resolves(workout.id);
      const instance = WorkoutServiceBuilder.build({ create });

      const result = await instance.createWorkout(workout.name, workout.details);

      expect(result).to.be.equals(workout.id);
      expect(create).to.be.calledOnce;
    });
  });

  describe('updateWorkout', () => {
    it('should update a workout successfully', async () => {
      const id = faker.datatype.uuid();
      const fields = { name: faker.lorem.word() };

      const repositoryResult = { affectedRows: 1 };
      const updateById = stub().resolves(repositoryResult);
      const instance = WorkoutServiceBuilder.build({ updateById });

      const result = await instance.updateWorkout(id, fields);

      expect(result).to.be.equals(repositoryResult);
      expect(updateById).to.be.calledOnceWith(id, fields);
    });
  });
});
