import { NarrowedContext, Scenes} from 'telegraf'
import { BotContext } from '@src/ts/botContext'
import { ISLABaseScene, ISLABot } from '@src/ts/ISLABot'
import { Update, CallbackQuery } from 'telegraf/types'

const actionResolver = (
    bot: ISLABot, 
    sceneInstance: Scenes.BaseScene<BotContext>, 
    scene: ISLABaseScene
) => {
    return sceneInstance.action(/(.*)/g, async (ctx) => {
        const script = ctx.match.input
        if(script.includes('if')) {
            await ctx.resolver.resolveConditional(bot, ctx, scene, script, 'button')
        } else {
            await ctx.resolver.resolveMany(bot, ctx, scene, script, 'button')
        }

        // TODO: задержка просмотра видео: 
        // работает на обе кнопки под видеороликом!!!
        // if(bot.session.watchTimerLimit) {
        //     const timerLimit = +bot.session.watchTimerLimit * 1000
        //     const timeIsLeft = Date.parse(String(new Date())) - bot.session.watchStartTimer
        //     if(timeIsLeft < timerLimit) {
        //         await ctx.answerCbQuery('Вы еще не досмотрели видео', {show_alert: true})
        //         return
        //     }
        // }
       
        // for(let action of actions) {
        //     await ctx.resolver.resolveOne(bot, ctx, scene, action, 'button')
        // }
    })
}

export default actionResolver

function resolveMany(bot: ISLABot, ctx: NarrowedContext<BotContext & { match: RegExpExecArray }, Update.CallbackQueryUpdate<CallbackQuery>>, scene: ISLABaseScene, text: any) {
    throw new Error('Function not implemented.')
}
