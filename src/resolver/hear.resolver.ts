import { NarrowedContext, Scenes } from 'telegraf'
import { BotContext } from '@src/ts/botContext'
import { ISLABaseScene, ISLABot } from '@src/ts/ISLABot'
import { Update, CallbackQuery } from 'telegraf/types'

const hearResolver = (
    bot: ISLABot, 
    sceneInstance: Scenes.BaseScene<BotContext>, 
    scene: ISLABaseScene
) => {
    return sceneInstance.hears(/(.*)/g, async (ctx) => {
        const userInput = ctx.match.input

        const filteredScenes = scene.screens.filter(screen => {
            return screen.hears && screen.id === bot.session.currentScreen
        })

        if(filteredScenes.length === 0) {
            return
        }

        const currentScreen = filteredScenes[0]
        bot.session[`${currentScreen.hears}`] = userInput

        // парсинг действий action после успешной прослушки
        if(currentScreen.actionAfterHear.includes('if')) {
            return await ctx.resolver.resolveOne(bot, ctx, scene, currentScreen.actionAfterHear, 'button')
        }
        return await ctx.resolver.resolveMany(bot, ctx, scene, currentScreen.actionAfterHear, 'button')
    })
}

export default hearResolver