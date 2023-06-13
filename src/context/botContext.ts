import { Context, Scenes } from 'telegraf'

interface Videos {
    reward: number
    watched: number
    limit: number
}

interface User {
    first_name: string
    balance: number
}

interface Session extends Scenes.SceneSessionData {
    videos: Videos
    user: User
    __scenes: Scenes.SceneSessionData
}

export interface BotContext extends Context {
    loc: (key: string, ctx: BotContext) => string
    session: Session
    scene: Scenes.SceneContextScene<BotContext>
}
