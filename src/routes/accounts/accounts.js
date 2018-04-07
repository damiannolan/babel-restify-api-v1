import * as restify from 'restify';
import request from 'request-promise-native';
import config from 'config';
import { logger as log } from '../../logger';

export const bootstrap = (server) => {
    server.post('/accounts/register', register);
    // server.post('/accounts/login');
};

const baseURL = config.get('Services.Microsoft.FaceAPI.baseURL');
const apiKey = config.get('Services.Microsoft.FaceAPI.apiKey1');
const personGroupId = config.get('Services.Microsoft.FaceAPI.personGroupId');

const register = async (req, res) => {
    try {
        const personId = await createPerson(req.body.username);
        const persistedFaceId = await addFace(personId, req.body.imageUrl);

        res.send(200, { personId: personId, persistedFaceId: persistedFaceId });
    } catch (e) {
        log.error(`Failed to find face for ${req.body.username}`);
    }
};

const createPerson = async (username) => {
    const options = {
        body: {
            name: username
        },
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': `${apiKey}`
        },
        json: true,
        method: 'POST',
        resolveWithFullResponse: true,
        url: `${baseURL}/persongroups/${personGroupId}/persons`
    };

    try {
        const response = await request(options);
        log.debug('Person Created -> Logging resopnse from MS', response.body);

        return response.body.personId;
    } catch (e) {
        log.error(e);
    }
};

const addFace = async (personId, imageUrl) => {
    const options = {
        body: Buffer.from(imageUrl.split(',')[1], 'base64'),
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': `${apiKey}`
        },
        method: 'POST',
        resolveWithFullResponse: true,
        url: `${baseURL}/persongroups/${personGroupId}/persons/${personId}/persistedFaces`
    };

    try {
        const response = await request(options);
        log.debug('Added Face -> Logging response from MS', response.body);

        return response.body.persistedFaceId;
    } catch (e) {
        log.error(e);
    }
};

const detectFace = async (req, res, next) => {
    const username = req.body.username;
    const imageUrl = req.body.imageUrl;
    
    const options = {
        body: Buffer.from(imageUrl.split(',')[1], 'base64'),
        headers: {
            'Content-Type': 'application/octet-stream',
            'Ocp-Apim-Subscription-Key': `${apiKey}`,
        },
        method: 'POST',
        resolveWithFullResponse: true,
        url: `${baseURL}/detect`,
    };

    try {
        const response = await request(options);
        log.debug('Logging response from microsoft', response.body);
    } catch (e) {
        log.error(e);
    }
};
