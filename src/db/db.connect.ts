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

    // await mongoose.connect(process.env.MONGO_URL, mongoOptions);
    await mongoose.connect(
        'mongodb+srv://r34anton:Qwerty12@slavercluster.ksjqo8m.mongodb.net/slaver-primary',
        mongoOptions
    );
    logger.info(
        'mongoose connected to ' +
            'mongodb+srv://r34anton:Qwerty12@slavercluster.ksjqo8m.mongodb.net/slaver-primary'
    );
};
