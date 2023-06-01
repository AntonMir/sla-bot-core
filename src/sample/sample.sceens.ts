import { ScenesLike } from '@src/interfaces/ISLABot'

export const sampleScenes: ScenesLike[]  = [
    {
        id: 'agreement',
        initialScreen: '0.1',
        screens: [
            {
                id: '0.1',
                text: 'welcome-html',
                buttons: [
                    [
                        {
                            text: 'start-button',
                            action: 'enter screen 0.2',
                            deleteMessage: true,
                        },
                    ],
                ],
            },
            {
                id: '0.2',
                text: 'rules-html',
                action: 'run script rules-and-earn',
                buttons: [
                    [
                        {
                            text: 'good_answer-button',
                            action: 'enter screen 0.2.1',
                            deleteMessage: true
                        }
                    ],
                    [
                        {
                            text: 'bad_answer-button',
                            action: 'enter screen 0.2.2',
                            deleteMessage: true
                        }
                    ],
                ]
            },
            {
                id: '0.2.1',
                text: 'good_answer-html',
            },
            {
                id: '0.2.2',
                text: 'bad_answer-html',
            },
        ],
    },
    {
        id: 'cycle-1',
        initialScreen: '1.1',
        screens: [
            {
                id: '1.1',
                video: 'cat-fox-videos',
                caption: 'cat-fox-earn-counter',
                buttons: [
                    [
                        {
                            text: 'cat-button',
                            action: 'enter screen 1.2',
                        },
                    ],
                    [
                        {
                            text: 'fox-button',
                            action: 'enter screen 1.2',
                        },
                    ],
                    [
                        {
                            text: 'mice-button',
                            action: 'enter screen 1.2',
                        },
                    ],
                    [
                        {
                            text: 'end-earn-button',
                            action: 'enter scene end-bonus',
                        },
                    ],
                ],
            },
        ],
    },
]