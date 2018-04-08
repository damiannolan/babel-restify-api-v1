import config from 'config';
import mongoose from 'mongoose';
import { logger as log } from '../logger';

const mongodb = `${config.get('Database.MongoDB.uri')}/${config.get('Database.MongoDB.name')}`;

export const bootstrap = () => { 
    mongoose.connect(mongodb);

    mongoose.connection.on('connected', () => {
        log.info('Successfully connected to mongodb');
    });

    mongoose.connection.on('error', (err) => {
        log.error('Error: Failed to connect to mongodb', err);
    });
};