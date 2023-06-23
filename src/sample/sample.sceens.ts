import { ScenesLike } from '@src/ts/ISLABot'

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
                            action: 'delete\n' + 'enter screen 0.1\n',
                            deleteMessage: true,
                        },
                    ],
                ],
            },
            {
                id: '0.1',
                text: 'video_preparing_0_html',
                action: 'sleep 1000\n' + 'delete\n' + 'enter screen 0.2'
            },
            {
                id: '0.2',
                text: 'video_preparing_100_html',
                action: 'sleep 1000\n' + 'delete\n' + 'enter screen 0.3'
            },
            {
                id: '0.3',
                text: 'video_rules_html',
                buttons: [
                    [
                        {
                            text: 'agreement_btn',
                            action: 'delete\n' + 'enter scene video',
                        },
                    ],
                ],
            }
            // {
            //     id: '0.3',
            //     text: 'video_rules_html',
            //     action: 'sleep 6000\n' + 'delete\n' + 'enter scene video'
            // }
        ]
    },
    {
        id: 'video',
        initialScreen: '1.0',
        screens: [
            {
                id: '1.0',
                text: 'video_counter',
                action: 'sleep 500\n' + 'delete\n' + 'enter screen 1.0.1'
            },
            {
                id: '1.0.1',
                video: 'videos',
                caption: 'video_html',
                buttons: [
                    [
                        {
                            text: 'video_viewed_btn',
                            action: 'run script video-watch-reward',
                        },
                    ],
                    [
                        {
                            text: 'finish_watching_btn',
                            action: 'delete\n' + 'enter scene 3.0',
                            deleteMessage: true,
                        },
                    ],
                ],
            },
            {
                id: '1.1.2',
                text: 'video_reward_html',
                action: 'sleep 500\n' + 'delete\n' + 'enter screen 1.0',
            },
        ],
        popups: [
            {
                id: '1.1.1',
                text: 'did_not_watching_popups_html',
            },
        ]
    },
    {
        id: '3.0',
        initialScreen: '3.1',
        screens: [
            {
                id: '3.1',
                text: 'you_are_sure_finish_watching_html',
                buttons: [
                    [
                        {
                            text: 'not_sure_btn',
                            action: 'delete\n' + 'enter scene video',
                        },
                    ],
                    [
                        {
                            text: 'sure_btn',
                            action: 'delete\n' + 'enter screen 3.3',
                        },
                    ],
                ],
            },
            {
                id: '3.2',
                text: 'noob_first_reward_for_sub_html',
                buttons: [
                    [
                        {
                            text: 'get_first_reward_for_sub_btn',
                            action: 'delete\n' + 'enter scene 2.0',
                        },
                    ],
                    [
                        {
                            text: 'refuse_first_reward_for_sub_btn',
                            action: 'delete\n' + 'enter scene mainMenu',
                        },
                    ],
                ],
            },
            {
                id: '3.3',
                text: 'call_friends_for_reward_html',
                buttons: [
                    [
                        {
                            text: 'refuse_btn',
                            action: 'delete\n' + 'enter scene mainMenu',
                        },
                    ],
                    [
                        {
                            text: 'call_friends_btn',
                            action: 'delete\n' + 'enter scene referral',
                        },
                    ],
                ],
            },
        ]
    },
    {
        id: 'referral',
        initialScreen: '4.1',
        screens: [
            {
                id: '4.1',
                text: 'referral_html',
                buttons: [
                    [
                        {
                            text: 'to_videos_btn',
                            action: 'delete\n' + 'enter scene video',
                        },
                    ],
                    [
                        {
                            text: 'to_main_menu_btn',
                            action: 'delete\n' + 'enter scene mainMenu',
                        },
                    ],
                    [
                        {
                            text: 'referral_link_btn',
                            action: 'referral',
                        },
                    ],
                ],
            },
        ]
    }
]