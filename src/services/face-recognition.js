import config from 'config';
import request from 'request-promise-native';
import { logger as log } from '../logger';

const baseURL = config.get('Services.Microsoft.FaceAPI.baseURL');
const apiKey = config.get('Services.Microsoft.FaceAPI.apiKey1');
const personGroupId = config.get('Services.Microsoft.FaceAPI.personGroupId');

export const createPerson = async (username) => {
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
        throw new Error(`Failed to create person for - ${username}`);
    }
};

export const addFace = async (personId, imageUrl) => {
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
        throw new Error(`Failed to add face for person - ${personId}`);
    }
};

export const detectFace = async (imageUrl) => {
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
        throw new Error('Failed to detect face');
    }
};

export const verifyFace = async (faceId, personId) => {
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
        throw new Error(`Failed to verify face for person - ${personId}`);
    }
};
