import { FindOneOptions, FindOptionsWhere } from 'typeorm';
import WorkoutsEntity from '../entities/WorkoutEntity';

export interface IWorkoutDao {
  save(workout: WorkoutsEntity): Promise<WorkoutsEntity>;
  findBy(where: FindOptionsWhere<WorkoutsEntity>): Promise<WorkoutsEntity[]>;
  findOne(options: FindOneOptions<WorkoutsEntity>): Promise<WorkoutsEntity | null>;
}
