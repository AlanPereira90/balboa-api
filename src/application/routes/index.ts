import { RequestHandler, Router } from 'express';
import { container } from 'tsyringe';

import { IController } from '../interfaces/IController';
import { logger } from '../../infra/logger/logger';

const router: Router = Router();

function getControllers(): IController[] {
  return container.resolveAll<IController>('Controller');
}

/*function getHandlerExecutionPlan(handler: RequestHandler): RequestHandler {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
}*/

function getHandlers(controller: IController): RequestHandler[] {
  const handler: RequestHandler = async (req, res, next) => {
    try {
      await controller.handler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
  return [...controller.middlewares, handler];
}

for (const controller of getControllers()) {
  logger.info(`Route ${controller.verb.toUpperCase()} ${controller.path} enabled`);
  router[controller.verb](controller.path, getHandlers(controller));
}

export default router;
