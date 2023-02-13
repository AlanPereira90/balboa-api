import { Lifecycle, registry, scoped } from 'tsyringe';
import { WorkoutDetail } from '../types/workout';
import { IWorkoutService } from './interfaces/IWorkoutService';

@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'WorkoutService', useClass: WorkoutService }])
export default class WorkoutService implements IWorkoutService {
  //TODO: TDD
  createWorkout(_name: string, _details: WorkoutDetail[]): Promise<string> {
    throw new Error('Method not implemented.');
  }
}
