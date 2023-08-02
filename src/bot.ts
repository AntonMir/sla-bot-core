import { Scenes, Telegraf } from 'telegraf';
import { BotContext } from '@src/ts/botContext';
import { ISLABot } from '@src/ts/ISLABot';
import { botErrorCatcher } from '@src/utils/botErrorCatcher';
import { ScriptResolver, pushResolver } from '@src/resolver';
import botStart from './bot.start';
import { session } from './utils/session';
import { BotUsers } from '@src/db/models/botUser';
import { subFlow } from './utils/subFlow';
import { ChannelObject } from './utils/channel';
import FileIdService from './utils/fileId';
import { DevFileIdService } from './utils/fileId.dev';
import sceneCollector from './collector/scene.collector';
import chatsAndChannelsBlocker from './utils/chats&channelsBlocker';
import rateLimit from './utils/rateLimit';
import { localeStorage } from '@src/utils/loc';
import * as path from 'path';
import * as fs from 'fs';

export const setupBot = (botObject: ISLABot): Telegraf => {
    const botInstance = new Telegraf<BotContext>(botObject.token);

    chatsAndChannelsBlocker(botInstance);
    rateLimit(botInstance);

    botInstance.command('slaReset', async (ctx, next) => {
        ctx.session = { __scenes: {} };
        await BotUsers.deleteOne({ id: ctx.from.id, bot: botObject.id });
        ctx.reply('Bot has been restarted. /start');
    });

    botInstance.command('getFilesList', async (ctx, next) => {
        console.log(fs.readdirSync(path.join(process.cwd(), 'assets')));
    });

    // Subscribe tracker
    botInstance.on('chat_member', subFlow);

    // Session
    botInstance.use(session(botInstance));

    // Добавление информацию и парсеры в контекст
    botInstance.context.botObject = botObject;
    botInstance.context.loc = localeStorage(botObject);
    botInstance.context.resolver = new ScriptResolver(botObject);
    botInstance.context.channel = new ChannelObject(botObject.channel);
    botInstance.context.fileId =
        process.env.NODE_ENV === 'production'
            ? new FileIdService(botObject)
            : new DevFileIdService(botObject);

    // Инициируем пустой список сцен
    // Заполняем сценами и пушами из бота
    const scenes = [
        ...sceneCollector(botObject, botObject.scenes),
        ...sceneCollector(botObject, botObject.pushes),
    ];

    // stage содержащий рабочие сцены для бота (встроенный функционал телеги)
    const stage = new Scenes.Stage<BotContext>();
    stage.scenes = new Map<string, Scenes.BaseScene<BotContext>>(scenes);
    // прокидываем распаршенные сцена в нашего бота
    botInstance.use(stage.middleware());

    pushResolver(botInstance);

    // bot.start(...)
    botStart(botInstance, botObject.initialScene, botObject.session);

    // Отлов ошибок
    botErrorCatcher(botInstance);

    return botInstance;
};
