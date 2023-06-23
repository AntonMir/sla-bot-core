import { Scenes} from 'telegraf'
import { BotContext } from '@src/ts/botContext'
import { ISLABaseScene, ISLABot } from '@src/ts/ISLABot'

const actionResolver = (
    bot: ISLABot, 
    sceneInstance: Scenes.BaseScene<BotContext>, 
    scene: ISLABaseScene
) => {
    return sceneInstance.action(/(.*)/g, async (ctx) => {
        const actions = ctx.match.input.split('\n')

        // TODO: продумать как повесить минимальный лимит 
        // по времени просмотра видео только на кнопку: посмотрел
        // Как вариант запихнуть этот экшон в кнопку

        // на данный момент блок работает на обе кнопки под видеороликом!!!
        if(bot.session.watchTimerLimit) {
            const timerLimit = +bot.session.watchTimerLimit * 1000
            const timeIsLeft = Date.parse(String(new Date())) - bot.session.watchStartTimer
            if(timeIsLeft < timerLimit) {
                await ctx.answerCbQuery('Вы еще не досмотрели видео', {show_alert: true})
                return
            }
        }
       
        for(let action of actions) {
            await ctx.resolver.resolveOne(bot, ctx, scene, action, 'button')
        }
    })
}

export default actionResolver