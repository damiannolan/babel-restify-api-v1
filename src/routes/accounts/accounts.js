import * as restify from 'restify';

import config from 'config';

export const bootstrap = (server) => {
    server.post('/accounts/register');
    server.post('/accounts/login');
};