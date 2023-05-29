import { Scenes, session, Telegraf } from 'telegraf';
import { logger } from './utils/logger';
import { localeStorage } from './utils/loc';
import { BotContext } from './context/botContext';
import { ISLABot } from './interfaces/ISLABot';
import { botStart, enterScreen } from './utils/actions';
import { botErrorCatcher } from './utils/helpers';



export const setupBot = (bot: ISLABot): Telegraf => {

    const botInstance = new Telegraf<BotContext>(bot.token);

    botInstance.use(session());

    botInstance.context.loc = localeStorage(bot);

    const scenes = [];

    // TODO: перебор сцен и отрисовка необходимой вынести отдельно в HANDLERS
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
    
    botStart(botInstance, bot.initialScene)

    botErrorCatcher(botInstance)
   
    return botInstance;
};
