import { Context, Scenes } from 'telegraf'

interface Session extends Scenes.SceneSessionData {
    __scenes: Scenes.SceneSessionData
}
export interface BotContext extends Context {
    loc: (key: string, ctx: BotContext) => string
    session: Session
    scene: Scenes.SceneContextScene<BotContext>
}
