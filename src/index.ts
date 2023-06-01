// Starter script
import * as dotenv from 'dotenv'
dotenv.config()
import 'module-alias/register'
import { sampleBot } from '@src/sample'
import { botLauncher } from '@src/bot/launcher'

botLauncher(sampleBot)