import { BotUsers } from "@src/db/models/botUser";
import { ISLABot } from "@src/ts/ISLABot"
import { BotContext } from "@src/ts/botContext";
import moment = require("moment");
import { WithId } from "mongodb";
import { AnyObject } from "mongoose";
import * as schedule from "node-schedule";
import { Telegraf } from "telegraf";
import buttonResolver from "./button.resolver";

/**
 * Парсинг пушей
 */
export const pushResolver = (
    bot: Telegraf<BotContext>
) => {
    return bot.context.botObject.pushes.map(push => {
        
        schedule.scheduleJob(pushTimer(bot, 5),
            async () => {
                const users = await findUsers(bot,
                    {'data.lastActivity': { 
                        $lte: moment().add(-push.timer, 'minute').toDate() 
                    }}
                )
                for (let user in users) {
                    const lastPushId: number = +users[user].data.lastPushId
                    const chatId : number = +users[user].id
                    await deleteLastMessage(bot, chatId, lastPushId)


                    const extra = {
                        reply_markup: buttonResolver(bot.context, push)
                    }
               
                    const message = await bot.telegram.sendMessage(
                        users[user].id,
                        bot.context.loc(push.text, bot.context),
                        extra
                    )
                    await updateUser(bot, users[user], message.message_id)
                }
            }
        );
    })
}


/**
 * Удаление предыдущих сообщений чата
 */
export async function deleteLastMessage(
    bot: Telegraf<BotContext>, 
    chat_id: number, 
    lastMessageId: number
) {
    try {
        await bot.telegram.deleteMessage(chat_id, lastMessageId)
    } catch(e) {}
}

/**
 * Фиксация времени и номера отправленного пуша в базе
 */
export async function updateUser(bot: Telegraf<BotContext>, user: WithId<AnyObject>, lastPushId: number | string) {
    await BotUsers.updateOne(
        {
            id: user.id,
            // bot: bot.context.botObject.id
        },
        { $set: { 
            'data.lastActivity': new Date(),
            'data.lastPushId': +lastPushId,
        }}
    )
}

/**
 * Поиск пользователей:
 * - для текущего бота
 * - пользовались ботом час назад
 * - и доп. параметры объектом
 */
export async function findUsers(bot: Telegraf<BotContext>, queryParams?: object): Promise<WithId<AnyObject>[]> {
    // TODO: Реавлизовать поиск по боту, а не тупо всех пользователей
    return await BotUsers.find({
        // 'data.bot': bot.context.botObject.id,
        // 'data.lastActivity': { $lte: moment().add(-1, 'hour').toDate() },
        ...queryParams
    }).toArray()
}

/**
 * Унифицированный таймер для пушей
 * - если время не указано, пуши идут раз в 1 мин.
 */
export function pushTimer(bot: Telegraf<BotContext>, num?: number | string): string {
    try {
        if(typeof num === 'number') {
            return `*/${String(num)} * * * *`
        } 
        if(typeof num === 'string') {
            return `*/${bot.context.loc(num, bot.context)} * * * *`
        }
        return `* * * * *`
    } catch(error) {
        console.error('Push Timer Error >>>', error)
    }
}