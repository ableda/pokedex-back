import { createLogger, format, transports } from 'winston';

const logLevel = process.env.NODE_ENV === 'development' ? 'debug' : 'info';

export default createLogger({
  defaultMeta: { service: 'homepage-users' },
  level: logLevel,
  transports: [new transports.Console()],
  format: format.combine(format.colorize(), format.json(), format.prettyPrint()),
});
