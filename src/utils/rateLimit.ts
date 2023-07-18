import { BotContext } from "@src/ts/botContext";
import { Telegraf } from "telegraf";
import * as rateLimiter from 'telegraf-ratelimit';

/**
 * Middlewear ограничения запросов к боту (клик/сек)
 * @param {Telegraf<BotContext>} botInstance 
 * @param {number} window - временной промежуток
 * @param {number} limit - кол-во кликов в промежутке window
 * @returns 
 */
function rateLimit(
    botInstance: Telegraf<BotContext>, 
    window: number = 3000,
    limit: number = 2
) {
    return botInstance.use(
        // @ts-ignore commonjs module
        rateLimiter({
            window,
            limit,
            onLimitExceeded: () => {
                /* Just ignore him */
                return null;
            },
        })
    )
}

export default rateLimit