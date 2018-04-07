import * as restify from 'restify';
import request from 'request-promise-native';
import config from 'config';
import { logger as log } from '../../logger';

export const bootstrap = (server) => {
    server.post('/accounts/register', register);
    // server.post('/accounts/login');
};

const endpoint = config.get('Services.Microsoft.FaceAPI.endpoint');
const apiKey = config.get('Services.Microsoft.FaceAPI.apiKey1');

const register = async (req, res, next) => {
    const username = req.body.username;
    const imageUrl = req.body.imageUrl;
    
    const options = {
        body: Buffer.from(imageUrl.split(',')[1], 'base64'),
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': `${apiKey}`,
        },
        method: 'POST',
        processData: false,
        resolveWithFullResponse: true,
        url: `${endpoint}/detect`,
    };

    try {
        const response = await request(options);
        log.debug('Logging response from microsoft', response.body);
    } catch (e) {
        log.error(e);
    }
};
