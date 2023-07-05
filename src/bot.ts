import { Scenes, Telegraf } from 'telegraf'
import { localeStorage } from '@src/utils/loc'
import { BotContext } from '@src/ts/botContext'
import { ISLABot } from '@src/ts/ISLABot'
import { botErrorCatcher } from '@src/utils/botErrorCatcher'
import { screenResolver, ScriptResolver } from '@src/resolver'
import { FilePathService } from '@src/utils/filePath'
import actionResolver from '@src/resolver/action.resolver'
import { logger } from '@src/utils/logger'
import botStart from './bot.start'
import hearResolver from './resolver/hear.resolver'
import { session } from './utils/session';
import * as rateLimit from 'telegraf-ratelimit';
import { BotUsers } from '@src/db/models/botUser'
import { subFlow } from './utils/subFlow'
import { ChannelObject } from './utils/channel'


export const setupBot = (bot: ISLABot): Telegraf => {

    const botInstance = new Telegraf<BotContext>(bot.token)

    // ignore chats and channels
    botInstance.use((ctx, next) => {
        if (!ctx.from) {
            return;
        } else {
            next();
        }
    });

    botInstance.context.bot = bot;
    
    // Rate limit
    botInstance.use(
        // @ts-ignore commonjs module
        rateLimit({
            window: 3000,
            limit: 2,
            onLimitExceeded: () => {
                /* Just ignore him */
                return null;
            },
        })
    );

    botInstance.command('slaReset', async ctx => {
        ctx.session = { __scenes: {}}
        await BotUsers.deleteOne({id: ctx.from.id})
        ctx.reply('Bot has been restarted. /start')
    })

    // Subscribe tracker
    botInstance.on('chat_member', subFlow);

    // Session
    botInstance.use(session(bot))

    botInstance.context.loc = localeStorage(bot)

    botInstance.context.resolver = new ScriptResolver(bot)

    botInstance.context.filePath = new FilePathService();

    // Channel object
    botInstance.context.channel = new ChannelObject(bot.channel);

    const scenes = []

    for (const scene of bot.scenes) {
        // ининциируем Рабочую сцену
        const sceneInstance = new Scenes.BaseScene<BotContext>(scene.id)
        
        // инициируем рабочий триггер на вход для каждой сцены сцену
        // enterSceneHandler(bot, scene, sceneInstance)
        sceneInstance.enter(async (ctx) => {
            logger.info(`[${ctx.from.id}] enter scene ${scene.id}`)
            await screenResolver(bot, ctx, scene, scene.screens, scene.initialScreen)
        })

        // парсинг button action для каждой сцены
        actionResolver(bot, sceneInstance, scene)

        // прослушка вводимых данных пользователем 
        // + реагирование на определенных сценах
        hearResolver(bot, sceneInstance, scene)

        scenes.push([scene.id, sceneInstance])
    }
    
    const stage = new Scenes.Stage<BotContext>()
    stage.scenes = new Map<string, Scenes.BaseScene<BotContext>>(scenes)

    botInstance.use(stage.middleware())
    
    // bot.start(...)
    botStart(botInstance, bot.initialScene, bot.session)

    // Отлов ошибок
    botErrorCatcher(botInstance)

    return botInstance
}
