import * as restify from 'restify';
import config from 'config';
import { logger as log } from './logger';
import { bootstrap as bootstrapDatabase } from './db';
import { bootstrap as bootstrapRoutes } from './routes';

export const server = restify.createServer();

bootstrapDatabase();

bootstrapRoutes(server);

const serverName = config.get('Server.name');
const port = config.get('Server.port');

server.listen(port, () => log.info(`${serverName} started and listening on port ${port}`));
