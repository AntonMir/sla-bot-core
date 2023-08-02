import { BotContext } from '@src/ts/botContext';

/**
 * Отрисовать сцену
 * @param ctx
 * @param sceneId
 */
const sceneResolver = async (ctx: BotContext, sceneId: string) => {
    // сохраним последний отрисованный экран
    ctx.session._currentScene = sceneId;
    ctx.session.__scenes.current = sceneId;
    await ctx.scene.enter(sceneId);
};

export default sceneResolver;
