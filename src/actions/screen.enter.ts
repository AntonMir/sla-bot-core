import { ExtraReplyMessage } from 'telegraf/typings/telegram-types'
import { ScreenLike } from '@src/interfaces/ISLABot'
import { Markup } from 'telegraf'
import { BotContext } from '@src/context/botContext'
import { logger } from '@src/utils/logger'


/**
 * Отрисовать один из экранов доступных в текущей сцене
 * @param screens Массив доступных сцен бота
 * @param screenId UID сцены, на которую хотим перейти
 * @param ctx BotContext
 */
const enterScreen = async (
    screens: ScreenLike[],
    screenId: string,
    ctx: BotContext
) => {
    logger.info(`[${ctx.from.id}] enter screen ${screenId}`)
    const screen = screens.find((sc) => sc.id === screenId)
    if ('text' in screen) {
        let extra: ExtraReplyMessage = {
            parse_mode: 'HTML',
        }
        if ('buttons' in screen) {
            extra = {
                ...extra,
                ...Markup.inlineKeyboard(
                    screen.buttons.map((buttonRow) =>
                        buttonRow.map((buttonCol) =>
                            Markup.button.callback(
                                ctx.loc(buttonCol.text, ctx),
                                buttonCol.action
                            )
                        )
                    )
                ),
            }
        }
        await ctx.reply(ctx.loc(screen.text, ctx), extra)
    }
}

export default enterScreen