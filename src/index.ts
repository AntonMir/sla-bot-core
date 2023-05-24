// Starter script

import { setupBot } from './bot';
import { sampleBot } from './sample';
import pino from 'pino';

export const logger = pino();

(async () => {
    await setupBot(sampleBot).launch({
        allowedUpdates: ['message', 'callback_query'],
    });
})();
