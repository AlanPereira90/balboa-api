import { INTERNAL_SERVER_ERROR } from 'http-status';
import { inject, Lifecycle, registry, scoped } from 'tsyringe';
import ResponseError from '../../common/utils/ResponseError';

import { IWorkoutDao } from '../daos/IWorkoutDao';
import WorkoutEntity from '../entities/WorkoutEntity';
import { IworkoutRepository } from './interfaces/IWorkoutRepository';

@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'WorkoutRepository', useClass: WorkoutRepository }])
export default class WorkoutRepository implements IworkoutRepository {
  constructor(@inject('WorkoutDao') private readonly _dao: IWorkoutDao) {}

  async create(workout: WorkoutEntity): Promise<string> {
    try {
      const result = await this._dao.save(workout);

      return result.id;
    } catch (err: any) {
      throw new ResponseError(INTERNAL_SERVER_ERROR, err.message);
    }
  }
}
