import { WorkoutDetail } from '../../types/workout';

export interface IWorkoutService {
  createWorkout(name: string, details: Array<Omit<WorkoutDetail, 'id'>>): Promise<string>;
}
