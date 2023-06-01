import { setupBot } from './bot'
import { ISLABot } from '@src/interfaces/ISLABot'

export const botLauncher = async (bot: ISLABot) => {
    await setupBot(bot).launch({
        allowedUpdates: ['message', 'callback_query'],
    })
}