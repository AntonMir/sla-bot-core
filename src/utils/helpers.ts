import { Telegraf } from 'telegraf';
import { BotContext } from '../context/botContext';
import { logger } from './logger';

/**
 * Миддлевара для отлова ошибок бота
 */
export const botErrorCatcher = (bot: Telegraf<BotContext>) => {
    return bot.catch((error, ctx) => {
        logger.error({
            "Bot Error:": error,
            "Context": ctx.update
        })
    })
}
