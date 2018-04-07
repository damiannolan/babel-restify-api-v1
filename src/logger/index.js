import * as bunyan from 'bunyan';
import config from 'config';

const loggerCfg = {
    level: config.get('Logger.level'),
    name: config.get('Server.name'),
    serializers: bunyan.stdSerializers
};

export const logger = bunyan.createLogger(loggerCfg);

export default logger;