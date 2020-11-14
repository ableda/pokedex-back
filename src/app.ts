import express from 'express';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './routes';
import errorHandler from './middleware/errorHandler';
import notFound from './middleware/notFound';
import { httpLogger } from './middleware/httpLogger';
import mongoose from 'mongoose';

const app = express();

mongoose.connect(process.env.MONGO_DB_CONNECTION || 'mongodb://root:password@mongodb:27017');
mongoose.connection.on('error', error => console.log(`Mongoose error ${error}`) );
mongoose.Promise = global.Promise;

app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(httpLogger);

app.use(routes);

app.use(notFound);
app.use(errorHandler);

export default app;
