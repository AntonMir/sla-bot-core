import { BotContext } from '@src/ts/botContext';
import { ISLAButton, ScreenLike } from '@src/ts/ISLABot';
import { Markup } from 'telegraf';

/**
 * Отрисовать один из экранов доступных в текущей сцене
 * @param {BotContext} ctx BotContext
 * @param {ScreenLike} screen текущий экран
 */
const buttonResolver = (
    ctx: BotContext | Partial<BotContext>,
    screen: ScreenLike
) => {
    try {
        return {
            inline_keyboard: screen.buttons.map((buttonRow) => {
                return buttonRow.map((buttonCol) => {
                    if (buttonCol.action === 'referral') {
                        const refLink =
                            't.me/' +
                            ctx.botObject.username +
                            '?start=' +
                            ctx.session.id;

                        return Markup.button.url(
                            ctx.loc(buttonCol.text, ctx),
                            `https://t.me/share/url?url=${refLink}`
                        );
                    }
                    if (buttonCol.action === 'channel') {
                        return Markup.button.url(
                            ctx.loc(buttonCol.text, ctx),
                            ctx.channel.link.replace('+', 'joinchat/')
                        );
                    }
                    return Markup.button.callback(
                        ctx.loc(buttonCol.text, ctx),
                        buttonCol.action
                    );
                });
            }),
        };
    } catch (error) {
        console.error('buttonResolver ERROR>>>', error);
    }
};

export default buttonResolver;
