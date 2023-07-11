import { Scenes, Telegraf } from 'telegraf'
import { localeStorage } from '@src/utils/loc'
import { BotContext } from '@src/ts/botContext'
import { ISLABot } from '@src/ts/ISLABot'
import { botErrorCatcher } from '@src/utils/botErrorCatcher'
import { screenResolver, ScriptResolver } from '@src/resolver'
import actionResolver from '@src/resolver/action.resolver'
import { logger } from '@src/utils/logger'
import botStart from './bot.start'
import hearResolver from './resolver/hear.resolver'
import { session } from './utils/session';
import * as rateLimit from 'telegraf-ratelimit';
import { BotUsers } from '@src/db/models/botUser'
import { subFlow } from './utils/subFlow'
import { ChannelObject } from './utils/channel'
import FileIdService from './utils/fileId'
import { DevFileIdService } from './utils/fileId.dev'
import { pushResolver } from './resolver/push.resolver'


export const setupBot = (botObject: ISLABot): Telegraf => {

    const { token } = botObject

    const botInstance = new Telegraf<BotContext>(token)

    // ignore chats and channels
    botInstance.use((ctx, next) => {
        if (!ctx.from) {
            return;
        } else {
            next();
        }
    });

    botInstance.context.botObject = botObject;
    
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
        const users = await BotUsers.find().toArray()
        ctx.reply('Bot has been restarted. /start')
    })

    // Subscribe tracker
    botInstance.on('chat_member', subFlow);

    // Session
    botInstance.use(session(botObject))

    // FileId service
    if(process.env.NODE_ENV === 'production') {
        botInstance.context.fileId = new FileIdService(botObject);
    } else {
        botInstance.context.fileId = new DevFileIdService(botObject);
    }

    botInstance.context.loc = localeStorage(botObject)

    botInstance.context.resolver = new ScriptResolver(botObject)

    // Channel object
    botInstance.context.channel = new ChannelObject(botObject.channel);

    const scenes = []

    for (const scene of botObject.scenes) {
        // ининциируем Рабочую сцену
        const sceneInstance = new Scenes.BaseScene<BotContext>(scene.id)
        
        // инициируем рабочий триггер на вход для каждой сцены сцену
        // enterSceneHandler(bot, scene, sceneInstance)
        sceneInstance.enter(async (ctx) => {
            logger.info(`[${ctx.from.id}] enter scene ${scene.id}`)
            await screenResolver(botObject, ctx, scene, scene.screens, scene.initialScreen)
        })

        // парсинг button action для каждой сцены
        actionResolver(botObject, sceneInstance, scene)

        // прослушка вводимых данных пользователем 
        // + реагирование на определенных сценах
        hearResolver(botObject, sceneInstance, scene)

        scenes.push([scene.id, sceneInstance])
    }
    
    const stage = new Scenes.Stage<BotContext>()
    stage.scenes = new Map<string, Scenes.BaseScene<BotContext>>(scenes)

    botInstance.use(stage.middleware())
    
    // bot.start(...)
    botStart(botInstance, botObject.initialScene, botObject.session)

    // Отлов ошибок
    botErrorCatcher(botInstance)

    pushResolver(botInstance)

    return botInstance
}
