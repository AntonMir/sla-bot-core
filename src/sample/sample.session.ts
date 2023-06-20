import { ISLASession } from '@src/interfaces/ISLABot'

// параметры задаем без вложенности
export const sampleSession: ISLASession = {
    balance: 0,
    comments: [],
    invitedUsers: [],
    commentCounter: 0,
    agreement: false,
    videoReward: 10,
    videoWatched: [],
    videoLimit: 10,
    videoCounter: 0,
    // videoTimerLimit: 4
}