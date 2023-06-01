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
                action: 'run script rules-and_earn',
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
                    [
                        {
                            text: 'to_video-button',
                            action: 'enter scene video',
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
        id: 'video',
        initialScreen: '1.1',
        screens: [
            {
                id: '1.1',
                video: 'cat_fox-videos',
                caption: 'cat_fox_earn-counter',
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
                            text: 'end_earn-button',
                            action: 'enter scene end-bonus',
                        },
                    ],
                ],
            },
            {
                id: '1.2',
                text: 'videos-counter',
                buttons: [
                    [
                        {
                            text: 'next_video-button',
                            action: 'enter scene video',
                            deleteMessage: true,
                        },
                    ],
                    [
                        {
                            text: 'main_menu-button',
                            action: 'enter scene main-menu',
                            deleteMessage: true,
                        },
                    ],
                ],
            },
        ],
    },
]