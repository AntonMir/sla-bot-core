import { ScenesLike } from '@src/interfaces/ISLABot'

export const sampleScenes: ScenesLike[]  = [
    {
        id: 'agreement',
        initialScreen: '0.0',
        screens: [
            {
                id: '0.0',
                text: 'agreement_html',
                buttons: [
                    [
                        {
                            text: 'agreement_btn',
                            action: 'enter screen 0.1',
                            deleteMessage: true,
                        },
                    ],
                ],
            },
            {
                id: '0.1',
                text: 'video_preparing_0_html',
                action: 'sleep 2000\n' + 'enter screen 0.2'
            },
            {
                id: '0.2',
                text: 'video_preparing_100_html',
                action: 'sleep 2000\n' + 'enter screen 0.3'
            },
            {
                id: '0.3',
                text: 'video_rules_html',
                action: 'sleep 2000\n' + 'delete\n' + 'enter scene video'
            }
        ]
    },
    {
        id: 'video',
        initialScreen: '1.0',
        screens: [
            {
                id: '1.0',
                text: 'video_counter',
                action: 'sleep 1000\n' + 'enter screen 1.0.1'
            },
            {
                id: '1.0.1',
                video: 'videos',
                caption: 'video_html',
                buttons: [
                    [
                        {
                            text: 'video_viewed_btn',
                            action: 'enter screen 1.1.2',
                            // TODO: продумать скрипт условия
                            // action: 'if waited > 6 ---> enter screen 1.1.1',
                            deleteMessage: true,
                        },
                    ],
                    [
                        {
                            text: 'finish_watching_btn',
                            action: 'enter scene 3.1',
                            deleteMessage: true,
                        },
                    ],
                ],
            },
            // TODO: Всплывающие уведомления надо как-то отдельно обозначить
            // {
            //     id: '1.1.1',
            //     text: 'did_not_watching_popup_html',
            //     action: 'sleep 1000\n' + 'enter screen 1.0'
            // },
            {
                id: '1.1.2',
                text: 'video_reward_html',
                action: 
                    'sleep 1000\n' + 
                    'enter screen 1.0',
            },
        ]
    }
]

