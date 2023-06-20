import { Scenes, session, Telegraf } from 'telegraf'
import { localeStorage } from '@src/utils/loc'
import { BotContext } from '@src/context/botContext'
import { ISLABot } from '@src/interfaces/ISLABot'
import { enterSceneHandler } from '@src/handlers'
import { botErrorCatcher } from '@src/utils/helpers'
import { ScriptResolver } from '@src/resolver'
import { botStart } from '@src/handlers'


export const setupBot = (bot: ISLABot): Telegraf => {

    const botInstance = new Telegraf<BotContext>(bot.token)

    botInstance.use(session())

    botInstance.context.loc = localeStorage(bot)

    botInstance.context.resolver = new ScriptResolver(bot)

    const scenes = []

    for (const scene of bot.scenes) {
        // ининциируем Рабочую сцену
        const sceneInstance = new Scenes.BaseScene<BotContext>(scene.id)
        
        // инициируем рабочий триггер на вход для каждой сцены сцену
        enterSceneHandler(bot, scene, sceneInstance)
        
        sceneInstance.action(/(.*)/g, async (ctx, next) => {
            const actions = ctx.match.input.split('\n')
            for(let action of actions) {
                await ctx.resolver.resolveOne(bot, ctx, scene, action, 'button')
            }
        })
        scenes.push([scene.id, sceneInstance])
    }
    
    const stage = new Scenes.Stage<BotContext>()
    stage.scenes = new Map<string, Scenes.BaseScene<BotContext>>(scenes)
    botInstance.use(stage.middleware())
    
    botStart(botInstance, bot.initialScene, bot.session)

    botErrorCatcher(botInstance)

    botInstance.command('slaReset', async ctx => {
        ctx.session = { __scenes: {}}
        ctx.reply('Bot has been restarted. /start')
    })

    return botInstance
}
