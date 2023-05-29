import { ISLABot } from '../interfaces/ISLABot';
import { sampleLocale } from './sample.locale';
import { sampleScenes } from './sample.sceens';
import { sampleScripts } from './sample.scripts';

export const sampleBot: ISLABot = {
    id: 'cat-fox-bot',
    // token: '5696724086:AAGvBdCMS3bnMcNRAFbWwzmA_BOXlCnWEa0', // Бот Р00-Михаил
    token: '6082826615:AAG7bztlTd2z8xNQ3E3uz4jd4VfXAWRp1cw', // Бот Р34-Антон
    username: 'allblyat_bot',
    initialScene: 'agreement',
    scenes: sampleScenes,
    locale: sampleLocale,
    scripts: sampleScripts
};
