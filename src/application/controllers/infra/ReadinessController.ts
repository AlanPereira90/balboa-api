import { OK } from 'http-status';
import { Lifecycle, registry, scoped } from 'tsyringe';

import { HttpVerb } from '../../../@types/http-verb';
import { CustomRequest, CustomResponse, IController } from '../../interfaces/IController';

interface ReadinessResponse {
  alive: boolean;
}

@scoped(Lifecycle.ResolutionScoped)
@registry([{ token: 'Controller', useClass: ReadinessController }])
export default class ReadinessController implements IController {
  public verb: HttpVerb = 'get';
  public path = '/status';
  public middlewares = [];

  public handler(_req: CustomRequest, res: CustomResponse<ReadinessResponse>) {
    res.status(OK).send({
      alive: true,
    });
  }
}
