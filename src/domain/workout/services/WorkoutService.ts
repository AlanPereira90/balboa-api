import { randomUUID } from 'crypto';
import { NOT_FOUND } from 'http-status';
import { inject, Lifecycle, registry, scoped } from 'tsyringe';

import { WorkoutErrorCodes } from '../../common/utils/error-codes';
import ResponseError from '../../common/utils/ResponseError';
import WorkoutEntity from '../entities/WorkoutEntity';
import { IWorkoutRepository } from '../repositories/interfaces/IWorkoutRepository';
import { WorkoutDetail } from '../types/workout';
import { IWorkoutService, UpdateResult } from './interfaces/IWorkoutService';

@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'WorkoutService', useClass: WorkoutService }])
export default class WorkoutService implements IWorkoutService {
  constructor(@inject('WorkoutRepository') private readonly _repository: IWorkoutRepository) {}

  async findOne(id: string): Promise<WorkoutEntity> {
    const result = await this._repository.findOne(id);

    if (!result) {
      throw new ResponseError(NOT_FOUND, 'workout not found', WorkoutErrorCodes.WorkoutNotFound);
    }

    return result;
  }

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
