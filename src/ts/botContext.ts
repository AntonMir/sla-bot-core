import { Context, Scenes } from 'telegraf'
import { ScriptResolver } from '@src/resolver'
import { FilePathService } from '@src/utils/filePath'
import { ISLABot } from './ISLABot'
import { ChannelObject } from '@src/utils/channel'

interface Session extends Scenes.SceneSessionData {
    __scenes: Scenes.SceneSessionData
    [key: string]: any
}

export interface BotContext extends Context {
    loc: (key: string, ctx: BotContext) => string
    filePath: FilePathService,
    resolver: ScriptResolver
    session: Session
    scene: Scenes.SceneContextScene<BotContext>
    bot: ISLABot
    channel: ChannelObject
}
