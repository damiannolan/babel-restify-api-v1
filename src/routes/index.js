import * as restify from 'restify';
import { bootstrap as bootstrapMiddleware } from './middleware';

export const bootstrap = (server) => {
    bootstrapMiddleware(server);
};
