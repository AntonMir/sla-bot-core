import { NarrowedContext, Scenes } from 'telegraf'
import { BotContext } from '@src/ts/botContext'
import { ISLABaseScene, ISLABot } from '@src/ts/ISLABot'
import { Update, CallbackQuery } from 'telegraf/types'

const actionsResolver = (
    bot: ISLABot, 
    sceneInstance: Scenes.BaseScene<BotContext>, 
    scene: ISLABaseScene
) => {
    return sceneInstance.action(/(.*)/g, async (ctx) => {
        try {

            const script = ctx.match.input
            // парсинг условий в кнопке
            if(script.includes('if')) {
                return await ctx.resolver.resolveOne(bot, ctx, scene, script, 'button')
            }
            return await ctx.resolver.resolveMany(bot, ctx, scene, script, 'button')
        } catch(error) {
            console.error('actionsResolver ERROR>>>', error)
        }
    })
}

export default actionsResolver