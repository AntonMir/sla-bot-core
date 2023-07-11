import { ISLASession, SceneID } from '@src/ts/ISLABot'
import { Telegraf } from 'telegraf'
import { BotContext } from '@src/ts/botContext'
import { leadBot } from './utils/lead'
import { BotUser } from './db/models/botUser'

/**
 * Запуск бота: /start
 */
const botStart = (bot: Telegraf<BotContext>, initialScene: SceneID, session: ISLASession) => {
    return bot.start(async (ctx: BotContext) => {

        if(!ctx.session.agreement) {
            ctx.session = {
                ...ctx.session,
                ...ctx.from,
                ...session
            };

            if (ctx.startPayload) {
                const payload = ctx.startPayload.split('-');
                if (payload.length > 1) {
                    const smartLinkId = payload[0];
                    const buyerTag = payload[1];
                    const subId = payload[2];
                    try {
                        await leadBot(ctx, smartLinkId, buyerTag, subId);
                    } catch (e) {
                        console.error(e);
                    }
                } else {
                    try {
                        await leadBot(ctx, ctx.startPayload);
                    } catch (e) {
                        console.error(e);
                    }
                }
            }
        }

       
        await ctx.scene.enter(initialScene)
    })
}

export default botStart