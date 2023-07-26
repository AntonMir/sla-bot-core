import { BotContext } from '@src/ts/botContext';

/**
 * Отрисовать сцену
 * @param ctx
 * @param sceneId
 */
const sceneResolver = async (ctx: BotContext, sceneId: string) => {
    await ctx.scene.enter(sceneId);
};

export default sceneResolver;
