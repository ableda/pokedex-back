import { Request, Response } from 'express';
import { get, isEmpty } from 'lodash';
import logger from '../logger';

function errorHandler(error: Error, req: Request, res: Response): void {
  const message = error.message || 'Something went wrong';
  const statusCode = get(error, 'statusCode', 500);
  const reqBody = !isEmpty(req.body) ? `- Request Body: ${JSON.stringify(req.body)}` : '';
  const originalError = JSON.stringify(error);

  const errorMessage = `${req.method} - ${statusCode} - ${req.originalUrl} ${reqBody} - Original Error: ${originalError}`;
  logger.error(errorMessage);

  res.status(statusCode).send({
    statusCode,
    message,
  });
}

export default errorHandler;
