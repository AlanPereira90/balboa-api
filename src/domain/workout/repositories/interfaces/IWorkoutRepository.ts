import { Nullable } from '../../../../@types/utils';
import WorkoutEntity from '../../entities/WorkoutEntity';

type DataManipulationResult = { affectedRows: number };

export interface IWorkoutRepository {
  create(workout: WorkoutEntity): Promise<string>;
  updateById(id: string, fields: Partial<WorkoutEntity>): Promise<DataManipulationResult>;
  list(filter: Partial<Pick<WorkoutEntity, 'name'>>): Promise<WorkoutEntity[]>;
  findOne(id: string): Promise<Nullable<WorkoutEntity>>;
  remove(id: string): Promise<DataManipulationResult>;
}
