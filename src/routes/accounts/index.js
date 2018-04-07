import * as restify from 'restify';

import { bootstrap as bootstrapAccounts } from './accounts';

export const bootstrap = (server) => {
    bootstrapAccounts(server);
};