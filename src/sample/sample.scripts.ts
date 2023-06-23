import { ISLAScript } from "@src/ts/ISLABot";

export const sampleScripts: ISLAScript[]  = [
    {
        id: 'script-1',
        text: `sleep 1000\n` 
            + `enter screen 0.1`
    },
    {
        id: 'script-2',
        text: `enter screen 0.1`
    },
    // {
    //     id: 'video-watch-timer',
    //     text: 
    //     `if videoTimer < videoTimerLimit\n` +
    //         `sleep 2000\n enter popups 1.1.1\n` +
    //         `enter screen 1.1.2`
    // },
    {
        id: 'video-watch-reward',
        text: `session videoCounter + 1\n` + 
            `session balance + 10\n` + 
            'delete\n' + 
            `enter screen 1.1.2`
    },
]