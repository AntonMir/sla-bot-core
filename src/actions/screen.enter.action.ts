import { ExtraReplyMessage, ExtraVideo } from 'telegraf/typings/telegram-types'
import { ScreenLike } from '@src/interfaces/ISLABot'
import { Markup } from 'telegraf'
import { BotContext } from '@src/context/botContext'
import { logger } from '@src/utils/logger'


/**
 * Отрисовать один из экранов доступных в текущей сцене
 * @param {BotContext} ctx BotContext
 * @param {ScreenLike[]} screens Массив доступных сцен бота
 * @param {string} screenId UID сцены, на которую хотим перейти
 */
const enterScreen = async (
    ctx: BotContext,
    screens: ScreenLike[],
    screenId: string,
) => {
    logger.info(`[${ctx.from.id}] enter screen ${screenId}`)
    const screen = screens.find((sc) => sc.id === screenId)

    console.log('screen', screen)

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

    if('video' in screen) {
        let extra: ExtraVideo = {
            parse_mode: 'HTML',
            caption: screen.caption,
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
        await ctx.replyWithVideo(ctx.loc(screen.video, ctx), extra)
    }
}

export default enterScreen
