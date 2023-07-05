import { ExtraReplyMessage, ExtraVideo } from 'telegraf/typings/telegram-types'
import { ISLABot, PopupLike, ScenesLike, ScreenLike } from '@src/ts/ISLABot'
import { Markup } from 'telegraf'
import { BotContext } from '@src/ts/botContext'
import { logger } from '@src/utils/logger'
import { sleep } from '@src/utils/sleep'
import { flow } from '@src/utils/flow'

/**
 * Отрисовать один из экранов доступных в текущей сцене
 * @param {ISLABot} bot ISLABot
 * @param {BotContext} ctx BotContext
 * @param {ScreenLike[]} popups Массив доступных сцен бота
 * @param {string} popupId UID сцены, на которую хотим перейти
 */
const popupResolver = async (
    bot: ISLABot,
    ctx: BotContext,
    scene: ScenesLike,
    popups: PopupLike[],
    popupId: string,
) => {
    await flow(ctx, popupId)
    logger.info(`[${ctx.from.id}] open popup ${popupId}`)
    const popup = popups.find((po) => po.id === popupId)
    if ('text' in popup) {
        try {
            // оригинальный пуш
            return ctx.answerCbQuery(
                ctx.loc(popup.text, ctx),
                {show_alert: true}
            )
        } catch(e) {
            // альтернатива: пуша после пользовательского ввода
            const message = await ctx.reply(ctx.loc(popup.text, ctx))
            await sleep(5000)
            try {
                await ctx.deleteMessage(message.message_id)
            }catch(e) {}
        }
    }
}

export default popupResolver