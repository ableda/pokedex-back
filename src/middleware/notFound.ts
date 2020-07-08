import { Request, Response } from 'express';

function notFound(req: Request, res: Response): void {
  res.status(404).send('Route not found');
}

export default notFound;
