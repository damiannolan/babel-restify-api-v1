import * as restify from 'restify';
import { bootstrap as bootstrapAccounts } from './accounts';
import { bootstrap as bootstrapHealthcheck } from './healthcheck';
import { bootstrap as bootstrapMiddleware } from './middleware';
import { bootstrap as bootstrapScores } from './scores';

export const bootstrap = (server) => {
    bootstrapMiddleware(server);
    bootstrapHealthcheck(server);
    bootstrapAccounts(server);
    bootstrapScores(server);
};
