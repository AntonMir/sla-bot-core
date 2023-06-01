export interface ISLABot {
    id: BotID
    token: string
    username: string
    initialScene: SceneID
    scenes: ScenesLike[]
    locale: ISLALocale[]
    scripts?: ISLAScript[]
}

export type ScenesLike = ISLABaseScene

export type ScreenLike = ISLATextScreen | ISLAImageScreen | ISLAVideoScreen

type BotID = string

export type SceneID = string

type ScreenID = string

type LocaleID = string

export interface ISLAScript {
    id: string
    script: string
}

interface ISLABaseScene {
    id: string
    initialScreen: ScreenID
    screens: ScreenLike[]
}

interface ISLAButton {
    text: string
    action: string
    deleteMessage?: boolean
}

interface ISLAScreenBase {
    id: ScreenID
    buttons?: ISLAButton[][]
    action?: string
}

interface ISLATextScreen extends ISLAScreenBase {
    text: LocaleID
}

interface ISLAImageScreen extends ISLAScreenBase {
    image: LocaleID
    caption?: LocaleID
}

interface ISLAVideoScreen extends ISLAScreenBase {
    video: LocaleID
    caption?: LocaleID
}

export interface ISLALocale {
    id: LocaleID
    content: string
    formatted?: boolean
}
