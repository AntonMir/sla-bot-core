import { ISLABot } from '@src/ts/ISLABot'
import { sampleLocale } from './sample.locale'
import { sampleScenes } from './sample.sceens'
import { sampleSession } from './sample.session'
import { sampleScripts } from './sample.scripts'

export const sampleBot: ISLABot = {
    id: 'cat-fox-bot',
    // token: '5696724086:AAGvBdCMS3bnMcNRAFbWwzmA_BOXlCnWEa0', // Бот Р00-Михаил
    token: '6137535708:AAGE80COePesM9I0X0lzy5Rtvw3w4ApDO38', // Бот Р34-Антон
    username: 'testBot_bot',
    initialScene: '3.0',
    // initialScene: 'video',
    // initialScene: 'agreement',
    scenes: sampleScenes,
    locale: sampleLocale,
    scripts: sampleScripts,
    session: sampleSession
}
