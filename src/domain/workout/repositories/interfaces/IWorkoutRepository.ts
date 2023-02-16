import WorkoutEntity from '../../entities/WorkoutEntity';

type UpdateResult = { affectedRows: number };
export interface IWorkoutRepository {
  create(workout: WorkoutEntity): Promise<string>;
  updateById(id: string, fields: Partial<WorkoutEntity>): Promise<UpdateResult>;
}
