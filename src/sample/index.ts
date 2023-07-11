import { ISLABot } from '@src/ts/ISLABot'
import { sampleLocale } from './sample.locale'
import { sampleScenes } from './sample.sceens'
import { sampleSession } from './sample.session'
import { sampleScripts } from './sample.scripts'
import { samplePushes } from './sample.pushes'

export const sampleBot: ISLABot = {
    id: 'tik-tok-bot',
    token: '6137535708:AAGE80COePesM9I0X0lzy5Rtvw3w4ApDO38',
    username: 'testBot_bot',
    channel: `BLYr6965stNY56NNP`,

    initialScene: 'agreement',
    scenes: sampleScenes,
    locale: sampleLocale,
    scripts: sampleScripts,
    session: sampleSession,
    pushes: samplePushes,
    flowTracking: true,
}
