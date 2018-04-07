import * as restify from 'restify';

const healthcheck = (req, res) => {
    res.send(200);
}

export const bootstrap = (server) => {
    server.head('/healthcheck', healthcheck);
    server.get('/healthcheck', healthcheck);
}
