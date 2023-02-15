import Joi from 'joi';
import { inject, Lifecycle, registry, scoped } from 'tsyringe';
import { CREATED } from 'http-status';
import { HttpVerb } from '../../../@types/http-verb';
import { IController, CustomRequest, CustomResponse } from '../../interfaces/IController';
import { WorkoutDetail } from '../../../domain/workout/types/workout';
import { requestValidator } from '../../middlewares/requestValidator';
import { IWorkoutService } from '../../../domain/workout/services/interfaces/IWorkoutService';

type RequestBody = {
  name: string;
  details: Array<Omit<WorkoutDetail, 'id'>>;
};

type ResponseBody = {
  id: string;
};

@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'Controller', useClass: CreateWorkoutController }])
export default class CreateWorkoutController implements IController {
  verb: HttpVerb = 'post';
  path = '/workouts';

  schemas = Joi.object<RequestBody>({
    name: Joi.string().required(),
    details: Joi.array()
      .items(
        Joi.object<WorkoutDetail>({
          name: Joi.string().required(),
          order: Joi.number().required(),
          items: Joi.array().items(Joi.string()).min(1).required(),
        }),
      )
      .min(1)
      .required(),
  }).strict();

  middlewares = [requestValidator(this.schemas, 'body')];

  constructor(@inject('WorkoutService') private readonly _service: IWorkoutService) {}

  public async handler(
    req: CustomRequest<{ body: RequestBody }>,
    res: CustomResponse<ResponseBody>,
  ): Promise<CustomResponse<ResponseBody>> {
    const { name, details } = req.body;

    const created = await this._service.createWorkout(name, details);

    return res.status(CREATED).send({ id: created });
  }
}
