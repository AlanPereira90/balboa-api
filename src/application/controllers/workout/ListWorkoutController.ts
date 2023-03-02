import { inject, Lifecycle, registry, scoped } from 'tsyringe';
import { OK } from 'http-status';
import { HttpVerb } from '../../../@types/http-verb';
import { CustomRequest, CustomResponse, IController } from '../../interfaces/IController';
import { IWorkoutService } from '../../../domain/workout/services/interfaces/IWorkoutService';

type ResponseBody = {
  items: Array<{
    id: string;
    name: string;
    qtyCycles: number;
  }>;
};

@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'Controller', useClass: ListWorkoutController }])
export default class ListWorkoutController implements IController {
  verb: HttpVerb = 'get';
  path = '/workouts';

  middlewares = [];

  constructor(@inject('WorkoutService') private readonly _service: IWorkoutService) {}

  public async handler(_: CustomRequest, res: CustomResponse<ResponseBody>): Promise<CustomResponse<ResponseBody>> {
    const list = await this._service.list();

    const items = list.map((item) => ({
      id: item.id,
      name: item.name,
      qtyCycles: item.details.length,
    }));

    return res.status(OK).send({ items });
  }
}
