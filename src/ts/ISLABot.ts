export interface ISLABot {
    id: BotID
    token: string
    username: string
    initialScene: SceneID
    scenes: ScenesLike[]
    locale: ISLALocale[]
    scripts: ISLAScript[]
    session: ISLASession
    pushes: PushLike[]
    flowTracking: any
    channel: string
}

export interface ISLAScript {
    id: string
    text: string
}

export type ScenesLike = ISLABaseScene

export type PushLike = ISLABasePush

// export type ScreenLike = ISLAImageScreen 
//                         | ISLAVideoScreen 
//                         | ISLAGifScreen
//                         | ISLATextScreen
//                         | ISLAHearScreen

export type ScreenLike = ISLAScreenBase

export type PopupLike = ScreenLike

export type BotID = string

export type SceneID = string

export type ScreenID = string

export type PushID = string

export type LocaleID = string

export interface ISLASession {
    [key: string]: any
}

export interface ISLABaseScene {
    id: LocaleID
    initialScreen: ScreenID
    screens: ScreenLike[]
    popups?: PopupLike[]
}

export interface ISLABasePush extends ISLABaseScene {
    timer: number
    filter?: string[]
    looping?: boolean
}

export interface ISLAButton {
    text: LocaleID
    action: string
}

export interface ISLAScreenBase {
    id: ScreenID
    buttons?: ISLAButton[][]
    action?: string
    buttonDelay?: number
    text?: LocaleID
    hears?: string
    actionAfterHear?: LocaleID
    image?: LocaleID
    video?: LocaleID
    gif?: LocaleID
    caption?: LocaleID
}

// export interface ISLATextScreen extends ISLAScreenBase {
//     text: LocaleID
// }

// export interface ISLAHearScreen extends ISLAScreenBase {
//     hears?: string
//     actionAfterHear?: LocaleID
// }

// export interface ISLAImageScreen extends ISLAScreenBase {
//     image: LocaleID
//     caption?: LocaleID
// }

// export interface ISLAVideoScreen extends ISLAScreenBase {
//     video: LocaleID
//     caption?: LocaleID
// }

// export interface ISLAGifScreen extends ISLAScreenBase {
//     gif: LocaleID
//     caption?: LocaleID
// }

export interface ISLALocale {
    id: LocaleID
    content?: string
    contentArr?: string[]
    formatted?: boolean
}

