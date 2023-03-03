import { inject, Lifecycle, registry, scoped } from 'tsyringe';
import { OK } from 'http-status';
import { HttpVerb } from '../../../@types/http-verb';
import { IController, CustomRequest, CustomResponse } from '../../interfaces/IController';

import { IWorkoutService } from '../../../domain/workout/services/interfaces/IWorkoutService';

type RequestParams = {
  id: string;
};

type ResponseBody = {
  affectedRows: number;
};

@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'Controller', useClass: UpdateWorkoutController }])
export default class UpdateWorkoutController implements IController {
  verb: HttpVerb = 'delete';
  path = '/workouts/:id';

  middlewares = [];

  constructor(@inject('WorkoutService') private readonly _service: IWorkoutService) {}

  public async handler(
    req: CustomRequest<{ params: RequestParams }>,
    res: CustomResponse<ResponseBody>,
  ): Promise<CustomResponse<ResponseBody>> {
    const { id } = req.params;

    const deleted = await this._service.remove(id);

    return res.status(OK).send(deleted);
  }
}
