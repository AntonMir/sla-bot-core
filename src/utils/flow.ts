import { FlowHistory } from '@src/db/models/Flow';
import { BotContext } from '@src/ts/botContext';

export const flow = async (
    ctx: BotContext,
    newState: string
): Promise<void> => {
    if (!ctx.bot.flowTracking) return;
    const { flowState = 'start' } = ctx.session;
    const profile = {
        bot: ctx.bot.username,
        userId: ctx.from.id,
        from: flowState,
        to: newState,
        date: new Date(),
    };
    ctx.session.flowState = newState;
    const insertionRespi = await FlowHistory.insertOne(profile);
};
