import { ExtraReplyMessage, ExtraVideo } from 'telegraf/typings/telegram-types'
import { ISLABot, ScenesLike, ScreenLike } from '@src/interfaces/ISLABot'
import { Markup } from 'telegraf'
import { BotContext } from '@src/context/botContext'
import { logger } from '@src/utils/logger'
import randomizer from '@src/utils/randomizer'

/**
 * Отрисовать один из экранов доступных в текущей сцене
 * @param {BotContext} ctx BotContext
 * @param {ScreenLike[]} screens Массив доступных сцен бота
 * @param {string} screenId UID сцены, на которую хотим перейти
 */
const screenResolver = async (
    bot: ISLABot,
    ctx: BotContext,
    scene: ScenesLike,
    screens: ScreenLike[],
    screenId: string,
) => {
    logger.info(`[${ctx.from.id}] enter screen ${screenId}`)
    const screen = screens.find((sc) => sc.id === screenId)
    let lastMessageId: number | string
    
    if ('text' in screen) {
        let extra: ExtraReplyMessage = {
            parse_mode: 'HTML',
        }
        if ('buttons' in screen) {
            // TODO: УБРАТЬ 2 ОДИНАКОВЫХ RESOLVERS НА buttons
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
        bot.session.lastMessageId = (await ctx.reply(ctx.loc(screen.text, ctx), extra)).message_id
    }
    if('video' in screen) {
        let extra: ExtraVideo = {}

        if('caption' in screen) {
            extra.caption = ctx.loc(screen.caption, ctx)
            extra.parse_mode = 'HTML'
        }
        if ('buttons' in screen) {
            // TODO: УБРАТЬ 2 ОДИНАКОВЫХ RESOLVERS НА buttons
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
        
        // const randomVideo = randomizer.array(ctx, bot, ctx.loc(screen.video, ctx))
        bot.session.videoStartTimer = Date.parse(String(new Date()))
        bot.session.lastMessageId = (await ctx.replyWithVideo({source: ctx.loc(screen.video, ctx)}, extra)).message_id
    }
    if('action' in screen) {
        // если в строке установлены несколько скриптов, парсим каждый
        await ctx.resolver.resolveMany(bot, ctx, scene, screen.action, 'screen')
    }
    return lastMessageId
}

export default screenResolver