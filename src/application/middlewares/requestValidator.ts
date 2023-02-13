import { NextFunction, Request, Response } from 'express';
import { BAD_REQUEST } from 'http-status';
import { ObjectSchema } from 'joi';
import ResponseError from '../../domain/common/utils/ResponseError';

type RequestType = 'params' | 'body' | 'query';
export const requestValidator =
  (schema: ObjectSchema, type: RequestType = 'body') =>
  (request: Request<any, any, any, any>, _: Response, next: NextFunction) => {
    const result = schema.validate(request[type]);

    if (result.error) {
      throw new ResponseError(BAD_REQUEST, result.error.message, 'SCHEMA_VALIDATION_ERROR');
    }

    next();
  };
