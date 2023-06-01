import { SceneID } from '@src/interfaces/ISLABot'
import { Telegraf } from 'telegraf'
import { BotContext } from '@src/context/botContext'

/**
 * Запуск бота: /start
 * @param initialScene - id начальной сцены бота
 */
const botStart = (bot: Telegraf<BotContext>, initialScene: SceneID) => {
    return bot.start(async (ctx: BotContext) => {
        await ctx.scene.enter(initialScene)
    })
}

export default botStart