import { stub } from 'sinon';

import { IWorkoutDao } from '../../../src/domain/workout/daos/IWorkoutDao';
import WorkoutRepository from '../../../src/domain/workout/repositories/WorkoutRepository';

export default class WorkoutRepositoryBuilder {
  public static build(daoMethods: Partial<IWorkoutDao> = {}): WorkoutRepository {
    const save = stub();
    const update = stub();
    const findOneBy = stub();
    const findBy = stub();
    const del = stub();

    return new WorkoutRepository({ save, update, findOneBy, findBy, delete: del, ...daoMethods });
  }
}
