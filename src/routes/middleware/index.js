import * as restify from 'restify';
import config from 'config';
import corsMiddleware from 'restify-cors-middleware';

export const bootstrap = (server) => {
    
    const cors = corsMiddleware({
        allowHeaders: config.get('Server.corsHeaders'),
        exposeHeaders: [],
        origins: config.get('Server.corsOrigins')
    });
 
    server.pre(cors.preflight);
    server.use(cors.actual);

    // http://restify.com/docs/plugins-api/
    server.use(restify.plugins.fullResponse());
    server.use(restify.plugins.queryParser({ mapParams: true }));
    server.use(restify.plugins.acceptParser(server.acceptable));
    server.use(restify.plugins.authorizationParser());
    server.use(restify.plugins.bodyParser({ mapParams: true }));

};
