import { HttpVerb } from 'src/@types/http-verb';
import { IController } from 'src/application/interfaces/IController';
import { Lifecycle, registry, scoped } from 'tsyringe';

@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'Controller', useClass: CreateWorkoutController }])
export default class CreateWorkoutController implements IController {
  verb: HttpVerb = 'post';
  path = '/workouts';

  middlewares = [];

  async handler() {}
}
