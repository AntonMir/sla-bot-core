import { ExtraReplyMessage, ExtraVideo } from 'telegraf/typings/telegram-types'
import { ISLABot, ScenesLike, ScreenLike } from '@src/ts/ISLABot'
import { Markup } from 'telegraf'
import { BotContext } from '@src/ts/botContext'
import { logger } from '@src/utils/logger'
import randomizer from '@src/utils/randomizer'
import buttonResolver from './button.resolver'

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
            parse_mode: 'HTML'
        }
        if ('buttons' in screen) {
            extra = {
                ...extra,
                ...buttonResolver(ctx, screen)
            }
            bot.session.lastMessageId = (await ctx.reply(ctx.loc(screen.text, ctx), extra)).message_id
        }
    }
    if('video' in screen) {
        let extra: ExtraVideo = {}

        if('caption' in screen) {
            extra = {
                ...extra,
                caption: ctx.loc(screen.caption, ctx),
                parse_mode: 'HTML'
            }
        }
        if ('buttons' in screen) {
            extra = {
                ...extra,
                ...buttonResolver(ctx, screen)
            }   
        }
        
        // TODO: не нравится реализация случайного видео
        const randomVideo = randomizer.array(bot, screen.video)
        const filePath = ctx.filePath.getFilePath(randomVideo)
        // TODO: реализация таймера на просмотр видео не нравится
        bot.session.watchStartTimer = Date.parse(String(new Date()))
        bot.session.lastMessageId = (await ctx.replyWithVideo({source: filePath}, extra)).message_id
    }
    if('action' in screen) {
        // если в строке установлены несколько скриптов, парсим каждый
        await ctx.resolver.resolveMany(bot, ctx, scene, screen.action, 'screen')
    }
    return lastMessageId
}

export default screenResolver