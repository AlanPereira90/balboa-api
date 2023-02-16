import { DeleteResult, FindOneOptions, FindOptionsWhere, UpdateResult } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import WorkoutsEntity from '../entities/WorkoutEntity';

export interface IWorkoutDao {
  save(workout: WorkoutsEntity): Promise<WorkoutsEntity>;
  update(
    where: FindOptionsWhere<WorkoutsEntity>,
    fields: QueryDeepPartialEntity<WorkoutsEntity>,
  ): Promise<UpdateResult>;
  findBy(where: FindOptionsWhere<WorkoutsEntity>): Promise<WorkoutsEntity[]>;
  findOne(options: FindOneOptions<WorkoutsEntity>): Promise<WorkoutsEntity | null>;
  delete(where: FindOptionsWhere<WorkoutsEntity>): Promise<DeleteResult>;
}
