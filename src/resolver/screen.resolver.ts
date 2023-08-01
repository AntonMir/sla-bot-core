import {
    ExtraAnimation,
    ExtraPhoto,
    ExtraReplyMessage,
    ExtraVideo,
} from 'telegraf/typings/telegram-types';
import { ISLABot, ScenesLike, ScreenLike } from '@src/ts/ISLABot';
import { BotContext } from '@src/ts/botContext';
import { logger } from '@src/utils/logger';
import mediaParser from '@src/utils/mediaParser';
import { buttonResolver } from '@src/resolver';
import { sleep } from '@src/utils/sleep';
import { flow } from '@src/utils/flow';

/**
 * Отрисовать один из экранов доступных в текущей сцене
 * @param bot
 * @param {BotContext} ctx BotContext
 * @param scene
 * @param {ScreenLike[]} screens Массив доступных сцен бота
 * @param {string} screenId UID сцены, на которую хотим перейти
 * @param action
 */
const screenResolver = async (
    bot: ISLABot,
    ctx: BotContext,
    scene: ScenesLike,
    screens: ScreenLike[],
    screenId: string,
    action: string = 'enter' // enter | editTo
) => {
    // сохраним последний отрисованный экран
    ctx.session._currentScreen = screenId;

    try {
        await ctx.telegram.deleteMessage(ctx.from.id, ctx.session.lastPushId);
    } catch (e) {}

    await flow(ctx, screenId);
    logger.info(`[${ctx.from.id}] ${action} screen ${screenId}`);
    const screen = screens.find((sc) => sc.id === screenId);

    if ('text' in screen) {
        let extra: any = {
            parse_mode: 'HTML',
        };

        // если есть кнопки и нет задержки
        if (
            screen.buttons &&
            screen.buttons.length > 0 &&
            !screen.buttonDelay
        ) {
            extra.reply_markup = buttonResolver(ctx, screen);
        }

        let textMessage: any;

        if (action === 'enter') {
            // отправим сообщение
            textMessage = await ctx.reply(ctx.loc(screen.text, ctx), extra);
        }

        if (action === 'editTo') {
            // редактируем старое сообщение
            textMessage = await ctx.telegram.editMessageText(
                ctx.chat.id,
                ctx.session.lastMessageId,
                undefined,
                ctx.loc(screen.text, ctx),
                extra
            );
        }

        // если есть кнопки и есть задержка
        if (screen.buttons && screen.buttons.length > 0 && screen.buttonDelay) {
            console.log(`BTN`, textMessage.message_id);
            console.log(`BTN@`, ctx.session.lastMessageId);
            await sleep(screen.buttonDelay * 1000);
            await ctx.telegram.editMessageReplyMarkup(
                ctx.from.id,
                textMessage.message_id,
                undefined,
                buttonResolver(ctx, screen)
            );
        }

        // сохраним номер последнего сообщения чтобы удалить при необходимости
        ctx.session.lastMessageId = textMessage.message_id;
    }

    if ('video' in screen) {
        let extra: ExtraVideo = {};
        const randomVideo = mediaParser.getFileName(ctx, bot, screen.video);
        const videoPath = await ctx.fileId.getFileId(randomVideo);

        // если есть подпись под видео
        if (screen.caption && screen.caption.length > 0) {
            extra.caption = ctx.loc(screen.caption, ctx);
            extra.parse_mode = 'HTML';
        }

        // если есть кнопки и нет задержки
        if (
            screen.buttons &&
            screen.buttons.length > 0 &&
            !screen.buttonDelay
        ) {
            extra.reply_markup = buttonResolver(ctx, screen);
        }

        // отрисуем случайное видео
        let message = await ctx.replyWithVideo(videoPath, extra);

        // если есть кнопки и есть задержка
        if (screen.buttons && screen.buttons.length > 0 && screen.buttonDelay) {
            await sleep(screen.buttonDelay * 1000);
            await ctx.telegram.editMessageReplyMarkup(
                ctx.from.id,
                message.message_id,
                undefined,
                buttonResolver(ctx, screen)
            );
        }

        // фиксируем начало просмотра видео
        ctx.session.startWatching = Date.parse(String(new Date()));

        // сохраним номер последнего сообщения чтобы удалить при необходимости
        ctx.session.lastMessageId = message.message_id;
    }

    if ('image' in screen) {
        let extra: ExtraPhoto = {};
        const randomImg = mediaParser.getFileName(ctx, bot, screen.image);
        const imgPath = await ctx.fileId.getFileId(randomImg);

        // если есть подпись под картинкой
        if (screen.caption && screen.caption.length > 0) {
            extra.caption = ctx.loc(screen.caption, ctx);
            extra.parse_mode = 'HTML';
        }

        // если есть кнопки и нет задержки
        if (
            screen.buttons &&
            screen.buttons.length > 0 &&
            !screen.buttonDelay
        ) {
            extra.reply_markup = buttonResolver(ctx, screen);
        }

        // отрисуем случайную картинку
        let message = await ctx.replyWithPhoto(imgPath, extra);

        // если есть кнопки и есть задержка
        if (screen.buttons && screen.buttons.length > 0 && screen.buttonDelay) {
            await sleep(screen.buttonDelay * 1000);
            await ctx.telegram.editMessageReplyMarkup(
                ctx.from.id,
                message.message_id,
                undefined,
                buttonResolver(ctx, screen)
            );
        }

        // сохраним номер последнего сообщения чтобы удалить при необходимости
        ctx.session.lastMessageId = message.message_id;
    }

    if ('gif' in screen) {
        let extra: ExtraAnimation = {};

        const gifName = mediaParser.getFileName(ctx, bot, screen.gif);
        const gifPath = await ctx.fileId.getFileId(gifName);

        // если есть подпись под gif
        if (screen.caption && screen.caption.length > 0) {
            (extra.caption = ctx.loc(screen.caption, ctx)),
                (extra.parse_mode = 'HTML');
        }

        // если есть кнопки и нет задержки
        if (
            screen.buttons &&
            screen.buttons.length > 0 &&
            !screen.buttonDelay
        ) {
            extra.reply_markup = buttonResolver(ctx, screen);
        }

        // отрисуем gif
        let message = await ctx.replyWithAnimation(gifPath, extra);

        // если есть кнопки и есть задержка
        if (screen.buttons && screen.buttons.length > 0 && screen.buttonDelay) {
            await sleep(screen.buttonDelay * 1000);
            await ctx.telegram.editMessageReplyMarkup(
                ctx.from.id,
                message.message_id,
                undefined,
                buttonResolver(ctx, screen)
            );
        }

        // сохраним номер последнего сообщения чтобы удалить при необходимости
        ctx.session.lastMessageId = message.message_id;
    }

    if ('action' in screen) {
        // если в строке установлены несколько скриптов, парсим каждый
        await ctx.resolver.resolveMany(
            bot,
            ctx,
            scene,
            screen.action,
            'screen'
        );
    }
};

export default screenResolver;
