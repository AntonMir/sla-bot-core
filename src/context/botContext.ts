import { Context, Scenes } from 'telegraf'
import { ScriptResolver } from '@src/resolver'

interface Session extends Scenes.SceneSessionData {
    __scenes: Scenes.SceneSessionData
    [key: string]: any
}

export interface BotContext extends Context {
    loc: (key: string, ctx: BotContext) => string
    resolver: ScriptResolver
    session: Session
    scene: Scenes.SceneContextScene<BotContext>
}
