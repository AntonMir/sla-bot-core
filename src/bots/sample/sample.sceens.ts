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
                            action: 'session agreement = true\n' 
                                + 'delete\n' 
                                + 'enter scene rules\n',
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
                action: 'sleep 1\n' + 'editTo screen 0.1.1'
            },
            {
                id: '0.1.1',
                text: 'video_preparing_30_html',
                action: 'sleep 1\n' + 'editTo screen 0.1.2'
            },
            {
                id: '0.1.2',
                text: 'video_preparing_70_html',
                action: 'sleep 1\n' + 'editTo screen 0.2'
            },
            {
                id: '0.2',
                text: 'video_preparing_100_html',
                action: 'sleep 1\n' + 'delete\n' + 'enter screen 0.3'
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
                action: 'sleep 2\n' + 'delete\n' + 'enter screen 1.0.1'
            },
            {
                id: '1.0.1',
                video: 'videos',
                caption: 'video_html',
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
                // buttonDelay: 5,
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
                            action: 'delete\n' + 'enter scene partnerReward',
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
                            action: 'run script get_partner_reward_conditional',
                        },
                    ],
                ],
            },
            {
                id: '2.4',
                text: 'income_partner_reward_html',
                buttons: [
                    [
                        {
                            text: 'earn_instruction_btn',
                            action: 'channel'
                        },
                    ],
                    [
                        {
                            text: 'reject_of_knowledge_btn',
                            action: 'delete\n' + 'enter scene videos',
                        },
                    ],
                ],
            },
        ],
        popups: [
            {
                id: '2.3',
                text: 'forgot_subscribe_popups_html',
            }
        ]
    },
    // Payout (4.2.1)
    {
        id: 'payout',
        initialScreen: '4.2.1',
        screens: [
            {
                id: '4.2.1',
                gif: 'money-gif',
                caption: 'choice_of_payment_system_html',
                buttons: [
                    [
                        {
                            text: 'tel_btn',
                            action: 'delete\n' + 'enter screen 4.2.2'
                        },
                        {
                            text: 'paypal_btn',
                            action: 'delete\n' + 'enter screen 4.2.2'
                        },
                    ],
                    [
                        {
                            text: 'binance_btn',
                            action: 'delete\n' + 'enter screen 4.2.2',
                        },
                        {
                            text: 'card_btn',
                            action: 'delete\n' + 'enter screen 4.2.2',
                        },
                    ],
                    [
                        {
                            text: 'back_btn',
                            action: 'delete\n' + 'enter scene mainMenu',
                        },
                    ],
                ],
            },
            {
                id: '4.2.2',
                text: 'enter_details_html',
                hears: 'paymentDetails',
                actionAfterHear: 'delete\n' + 'enter screen 4.2.3',
                buttons: [
                    [
                        {
                            text: 'back_btn',
                            action: 'delete\n' + 'enter scene mainMenu'
                        }
                    ],
                ]
            },
            {
                id: '4.2.3',
                text: 'enter_payout_sum_html',
                hears: 'paymentSum',
                actionAfterHear: 'run script check_valid_payout_sum_condition',
                buttons: [
                    [
                        {
                            text: 'back_btn',
                            action: 'delete\n' + 'enter scene mainMenu'
                        }
                    ], 
                ]
            },
            {
                id: '4.2.5',
                text: 'output_request_in_progress_html',
                buttons: [
                    [
                        {
                            text: 'back_btn',
                            action: 'delete\n' + 'enter scene mainMenu'
                        }
                    ],
                ]
            },
            {
                id: '4.2.5.1',
                text: 'output_request_error_html',
                buttons: [
                    [
                        {
                            text: 'get_big_sub_reward_btn',
                            action: 'channel'
                        }
                    ],
                    [
                        {
                            text: 'back_btn',
                            action: 'delete\n' + 'enter scene mainMenu'
                        }
                    ],
                ]
            },
        ],
        popups: [
            {
                id: '4.2.4',
                text: 'invalid_payout_sum_html',
            }
        ]
    }
]