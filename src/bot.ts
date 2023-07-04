import { Scenes, session, Telegraf } from 'telegraf'
import { localeStorage } from '@src/utils/loc'
import { BotContext } from '@src/ts/botContext'
import { ISLABot } from '@src/ts/ISLABot'
import { botErrorCatcher } from '@src/utils/helpers'
import { screenResolver, ScriptResolver } from '@src/resolver'
import { FilePathService } from '@src/utils/filePath'
import actionResolver from '@src/resolver/action.resolver'
import { logger } from '@src/utils/logger'
import botStart from './bot.start'
import hearResolver from './resolver/hear.resolver'


export const setupBot = (bot: ISLABot): Telegraf => {

    const botInstance = new Telegraf<BotContext>(bot.token)

    botInstance.use(session())

    botInstance.context.loc = localeStorage(bot)

    botInstance.context.resolver = new ScriptResolver(bot)

    botInstance.context.filePath = new FilePathService();

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

    botInstance.command('slaReset', async ctx => {
        ctx.session = { __scenes: {}}
        ctx.reply('Bot has been restarted. /start')
    })

    return botInstance
}
