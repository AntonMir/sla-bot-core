import { ISLAScript } from "@src/ts/ISLABot";

export const sampleScripts: ISLAScript[]  = [
    {
        id: 'video-watch-reward',
        text: `session videoCounter + 1\n` + 
            `session balance + 10\n` + 
            'delete\n' + 
            `enter screen 1.1.2`
    },
    {
        id: 'video-watch-conditional',
        text: 'if _watchedTime >= 8\n' 
            + 'run script video-watch-reward\n' 
            + 'enter popups 1.1.1',
    },
    {
        id: 'reward-subscribed-conditional',
        text: 'if _subscribed === true\n'
            + 'run script enter-screen-3.3\n' 
            + 'run script enter-screen-3.2',
    },
    {
        id: 'enter-screen-3.3',
        text: 'delete\n' 
            + `enter screen 3.3`
    },
    {
        id: 'enter-screen-3.2',
        text: 'delete\n' 
            + `enter screen 3.2`
    },
    {
        id: 'after-first-video-reward',
        text: 'sleep 2000\n'
            + `session balance + 10\n`
            + 'delete\n' 
            + 'enter screen 1.0'
    },
    {
        id: 'check-one-watched-video-conditional',
        text: 'if videoCounter === 1\n'
            + 'run script enter-screen-1.2\n' 
            + 'run script check-five-watched-video-conditional',
    },
    {
        id: 'check-five-watched-video-conditional',
        text: 'if videoCounter === 5\n'
            + 'run script enter-screen-1.3\n' 
            + 'run script enter-screen-video-no-delete',
    },
    {
        id: 'enter-screen-1.2',
        text: 'sleep 2000\n' 
            + `enter screen 1.2`
    },
    {
        id: 'enter-screen-1.3',
        text: 'sleep 2000\n' 
            + `enter screen 1.3`
    },
    {
        id: 'enter-screen-video-no-delete',
        text: 'sleep 2000\n' 
            + `enter screen 1.0`
    },
]