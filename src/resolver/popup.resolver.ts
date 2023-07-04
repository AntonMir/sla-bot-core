import { ExtraReplyMessage, ExtraVideo } from 'telegraf/typings/telegram-types'
import { ISLABot, PopupLike, ScenesLike, ScreenLike } from '@src/ts/ISLABot'
import { Markup } from 'telegraf'
import { BotContext } from '@src/ts/botContext'
import { logger } from '@src/utils/logger'
import { sleep } from '@src/utils/sleep'

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
    logger.info(`[${ctx.from.id}] open popup ${popupId}`)
    const popup = popups.find((po) => po.id === popupId)
    if ('text' in popup) {
        try {
            // const message = (await ctx.reply(ctx.loc(popup.text, ctx))).message_id
            // await sleep(3000)
            // try {
            //     await ctx.deleteMessage(message)
            // }catch(e) {}
            return ctx.answerCbQuery(ctx.loc(popup.text, ctx), {show_alert: true})
        } catch(error) {
            console.log('Error', error)
        }
    }
}

export default popupResolver