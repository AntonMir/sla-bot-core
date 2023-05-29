import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';
import { SceneID, ScreenLike } from '../interfaces/ISLABot';
import { Markup, Telegraf } from 'telegraf';
import { BotContext } from '../context/botContext';
import { logger } from './logger';

/**
 * Запуск бота: /start
 * @param initialScene - id начальной сцены бота
 */
export const botStart = (bot: Telegraf<BotContext>, initialScene: SceneID) => {
    return bot.start(async (ctx: BotContext) => {
        await ctx.scene.enter(initialScene);
    });
}

/**
 * Отрисовать один из экранов доступных в текущей сцене
 * @param screens Массив доступных сцен бота
 * @param screenId UID сцены, на которую хотим перейти
 * @param ctx BotContext
 */
export const enterScreen = async (
    screens: ScreenLike[],
    screenId: string,
    ctx: BotContext
) => {
    logger.info(`[${ctx.from.id}] enter screen ${screenId}`);
    const screen = screens.find((sc) => sc.id === screenId);
    if ('text' in screen) {
        let extra: ExtraReplyMessage = {
            parse_mode: 'HTML',
        };
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
            };
        }
        await ctx.reply(ctx.loc(screen.text, ctx), extra);
    }
};