import { FlowSubHistory } from "@src/db/models/Flow";
import { BotContext } from "@src/ts/botContext";


export const subFlow = async (ctx: BotContext) => {
    if (!ctx.botObject.flowTracking) return;
    const schema = {
        date: new Date(),
        // @ts-ignore
        chatId: ctx.update.chat_member.chat.id,
        // @ts-ignore
        chatTitle: ctx.update.chat_member.chat.title,
        // @ts-ignore
        newStatus: ctx.update.chat_member.new_chat_member.status,
        // @ts-ignore
        userId: ctx.update.chat_member.from.id,
    };
    await FlowSubHistory.insertOne(schema);
};
