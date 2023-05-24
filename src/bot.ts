import { ScreenLike } from './ts/ISLABot';
import { Markup, Scenes, session, Telegraf } from 'telegraf';
import { logger } from './index';
import { localeStorage } from './utils/loc';
import { ExtraReplyMessage } from 'telegraf/typings/telegram-types';
import { BotContext } from './botContext';
import { ISLABot } from './ts/ISLABot';

const enterScreen = async (
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

export const setupBot = (bot: ISLABot): Telegraf => {
    const botInstance: Telegraf<BotContext> = new Telegraf<BotContext>(
        bot.token
    );

    botInstance.use(session());

    botInstance.context.loc = localeStorage(bot);

    const scenes = [];

    for (const scene of bot.scenes) {
        const sceneInstance = new Scenes.BaseScene<BotContext>(scene.id);

        sceneInstance.enter(async (ctx) => {
            logger.info(`[${ctx.from.id}] enter scene ${scene.id}`);
            await enterScreen(scene.screens, scene.initialScreen, ctx);
        });

        sceneInstance.action(/([a-z]*) ([a-z]*)? ?(.*)/g, async (ctx, next) => {
            const action = ctx.match[1];
            switch (action) {
                case 'enter':
                    const entity = ctx.match[2];
                    switch (entity) {
                        case 'scene':
                            break;
                        case 'screen':
                            await enterScreen(scene.screens, ctx.match[3], ctx);
                            return;
                        default:
                            return next();
                    }
                    break;
                default:
                    return next();
            }
        });

        scenes.push([scene.id, sceneInstance]);
    }

    const stage = new Scenes.Stage<BotContext>();
    stage.scenes = new Map<string, Scenes.BaseScene<BotContext>>(scenes);

    botInstance.use(stage.middleware());

    botInstance.start(async (ctx: BotContext) => {
        await ctx.scene.enter(bot.initialScene);
    });

    return botInstance;
};
