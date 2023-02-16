import Joi from 'joi';
import { inject, Lifecycle, registry, scoped } from 'tsyringe';
import { OK } from 'http-status';
import { HttpVerb } from '../../../@types/http-verb';
import { IController, CustomRequest, CustomResponse } from '../../interfaces/IController';
import { WorkoutDetail } from '../../../domain/workout/types/workout';
import { requestValidator } from '../../middlewares/requestValidator';
import { IWorkoutService } from '../../../domain/workout/services/interfaces/IWorkoutService';

type RequestParams = {
  id: string;
};

type RequestBody = {
  name?: string;
  details?: Array<WorkoutDetail>;
};

type ResponseBody = {
  affectedRows: number;
};

@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'Controller', useClass: UpdateWorkoutController }])
export default class UpdateWorkoutController implements IController {
  verb: HttpVerb = 'put';
  path = '/workouts/:id';

  schemas = Joi.object<RequestBody>({
    name: Joi.string().optional(),
    details: Joi.array()
      .items(
        Joi.object<WorkoutDetail>({
          id: Joi.string().uuid().required(),
          name: Joi.string().required(),
          order: Joi.number().required(),
          items: Joi.array().items(Joi.string()).min(1).required(),
        }),
      )
      .min(1)
      .optional(),
  })
    .min(1)
    .strict();

  middlewares = [requestValidator(this.schemas, 'body')];

  constructor(@inject('WorkoutService') private readonly _service: IWorkoutService) {}

  public async handler(
    req: CustomRequest<{ params: RequestParams; body: RequestBody }>,
    res: CustomResponse<ResponseBody>,
  ): Promise<CustomResponse<ResponseBody>> {
    const { id } = req.params;
    const fields = req.body;

    const updated = await this._service.updateWorkout(id, fields);

    return res.status(OK).send(updated);
  }
}
