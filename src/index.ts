// Starter script

import * as dotenv from 'dotenv'
dotenv.config()
import { sampleBot } from './sample';
import { botLauncher } from './launcher';


botLauncher(sampleBot)