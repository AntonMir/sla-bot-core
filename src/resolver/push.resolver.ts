import { BotUsers } from '@src/db/models/botUser';
import { ISLABasePush, ISLABot, PopupLike, PushLike } from '@src/ts/ISLABot';
import { BotContext } from '@src/ts/botContext';
import moment = require('moment');
import { WithId } from 'mongodb';
import { AnyObject } from 'mongoose';
import * as schedule from 'node-schedule';
import { Telegraf } from 'telegraf';
import { buttonResolver } from '@src/resolver';

/**
 * Парсинг пушей
 */
const pushResolver = (bot: Telegraf<BotContext>) => {
    return bot.context.botObject.pushes.map((push) => {
        schedule.scheduleJob(`*/1 * * * * *`, async () => {
            try {
                // Get users List
                const users = await findUsers(bot, push, {});

                for (let user in users) {
                    console.log(`user`, users[user]);

                    // ПРОВЕРКА УСЛОВИЯ
                    console.log(`push`, push.condition);
                    //
                    // const conditionStr = push.condition.split(' ');
                    //
                    // let firstCondVar = conditionStr[0];
                    // let script = conditionStr[1];
                    // let secondCondVar = conditionStr[2];

                    // let conditionQueryParams: object = {
                    //     `data.${firstCondVar}`:
                    // };

                    // delete lastPush
                    const lastPushId: number = +users[user].data.lastPushId;
                    const chatId: number = +users[user].id;
                    await deleteLastMessage(bot, chatId, lastPushId);

                    // Get default push screen
                    const initPushScreen = push.screens.filter((screen) => {
                        return screen.id === push.initialScreen;
                    })[0];

                    // Buttons parse
                    const extra = {
                        reply_markup: buttonResolver(
                            bot.context,
                            initPushScreen
                        ),
                    };

                    // MESSAGE (PUSH) TO USER
                    const message = await bot.telegram.sendMessage(
                        users[user].id,
                        bot.context.loc(initPushScreen.text, bot.context),
                        extra
                    );

                    await updateUser(
                        bot,
                        push,
                        users[user],
                        message.message_id
                    );
                }
            } catch (error) {
                console.error(`PUSH [${push.id}] ERROR>>>`, error);
            }
        });
    });
};

/**
 * Удаление предыдущих сообщений чата
 */
async function deleteLastMessage(
    bot: Telegraf<BotContext>,
    chat_id: number,
    lastMessageId: number
) {
    try {
        await bot.telegram.deleteMessage(chat_id, lastMessageId);
    } catch (e) {}
}

/**
 * Фиксация времени и номера отправленного пуша в базе
 */
async function updateUser(
    bot: Telegraf<BotContext>,
    push: ISLABasePush,
    user: WithId<AnyObject>,
    messageId: number
) {
    let updateUserParams: object = {
        $set: {
            'data.lastActivity': new Date(),
            'data.lastPushId': +messageId,
            'data.__scenes.current': push.id,
            'data._currentScene': push.id,
            'data._currentScreen': push.initialScreen,
        },
    };

    if (!push.looping) {
        updateUserParams['$push'] = {
            'data.pushStopList': push.id,
        };
    } else {
        try {
            updateUserParams['$pull'] = {
                'data.pushStopList': push.id,
            };
        } catch (error) {}
    }
    await BotUsers.updateOne(
        {
            id: user.id,
            bot: bot.context.botObject.id,
        },
        updateUserParams
    );
}

/**
 * Поиск пользователей:
 * - для текущего бота
 * - пользовались ботом час назад
 * - и доп. параметры объектом
 */
async function findUsers(
    bot: Telegraf<BotContext>,
    push: ISLABasePush,
    customQueryParams?: object
): Promise<WithId<AnyObject>[]> {
    try {
        // DB query params
        let defaultQueryParams: object = {
            'data.lastActivity': {
                $lte: moment().add(-push.timer, 'minute').toDate(),
            },
        };

        // Filtration
        if (push?.filter && push.filter.length > 0) {
            defaultQueryParams['data.__scenes.current'] = {
                $in: push.filter,
            };
        }

        // если циклическое появление выключено
        // в параметры поиска добавляем проверку по стоп листу пушей
        // пользователя
        if (push.looping === false) {
            defaultQueryParams['data.pushStopList'] = { $ne: push.id };
        }

        return await BotUsers.find({
            bot: bot.context.botObject.id,
            buyerRefer: { $exists: true },
            ...defaultQueryParams,
            ...customQueryParams,
        }).toArray();
    } catch (e) {}
}

/**
 * Унифицированный таймер для пушей
 * - если время не указано, пуши идут раз в 1 мин.
 */
function pushTimer(bot: Telegraf<BotContext>, num?: number | string): string {
    try {
        if (typeof num === 'number') {
            return `*/${String(num)} * * * *`;
        }
        if (typeof num === 'string') {
            return `*/${bot.context.loc(num, bot.context)} * * * *`;
        }
        return `* * * * *`;
    } catch (error) {
        console.error('Push Timer Error >>>', error);
    }
}

export default pushResolver;
