import { BotContext } from '@src/ts/botContext'

/**
 * Отрисовать сцену
 * @param {BotContext} Контекст
 * @param {string} ID сцены
 */
const sceneResolver = async (ctx: BotContext, scene_id: string) => {
    await ctx.scene.enter(scene_id)
}

export default sceneResolver