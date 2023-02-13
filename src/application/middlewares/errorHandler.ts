import { ErrorRequestHandler } from 'express';
import { INTERNAL_SERVER_ERROR } from 'http-status';
import ResponseError from '../../domain/common/utils/ResponseError';
import { logger } from '../../infra/logger/logger';

const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  if (error instanceof ResponseError) logger.warn(error);
  else logger.error(error);

  const result: { message: string; code?: string } = {
    message: error.message,
  };
  if (error.code) {
    result.code = error.code;
  }

  res.status(error.status || INTERNAL_SERVER_ERROR).json(result);
};

export default errorHandler;
