import { Scenes, session, Telegraf } from 'telegraf'
import { logger } from '@src/utils/logger'
import { localeStorage } from '@src/utils/loc'
import { BotContext } from '@src/context/botContext'
import { ISLABot } from '@src/interfaces/ISLABot'
import { enterSceneHandler } from '@src/handlers'
import { botErrorCatcher } from '@src/utils/helpers'
import { enterScene, enterScreen, botStart } from '@src/actions'



export const setupBot = (bot: ISLABot): Telegraf => {

    const botInstance = new Telegraf<BotContext>(bot.token)

    botInstance.use(session())

    botInstance.context.loc = localeStorage(bot)

    const scenes = []

    for (const scene of bot.scenes) {
        // ининциируем Рабочую сцену
        const sceneInstance = new Scenes.BaseScene<BotContext>(scene.id)
        
        // инициируем рабочий триггер на вход для каждой сцены сцену
        enterSceneHandler(scene, sceneInstance)
        
        sceneInstance.action(/([a-z]*) ([a-z]*)? ?(.*)/g, async (ctx, next) => {
            const action = ctx.match[1]
            
            switch (action) {
                case 'enter':
                    const entity = ctx.match[2]
                    switch (entity) {
                        case 'scene':
                            await enterScene(ctx, ctx.match[3])
                            break
                        case 'screen':
                            await enterScreen(ctx, scene.screens, ctx.match[3])
                            break
                        default:
                            next()
                            break
                    }
                    break
                default:
                    next()
                    break
            }
        })

        scenes.push([scene.id, sceneInstance])
    }
    
    const stage = new Scenes.Stage<BotContext>()
    stage.scenes = new Map<string, Scenes.BaseScene<BotContext>>(scenes)
    botInstance.use(stage.middleware())
    
    botStart(botInstance, bot.initialScene)

    botErrorCatcher(botInstance)

    // TODO: Допилить Reset
    // botInstance.command('slaReset', ctx => {
        
    // })
   
    return botInstance
}
