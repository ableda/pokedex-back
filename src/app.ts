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

mongoose.connect('mongodb://127.0.0.1:27017/passport-jwt', { useMongoClient : true });
mongoose.connection.on('error', error => console.log(error) );
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
