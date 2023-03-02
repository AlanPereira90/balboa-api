import WorkoutEntity from '../../entities/WorkoutEntity';
import { WorkoutDetail } from '../../types/workout';

export type UpdateResult = { affectedRows: number };
export interface IWorkoutService {
  createWorkout(name: string, details: Array<Omit<WorkoutDetail, 'id'>>): Promise<string>;
  updateWorkout(id: string, fields: Partial<Omit<WorkoutEntity, 'id'>>): Promise<UpdateResult>;
  list(): Promise<WorkoutEntity[]>;
}
