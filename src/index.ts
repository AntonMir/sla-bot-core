// Starter script
import * as dotenv from 'dotenv'
dotenv.config()
import 'module-alias/register'
import { setupBot } from './bot'
import { mongoConnetion } from './db/db.connect'

import { sampleBot } from '@src/bots/sample'
import { cheeleBot } from '@src/bots/cheele'


mongoConnetion()

// setupBot(sampleBot).launch({
//     allowedUpdates: ['message', 'callback_query', 'chat_member'],
// })
setupBot(cheeleBot).launch({
    allowedUpdates: ['message', 'callback_query', 'chat_member'],
})