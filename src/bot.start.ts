import { ISLASession, SceneID } from '@src/ts/ISLABot'
import { Telegraf } from 'telegraf'
import { BotContext } from '@src/ts/botContext'

/**
 * Запуск бота: /start
 */
const botStart = (bot: Telegraf<BotContext>, initialScene: SceneID, session: ISLASession) => {
    return bot.start(async (ctx: BotContext) => {
        if(ctx.session.agreement === false) {
            ctx.session = {
                ...ctx.session,
                ...ctx.from,
                ...session
            };
        }
        await ctx.scene.enter(initialScene)
    })
}

export default botStart