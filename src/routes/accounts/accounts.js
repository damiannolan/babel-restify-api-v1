import * as restify from 'restify';
import request from 'request-promise-native';
import { createUser } from '../../db/commands';
import { getUserData, getUserIdByUsername } from '../../db/queries';
import { logger as log } from '../../logger';
import { addFace, createPerson, detectFace, verifyFace } from '../../services';

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
            userId: dbResp.userId,
            additionScore: dbResp.additionScore,
            subtractionScore: dbResp.subtractionScore,
            multiplicationScore: dbResp.multiplicationScore
        };

        res.send(201, payload);
    } catch (e) {
        log.error(e);
        res.send(400, { error: e.message });
    }
};

const login = async (req, res) => {
    try {
        // userId and personId are effectively the same thing
        const userId = await getUserIdByUsername(req.body.username);
        const faceId = await detectFace(req.body.imageUrl);
        const result = await verifyFace(faceId, userId);

        if(result.confidence > .70) { // > 70% accuracy is accepted
            const dbResp = await getUserData(req.body.username);

            const payload = {
                persistedFaceId: dbResp.persistedFaceId,
                username: dbResp.username,
                userId: dbResp.userId,
                additionScore: dbResp.additionScore,
                subtractionScore: dbResp.subtractionScore,
                multiplicationScore: dbResp.multiplicationScore
            };
            
            res.send(200, payload);
        } else {
            res.send(400, { error: 'Bad Request - Failed to verify face' });
        }
        
    } catch (e) {
        res.send(400, { error: e.message });
    }
};
