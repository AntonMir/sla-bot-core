import { ExtraReplyMessage, ExtraVideo } from 'telegraf/typings/telegram-types'
import { ISLABot, ISLAButton, ScenesLike, ScreenLike } from '@src/ts/ISLABot'
import { Markup } from 'telegraf'
import { BotContext } from '@src/ts/botContext'
import { logger } from '@src/utils/logger'
import randomizer from '@src/utils/randomizer'
import buttonResolver from './button.resolver'
import { sleep } from '@src/utils/sleep'
import { InlineKeyboardButton, InlineKeyboardMarkup } from 'telegraf/types'

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
    
    if ('text' in screen) {
        let extra: ExtraReplyMessage = {
            parse_mode: 'HTML'
        }
        
        // если есть кнопки и нет задержки
        if (screen.buttons && screen.buttons.length > 0 && !screen.buttonDelay) {
            extra.reply_markup = buttonResolver(ctx, screen)
        }

        // отправим сообщение
        const message = await ctx.reply(ctx.loc(screen.text, ctx), extra)

        // если есть кнопки и есть задержка
        if (screen.buttons && screen.buttons.length > 0 && screen.buttonDelay) {
            await sleep(screen.buttonDelay * 1000)
            await ctx.telegram.editMessageReplyMarkup(
                ctx.from.id,
                message.message_id,
                undefined,
                buttonResolver(ctx, screen)
            )
        }

        // сохраним номер последнего сообщения чтобы удалить при необходимости
        bot.session.lastMessageId = message.message_id
    }

    if('video' in screen) {
        let extra: ExtraVideo = {}
        const randomVideo = randomizer.array(bot, screen.video)
        const videoPath = ctx.filePath.getFilePath(randomVideo)

        // если есть подпись под видео
        if(screen.caption && screen.caption.length > 0) {
            extra.caption = ctx.loc(screen.caption, ctx),
            extra.parse_mode = 'HTML'
        }

        // если есть кнопки и нет задержки
        if (screen.buttons && screen.buttons.length > 0 && !screen.buttonDelay) {
            extra.reply_markup = buttonResolver(ctx, screen)
        }

        // отрисуем случайное видео
        let message = await ctx.replyWithVideo({source: videoPath}, extra)

        // если есть кнопки и есть задержка
        if (screen.buttons && screen.buttons.length > 0 && screen.buttonDelay) {
            await sleep(screen.buttonDelay * 1000)
            await ctx.telegram.editMessageReplyMarkup(
                ctx.from.id,
                message.message_id,
                undefined,
                buttonResolver(ctx, screen)
            )
        }

        // сохраним номер последнего сообщения чтобы удалить при необходимости
        bot.session.lastMessageId = message.message_id
    }

    if('action' in screen) {
        // если в строке установлены несколько скриптов, парсим каждый
        await ctx.resolver.resolveMany(bot, ctx, scene, screen.action, 'screen')
    }
}

export default screenResolver