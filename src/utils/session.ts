import mongoose from 'mongoose';
import { BotContext } from '@src/ts/botContext'
import { ISLABot, ISLASession } from '@src/ts/ISLABot'
import { BotUsers } from '@src/db/models/botUser'
import { Telegraf } from 'telegraf';

const getSessionKey = ({ from }, botObject: ISLABot) => {
    const bot = botObject.id;
    if (from == null) {
        return null;
    }
    return { id: from.id, bot };
};


/**
 * Session middleware with native meteor mongodb connection
 */
export const session = (bot: Telegraf<BotContext>) => {

    const collection = BotUsers;

    const saveSession = async (
        key: { id: number; bot: string },
        session: ISLASession
    ): Promise<void> => {
        await collection.updateOne(key, { $set: { data: session } }, { upsert: true });
    };

    const getSession = async (key: {
        id: number;
    }): Promise<any> => {
        return (await collection.findOne(key))?.data ?? {};
    };

    return async (ctx: BotContext, next: any) => {
        const key = getSessionKey(ctx, bot.context.botObject);
        const data = key == null ? undefined : await getSession(key);

        ctx.session = {
            ...data,
            ...bot.context.session
        }
        ctx.session.lastActivity = new Date()

        await next();

        if (ctx.session != null) {
            await saveSession(key, ctx.session);
        }
    };
};