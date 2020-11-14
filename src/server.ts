import app from './app';
import logger from './logger';

const port = process.env.PORT || '8000';

app.listen(port, () => {
  logger.info(`auth-service is running
    ${process.env.NODE_ENV === 'development' ? `at https://localhost:${port}` : ''}
    ${process.env.NODE_ENV} mode
    ${process.env.APP_ENVIRONMENT} environment
    Press CTRL-C to stop
  `);
});
