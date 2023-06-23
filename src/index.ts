// Starter script
import * as dotenv from 'dotenv'
dotenv.config()
import 'module-alias/register'
import { sampleBot } from '@src/sample'
import { setupBot } from './bot'

setupBot(sampleBot).launch({
    allowedUpdates: ['message', 'callback_query'],
})