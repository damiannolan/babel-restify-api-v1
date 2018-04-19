import * as restify from 'restify';
import { updateAdditionScore, updateSubtractionScore, updateMultiplicationScore } from '../../db/commands';
import { logger as log } from '../../logger';

export const bootstrap = (server) => {
    server.put('/scores/addition', updateScoreAddition);
    server.put('/scores/subtraction', updateScoreSubtraction);
    server.put('/scores/multiplication', updateScoreMultiplication);
};

const updateScoreAddition = async (req, res) => {
    try {
        const dbResponse = await updateAdditionScore(req.body.username, req.body.score);
        
        res.send(200);
    } catch (e) {
        res.send(500);
    }
};

const updateScoreSubtraction = async (req, res) => {
    try {
        const dbResponse = await updateSubtractionScore(req.body.username, req.body.score);

        res.send(200);
    } catch (e) {
        res.send(500);
    }
};

const updateScoreMultiplication = async (req, res) => {
    try {
        const dbResponse = await updateMultiplicationScore(req.body.username, req.body.score);

        res.send(200);
    } catch (e) {
        res.send(500);
    }
};
