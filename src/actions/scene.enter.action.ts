import { ISLABaseScene } from '@src/interfaces/ISLABot'
import { Scenes } from 'telegraf'
import { BotContext } from '@src/context/botContext'
import { logger } from '@src/utils/logger'
import { enterScreen } from '@src/actions'


/**
 * Отрисовать сцену
 * @param {BotContext} Контекст
 * @param {string} ID сцены
 */
const enterScene = async (ctx: BotContext, scene_id: string) => {
    await ctx.scene.enter(scene_id)
}

export default enterScene