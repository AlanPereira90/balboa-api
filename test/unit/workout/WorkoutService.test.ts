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

      expect(result).to.be.deep.equals(repositoryResult);
      expect(updateById).to.be.calledOnce;
    });
  });

  describe('list', () => {
    it('should list workouts successfully', async () => {
      const workouts = [WorkoutEntityBuilder.build()];

      const list = stub().resolves(workouts);
      const instance = WorkoutServiceBuilder.build({ list });

      const result = await instance.list();

      expect(result).to.be.deep.equals(workouts);
      expect(list).to.be.calledOnce;
    });

    it('should return empty when no workouts found', async () => {
      const list = stub().resolves([]);
      const instance = WorkoutServiceBuilder.build({ list });

      const result = await instance.list();

      expect(result).to.be.deep.equal([]);
      expect(list).to.be.calledOnce;
    });
  });
});
