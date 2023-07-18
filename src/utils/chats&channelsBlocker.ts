import { BotContext } from "@src/ts/botContext";
import { Telegraf } from "telegraf";

/**
 * Middlewear для блокировки запросов не от реальных людей
 * @param {Telegraf<BotContext>} botInstance 
 * @returns 
 */
function chatsAndChannelsBlocker(botInstance: Telegraf<BotContext>) {
    return botInstance.use((ctx, next) => {
        if (!ctx.from) {
            return;
        } else {
            next();
        }
    })
}

export default chatsAndChannelsBlocker