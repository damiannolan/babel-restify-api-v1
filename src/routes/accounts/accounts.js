import * as restify from 'restify';
import request from 'request-promise-native';
import config from 'config';
import { logger as log } from '../../logger';

export const bootstrap = (server) => {
    server.post('/accounts/register', register);
    server.post('/accounts/login', login);
};

const baseURL = config.get('Services.Microsoft.FaceAPI.baseURL');
const apiKey = config.get('Services.Microsoft.FaceAPI.apiKey1');
const personGroupId = config.get('Services.Microsoft.FaceAPI.personGroupId');

const register = async (req, res) => {
    try {
        const personId = await createPerson(req.body.username);
        const persistedFaceId = await addFace(personId, req.body.imageUrl);

        const response = { // temperorary
            personId: personId,
            persistedFaceId: persistedFaceId
        };

        res.send(201, response);
    } catch (e) {
        log.error(`Failed to find face for ${req.body.username}`);
    }
};

const login = async (req, res) => {
    try {
        const faceId = await detectFace(req.body.imageUrl);
        log.debug('Log Debugging Face Id', faceId);
        const personId = 'b6177b61-e3e1-4fe6-963e-476f7613f945'; // collect from db

        const verify = await verifyFace(faceId, personId);

        res.send(200, { result: 'success' });
    } catch (e) {
        log.error(e);
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
        const msResp = JSON.parse(response.body);
        log.debug('Added Face -> Logging response from MS', msResp);

        return msResp.persistedFaceId;
    } catch (e) {
        log.error(e);
    }
};

const detectFace = async (imageUrl) => {
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
        const msResp = JSON.parse(response.body);
        log.debug('Logging response from microsoft', msResp);

        return msResp[0].faceId;
    } catch (e) {
        log.error(e);
    }
};

const verifyFace = async (faceId, personId) => {
    const payload = {
        faceId: faceId,
        personId: personId,
        personGroupId: personGroupId
    };

    const options = {
        body: payload,
        headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': `${apiKey}`
        },
        json: true,
        method: 'POST',
        resolveWithFullResponse: true,
        url: `${baseURL}/verify`
    };

    try {
        const response = await request(options);
        log.debug('Face Verify -> Logging resopnse from MS', response.body);

        return response.body;
    } catch (e) {
        log.error('Problem verifying face', e);
    }
};
