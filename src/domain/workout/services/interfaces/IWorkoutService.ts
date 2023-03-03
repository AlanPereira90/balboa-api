import WorkoutEntity from '../../entities/WorkoutEntity';
import { WorkoutDetail } from '../../types/workout';

export type DataManipulationResult = { affectedRows: number };
export interface IWorkoutService {
  createWorkout(name: string, details: Array<Omit<WorkoutDetail, 'id'>>): Promise<string>;
  updateWorkout(id: string, fields: Partial<Omit<WorkoutEntity, 'id'>>): Promise<DataManipulationResult>;
  list(): Promise<WorkoutEntity[]>;
  findOne(id: string): Promise<WorkoutEntity>;
  remove(id: string): Promise<DataManipulationResult>;
}
