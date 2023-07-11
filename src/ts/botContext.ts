import { Context, Scenes, Telegraf } from 'telegraf'
import { ScriptResolver } from '@src/resolver'
import { ISLABot } from './ISLABot'
import { ChannelObject } from '@src/utils/channel'
import FileIdService from '@src/utils/fileId'
import { DevFileIdService } from '@src/utils/fileId.dev'

interface Session extends Scenes.SceneSessionData {
    __scenes: Scenes.SceneSessionData
    [key: string]: any
}

export interface BotContext extends Context {
    loc: (key: string, ctx: BotContext | Partial<BotContext>) => string
    resolver: ScriptResolver
    session: Session
    scene: Scenes.SceneContextScene<BotContext>
    botObject: ISLABot
    channel: ChannelObject
    fileId: FileIdService | DevFileIdService
    startPayload?: string
}
