import { ISLABaseScene } from '@src/interfaces/ISLABot'
import { Scenes } from 'telegraf'
import { BotContext } from '@src/context/botContext'
import { logger } from '@src/utils/logger'
import { screenResolver } from '@src/resolver'


/**
 * Отрисовать сцену
 * @param {BotContext} Контекст
 * @param {string} ID сцены
 */
const sceneResolver = async (ctx: BotContext, scene_id: string) => {
    await ctx.scene.enter(scene_id)
}

export default sceneResolver