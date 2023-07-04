import { ISLABot } from '@src/ts/ISLABot'
import { sampleLocale } from './sample.locale'
import { sampleScenes } from './sample.sceens'
import { sampleSession } from './sample.session'
import { sampleScripts } from './sample.scripts'

export const sampleBot: ISLABot = {
    id: 'tik-tok-bot',
    token: '6137535708:AAGE80COePesM9I0X0lzy5Rtvw3w4ApDO38',
    username: 'testBot_bot',
    // initialScene: '3.0',
    // initialScene: 'mainMenu',
    // initialScene: 'video',
    // initialScene: 'partnerReward',
    initialScene: 'payout',
    // initialScene: 'agreement',
    scenes: sampleScenes,
    locale: sampleLocale,
    scripts: sampleScripts,
    session: sampleSession
}
