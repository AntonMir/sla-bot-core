import { actionResolver, hearResolver, screenResolver } from "@src/resolver"
import { ISLABot, PushLike, ScenesLike } from "@src/ts/ISLABot"
import { BotContext } from "@src/ts/botContext"
import { logger } from "@src/utils/logger"
import { Scenes } from "telegraf"


/**
 * Сборка Сцен или Пушей
 * @param {ISLABot} botObject - конфиг для парсинга
 * @param {PushLike[] | ScenesLike[]} entityArray - список сцен или пушей
 * @returns 
 */
function sceneCollector(
    botObject: ISLABot,
    entityArray: PushLike[] | ScenesLike[],
) {
    const scenes = []

    for (const entity of entityArray) {
        // ининциируем Рабочую сцену
        const sceneInstance = new Scenes.BaseScene<BotContext>(entity.id)
        
        // инициируем рабочий триггер на вход для каждой сцены сцену
        // enterSceneHandler(bot, scene, sceneInstance)
        sceneInstance.enter(async (ctx) => {
            logger.info(`[${ctx.from.id}] enter ${entity.id}`)
            await screenResolver(botObject, ctx, entity, entity.screens, entity.initialScreen)
        })

        // парсинг button action для каждой сцены
        actionResolver(botObject, sceneInstance, entity)

        // прослушка вводимых данных пользователем 
        // + реагирование на определенных сценах
        hearResolver(botObject, sceneInstance, entity)

        scenes.push([entity.id, sceneInstance])
    }

    return scenes
}

export default sceneCollector
