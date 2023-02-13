import { stub } from 'sinon';
import { IworkoutRepository } from '../../../src/domain/workout/repositories/interfaces/IWorkoutRepository';
import WorkoutService from '../../../src/domain/workout/services/WorkoutService';

export default class WorkoutServiceBuilder {
  public static build(repositoryMethods: Partial<IworkoutRepository> = {}): WorkoutService {
    const create = stub();

    return new WorkoutService({ create, ...repositoryMethods });
  }
}
