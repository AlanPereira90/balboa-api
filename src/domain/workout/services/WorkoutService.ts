import { randomUUID } from 'crypto';
import { inject, Lifecycle, registry, scoped } from 'tsyringe';

import WorkoutEntity from '../entities/WorkoutEntity';
import { IworkoutRepository } from '../repositories/interfaces/IWorkoutRepository';
import { WorkoutDetail } from '../types/workout';
import { IWorkoutService } from './interfaces/IWorkoutService';

@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'WorkoutService', useClass: WorkoutService }])
export default class WorkoutService implements IWorkoutService {
  constructor(@inject('WorkoutRepository') private readonly _repository: IworkoutRepository) {}

  async createWorkout(name: string, details: WorkoutDetail[]): Promise<string> {
    const workout: WorkoutEntity = {
      id: randomUUID(),
      name,
      details,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return this._repository.create(workout);
  }
}
