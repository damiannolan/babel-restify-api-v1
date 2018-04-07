import * as restify from 'restify';
import { bootstrap as bootstrapHealthcheck } from './healthcheck';
import { bootstrap as bootstrapMiddleware } from './middleware';

export const bootstrap = (server) => {
    bootstrapMiddleware(server);
    bootstrapHealthcheck(server);
};
