import * as restify from 'restify';

import { bootstrap as bootstrapScores } from './scores';

export const bootstrap = (server) => {
    bootstrapScores(server);
};