import { logger } from '@src/utils/logger';
import * as mongoose from 'mongoose';
import { ConnectOptions } from 'mongoose';

export const mongoConnetion = async () => {
    const mongoOptions: ConnectOptions = {
        autoCreate: true,
        autoIndex: true,
    };

    if (process.env.PROXY_HOST) {
        mongoOptions.proxyHost = process.env.PROXY_HOST;
        mongoOptions.proxyPort = parseInt(process.env.PROXY_PORT || '1080');
        mongoOptions.proxyUsername = process.env.PROXY_USERNAME;
        mongoOptions.proxyPassword = process.env.PROXY_PASSWORD;
    }

    await mongoose.connect(process.env.MONGO_URL, mongoOptions);
    logger.info('mongoose connected to ' + process.env.MONGO_URL);
};
