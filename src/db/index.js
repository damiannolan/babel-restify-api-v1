import config from 'config';
import mongoose from 'mongoose';
import { logger as log } from '../logger';

const host = config.get('Database.MongoDB.uri');
const dbName = config.get('Database.MongoDB.name');
const mongodb = process.env.MONGODB_URI || `${host}/${dbName}`;

export const bootstrap = () => { 
    mongoose.connect(mongodb);

    mongoose.connection.on('connected', () => {
        log.info('Successfully connected to mongodb');
    });

    mongoose.connection.on('error', (err) => {
        log.error('Error: Failed to connect to mongodb', err);
    });
};