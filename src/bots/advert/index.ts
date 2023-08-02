import { ISLABot } from '@src/ts/ISLABot';

export const advertBot: ISLABot = {
    id: 'finalTestBot', // имя бота (при создании)
    //id: 'advert-bot-core', // имя бота (при создании)
    token: '5995710215:AAGjhQEnq_3pCaW2MpCskYqlv159WiZDrJQ', // токен бота
    //token: '6429730795:AAGo4651cJCLwhtYaGnuXk-yIsNIma6iQtI', // токен бота
    username: 'finalTestBot_bot', // уникальный идентификатор бота (при создании)
    //username: 'advertBotCore_bot', // уникальный идентификатор бота (при создании)
    channel: `BLYr6965stNY56NNP`, // сохраненный через slaver канал (оставляем текущий)

    initialScene: 'start', // начальная сцена
    flowTracking: true, // ВКЛ/ВЫКЛ логировани (оставляем не тронутым)

    // сессия - список переменных(с начальными значениями) для запоминания каких-то параметров
    // к примеру запоминаем баланс пользователя для дальнейшего изменения через скрипты
    session: {
        balance: 0,
        videoReward: 1,
        videoLimit: 10,
        videoCounter: 0,
        agreement: false,
        paymentDetails: '',
        paymentSum: 0,
        // _referralLink - сгенерированная реферальная ссылка: {session._referralLink}
        // _subscribed - переменная вшита в бота и изменяется в зависимости от состояния подписки юзера на канал 'if _subscribed === true\n'
        // _watchedTime - переменная вшита в экран видео и отслеживает время с начала просмотра видео 'if _watchedTime >= 3\n'
        // _invitedUsers - список приглашенных друзей (через скрипты можно получить длинну этого списка: {session._invitedUsers})
        // _rewardForInvitedUsers - награда за приглашенного друга (дефолтное значение стоит на 15, но можно переопределить)
        _rewardForInvitedUsers: 120,
    },

    scripts: [
        {
            id: 'if-dont-subscribed',
            text:
                'if _subscribed === true\n' +
                'run script goToBonus\n' +
                'enter popup 0.3.2\n',
        },
        {
            id: 'goToBonus',
            text: `session balance + 20\n` + 'delete\n' + `enter screen 0.4`,
        },
        {
            id: 'before_3_video-watch-conditional',
            text:
                'if videoCounter < 2\n' +
                'run script enter_screen_3.2\n' +
                'run script if_is_3_videos',
        },
        {
            id: 'enter_screen_3.2',
            text:
                `session videoCounter + 1\n` +
                `session balance + 1\n` +
                'delete\n' +
                'enter screen 3.2',
        },
        {
            id: 'if_is_3_videos',
            text:
                'if videoCounter === 2\n' +
                'run script enter_screen_3.2.1\n' +
                'run script enter_screen_3.2.2',
        },
        {
            id: 'enter_screen_3.2.1',
            text:
                `session videoCounter + 1\n` +
                `session balance + 1\n` +
                'delete\n' +
                'enter screen 3.2.1',
        },
        {
            id: 'enter_screen_3.2.2',
            text:
                `session videoCounter + 1\n` +
                `session balance + 1\n` +
                'delete\n' +
                'enter screen 3.2.2',
        },
        {
            id: 'enter_screen_3.3',
            text: 'delete\n' + 'enter screen 3.3',
        },
        {
            id: 'enter_screen_3.1',
            text: 'delete\n' + 'enter screen 3.1',
        },
        {
            id: '7_video-watch-conditional',
            text:
                'if videoCounter === 7\n' +
                'run script enter_screen_3.4\n' +
                'run script 20_video-watch-conditional',
        },
        {
            id: 'enter_screen_3.4',
            text:
                `session videoCounter + 1\n` +
                `session balance + 1\n` +
                'delete\n' +
                'enter screen 3.4',
        },
        {
            id: '20_video-watch-conditional',
            text:
                'if videoCounter >= videoLimit\n' +
                'run script enter_screen_3.5\n' +
                'run script enter_screen_3.1',
        },
        {
            id: 'enter_screen_3.5',
            text:
                `session videoCounter + 1\n` +
                `session balance + 1\n` +
                'delete\n' +
                'enter screen 3.5',
        },
        // при получении бонуса на 3.3 экране
        {
            id: 'check_subscribe_before_getting_bonus',
            text:
                'if _subscribed === true\n' +
                'run script goToBonusx2\n' +
                'enter popup 3.3.2\n',
        },
        {
            id: 'goToBonusx2',
            text: `session balance + 50\n` + 'delete\n' + `enter screen 3.3.3`,
        },
        // проверка баланса при выводе
        {
            id: 'check_valid_payout',
            text:
                'if paymentSum < balance\n' +
                'run script check_500_payout_sum_condition\n' +
                'run script invalid_payout_sum',
        },
        {
            id: 'check_500_payout_sum_condition',
            text:
                'if balance < 500\n' +
                'run script low_payout_sum\n' +
                'run script valid_payout_sum',
        },
        {
            id: 'invalid_payout_sum',
            text: 'delete\n' + 'enter scene payout',
        },
        {
            id: 'low_payout_sum',
            text: 'delete\n' + 'enter screen 2.3.1',
        },
        {
            id: 'valid_payout_sum',
            text: 'delete\n' + 'run script check_pstq_videos',
        },
        {
            id: 'check_pstq_videos',
            text:
                'if videoCounter >= 5\n' +
                'run script enter_screen_2.5\n' +
                'run script enter_screen_2.4\n',
        },
        {
            id: 'enter_screen_2.5',
            text: 'delete\n' + 'enter screen 2.5',
        },
        {
            id: 'enter_screen_2.4',
            text: 'delete\n' + 'enter screen 2.4',
        },
        {
            id: 'check_subs_on_push',
            text:
                'if _subscribed === true\n' +
                'run script goToRewardx2\n' +
                'enter popup 8.2.1\n',
        },
        {
            id: 'goToRewardx2',
            text: 'session videoReward * 2\n' + 'delete\n' + 'enter screen 8.2',
        },
        // лимит видео +10
        {
            id: 'plus_10_videos',
            text:
                'session videoLimit + 10\n' + 'delete\n' + 'enter screen 3.4.2',
        },
    ],

    scenes: [
        // сцена start
        {
            id: 'start',
            initialScreen: '0.0',
            screens: [
                {
                    id: '0.0',
                    video: 'welcome_video',
                    caption: 'agreement_html',
                    buttons: [
                        [
                            {
                                text: 'start_btn',
                                action: 'delete\n' + 'enter screen load_0.1',
                            },
                        ],
                    ],
                },
                {
                    id: 'load_0.1',
                    text: 'load_0.1_html',
                    action: 'sleep 1\n' + 'editTo screen load_0.2',
                },
                {
                    id: 'load_0.2',
                    text: 'load_0.2_html',
                    action: 'sleep 1\n' + 'editTo screen load_0.3',
                },
                {
                    id: 'load_0.3',
                    text: 'load_0.3_html',
                    action: 'sleep 1\n' + 'editTo screen load_0.4',
                },
                {
                    id: 'load_0.4',
                    text: 'load_0.4_html',
                    action: 'sleep 1\n' + 'delete\n' + 'enter scene enter',
                },
            ],
        },
        // сцена enter
        {
            id: 'enter',
            initialScreen: '0.3',
            screens: [
                {
                    id: '0.3',
                    text: 'firstEnter_html',
                    buttons: [
                        [
                            {
                                text: 'channel_btn',
                                action: 'channel',
                            },
                        ],
                        [
                            {
                                text: 'get_present_btn',
                                action: 'run script if-dont-subscribed',
                            },
                        ],
                        [
                            {
                                text: 'refuse_present_btn',
                                action: 'delete\n' + 'enter scene videos',
                            },
                        ],
                    ],
                },
                {
                    id: '0.4',
                    text: 'if_subscribed_html',
                    buttons: [
                        [
                            {
                                text: 'start_working_btn',
                                action: 'delete\n' + 'enter scene videos',
                            },
                        ],
                    ],
                },
            ],
            popups: [
                {
                    id: '0.3.2',
                    text: 'error_popup',
                },
            ],
        },
        // сцена videos
        {
            id: 'videos',
            initialScreen: '3.1',
            screens: [
                {
                    id: '3.1',
                    video: 'videos',
                    caption: 'action_on_videos_html',
                    buttons: [
                        [
                            {
                                text: 'watched_btn',
                                action: 'run script before_3_video-watch-conditional',
                            },
                        ],
                        [
                            {
                                text: 'payout_btn',
                                action: 'delete\n' + 'enter scene menu',
                            },
                        ],
                    ],
                },
                {
                    id: '3.2',
                    text: 'before_bonus_plus_balance_for_watching_video_html',
                    buttons: [
                        [
                            {
                                text: 'next_video_btn',
                                action: 'run script enter_screen_3.1',
                            },
                        ],
                        [
                            {
                                text: 'payout_btn',
                                action: 'delete\n' + 'enter scene menu',
                            },
                        ],
                    ],
                },
                {
                    id: '3.2.1',
                    text: 'intime_bonus_plus_balance_for_watching_video_html',
                    buttons: [
                        [
                            {
                                text: 'get_for_3_videos_bonus_btn',
                                action: 'run script enter_screen_3.3',
                            },
                        ],
                        [
                            {
                                text: 'payout_btn',
                                action: 'delete\n' + 'enter scene menu',
                            },
                        ],
                    ],
                },
                {
                    id: '3.2.2',
                    text: 'after_bonus_plus_balance_for_watching_video_html',
                    buttons: [
                        [
                            {
                                text: 'next_video_btn',
                                action: 'run script 7_video-watch-conditional',
                            },
                        ],
                        [
                            {
                                text: 'payout_btn',
                                action: 'delete\n' + 'enter scene menu',
                            },
                        ],
                    ],
                },
                {
                    id: '3.3',
                    text: 'after_3_video_html',
                    buttons: [
                        [
                            {
                                text: 'refuse_of_bonus_btn',
                                action: 'delete\n' + 'enter screen 3.1',
                            },
                        ],
                        [
                            {
                                text: 'second_get_bonus_btn',
                                action: 'run script check_subscribe_before_getting_bonus',
                            },
                        ],
                        [
                            {
                                text: 'channel_btn',
                                action: 'channel',
                            },
                        ],
                    ],
                },
                {
                    id: '3.3.3',
                    text: 'get_50_bonus_yet_html',
                    buttons: [
                        [
                            {
                                text: 'continued_working_btn',
                                action: 'delete\n' + 'enter screen 3.1',
                            },
                        ],
                    ],
                },
                {
                    id: '3.4',
                    text: 'after_7_video_html',
                    buttons: [
                        [
                            {
                                text: 'if_subscribed_yet_btn',
                                action: 'run script plus_10_videos',
                            },
                        ],
                        [
                            {
                                text: 'channel_btn',
                                action: 'channel',
                            },
                        ],
                        [
                            {
                                text: 'payout_btn',
                                action: 'delete\n' + 'enter scene menu',
                            },
                        ],
                    ],
                },
                {
                    id: '3.4.2',
                    text: 'get_more_videos_html',
                    buttons: [
                        [
                            {
                                text: 'continued_working_btn',
                                action: 'delete\n' + 'enter screen 3.1',
                            },
                        ],
                    ],
                },
                {
                    id: '3.5',
                    text: 'limit_video_html',
                    buttons: [
                        [
                            {
                                text: 'back_to_menu_btn',
                                action: 'delete\n' + 'enter scene menu',
                            },
                        ],
                    ],
                },
            ],
            popups: [
                {
                    id: '3.3.2',
                    text: 'error_popup',
                },
            ],
        },
        // сцена меню
        {
            id: 'menu',
            initialScreen: '2.0',
            screens: [
                {
                    id: '2.0',
                    text: 'menu_html',
                    buttons: [
                        [
                            {
                                text: 'hard_work_btn',
                                action: 'delete\n' + 'enter scene videos',
                            },
                        ],
                        [
                            {
                                text: 'payout_from_menu_btn',
                                action: 'delete\n' + 'enter scene payout',
                            },
                        ],
                        [
                            {
                                text: 'invite_friend_btn',
                                action: 'delete\n' + 'enter scene referal',
                            },
                        ],
                        [
                            {
                                text: 'be_a_partner_btn',
                                action: 'delete\n' + 'enter scene partner',
                            },
                        ],
                    ],
                },
            ],
        },
        // referal
        {
            id: 'referal',
            initialScreen: '4.0',
            screens: [
                {
                    id: '4.0',
                    text: 'referal_reward_html',
                    buttons: [
                        [
                            {
                                text: 'hard_work_btn',
                                action: 'delete\n' + 'enter scene videos',
                            },
                        ],
                        [
                            {
                                text: 'back_to_menu_btn',
                                action: 'delete\n' + 'enter scene menu',
                            },
                        ],
                        [
                            {
                                text: 'share_to_friend_btn',
                                action: 'referral',
                            },
                        ],
                    ],
                },
            ],
        },
        // partner
        {
            id: 'partner',
            initialScreen: '5.0',
            screens: [
                {
                    id: '5.0',
                    text: 'be_a_partner_html',
                    buttons: [
                        [
                            {
                                text: 'back_to_menu_btn',
                                action: 'delete\n' + 'enter scene menu',
                            },
                        ],
                        [
                            {
                                text: 'hard_work_btn',
                                action: 'delete\n' + 'enter scene videos',
                            },
                        ],
                        [
                            {
                                text: 'create_a_ticket_btn',
                                action: 'delete\n' + 'enter screen 5.0.1',
                            },
                        ],
                    ],
                },
                {
                    id: '5.0.1',
                    text: 'ticket_html',
                    buttons: [
                        [
                            {
                                text: 'back_to_partnerscene_btn',
                                action: 'delete\n' + 'enter scene partner',
                            },
                        ],
                    ],
                },
            ],
        },
        // payout
        {
            id: 'payout',
            initialScreen: '2.1',
            screens: [
                {
                    id: '2.1',
                    text: 'payment_method_html',
                    buttons: [
                        [
                            {
                                text: 'card_btn',
                                action: 'delete\n' + 'enter screen 2.2',
                            },
                        ],
                        [
                            {
                                text: 'number_btn',
                                action: 'delete\n' + 'enter screen 2.2.1',
                            },
                        ],
                        [
                            {
                                text: 'binance_btn',
                                action: 'delete\n' + 'enter screen 2.2.2',
                            },
                        ],
                        [
                            {
                                text: 'paypal_btn',
                                action: 'delete\n' + 'enter screen 2.2.3',
                            },
                        ],
                        [
                            {
                                text: 'continued_working_x2_btn',
                                action: 'delete\n' + 'enter scene video',
                            },
                        ],
                    ],
                },
                {
                    id: '2.2',
                    text: 'payment_method_card_html',
                    hears: 'paymentDetails',
                    actionAfterHear: 'delete\n' + 'enter screen 2.3',
                    buttons: [
                        [
                            {
                                text: 'continued_working_x2_btn',
                                action: 'delete\n' + 'enter scene video',
                            },
                        ],
                    ],
                },
                {
                    id: '2.2.1',
                    text: 'payment_method_number_html',
                    hears: 'paymentDetails',
                    actionAfterHear: 'delete\n' + 'enter screen 2.3',
                    buttons: [
                        [
                            {
                                text: 'continued_working_x2_btn',
                                action: 'delete\n' + 'enter scene video',
                            },
                        ],
                    ],
                },
                {
                    id: '2.2.2',
                    text: 'payment_method_binance_html',
                    hears: 'paymentDetails',
                    actionAfterHear: 'delete\n' + 'enter screen 2.3',
                    buttons: [
                        [
                            {
                                text: 'continued_working_x2_btn',
                                action: 'delete\n' + 'enter scene video',
                            },
                        ],
                    ],
                },
                {
                    id: '2.2.3',
                    text: 'payment_method_paypal_html',
                    hears: 'paymentDetails',
                    actionAfterHear: 'delete\n' + 'enter screen 2.3',
                    buttons: [
                        [
                            {
                                text: 'continued_working_x2_btn',
                                action: 'delete\n' + 'enter scene video',
                            },
                        ],
                    ],
                },
                {
                    id: '2.3',
                    text: 'payment_details_html',
                    hears: 'paymentDetails',
                    actionAfterHear: 'run script check_valid_payout',
                    buttons: [
                        [
                            {
                                text: 'continued_working_x2_btn',
                                action: 'delete\n' + 'enter scene video',
                            },
                        ],
                    ],
                },
                {
                    id: '2.4',
                    text: 'lowlvl_watching_videos',
                    buttons: [
                        [
                            {
                                text: 'back_to_menu_btn',
                                action: 'delete\n' + 'enter scene menu',
                            },
                        ],
                    ],
                },
                {
                    id: '2.5',
                    text: 'highlvl_watching_videos',
                    buttons: [
                        [
                            {
                                text: 'back_to_menu_btn',
                                action: 'delete\n' + 'enter scene menu',
                            },
                        ],
                        [
                            {
                                text: 'sbsc_btn',
                                action: 'channel',
                            },
                        ],
                        [
                            {
                                text: 'transaction_btn',
                                action: 'delete\n' + 'enter screen 2.6',
                            },
                        ],
                    ],
                },
                {
                    id: '2.6',
                    text: 'waiting_transaction_html',
                    buttons: [
                        [
                            {
                                text: 'back_to_menu_btn',
                                action: 'delete\n' + 'enter scene menu',
                            },
                        ],
                        [
                            {
                                text: 'continued_working_x2_btn',
                                action: 'delete\n' + 'enter scene videos',
                            },
                        ],
                    ],
                },
                {
                    id: '2.3.1',
                    text: 'low_balance_error_html',
                    action: 'sleep 3\n' + 'delete\n' + 'enter screen 2.1',
                },
            ],
            popups: [],
        },
    ],

    locale: [
        {
            id: 'low_balance_error_html',
            content: '⚠️ У Вас недостаточно средств',
        },
        // сцена start
        {
            id: 'welcome_video',
            content: 'FNrNykNbrdcNcQh5K.mp4',
        },
        {
            id: 'videos',
            contentArr: [
                '2qR9cc4Mec6tzkHKN.mp4',
                '4XcX4YbkmxQ7g5ppX.mp4',
                '9drHMC57dTM7bHpNs.mp4',
                'FNrNykNbrdcNcQh5K.mp4',
                'FkuRZXDjywuzLs7tm.mp4',
                'K4DHg5aFQpofRcfMm.mp4',
                'KEGjYkH2XtDPsDqYw.mp4',
                'LKTxbjsH2xuMKNjSm.mp4',
                'Lfrot5ccuGG8kWuBM.mp4',
                'NiWjS3yKRMRmJRdQi.mp4',
                'Qs3JwBYHEAnPQw6k2.mp4',
                'RuSxdspjqKbTGbqZ8.mp4',
                'YiFTuK2ufpcG8ZHPb.mp4',
                'ajSERRS95sPRPDoCX.mp4',
                'dH2WQ8gHSze4ZTwiN.mp4',
                'eMcYXDmQTckNewKqK.mp4',
                'faj9YGxksJoGzXh7J.mp4',
                'g2kAG5pyskxQmzAvX.mp4',
                'giqMnjk8T5zJtNbdw.mp4',
                'iobMGiWS6oAWRSpCK.mp4',
                'jz5wn7gEmqE85M7Hy.mp4',
                'nkAAPpSXuGFgrg9wa.mp4',
                'o9iENDckxHPMaXzhG.mp4',
                'oLXt3783hjTXDNFjA.mp4',
                'qiB3qo77Fsvnc44xc.mp4',
                'sjPn3tpjjBs2hr3iT.mp4',
                'vmWXc26B4g5gBYqFn.mp4',
                'xAegJRX9z3b7fKy9c.mp4',
                'xWAyW93zZwnfeKpcT.mp4',
                'xfMJoCPRu9WcpEPG6.mp4',
                'xySSXLLeHrGRAdi4Q.mp4',
                'y7eYKbHmvfh5EZd3X.mp4',
                'yaYiRZ8Ee3Sb7YmXa.mp4',
                'ywv8wuY9eHXJaWLtL.mp4',
            ],
        },
        {
            id: 'agreement_html',
            content:
                '🙌 Рады приветствовать Тебя на нашей обновленной платформе\n' +
                '\n' +
                'Наша площадка покоряет телеграм\n' +
                '\n' +
                '✨✨✨ Мы первые платим за просмотр каждого рекламного ролика по 1 € ✨✨✨\n' +
                '\n' +
                'Запускай рекламную подборку наших партнеров и начинай зарабатывать',
        },
        {
            id: 'start_btn',
            content: 'Запуск',
        },
        {
            id: 'load_0.1_html',
            content:
                `👀 подбираем самые прибыльные рекламные ролики...\n` +
                `\n` +
                `Ожидайте...\n` +
                `\n` +
                `[ ▯▯▯▯▯▯▯▯▯▯ ]  0%...`,
        },
        {
            id: 'load_0.2_html',
            content:
                `👀 подбираем самые прибыльные рекламные ролики...\n` +
                `\n` +
                `Ожидайте...\n` +
                `\n` +
                `[ ▮▮▮▯▯▯▯▯▯▯ ] 30%...`,
        },
        {
            id: 'load_0.3_html',
            content:
                `👀 подбираем самые прибыльные рекламные ролики...\n` +
                `\n` +
                `Ожидайте...\n` +
                `\n` +
                `[ ▮▮▮▮▮▮▮▯▯▯ ] 70%...`,
        },
        {
            id: 'load_0.4_html',
            content:
                `✅ Видео найдены, приятного просмотра!\n` +
                `\n` +
                `Завершено\n` +
                `\n` +
                `[ ▮▮▮▮▮▮▮▮▮▮ ] 100%...`,
        },
        // сцена enter
        {
            id: 'firstEnter_html',
            content:
                'Перед тем как начать\n' +
                '🎁 Наш рекламный спонсор дарит Вам 20 € за посещение и подписку канала\n' +
                '\n' +
                '⚠️ Обязательно прочитать несколько постов\n' +
                '\n' +
                '{session._channelLink}',
            formatted: true,
        },
        {
            id: 'channel_btn',
            content: 'Посетить канал',
        },
        {
            id: 'get_present_btn',
            content: 'Забрать подарок',
        },
        {
            id: 'refuse_present_btn',
            content: 'Отказаться от подарка',
        },
        {
            id: 'start_working_btn',
            content: 'Начать заработок',
        },
        {
            id: 'if_subscribed_html',
            content:
                '🎁🎁🎁 +20 € 🎁🎁🎁\n' +
                'Теперь Вы можете перейти к основному заработку\n' +
                '\n' +
                '💰 Баланс: {session.balance}€',
            formatted: true,
        },
        {
            id: 'error_popup',
            content: '🔒 Вы не подписались',
        },
        // сцена videos
        {
            id: 'action_on_videos_html',
            content:
                '✔️ Как только посмотрите ролик приступайте к следующему, чтобы заработать еще',
        },
        {
            id: 'watched_btn',
            content: '✔️ Посмотрел',
        },
        {
            id: 'payout_btn',
            content: '💰 Вывод средств',
        },
        {
            id: 'before_bonus_plus_balance_for_watching_video_html',
            content:
                '💵 💵 💵 +1 € 💵 💵 💵 \n' +
                '💰 Баланс: {session.balance}€\n' +
                '\n' +
                'Вам доступно еще {session.videoLimit - session.videoCounter} рекламных роликов\n' +
                '\n' +
                '🎁🎁🎁 Еще {3 - session.videoCounter} видео до бонуса 🎁🎁🎁',
            formatted: true,
        },
        {
            id: 'intime_bonus_plus_balance_for_watching_video_html',
            content:
                '💵 💵 💵 +1 € 💵 💵 💵 \n' +
                '💰 Баланс: {session.balance}€\n' +
                '\n' +
                'Вам доступно еще {session.videoLimit - session.videoCounter} рекламных роликов\n',
            formatted: true,
        },
        {
            id: 'after_bonus_plus_balance_for_watching_video_html',
            content:
                '💵 💵 💵 +1 € 💵 💵 💵 \n' +
                '💰 Баланс: {session.balance}€\n' +
                '\n' +
                'Вам доступно еще {session.videoLimit - session.videoCounter} рекламных роликов',
            formatted: true,
        },
        {
            id: 'limit_after_7_videos_html',
            content:
                '💵 💵 💵 +1 € 💵 💵 💵 \n' +
                '💰 Баланс: {session.balance}€\n' +
                '\n' +
                'Доступно рекламных роликов еще: {session.videoLimit - session.videoCounter}',
            formatted: true,
        },
        {
            id: 'get_for_3_videos_bonus_btn',
            content: '🎁 🎁🎁 Забрать бонус 🎁🎁🎁',
        },
        {
            id: 'next_video_btn',
            content: 'Следующий ролик',
        },
        {
            id: 'after_3_video_html',
            content:
                '🎁 Предлагаем Вам бонус за спонсорскую рекламную подписку\n' +
                '+50€\n' +
                '\n' +
                '⚠️ Обязательно прочитать несколько постов\n' +
                '\n' +
                '{session._channelLink}',
            formatted: true,
        },
        {
            id: 'refuse_of_bonus_btn',
            content: 'Отказаться от 50 €',
        },
        {
            id: 'second_get_bonus_btn',
            content: 'Забрать бонус',
        },
        {
            id: 'get_50_bonus_yet_html',
            content:
                '🔓\n' +
                '🎁🎁🎁 +50 € 🎁🎁🎁\n' +
                '\n' +
                'Теперь Вы можете перейти к основному заработку\n' +
                '\n' +
                '💰 Баланс: {session.balance}€',
            formatted: true,
        },
        {
            id: 'continued_working_btn',
            content: 'Продолжить заработок',
        },
        {
            id: 'after_7_video_html',
            content:
                '⚠️ К сожалению, лимит рекламных роликов на сегодня почти исчерпан\n' +
                '\n' +
                'Наша система заметила Вашу активность\n' +
                'мы предлагаем Вам +10 рекламных роликов\n' +
                '\n' +
                '⚠️Необходимо быть подписчиком',
        },
        {
            id: 'if_subscribed_yet_btn',
            content: 'Я уже подписчик\n' + ' +10 роликов',
        },
        {
            id: 'get_more_videos_html',
            content: '🔓\n' + 'Теперь Вам доступны еще 10 реламных роликов',
        },
        {
            id: 'limit_video_html',
            content:
                '🛑🛑🛑 Лимит количества рекламных роликов 🛑🛑🛑\n' +
                'Обновление через 24 часа',
        },
        // menu
        {
            id: 'menu_html',
            content:
                '💡 Зарабатывайте и давайте возможность заработать Вашим друзьям',
        },
        {
            id: 'hard_work_btn',
            content: '💲Заработок',
        },
        {
            id: 'payout_from_menu_btn',
            content: '💰 Вывод средств',
        },
        {
            id: 'invite_friend_btn',
            content: '👥 Пригласить друга\n' + '+50 €',
        },
        {
            id: 'be_a_partner_btn',
            content: 'Стать рекламным партнером',
        },
        // referal
        {
            id: 'referal_reward_html',
            content:
                '💰 Баланс: {session.balance}€\n' +
                '+50 € за каждого приглашенного друга\n' +
                '\n' +
                'Ссылка для приглашений: {session._referralLink}\n' +
                '\n' +
                'Приглашено друзей: 0',
            formatted: true,
        },
        {
            id: 'hard_work_btn',
            content: '💲Заработок',
        },
        {
            id: 'back_to_menu_btn',
            content: 'В главное меню',
        },
        {
            id: 'share_to_friend_btn',
            content: '+50 € Пригласить',
        },
        // partner
        {
            id: 'be_a_partner_html',
            content:
                '👋 Оставляйте заявку на рекламное партнерство\n' +
                '\n' +
                '⚠️ Мы с вами свяжемся и рассмотрим рекламное предложение',
        },
        {
            id: 'create_a_ticket_btn',
            content: 'Оставить заявку',
        },
        {
            id: 'ticket_html',
            content:
                '✔️ Заявка оставлена\n' +
                '🕛 Мы с Вами свяжемся в течении 24 часов 🕛',
        },
        {
            id: 'back_to_partnerscene_btn',
            content: 'В главное меню',
        },
        // payout
        {
            id: 'payment_method_html',
            content:
                '💰 Баланс: {session.balance}€\n' +
                '\n' +
                'Способ вывода средств',
            formatted: true,
        },
        {
            id: 'card_btn',
            content: 'Карта банка (⚠️ 16 цифр)',
        },
        {
            id: 'number_btn',
            content: 'Номер телефона',
        },
        {
            id: 'binance_btn',
            content: 'Binance (BUSD)',
        },
        {
            id: 'paypal_btn',
            content: 'PayPal',
        },
        {
            id: 'continued_working_x2_btn',
            content: '💲 Продолжить заработок 💲',
        },
        {
            id: 'payment_details_html',
            content: '➡️ Введите сумму вывода',
        },
        {
            id: 'payment_method_card_html',
            content:
                '➡️ Введите номер карты для пополнения\n' +
                '⚠️ Ваши данные под защитой',
        },
        {
            id: 'payment_method_number_html',
            content:
                '➡️ Введите номер телефона для пополнения\n' +
                '⚠️ Ваши данные под защитой',
        },
        {
            id: 'payment_method_binance_html',
            content:
                '➡️ Введите адрес BUSD для пополнения\n' +
                '⚠️ Ваши данные под защитой',
        },
        {
            id: 'payment_method_paypal_html',
            content:
                '➡️ Введите номер счета для пополнения\n' +
                '⚠️ Ваши данные под защитой',
        },
        {
            id: 'highlvl_watching_videos',
            content:
                '💰 Баланс: {session.balance}€\n' +
                '\n' +
                '⌛ Ваша транзакция поставлена в очередь\n' +
                '\n' +
                'Ваше место в очереди транзакций 3021\n' +
                '\n' +
                '⚠️ Зайдите позже и проверьте возможность вывода\n' +
                'Если у Вас есть подписка на рекламный канал, то Вы можете провести транзакцию без очереди жмите “провести транзакцию"',
            formatted: true,
        },
        {
            id: 'lowlvl_watching_videos',
            content:
                '💰 Баланс: {session.balance}€\n' +
                '\n' +
                '⚠️ Вывод не доступен\n' +
                'Вы посмотрели недостаточное количество рекламных роликов\n' +
                '\n' +
                '⚠️ Минимальный порог 5 роликов\n' +
                '\n' +
                '💡 Посмотрите больше роликов и возвращайтесь',
            formatted: true,
        },
        {
            id: 'sbsc_btn',
            content: 'Подписаться',
        },
        {
            id: 'transaction_btn',
            content: 'Провести транзакцию',
        },
        {
            id: 'waiting_transaction_html',
            content:
                '🕧 Обработка транзакции\n' +
                'Средства поступят в течении 24 часов\n' +
                '\n' +
                '⚠️ Если средства не поступили попробуйте повторить транзакцию позже\n' +
                'Высокая нагрузка на систему',
        },
        // pushes
        {
            id: 'continued_after_video_html',
            content:
                '🎁🎁🎁 +3000€ 🎁🎁🎁\n' +
                '\n' +
                'Наш рекламный партнер Предоставляет способы заработать от 3000€ в сутки\n' +
                '{session._channelLink}',
            formatted: true,
        },
        {
            id: 'working_with_ads_btn',
            content: 'Зарабатывать на рекламе',
        },
        {
            id: 'big_reward_btn',
            content: '+3000€',
        },
        {
            id: 'bigx3_reward_btn',
            content: '+9000€',
        },
        {
            id: 'out_of_registration_html',
            content:
                '⚠️⚠️⚠️ Ваше место в очереди изменилось проверьте состояние транзакции ⚠️⚠️⚠️',
        },
        {
            id: 'double_price_btn',
            content: 'Двойная ставка',
        },
        {
            id: 'continued_watching_push_btn',
            content: 'Продолжить просмотр',
        },
        {
            id: 'double_price_html',
            content:
                '⚠️⚠️⚠️ Двойнай ставка +2€ за просмотр ролика, при наличии подписки на {session._channelLink} ⚠️⚠️⚠️',
            formatted: true,
        },
        {
            id: '111111after_20_videos_push_html',
            content: `<pre>
           🔓 
 🎁🎁🎁 Теперь Вы будете
  получать по 2€ 🎁🎁🎁
     за каждый ролик
                   </pre>`,
        },
        {
            id: 'after_20_videos_push_html',
            content: `XYЙ`,
        },
    ],
    pushes: [
        // +3к к балансу где должны быть
        {
            id: 'stopWatchingVideos',
            timer: 320,
            initialScreen: '6.0',
            filter: ['videos'],
            looping: true,
            screens: [
                {
                    id: '6.0',
                    text: 'continued_after_video_html',
                    buttons: [
                        [
                            {
                                text: 'back_to_menu_btn',
                                action: 'delete\n' + 'enter scene menu',
                            },
                        ],
                        [
                            {
                                text: 'working_with_ads_btn',
                                action: 'delete\n' + 'enter scene videos',
                            },
                        ],
                        [
                            {
                                text: 'big_reward_btn',
                                action: 'channel',
                            },
                        ],
                    ],
                },
            ],
        },
        {
            id: 'outOfRegistration',
            timer: 5,
            initialScreen: '7.0',
            filter: ['payout'],
            looping: true,
            screens: [
                {
                    id: '7.0',
                    text: 'out_of_registration_html',
                    buttons: [
                        [
                            {
                                text: 'back_to_menu_btn',
                                action: 'delete\n' + 'enter scene menu',
                            },
                        ],
                        [
                            {
                                text: 'working_with_ads_btn',
                                action: 'delete\n' + 'enter scene videos',
                            },
                        ],
                        [
                            {
                                text: 'bigx3_reward_btn',
                                action: 'channel',
                            },
                        ],
                    ],
                },
            ],
        },
        {
            id: 'doublePrice',
            timer: 0.5,
            initialScreen: '8.0',
            filter: [],
            looping: true,
            screens: [
                {
                    id: '8.0',
                    text: 'double_price_html',
                    buttons: [
                        [
                            {
                                text: 'double_price_btn',
                                action: 'run script check_subs_on_push',
                            },
                        ],
                        [
                            {
                                text: 'back_to_menu_btn',
                                action: 'delete\n' + 'enter scene menu',
                            },
                        ],
                        [
                            {
                                text: 'sbsc_btn',
                                action: 'channel',
                            },
                        ],
                    ],
                },
                {
                    id: '8.2',
                    text: 'after_20_videos_push_html',
                    buttons: [
                        [
                            {
                                text: 'continued_watching_push_btn',
                                action: 'delete\n' + 'enter scene videos',
                            },
                        ],
                    ],
                },
            ],
            popups: [
                {
                    id: '8.2.1',
                    text: 'error_popup',
                },
            ],
        },
    ],
};
