// ----------------- не трогать ------------------
import * as dotenv from 'dotenv';
dotenv.config();
import 'module-alias/register';
import { setupBot } from './bot';
import { mongoConnetion } from './db/db.connect';
// -----------------------------------------------

// необходимо импортировать сюда своего бота
// Пример:
// import { имяТвоегоБота } '@src/bots/имяПапкиТвоегоБота'
// import { exampleBot } from '@src/bots/example'
import { advertBot } from '@src/bots/advert';

// ----------------- не трогать ------------------
mongoConnetion();
// -----------------------------------------------

// Необходимо пропустить нового бота через парсер
// Заменячем exampleBot на имяТвоегоБота
// Пример:
// setupBot(имяТвоегоБота).launch({
//     allowedUpdates: ['message', 'callback_query', 'chat_member'],
// })
setupBot(advertBot).launch({
    allowedUpdates: ['message', 'callback_query', 'chat_member'],
});
