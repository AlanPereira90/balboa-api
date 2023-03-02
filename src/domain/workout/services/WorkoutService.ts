import { randomUUID } from 'crypto';
import { inject, Lifecycle, registry, scoped } from 'tsyringe';

import WorkoutEntity from '../entities/WorkoutEntity';
import { IWorkoutRepository } from '../repositories/interfaces/IWorkoutRepository';
import { WorkoutDetail } from '../types/workout';
import { IWorkoutService, UpdateResult } from './interfaces/IWorkoutService';

@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'WorkoutService', useClass: WorkoutService }])
export default class WorkoutService implements IWorkoutService {
  constructor(@inject('WorkoutRepository') private readonly _repository: IWorkoutRepository) {}

  list(): Promise<WorkoutEntity[]> {
    return this._repository.list({});
  }

  updateWorkout(id: string, fields: Partial<Omit<WorkoutEntity, 'id'>>): Promise<UpdateResult> {
    const fieldsWithUpdatedAt = {
      ...fields,
      updatedAt: new Date(),
    };

    return this._repository.updateById(id, fieldsWithUpdatedAt);
  }

  async createWorkout(name: string, details: Array<Omit<WorkoutDetail, 'id'>>): Promise<string> {
    const detailsWithId = details.map((detail) => ({ ...detail, id: randomUUID() }));

    const workout: WorkoutEntity = {
      id: randomUUID(),
      name,
      details: detailsWithId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return this._repository.create(workout);
  }
}
