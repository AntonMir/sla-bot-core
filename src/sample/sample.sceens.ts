import { ScenesLike } from '@src/ts/ISLABot'

export const sampleScenes: ScenesLike[]  = [
    // AGREEMENT (0.0)
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
                            action: 'session agreement = true\n' + 'delete\n' + 'enter scene rules\n',
                            deleteMessage: true,
                        },
                    ],
                ],
            },
        ]
    },
    // Rules (0.1)
    {
        id: 'rules',
        initialScreen: '0.1',
        screens: [
            {
                id: '0.1',
                text: 'video_preparing_0_html',
                action: 'sleep 1000\n' + 'editTo screen 0.1.1'
            },
            {
                id: '0.1.1',
                text: 'video_preparing_30_html',
                action: 'sleep 1000\n' + 'editTo screen 0.1.2'
            },
            {
                id: '0.1.2',
                text: 'video_preparing_70_html',
                action: 'sleep 1000\n' + 'editTo screen 0.2'
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
        ]
    },
    // VIDEO (1.0)
    {
        id: 'video',
        initialScreen: '1.0',
        screens: [
            {
                id: '1.0',
                text: 'video_counter',
                action: 'sleep 2000\n' + 'delete\n' + 'enter screen 1.0.1'
            },
            {
                id: '1.0.1',
                video: 'videos',
                caption: 'video_html',
                // buttonDelay: 5,
                buttons: [
                    [
                        {
                            text: 'video_viewed_btn',
                            action: 'run script video-watch-conditional'
                        },
                    ],
                    [
                        {
                            text: 'finish_watching_btn',
                            action: 'delete\n' + 'enter scene 3.0',
                            // deleteMessage: true, // TODO: выпилить
                        },
                    ],
                ],
            },
            {
                id: '1.1.2',
                text: 'video_reward_html',
                action: 'run script check-one-watched-video-conditional',
            },
            {
                id: '1.2',
                text: 'after_first_video_reward_html',
                action: 'run script after-first-video-reward',
            },
            {
                id: '1.3',
                text: 'after_five_video_reward_html',
                buttons: [
                    [
                        {
                            text: 'refuse_first_reward_btn',
                            action: 'delete\n' + 'enter screen 1.4'
                        },
                    ],
                    [
                        {
                            text: 'get_first_reward_btn',
                            action: 'delete\n' + 'enter scene partnerReward',
                        },
                    ],
                ],
            },
            {
                id: '1.4',
                text: 'after_five_video_reward_twice_html',
                buttons: [
                    [
                        {
                            text: 'get_first_reward_twice_btn',
                            action: 'delete\n' + 'enter scene partnerReward',
                        },
                    ],
                    [
                        {
                            text: 'refuse_first_reward_twice_btn',
                            action: 'delete\n' + 'enter screen 1.0'
                        },
                    ],
                ],
            }
        ],
        popups: [
            {
                id: '1.1.1',
                text: 'did_not_watching_popups_html',
            },
        ]
    },
    // (3.1, 3.2, 3.3)
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
                            action: 'run script reward-subscribed-conditional',
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
                            text: 'get_first_reward_btn',
                            action: 'delete\n' + 'enter scene 2.0',
                        },
                    ],
                    [
                        {
                            text: 'refuse_first_reward_btn',
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
    // REFERRAL (4.1)
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
                            action: 'delete\n' + 'enter scene rules',
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
    },
    // Main Menu (4.0)
    {
        id: 'mainMenu',
        initialScreen: '4.0',
        screens: [
            {
                id: '4.0',
                text: 'main_menu_html',
                buttons: [
                    [
                        {
                            text: 'to_videos_btn',
                            action: 'delete\n' + 'enter scene video',
                        },
                    ],
                    [
                        {
                            text: 'to_profile_btn',
                            action: 'delete\n' + 'enter scene profile',
                        },
                    ],
                    [
                        {
                            text: 'to_payout_btn',
                            action: 'delete\n' + 'enter scene payout',
                        },
                    ],
                    [
                        {
                            text: 'to_referral_btn',
                            action: 'delete\n' + 'enter scene referral',
                        },
                    ],
                ]
            }
        ]
    },
    // Profile (4.3)
    {
        id: 'profile',
        initialScreen: '4.3',
        screens: [
            {
                id: '4.3',
                text: 'profile_html',
                buttons: [
                    [
                        {
                            text: 'to_videos_btn',
                            action: 'delete\n' + 'enter scene rules',
                        },
                    ],
                    [
                        {
                            text: 'back_btn',
                            action: 'delete\n' + 'enter scene mainMenu',
                        },
                    ],
                ]
            }
        ]
    },
    // PartnerReward (2.1)
    {
        id: 'partnerReward',
        initialScreen: '2.1',
        screens: [
            {
                id: '2.1',
                text: 'partner_reward_html',
                buttons: [
                    [
                        {
                            text: 'go_to_channel_btn',
                            action: 'channel'
                        },
                    ],
                    [
                        {
                            text: 'get_partner_reward_btn',
                            action: 'delete\n' + 'enter screen 2.4',
                        },
                    ],
                ],
            },
        ]
    }
]