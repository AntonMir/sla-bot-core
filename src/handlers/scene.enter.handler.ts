import { ISLABaseScene, ISLABot } from '@src/interfaces/ISLABot'
import { Scenes } from 'telegraf'
import { BotContext } from '@src/context/botContext'
import { logger } from '@src/utils/logger'
import { screenResolver } from '@src/resolver'


/**
 * Отрисовать сцену
 * @param {ISLABaseScene} scene JSON с параметрами создаваемой сцены
 * @param {Scenes.BaseScene<BotContext>} sceneInstance Рабочая сцена
 */
const enterSceneHandler = async (
    bot: ISLABot,
    scene: ISLABaseScene,
    sceneInstance: Scenes.BaseScene<BotContext>,
) => {
    return sceneInstance.enter(async (ctx) => {
        logger.info(`[${ctx.from.id}] enter scene ${scene.id}`)
        await screenResolver(bot, ctx, scene, scene.screens, scene.initialScreen)
    })
}

export default enterSceneHandler