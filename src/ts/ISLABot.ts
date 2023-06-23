export interface ISLABot {
    id: BotID
    token: string
    username: string
    initialScene: SceneID
    scenes: ScenesLike[]
    locale: ISLALocale[]
    scripts: ISLAScript[]
    session: ISLASession
}

export interface ISLAScript {
    id: string
    text: string
}

export type ScenesLike = ISLABaseScene

export type ScreenLike = ISLATextScreen | ISLAImageScreen | ISLAVideoScreen

export type PopupLike = ISLATextScreen | ISLAImageScreen | ISLAVideoScreen

export type BotID = string

export type SceneID = string

export type ScreenID = string

export type LocaleID = string

export interface ISLASession {
    [key: string]: any
}

export interface ISLABaseScene {
    id: string
    initialScreen: ScreenID
    screens: ScreenLike[]
    popups?: PopupLike[]
}

export interface ISLAButton {
    text: string
    action: string
    deleteMessage?: boolean
}

export interface ISLAScreenBase {
    id: ScreenID
    buttons?: ISLAButton[][]
    action?: string
}

export interface ISLATextScreen extends ISLAScreenBase {
    text: LocaleID
}

export interface ISLAImageScreen extends ISLAScreenBase {
    image: LocaleID
    caption?: LocaleID
}

export interface ISLAVideoScreen extends ISLAScreenBase {
    video: LocaleID
    caption?: LocaleID
}

export interface ISLALocale {
    id: LocaleID
    content?: string
    contentArr?: string[]
    formatted?: boolean
}

