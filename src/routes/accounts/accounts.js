import * as restify from 'restify';
import request from 'request-promise-native';
import { logger as log } from '../../logger';
import { addFace, createPerson, detectFace, verifyFace } from '../../services';

import { createUser } from '../../db/commands';

export const bootstrap = (server) => {
    server.post('/accounts/register', register);
    server.post('/accounts/login', login);
};

const register = async (req, res) => {
    try {
        const personId = await createPerson(req.body.username);
        const persistedFaceId = await addFace(personId, req.body.imageUrl);
        const dbResp = await createUser(personId, req.body.username, persistedFaceId);

        const payload = {
            persistedFaceId: dbResp.persistedFaceId,
            username: dbResp.username,
            userId: dbResp.userId
        };

        res.send(201, payload);
    } catch (e) {
        log.error(e);
        res.send(400, { error: e.message });
    }
};

const login = async (req, res) => {
    try {
        const faceId = await detectFace(req.body.imageUrl);
         // collect the personId from db based on username provided in req
        const personId = 'e859d69c-9db2-4e80-b676-f103317edc99';

        // Get the result if the confidence is above 70 then accept
        // Otherwise reject
        const result = await verifyFace(faceId, personId);

        if(result.confidence > .70) {
            res.send(200, { result: result });
        } else {
            res.send(400, { error: 'Bad Request - Failed to login' });
        }
        
    } catch (e) {
        log.error(e);
        res.send(400, { error: 'Bad Request - Failed to login' });
    }
};
