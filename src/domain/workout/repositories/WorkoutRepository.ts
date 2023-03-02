import { INTERNAL_SERVER_ERROR } from 'http-status';
import { inject, Lifecycle, registry, scoped } from 'tsyringe';
import ResponseError from '../../common/utils/ResponseError';

import { IWorkoutDao } from '../daos/IWorkoutDao';
import WorkoutEntity from '../entities/WorkoutEntity';
import { IWorkoutRepository } from './interfaces/IWorkoutRepository';

@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'WorkoutRepository', useClass: WorkoutRepository }])
export default class WorkoutRepository implements IWorkoutRepository {
  constructor(@inject('WorkoutDao') private readonly _dao: IWorkoutDao) {}

  async list(filter: Partial<Pick<WorkoutEntity, 'name'>> = {}): Promise<WorkoutEntity[]> {
    try {
      const result = await this._dao.findBy(filter);

      return result;
    } catch (err: any) {
      throw new ResponseError(INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async updateById(id: string, fields: Partial<WorkoutEntity>): Promise<{ affectedRows: number }> {
    try {
      const result = await this._dao.update({ id }, fields);

      return { affectedRows: result.affected ?? 0 };
    } catch (err: any) {
      throw new ResponseError(INTERNAL_SERVER_ERROR, err.message);
    }
  }

  async create(workout: WorkoutEntity): Promise<string> {
    try {
      const result = await this._dao.save(workout);

      return result.id;
    } catch (err: any) {
      throw new ResponseError(INTERNAL_SERVER_ERROR, err.message);
    }
  }
}
