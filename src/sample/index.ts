import { ISLABot } from '../interfaces/ISLABot';
import { sampleLocale } from './sample.locale';
import { sampleScenes } from './sample.sceens';
import { sampleScripts } from './sample.scripts';

export const sampleBot: ISLABot = {
    id: 'cat-fox-bot',
    // token: '5696724086:AAGvBdCMS3bnMcNRAFbWwzmA_BOXlCnWEa0', // Бот Р00-Михаил
    token: '6137535708:AAGE80COePesM9I0X0lzy5Rtvw3w4ApDO38', // Бот Р34-Антон
    username: 'allblyat_bot',
    initialScene: 'agreement',
    scenes: sampleScenes,
    locale: sampleLocale,
    scripts: sampleScripts
};
