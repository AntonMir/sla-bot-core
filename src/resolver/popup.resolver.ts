import { ExtraReplyMessage, ExtraVideo } from 'telegraf/typings/telegram-types'
import { ISLABot, PopupLike, ScenesLike, ScreenLike } from '@src/interfaces/ISLABot'
import { Markup } from 'telegraf'
import { BotContext } from '@src/context/botContext'
import { logger } from '@src/utils/logger'

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
        await ctx.answerCbQuery(ctx.loc(popup.text, ctx), {show_alert: true})
    }
}

export default popupResolver