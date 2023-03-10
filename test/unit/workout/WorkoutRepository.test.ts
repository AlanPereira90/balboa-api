import { describe, it } from 'mocha';
import { expect } from 'chai';
import { stub } from 'sinon';
import faker from '@faker-js/faker';

import WorkoutRepositoryBuilder from '../../helpers/workout/WorkoutRepositoryBuilder';
import WorkoutEntityBuilder from '../../helpers/workout/WorkoutEntityBuilder';

describe('WorkoutRepository', () => {
  describe('create()', () => {
    it('should create a workout successfully', async () => {
      const workout = WorkoutEntityBuilder.build();

      const save = stub().resolves(workout);

      const instance = WorkoutRepositoryBuilder.build({ save });

      const result = await instance.create(workout);

      expect(result).to.be.equal(workout.id);
      expect(save).to.be.calledOnceWith(workout);
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

  describe('update()', () => {
    it('should update a workout successfully', async () => {
      const filter = { id: faker.datatype.uuid() };
      const fields = { name: faker.lorem.word() };

      const update = stub().resolves({ affected: 1 });

      const instance = WorkoutRepositoryBuilder.build({ update });

      const expectedResult = { affectedRows: 1 };

      const result = await instance.updateById(filter.id, fields);

      expect(result).to.be.deep.equal(expectedResult);
      expect(update).to.be.calledOnceWith(filter, fields);
    });

    it('should fail when dao fails', async () => {
      const filter = { id: faker.datatype.uuid() };
      const fields = { name: faker.lorem.word() };

      const message = faker.lorem.sentence();

      const update = stub().rejects(new Error(message));
      const instance = WorkoutRepositoryBuilder.build({ update });

      const promise = instance.updateById(filter.id, fields);

      await expect(promise).to.be.eventually.rejected.with.property('message', message);
      expect(update).to.be.calledOnceWith(filter, fields);
    });
  });

  describe('list', () => {
    it('should list workouts given no filters', async () => {
      const workouts = [WorkoutEntityBuilder.build(), WorkoutEntityBuilder.build()];

      const findBy = stub().resolves(workouts);
      const instance = WorkoutRepositoryBuilder.build({ findBy });

      const result = await instance.list();

      expect(result).to.be.deep.equal(workouts);
      expect(findBy).to.be.calledWith({});
    });

    it('should list workouts given filters', async () => {
      const filters = { name: faker.lorem.word() };
      const workouts = [WorkoutEntityBuilder.build(), WorkoutEntityBuilder.build()];

      const findBy = stub().resolves(workouts);
      const instance = WorkoutRepositoryBuilder.build({ findBy });

      const result = await instance.list(filters);

      expect(result).to.be.deep.equal(workouts);
      expect(findBy).to.be.calledWith(filters);
    });

    it('should return empty array when dao returns empty', async () => {
      const filters = { name: faker.lorem.word() };

      const findBy = stub().resolves([]);
      const instance = WorkoutRepositoryBuilder.build({ findBy });

      const result = await instance.list(filters);

      expect(result).to.be.deep.equal([]);
      expect(findBy).to.be.calledWith(filters);
    });

    it('should fail when dao fails', async () => {
      const message = faker.lorem.sentence();

      const findBy = stub().rejects(new Error(message));
      const instance = WorkoutRepositoryBuilder.build({ findBy });

      const promise = instance.list();

      await expect(promise).to.be.eventually.rejected.with.property('message', message);
      expect(findBy).to.be.calledOnceWith({});
    });
  });

  describe('findOne', () => {
    it('should find a workout successfully', async () => {
      const id = faker.datatype.uuid();
      const workout = WorkoutEntityBuilder.build({ id });

      const findOneBy = stub().resolves(workout);

      const instalnce = WorkoutRepositoryBuilder.build({ findOneBy });

      const result = await instalnce.findOne(id);

      expect(result).to.be.deep.equal(workout);
      expect(findOneBy).to.be.calledOnceWith({ id });
    });

    it('should return null when workout is not found', async () => {
      const id = faker.datatype.uuid();

      const findOneBy = stub().resolves(null);

      const instalnce = WorkoutRepositoryBuilder.build({ findOneBy });

      const result = await instalnce.findOne(id);

      expect(result).to.be.null;
      expect(findOneBy).to.be.calledOnceWith({ id });
    });

    it('should fail when db fails', async () => {
      const id = faker.datatype.uuid();
      const message = faker.lorem.sentence();

      const findOneBy = stub().rejects(new Error(message));
      const instance = WorkoutRepositoryBuilder.build({ findOneBy });

      const promise = instance.findOne(id);

      await expect(promise).to.be.eventually.rejected.with.property('message', message);
      expect(findOneBy).to.be.calledOnceWith({ id });
    });
  });

  describe('remove', () => {
    it('should delete a workout successfully', async () => {
      const id = faker.datatype.uuid();

      const del = stub().resolves({ affected: 1 });

      const instance = WorkoutRepositoryBuilder.build({ delete: del });

      const expectedResult = { affectedRows: 1 };

      const result = await instance.remove(id);

      expect(result).to.be.deep.equal(expectedResult);
      expect(del).to.be.calledOnceWith({ id });
    });

    it('should fail when dao fails', async () => {
      const id = faker.datatype.uuid();

      const message = faker.lorem.sentence();

      const del = stub().rejects(new Error(message));
      const instance = WorkoutRepositoryBuilder.build({ delete: del });

      const promise = instance.remove(id);

      await expect(promise).to.be.eventually.rejected.with.property('message', message);
      expect(del).to.be.calledOnceWith({ id });
    });
  });
});
