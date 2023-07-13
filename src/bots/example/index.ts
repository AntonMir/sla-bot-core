import { ISLABot } from '@src/ts/ISLABot'

export const exampleBot: ISLABot = {
    id: 'cheele-test-bot', // имя бота (при создании)
    token: '6373528436:AAGmZYa3q7OGUjFvXPwX2QdD8eMuDKBBedg', // токен бота
    channel: `BLYr6965stNY56NNP`, // сохраненный через slaver канал (оставляем текущий)
    username: 'cheeleTestBot_bot', // уникальный идентификатор бота (при создании)
    
    initialScene: 'agreement', // начальная сцена
    flowTracking: true, // ВКЛ/ВЫКЛ логировани (оставляем не тронутым)
    
    // сессия - список переменных(с начальными значениями) для запоминания каких-то параметров
    // к примеру запоминаем баланс пользователя для дальнейшего изменения через скрипты
    session: {
        balance: 0,
        videoReward: 10,
        videoLimit: 10,
        videoCounter: 0,
        agreement: false,
        paymentDetails: '',
        paymentSum: 0,
        _rewardForInvitedUsers: 120
        // _watchedTime - переменная вшита в экран видео и отслеживает время с начала просмотра видео
        // _subscribed - переменная вшита в бота и изменяется в зависимости от состояния подписки юзера на канал
        // _invitedUsers - список приглашенных друзей (через скрипты можно получить длинну этого списка. Получить доступ: {session._invitedUsers})
        // _rewardForInvitedUsers - награда за приглашенного друга (дефолтное значение стоит на 15, но можно переопределить)
        // _referralLink - сгенерированная реферальная ссылка. Получить доступ: {session._referralLink}
    },

    // скрипты с какими-лио действиями (удаление/переход на дртугую сцену/ожидание/изменение сессии/...)
    scripts: [
        {
            id: 'video-watch-reward',
            text: `session videoCounter + 1\n` + 
                `session balance + 10\n` + 
                'delete\n' + 
                `enter screen 1.1.2`
        },
        {
            id: 'video-watch-conditional',
            text: 'if _watchedTime >= 3\n' 
                + 'run script video-watch-reward\n' 
                + 'enter popup 1.1.1',
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
            text: 'sleep 2\n'
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
            text: 'sleep 2\n' 
                + `enter screen 1.2`
        },
        {
            id: 'enter-screen-1.3',
            text: 'sleep 2\n' 
                + `enter screen 1.3`
        },
        {
            id: 'enter-screen-video-no-delete',
            text: 'sleep 2\n' 
                + `enter screen 1.0`
        },
        {
            id: 'get_partner_reward_conditional',
            text: 'if _subscribed === true\n'
                + 'run script get_partner_reward\n' 
                + 'enter popup 2.3',
        },
        {
            id: 'get_partner_reward',
            text: `session balance + 100\n`
                + 'delete\n' 
                + `enter screen 2.4`
        },
        {
            id: 'check_valid_payout_sum_condition',
            text: 'if paymentSum > 0\n' 
                + 'run script check_500_payout_sum_condition\n'
                + 'run script invalid_payout_sum'
        },
        {
            id: 'check_500_payout_sum_condition',
            text: 'if balance < 500\n' 
                + 'run script low_payout_sum\n'
                + 'run script valid_payout_sum'
        },
        {
            id: 'valid_payout_sum',
            text: 'delete\n' + 'enter screen 4.2.5'
        },
        {
            id: 'low_payout_sum',
            text: 'delete\n' + 'enter screen 4.2.5.1'
        },
        {
            id: 'invalid_payout_sum',
            text: 'enter popup 4.2.4'
        },
    ],

    // Разделы бота, содержащие экраны в соответствии с дизайном
    scenes: [
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

                        // Кнопка отправки реферальной ссылки другу
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
                                action: 'delete\n' + 'enter scene video',
                            },
                        ],
                        [
                            {
                                text: 'back_btn',
                                action: 'delete\n' + 'enter scene mainMenu\n',
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
                            // кнопка перехода на канал
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
                            // кнопка перехода на канал
                            {
                                text: 'earn_instruction_btn',
                                action: 'channel'
                            },
                        ],
                        [
                            {
                                text: 'reject_of_knowledge_btn',
                                action: 'delete\n' + 'enter scene video',
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
    ],

    // классическая локализация 
    // id - название переменной
    // content - содержимое
    // formatted - пробегаться ли по тексту и смотреть вшитые переменные сессии для последующего их изменения
    locale: [
        // AGREEMENT (0.0)
        {
            id: 'agreement_html',
            content:
                `👋🏻 Здравствуй, {user.first_name}\n` +
                `\n` +
                `🔥Мы соединяем авторов контента в тик ток, и наших пользователей. За поднятие рейтинга вы получаете деньги\n` +
                `\n` +
                `👀 За каждый просмотр в TikTok мы платим 1€, а за каждый комментарий по 2€\n` +
                `\n` +
                `☑️ Жми "Ознакомлен", чтобы уже начать зарабатывать`
            ,
            formatted: true,
        },
        {
            id: 'agreement_btn',
            content: '☑️ Ознакомлен',
        },
        {
            id: 'video_preparing_0_html',
            content: 
                `🔎 Ищем оплаченные видео для Вас...\n` +
                `\n` +
                `Ожидайте...\n` +
                `\n` +
                `[ ▯▯▯▯▯▯▯▯▯▯ ]  0%...`
            ,
        },
        {
            id: 'video_preparing_30_html',
            content: 
                `🔎 Ищем оплаченные видео для Вас...\n` +
                `\n` +
                `Ожидайте...\n` +
                `\n` +
                `[ ▮▮▮▯▯▯▯▯▯▯ ] 30%...`
            ,
        },
        {
            id: 'video_preparing_70_html',
            content: 
                `🔎 Ищем оплаченные видео для Вас...\n` +
                `\n` +
                `Ожидайте...\n` +
                `\n` +
                `[ ▮▮▮▮▮▮▮▯▯▯ ] 70%...`
            ,
        },
        
        {
            id: 'video_preparing_100_html',
            content: 
                `✅ Видео найдены, приятного просмотра!\n` +
                `\n` +
                `Завершено\n` +
                `\n` +
                `[ ▮▮▮▮▮▮▮▮▮▮ ] 100%...`
            ,
        },
        {
            id: 'video_rules_html',
            content: 
                `✅ Отлично! Вы готовы к использованию платформы\n` +
                `\n` +
                `❗️Не пытайтесь нажимать кнопку "Просмотрено" несколько раз подряд. Вы сможете ее нажать только после того, как будет учтен Ваш просмотр\n` +
                `\n` +
                `❗️Вы можете прервать просмотр видео в любой момент. Заработанные средства автоматически поступят на баланс`
            ,
        },
    
        // VIDEO (1.0)
        {
            id: 'videos',
            contentArr: [
                '2qR9cc4Mec6tzkHKN.mp4',
                '4XcX4YbkmxQ7g5ppX.mp4', '9drHMC57dTM7bHpNs.mp4',
                'FNrNykNbrdcNcQh5K.mp4', 'FkuRZXDjywuzLs7tm.mp4',
                'K4DHg5aFQpofRcfMm.mp4', 'KEGjYkH2XtDPsDqYw.mp4',
                'LKTxbjsH2xuMKNjSm.mp4', 'Lfrot5ccuGG8kWuBM.mp4',
                'NiWjS3yKRMRmJRdQi.mp4', 'Qs3JwBYHEAnPQw6k2.mp4',
                'RuSxdspjqKbTGbqZ8.mp4', 'YiFTuK2ufpcG8ZHPb.mp4',
                'ajSERRS95sPRPDoCX.mp4', 'dH2WQ8gHSze4ZTwiN.mp4',
                'eMcYXDmQTckNewKqK.mp4', 'faj9YGxksJoGzXh7J.mp4',
                'g2kAG5pyskxQmzAvX.mp4', 'giqMnjk8T5zJtNbdw.mp4',
                'iobMGiWS6oAWRSpCK.mp4', 'jz5wn7gEmqE85M7Hy.mp4',
                'nkAAPpSXuGFgrg9wa.mp4', 'o9iENDckxHPMaXzhG.mp4',
                'oLXt3783hjTXDNFjA.mp4', 'qiB3qo77Fsvnc44xc.mp4',
                'sjPn3tpjjBs2hr3iT.mp4', 'vmWXc26B4g5gBYqFn.mp4',
                'xAegJRX9z3b7fKy9c.mp4', 'xWAyW93zZwnfeKpcT.mp4',
                'xfMJoCPRu9WcpEPG6.mp4', 'xySSXLLeHrGRAdi4Q.mp4',
                'y7eYKbHmvfh5EZd3X.mp4', 'yaYiRZ8Ee3Sb7YmXa.mp4',
                'ywv8wuY9eHXJaWLtL.mp4'
            ],
        },
        {
            id: 'video_counter',
            content: 
                `📱 Тариф просмотра: {session.videoReward}€\n` +
                `\n` +
                `✅ Выполнено: {session.videoCounter} из {session.videoLimit}\n` +
                `💰 Ваш баланс: {session.balance}€`
            ,
            formatted: true
        },
        {
            id: 'video_html',
            content: `✔️ Как только посмотрите ролик приступайте к следующему, чтобы заработать еще`,
        },
        {
            id: 'video_viewed_btn',
            content: `✅ Просмотрено (+{session.videoReward}€)`,
            formatted: true
        },
        {
            id: 'finish_watching_btn',
            content: `🖐️ Закончить`,
        },
        {
            id: 'did_not_watching_popups_html',
            content: `Вы еще не посмотрели видео до конца`,
        },
        {
            id: 'video_reward_html',
            content: 
                `✅ Просмотр засчитан\n` +
                `• Баланс: {session.balance}€`
            ,
            formatted: true
        },
        {
            id: 'after_first_video_reward_html',
            content: 
                `🎁 Бонус: Новый пользователь!\n`
                + `\n`
                + `• Баланс: {session.balance}€ → {session.balance + 10}€\n`
                + `\n`
                + `Заходите каждый день, чтобы получить больше бонусов от нашей платформы!`
            ,
            formatted: true
        },
        {
            id: 'after_five_video_reward_html',
            content: 
                `🎁 Бонус: Вам выпал счастливый бонус от спонсора !\n`
                + `\n`
                + `• 100€\n`
                + `\n`
                + `Чтобы забрать бонус, нажмите кнопку «🎁 Забрать 100€»\n`
                + `↓`
            ,
        },
        {
            id: 'after_five_video_reward_twice_html',
            content: `❗️ Вы уверены, что хотите отказаться получить 100€ от нашего спонсора?`,
        },
        {
            id: 'get_first_reward_twice_btn',
            content: '🎁 Я хочу 100€'
        },
        {
            id: 'refuse_first_reward_twice_btn',
            content: '⛔ Я отказываюсь от 100€'
        },
    
        // (3.1, 3.2, 3.3)
        {
            id: 'you_are_sure_finish_watching_html',
            content: `Вы уверены, что хотите закончить заработок с просмотра оплачиваемых видеороликов?`,
        },
        {
            id: 'not_sure_btn',
            content: `👀 Нет, продолжить`,
        },
        {
            id: 'sure_btn',
            content: `✅ Да, закончить`,
        },
        {
            id: 'noob_first_reward_for_sub_html',
            content: `🎉 Вы заработали ~€. Приходите снова, что бы заработать больше денег\n` 
                + `\n` 
                + `❗️Для вас доступен бонус новичка! 100€ для новых пользователей ТикТок бота. Для того, чтобы забрать 100€, нажмите кнопку ниже\n` 
                + `↓`,
        },
        {
            id: 'get_first_reward_btn',
            content: `🎁 Забрать 100€`,
        },
        {
            id: 'refuse_first_reward_btn',
            content: `⛔ Отказаться от 100€`,
        },
        {
            id: 'call_friends_for_reward_html',
            content: `👥 Пригласите друзей, и получите за каждого друга 10€!\n` 
                + `\n` 
                + `Жми "пригласить друга", чтобы заработать на партнёрской программе прямо сейчас\n` 
                + `↓`,
        },
        {
            id: 'refuse_btn',
            content: `❌ Отказаться`,
        },
        {
            id: 'call_friends_btn',
            content: `💸 Пригласить (+10€)`,
        },
    
        // REFERRAL (4.1)
        {
            id: 'referral_html',
            content: `💼 Получайте бонусы за приглашённых друзей\n` 
                + `\n` 
                + `➡️ Ваша пригласительная ссылка: {session._referralLink}\n` 
                + `\n` 
                + `✔️ 10€ за каждого приглашенного Вами пользователя.`
                + `➕ Приглашено человек: {session._invitedUsers}`,
            formatted: true,
        },
        {
            id: 'to_videos_btn',
            content: `🎵 Заработок`,
        },
        {
            id: 'to_main_menu_btn',
            content: `Главное меню`,
        },
        {
            id: 'referral_link_btn',
            content: `Поделиться с другом`,
        },
    
        // Main Menu (4.0)
        {
            id: 'main_menu_html',
            content: 'Выберите пункт меню ⤵️'
        },
        {
            id: 'to_profile_btn',
            content: '🧑‍💻 Профиль'
        },
        {
            id: 'to_payout_btn',
            content: '💰 Вывод'
        },
        {
            id: 'to_referral_btn',
            content: '💱 Партнерам'
        },
    
        // Profile (4.3)
        {
            id: 'profile_html',
            content: 
                `👤 Ваши результаты!\n`
                + `\n`
                + `Имя: {user.first_name}\n`
                + `Username: {user.username}\n`
                + `Статус: ✅ Верифицирован\n`
                + `Денег в копилке: {session.balance} €\n`
                + `Просмотров: {session.videoCounter}\n`
                + `Друзей приглашено: {session._invitedUsers}\n`
                + `\n`
                + `А вот, чего добились мы.\n`
                + `Статистика за {extra.currentDate}:\n`
                + `👥 В теме: 14528 человек.\n`
                + `💰 Они получили: 21590 €.\n`
                + `👀 Всего посмотрели: 98623 видео.\n`
                + `\n`
                + `⏱ Следующее обновление через 24 часа...`,
                formatted: true
        },
        {
            id: 'back_btn',
            content: 'Назад'
        },
    
        // PartnerReward (2.1)
        {
            id: 'partner_reward_html',
            content: 
                `Отличная работа! Чтобы забрать 100€:\n`
                + `\n`
                + `• Подпишитесь на канал: {session._channelLink}\n`
                + `• Посмотрите последние 5 постов.\n`
                + `• Всё. Кнопка «Получить бонус», и +100€!`,
            formatted: true
        },
        {
            id: `go_to_channel_btn`,
            content: '📲 Перейти на канал'
        },
        {
            id: `get_partner_reward_btn`,
            content: '☑️ Получить бонус'
        },
        {
            id: 'income_partner_reward_html',
            content: 
                `✅ Вам был начислен бонус 100€\n`
                + `• Баланс: {session.balance - 100}€ → {session.balance}€\n`
                + `\n`
                + `💰10 000€+ на канале, на который вы только что подписались, можно забрать сейчас\n`
                + `• Время изучения информации ~ 3 минуты\n`
                + `\n`
                + `{session._channelLink}`,
            formatted: true
        },
        {
            id: 'earn_instruction_btn',
            content: '💰 Инструкция заработка'
        },
        {
            id: 'reject_of_knowledge_btn',
            content: '❌ Отказ от знаний'
        },
        {
            id: 'forgot_subscribe_popups_html',
            content: 'Вы забыли подписаться на канал'
        },
    
        // Payout (4.2.1)
        {
            id: 'money-gif',
            content: 'money.gif'
        },
        {
            id: 'choice_of_payment_system_html',
            content: 
                `💰 Баланс: {session.balance}€\n`
                + `Вывести средства ?\n`
                + `\n`
                + `Либо перед этим заработать:\n`
                + `💰 +50€ за акцию «Пригласить друга».\n`
                + `💶 +20 — за просмотр видео и помощь блогерам.\n`
                + `🤑 от 100€ — партнёрский бонус.`
            ,
            formatted: true
    
        },
        {
            id: 'tel_btn',
            content: '📱 Телефон'
        },
        {
            id: 'paypal_btn',
            content: '🥝 PayPal'
        },
        {
            id: 'binance_btn',
            content: '📙 Binance'
        },
        {
            id: 'card_btn',
            content: '💳 Карта'
        },
        {
            id: 'enter_details_html',
            content: `Введите ваши реквизиты`
        },
        {
            id: 'enter_payout_sum_html',
            content: `Введите сумму вывода`
        },
        {
            id: 'invalid_payout_sum_html',
            content: 
                `Введите корректную сумму списания. Напишите в ответном сообщении целое число\n`
                + `\n`
                + `Например: 100, 200, 500, 1000`
        },
        {
            id: 'output_request_in_progress_html',
            content: 
                `✅ Ваш запрос передан на обработку в платежный шлюз..\n`
                + `Обработка платежа занимает до 3-х рабочих дней!`
        },
        {
            id: 'output_request_error_html',
            content: 
                `❗️Минимальное количество для вывода: 500€\n`
                + `💰Ваш баланс: {session.balance}€\n`
                + `Необходимо заработать ещё {500 - session.balance}€, для вывода\n`
                + `\n`
                + `Заработать можно:\n`
                + `• просматривая видео\n`
                + `• приглашая друзей\n`
                + `• получить от спонсоров\n`
                + `\n`
                + `🔥 Более 10 000 € можно забрать на канале спонсора. Внимательно изучите информацию на канале, чтобы забрать свои деньги уже сегодня`
            ,
            formatted: true
        },
        {
            id: 'get_big_sub_reward_btn',
            content: `Забрать 10 000€`
        },
        {   
            id: 'push_html',
            content: `ПУШ\n`
                + `🤑 Можете ознакомиться со способами заработка наших партнеров, навыки и знания для заработка от 2000 $ в сутки, все что Вам необходимо:\n`
                + `телефон и свободное время`
        },
        {
            id: `push_sub_btn`,
            content: `Подписаться на канал партнера`
        },
        {
            id: 'rewardReferral',
            content: '10'
        },
        {
            id: 'video_text_html',
            content: 'video_text_html srth ШАБЛОН'
        }
    ],

    // пуши с таймингом
    // пуши очень похожи на экраны (screens), только с таймером появления
    pushes: [
        {
            id: '5.0',
            text: 'push_html',
            timer: 0.1,
            buttons: [
                [
                    {
                        text: 'push_sub_btn',
                        action: 'channel'
                    }
                ],
                [
                    {
                        text: 'back_btn',
                        action: 'delete\n' + 'enter scene mainMenu',
                    },
                ],
            ]
        }
    ],
}
