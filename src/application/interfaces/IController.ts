import { NextFunction, Request, RequestHandler, Response } from 'express';
import { HttpVerb } from '../../@types/http-verb';

export type CustomRequest<
  T extends Partial<{
    params: T['params'];
    body: T['body'];
    query: T['query'];
  }> = Record<string, unknown>,
> = Request<T['params'], any, T['body'], T['query']>;

export type CustomResponse<T> = Response<T>;

export type CustomResponseError = CustomResponse<{ message: string }>;

export type CustomNextFunction = NextFunction;

export type CustomRequestHandler = RequestHandler<any, any, any, any>;

export interface IController {
  verb: HttpVerb;
  path: string;
  handler: CustomRequestHandler;
  requestValidator?: CustomRequestHandler;
}
