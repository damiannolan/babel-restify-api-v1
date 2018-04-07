import * as restify from 'restify';
import config from 'config';
import { logger as log } from './logger';

const serverName = config.get('Server.name');
const port = config.get('Server.port');

export const server = restify.createServer();

server.listen(port, () => log.info(`${serverName} started and listening on port ${port}`));
