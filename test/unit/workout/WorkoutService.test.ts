import faker from '@faker-js/faker';
import { expect } from 'chai';
import { describe } from 'mocha';
import { stub } from 'sinon';

import { WorkoutErrorCodes } from '../../../src/domain/common/utils/error-codes';

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

  describe('findOne', () => {
    it('should return a workout successfully', async () => {
      const id = faker.datatype.uuid();
      const workout = WorkoutEntityBuilder.build({ id });

      const findOne = stub().resolves(workout);

      const instance = WorkoutServiceBuilder.build({ findOne });

      const result = await instance.findOne(id);

      expect(result).to.be.deep.equal(workout);
      expect(findOne).to.be.calledWith(id);
    });

    it('should return error when workout not found', async () => {
      const id = faker.datatype.uuid();

      const findOne = stub().resolves(null);

      const instance = WorkoutServiceBuilder.build({ findOne });

      const promise = instance.findOne(id);

      await expect(promise).to.be.eventually.rejected.with.property('message', 'workout not found');
      await expect(promise).to.be.eventually.rejected.with.property('code', WorkoutErrorCodes.WorkoutNotFound);
      expect(findOne).to.be.calledWith(id);
    });
  });

  describe('remove', () => {
    it('should delete a workout successfully', async () => {
      const id = faker.datatype.uuid();

      const repositoryResult = { affectedRows: 1 };
      const remove = stub().resolves(repositoryResult);
      const instance = WorkoutServiceBuilder.build({ remove });

      const result = await instance.remove(id);

      expect(result).to.be.deep.equals(repositoryResult);
      expect(remove).to.be.calledOnceWith(id);
    });
  });
});
