import { stub } from 'sinon';
import { IWorkoutRepository } from '../../../src/domain/workout/repositories/interfaces/IWorkoutRepository';
import WorkoutService from '../../../src/domain/workout/services/WorkoutService';

export default class WorkoutServiceBuilder {
  public static build(repositoryMethods: Partial<IWorkoutRepository> = {}): WorkoutService {
    const create = stub();
    const updateById = stub();

    return new WorkoutService({ create, updateById, ...repositoryMethods });
  }
}
