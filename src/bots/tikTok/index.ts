import { ISLABot } from '@src/ts/ISLABot';

export const tikTokBot: ISLABot = {
    id: 'sla-bot-core',
    token: '6137535708:AAGE80COePesM9I0X0lzy5Rtvw3w4ApDO38',
    channel: `BLYr6965stNY56NNP`,
    username: 'slaBotCore_bot',
    initialScene: 'Videos',
    flowTracking: true,
    session: {
        balance: 0,
        videoReward: 1,
        videoLimit: 2,
        videoCounter: 0,
        agreement: false,
        paymentDetails: '',
        paymentSum: 0,
        firstVideoLimit: false,
        // _currentScene - последняя посещенная сцена
        // _currentScreen - последний показанный экран
        // _referralLink - сгенерированная реферальная ссылка: {session._referralLink}
        // _subscribed - переменная вшита в бота и изменяется в зависимости от состояния подписки юзера на канал 'if _subscribed === true\n'
        // _watchedTime - переменная вшита в экран видео и отслеживает время с начала просмотра видео 'if _watchedTime >= 3\n'
        // _invitedUsers - список приглашенных друзей (через скрипты можно получить длинну этого списка: {session._invitedUsers})
        // _rewardForInvitedUsers - награда за приглашенного друга (дефолтное значение стоит на 15, но можно переопределить)
        _rewardForInvitedUsers: 120,
    },
    scripts: [
        {
            id: 'if_dont_watch_3_sec',
            text:
                'if _watchedTime >= 3\n' +
                'run script video_reward\n' +
                'enter popup 1.1.1',
        },
        {
            id: 'video_reward',
            text:
                `session videoCounter + 1\n` +
                `session balance + 1\n` +
                'delete\n' +
                `enter screen 1.1.2`,
        },
        {
            id: 'check-one-watched-video-conditional',
            text:
                'if videoCounter === 1\n' +
                'run script enter-screen-1.2\n' +
                'run script check-five-watched-video-conditional',
        },
        {
            id: 'enter-screen-1.2',
            text: 'sleep 4\n' + `enter screen 1.2`,
        },
        {
            id: 'after-first-video-reward',
            text:
                'sleep 2\n' +
                `session balance + 10\n` +
                'delete\n' +
                'enter screen 1.0',
        },
        {
            id: 'check-five-watched-video-conditional',
            text:
                'if videoCounter === 5\n' +
                'run script enter-screen-1.3\n' +
                'run script check-video-limit-conditional',
        },
        {
            id: 'check-video-limit-conditional',
            text:
                'if videoCounter >= videoLimit\n' +
                'run script check-first-limit-conditional\n' +
                'run script enter-screen-1.0',
        },
        {
            id: 'check-first-limit-conditional',
            text:
                'if firstVideoLimit === false\n' +
                'run script enter-screen-5.0\n' +
                'run script enter-screen-5.1.1',
        },
        {
            id: 'enter-screen-1.3',
            text: 'sleep 2\n' + `enter screen 1.3`,
        },
        {
            id: 'enter-screen-5.0',
            text:
                'sleep 2\n' +
                'session firstVideoLimit = true\n' +
                `enter screen 5.0\n`,
        },
        {
            id: 'enter-screen-5.1.1',
            text: 'sleep 2\n' + `enter screen 5.1.1`,
        },
        {
            id: 'enter-screen-1.0',
            text: 'sleep 2\n' + `enter screen 1.0`,
        },
        {
            id: 'check_subscribe_from_3.0_scene',
            text:
                'if _subscribed === true\n' +
                'run script enter-screen-3.3\n' +
                'run script enter-screen-3.2',
        },
        {
            id: 'enter-screen-3.3',
            text: 'delete\n' + `enter screen 3.3`,
        },
        {
            id: 'enter-screen-3.2',
            text: 'delete\n' + `enter screen 3.2`,
        },
        {
            id: 'get_partners_bonus',
            text:
                'if _subscribed === true\n' +
                'run script enter_screen_2.4\n' +
                'enter popup 2.3',
        },
        {
            id: 'enter_screen_2.4',
            text: 'session balance + 100\n' + 'delete\n' + `enter screen 2.4`,
        },
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
            id: 'valid_payout_sum',
            text: 'delete\n' + 'enter screen 4.2.5',
        },
        {
            id: 'low_payout_sum',
            text: 'delete\n' + 'enter screen 4.2.5.1',
        },
        {
            id: 'invalid_payout_sum',
            text: 'enter popup 4.2.4',
        },
        {
            id: 'get_bonus_for_videos',
            text:
                'if _subscribed === true\n' +
                'run script enter_screen_5.4\n' +
                'run script enter_screen_5.3',
        },
        {
            id: 'enter_screen_5.4',
            text: 'delete\n' + `session videoLimit + 20\n` + 'enter screen 5.4',
        },
        {
            id: 'enter_screen_5.3',
            text: 'delete\n' + `session videoLimit + 10\n` + 'enter screen 5.3',
        },
    ],
    scenes: [
        // сцена приветствия и правил
        {
            id: 'start',
            initialScreen: '0.0',
            screens: [
                {
                    id: '0.0',
                    text: 'start_screen_html',
                    buttons: [
                        [
                            {
                                text: 'agreement_btn_html',
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
                    action: 'sleep 1\n' + 'delete\n' + 'enter screen rules',
                },
                {
                    id: 'rules',
                    text: 'rules_html',
                    action: 'sleep 3\n' + 'delete\n' + 'enter scene Videos',
                },
            ],
        },
        {
            id: 'Videos',
            initialScreen: '1.0',
            screens: [
                {
                    id: '1.0',
                    text: 'video_counter',
                    action: 'sleep 2\n' + 'delete\n' + 'enter screen 1.0.1',
                },
                {
                    id: '1.0.1',
                    video: 'videos',
                    buttons: [
                        [
                            {
                                text: 'watched_btn',
                                action: 'run script if_dont_watch_3_sec',
                            },
                        ],
                        [
                            {
                                text: 'ending_btn',
                                action: 'delete\n' + 'enter scene 3.0',
                            },
                        ],
                    ],
                },
                {
                    id: '1.1.2',
                    text: 'plus_balance_for_watching_1_video',
                    action: 'run script check-one-watched-video-conditional',
                },
                {
                    id: '1.2',
                    text: 'after_first_video_reward_html',
                    action: 'run script after-first-video-reward',
                },
                {
                    id: '1.3',
                    text: 'after_5_video_reward_html',
                    buttons: [
                        [
                            {
                                text: 'refuse_first_reward_btn',
                                action: 'delete\n' + 'enter screen 1.4',
                            },
                        ],
                        [
                            {
                                text: 'get_first_reward_btn',
                                action:
                                    'delete\n' + 'enter scene partnerReward',
                            },
                        ],
                    ],
                },
                {
                    id: '1.4',
                    text: 'after_refuse_reward_html',
                    buttons: [
                        [
                            {
                                text: 'get_first_reward_one_more_time_btn',
                                action:
                                    'delete\n' + 'enter scene partnerReward',
                            },
                        ],
                        [
                            {
                                text: 'refuse_first_reward_one_more_time_btn',
                                action: 'delete\n' + 'enter screen 1.0',
                            },
                        ],
                    ],
                },
                {
                    id: '5.0',
                    text: 'firstVideoLimit_html',
                },
                {
                    id: '5.1.1',
                    text: 'videoLimit_html',
                },
            ],
            popups: [
                {
                    id: '1.1.1',
                    text: 'less_then_3_sec',
                },
            ],
        },
        {
            id: '3.0',
            initialScreen: '3.1',
            screens: [
                {
                    id: '3.1',
                    text: 'if_u_want_finish_html',
                    buttons: [
                        [
                            {
                                text: 'no_go_to_continued_btn',
                                action: 'delete\n' + 'enter scene Videos',
                            },
                        ],
                        [
                            {
                                text: 'finishing_btn',
                                action:
                                    'delete\n' +
                                    'run script check_subscribe_from_3.0_scene',
                            },
                        ],
                    ],
                },
                {
                    id: '3.2',
                    text: 'first_try_if_dont_subscribed_html',
                    buttons: [
                        [
                            {
                                text: 'get_100_money_btn',
                                action:
                                    'delete\n' + 'enter scene partnerReward',
                            },
                        ],
                        [
                            {
                                text: 'refuse_of_100_money_btn',
                                action: 'delete\n' + 'enter scene Menu',
                            },
                        ],
                    ],
                },
                {
                    id: '3.3',
                    text: 'invite_friends_to_sbs_html',
                    buttons: [
                        [
                            {
                                text: 'refuse_btn',
                                action: 'delete\n' + 'enter scene Menu',
                            },
                        ],
                        [
                            {
                                text: 'invite_referral_btn',
                                action: 'delete\n' + 'enter scene Referral',
                            },
                        ],
                    ],
                },
            ],
        },
        {
            id: 'Referral',
            initialScreen: '4.1',
            screens: [
                {
                    id: '4.1',
                    text: 'referral_html',
                    buttons: [
                        [
                            {
                                text: 'work_btn',
                                action: 'delete\n' + 'enter scene Videos',
                            },
                        ],
                        [
                            {
                                text: 'menu_btn',
                                action: 'delete\n' + 'enter scene Menu',
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
        {
            id: 'Menu',
            initialScreen: '4.0',
            screens: [
                {
                    id: '4.0',
                    text: 'menu_html',
                    buttons: [
                        [
                            {
                                text: 'work_btn',
                                action: 'delete\n' + 'enter scene Videos',
                            },
                        ],
                        [
                            {
                                text: 'profile_btn',
                                action: 'delete\n' + 'enter scene Profile',
                            },
                        ],
                        [
                            {
                                text: 'get_money_btn',
                                action: 'delete\n' + 'enter scene Payout',
                            },
                        ],
                        [
                            {
                                text: 'partners_btn',
                                action: 'delete\n' + 'enter scene Referral',
                            },
                        ],
                    ],
                },
            ],
        },
        {
            id: 'partnerReward',
            initialScreen: '2.1',
            screens: [
                {
                    id: '2.1',
                    text: 'partnerReward_html',
                    buttons: [
                        [
                            {
                                text: 'go_to_channel_btn',
                                action: 'channel',
                            },
                        ],
                        [
                            {
                                text: 'get_bonus_btn',
                                action: 'run script get_partners_bonus',
                            },
                        ],
                    ],
                },
                {
                    id: '2.4',
                    text: 'get_bonus_for_sbs_html',
                    buttons: [
                        [
                            {
                                text: 'instruction_of_earn_btn',
                                action: 'channel',
                            },
                        ],
                        [
                            {
                                text: 'refuse_of_knowledge_btn',
                                action: 'delete\n' + 'enter scene Videos',
                            },
                        ],
                    ],
                },
            ],
            popups: [
                {
                    id: '2.3',
                    text: 'if_forget_sbs_channel',
                },
            ],
        },
        {
            id: 'Profile',
            initialScreen: '4.3',
            screens: [
                {
                    id: '4.3',
                    text: 'profile_html',
                    buttons: [
                        [
                            {
                                text: 'work_btn',
                                action: 'delete\n' + 'enter scene Videos',
                            },
                        ],
                        [
                            {
                                text: 'back_btn',
                                action: 'delete\n' + 'enter scene Menu',
                            },
                        ],
                    ],
                },
            ],
        },
        {
            id: 'Payout',
            initialScreen: '4.2.1',
            screens: [
                {
                    id: '4.2.1',
                    gif: 'money-gif',
                    caption: 'choice_of_payment_html',
                    buttons: [
                        [
                            {
                                text: 'phone_btn',
                                action: 'delete\n' + 'enter screen 4.2.2',
                            },
                            {
                                text: 'paypal_btn',
                                action: 'delete\n' + 'enter screen 4.2.2',
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
                                action: 'delete\n' + 'enter scene Menu',
                            },
                        ],
                    ],
                },
                {
                    id: '4.2.2',
                    text: 'payment_details_html',
                    hears: 'paymentDetails',
                    actionAfterHear: 'delete\n' + 'enter screen 4.2.3',
                    buttons: [
                        [
                            {
                                text: 'back_btn',
                                action: 'delete\n' + 'enter scene Menu',
                            },
                        ],
                    ],
                },
                {
                    id: '4.2.3',
                    text: 'string_of_payout_html',
                    hears: 'paymentSum',
                    actionAfterHear: 'run script check_valid_payout',
                    buttons: [
                        [
                            {
                                text: 'back_btn',
                                action: 'delete\n' + 'enter scene Menu',
                            },
                        ],
                    ],
                },
                {
                    id: '4.2.5.1',
                    text: 'invalid_sum_of_payout_html',
                    buttons: [
                        [
                            {
                                text: 'back_btn',
                                action: 'delete\n' + 'enter scene Menu',
                            },
                        ],
                    ],
                },
                {
                    id: '4.2.5',
                    text: 'valid_sum_of_payout_html',
                    buttons: [
                        [
                            {
                                text: 'get_big_money_btn',
                                action: 'channel',
                            },
                        ],
                        [
                            {
                                text: 'back_btn',
                                action: 'delete\n' + 'enter scene Menu',
                            },
                        ],
                    ],
                },
            ],
            popups: [
                {
                    id: '4.2.4',
                    text: 'error_of_payout_html',
                },
            ],
        },
    ],
    locale: [
        // сцена приветствия и правил
        {
            id: 'start_screen_html',
            content:
                `👋🏻 Здравствуй, {user.first_name}\n` +
                `\n` +
                `🔥Мы соединяем авторов контента в тик ток, и наших пользователей. За поднятие рейтинга вы получаете деньги\n` +
                `\n` +
                `👀 За каждый просмотр в TikTok мы платим 1€, а за каждый комментарий по 2€\n` +
                `\n` +
                `☑️ Жми "Ознакомлен", чтобы уже начать зарабатывать`,
            formatted: true,
        },
        {
            id: 'agreement_btn_html',
            content: '☑️ Ознакомлен',
        },
        {
            id: 'load_0.1_html',
            content:
                `🔎 Ищем оплаченные видео для Вас...\n` +
                `\n` +
                `Ожидайте...\n` +
                `\n` +
                `[ ▯▯▯▯▯▯▯▯▯▯ ]  0%...`,
        },
        {
            id: 'load_0.2_html',
            content:
                `🔎 Ищем оплаченные видео для Вас...\n` +
                `\n` +
                `Ожидайте...\n` +
                `\n` +
                `[ ▮▮▮▯▯▯▯▯▯▯ ] 30%...`,
        },
        {
            id: 'load_0.3_html',
            content:
                `🔎 Ищем оплаченные видео для Вас...\n` +
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
        {
            id: 'rules_html',
            content:
                `✅ Отлично! Вы готовы к использованию платформы\n` +
                `\n` +
                `❗️Не пытайтесь нажимать кнопку "Просмотрено" несколько раз подряд. Вы сможете ее нажать только после того, как будет учтен Ваш просмотр\n` +
                `\n` +
                `❗️Вы можете прервать просмотр видео в любой момент. Заработанные средства автоматически поступят на баланс`,
        },
        // сцена с видео
        {
            id: 'video_counter',
            content:
                '📱 Тариф просмотра: {session.videoReward}€\n' +
                '\n' +
                '✅ Выполнено: {session.videoCounter} из {session.videoLimit}\n' +
                '💰 Ваш баланс: {session.balance}€',
            formatted: true,
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
            id: 'less_then_3_sec',
            content: 'Вы еще не посмотрели видео до конца',
        },
        {
            id: 'plus_balance_for_watching_1_video',
            content: '✅ Просмотр засчитан\n' + '• Баланс: {session.balance}€',
            formatted: true,
        },
        {
            id: 'after_first_video_reward_html',
            content:
                `🎁 Бонус: Новый пользователь!\n` +
                `\n` +
                `• Баланс: {session.balance}€ → {session.balance + 10}€\n` +
                `\n` +
                `Заходите каждый день, чтобы получить больше бонусов от нашей платформы!`,
            formatted: true,
        },
        {
            id: 'after_5_video_reward_html',
            content:
                `🎁 Бонус: Вам выпал счастливый бонус от спонсора !\n` +
                `\n` +
                `• 100€\n` +
                `\n` +
                `Чтобы забрать бонус, нажмите кнопку «🎁 Забрать 100€»\n` +
                `↓`,
        },
        {
            id: 'refuse_first_reward_btn',
            content: '⛔ Отказаться от 100€',
        },
        {
            id: 'get_first_reward_btn',
            content: '🎁 Забрать 100€',
        },
        {
            id: 'after_refuse_reward_html',
            content:
                '❗️ Вы уверены, что хотите отказаться получить 100€ от нашего спонсора?',
        },
        {
            id: 'refuse_first_reward_one_more_time_btn',
            content: '⛔ Отказаться от 100€',
        },
        {
            id: 'get_first_reward_one_more_time_btn',
            content: '🎁 Я хочу 100€',
        },
        {
            id: 'if_u_want_finish_html',
            content:
                'Вы уверены, что хотите закончить заработок с просмотра оплачиваемых видеороликов?',
        },
        {
            id: 'no_go_to_continued_btn',
            content: '👀 Нет, продолжить',
        },
        {
            id: 'finishing_btn',
            content: '✅ Да, закончить',
        },
        {
            id: 'first_try_if_dont_subscribed_html',
            content:
                '🎉 Вы заработали {session.balance}€. Приходите снова, чтобы заработать больше денег\n' +
                '\n' +
                '❗️Для вас доступен бонус новичка! 100€ для новых пользователей ТикТок бота. Для того, чтобы забрать 100€, нажмите кнопку ниже\n' +
                '↓',
            formatted: true,
        },
        {
            id: 'get_100_money_btn',
            content: '🎁 Забрать 100€',
        },
        {
            id: 'refuse_of_100_money_btn',
            content: '⛔ Отказаться от 100€',
        },
        {
            id: 'invite_friends_to_sbs_html',
            content:
                '👥 Пригласите друзей, и получите за каждого друга 10€!\n' +
                '\n' +
                'Жми "пригласить друга", чтобы заработать на партнёрской программе прямо сейчас\n' +
                '↓',
        },
        {
            id: 'refuse_btn',
            content: '❌ Отказаться',
        },
        {
            id: 'invite_referral_btn',
            content: '💸 Пригласить (+10€)',
        },
        {
            id: 'referral_html',
            content:
                `💼 Получайте бонусы за приглашённых друзей\n` +
                `\n` +
                `➡️ Ваша пригласительная ссылка: {session._referralLink}\n` +
                `\n` +
                `✔️ 10€ за каждого приглашенного Вами пользователя.` +
                `➕ Приглашено человек: {session._invitedUsers}`,
            formatted: true,
        },
        {
            id: 'work_btn',
            content: '🎵 Заработок',
        },
        {
            id: 'menu_btn',
            content: 'Главное меню',
        },
        {
            id: 'share_to_friend_btn',
            content: 'Поделиться с другом',
        },
        {
            id: 'menu_html',
            content: 'Выберите пункт меню ⤵️',
        },
        {
            id: 'work_btn',
            content: '🎵 Заработок',
        },
        {
            id: 'profile_btn',
            content: '🧑‍💻 Профиль',
        },
        {
            id: 'get_money_btn',
            content: '💰 Вывод',
        },
        {
            id: 'partners_btn',
            content: '💱 Партнерам',
        },
        {
            id: 'if_forget_sbs_channel',
            content: 'Вы забыли подписаться на канал',
        },
        {
            id: 'partnerReward_html',
            content:
                `Отличная работа! Чтобы забрать 100€:\n` +
                `\n` +
                `• Подпишитесь на канал: {session._channelLink}\n` +
                `• Посмотрите последние 5 постов.\n` +
                `• Всё. Кнопка «Получить бонус», и +100€!`,
            formatted: true,
        },
        {
            id: 'partners_btn',
            content: '📲 Перейти на канал',
        },
        {
            id: 'partners_btn',
            content: '☑️ Получить бонус',
        },
        {
            id: 'get_bonus_for_sbs_html',
            content:
                `✅ Вам был начислен бонус 100€\n` +
                `• Баланс: {session.balance - 100}€ → {session.balance}€\n` +
                `\n` +
                `💰10 000€+ на канале, на который вы только что подписались, можно забрать сейчас\n` +
                `• Время изучения информации ~ 3 минуты\n` +
                `\n` +
                `{session._channelLink}`,
            formatted: true,
        },
        {
            id: 'instruction_of_earn_btn',
            content: '💰 Инструкция заработка',
        },
        {
            id: 'refuse_of_knowledge_btn',
            content: '❌ Отказ от знаний',
        },
        {
            id: 'back_btn',
            content: 'Назад',
        },
        {
            id: 'profile_html',
            content:
                `👤 Ваши результаты!\n` +
                `\n` +
                `Имя: {user.first_name}\n` +
                `Username: {user.username}\n` +
                `Статус: ✅ Верифицирован\n` +
                `Денег в копилке: {session.balance} €\n` +
                `Просмотров: {session.videoCounter}\n` +
                `Друзей приглашено: {session._invitedUsers}\n` +
                `\n` +
                `А вот, чего добились мы.\n` +
                `Статистика за {extra.currentDate}:\n` +
                `👥 В теме: 14528 человек.\n` +
                `💰 Они получили: 21590 €.\n` +
                `👀 Всего посмотрели: 98623 видео.\n` +
                `\n` +
                `⏱ Следующее обновление через 24 часа...`,
            formatted: true,
        },
        {
            id: 'payout_html',
            content: 'money.gif',
        },
        {
            id: 'choice_of_payment_html',
            content:
                `💰 Баланс: {session.balance}€\n` +
                `Вывести средства ?\n` +
                `\n` +
                `Либо перед этим заработать:\n` +
                `💰 +50€ за акцию «Пригласить друга».\n` +
                `💶 +20 — за просмотр видео и помощь блогерам.\n` +
                `🤑 от 100€ — партнёрский бонус.`,
            formatted: true,
        },
        {
            id: 'phone_btn',
            content: '📱 Телефон',
        },
        {
            id: 'paypal_btn',
            content: '🥝 PayPal',
        },
        {
            id: 'binance_btn',
            content: '📙 Binance',
        },
        {
            id: 'card_btn',
            content: '💳 Карта',
        },
        {
            id: 'payment_details_html',
            content: 'Введите ваши реквизиты',
        },
        {
            id: 'string_of_payout_html',
            content: 'Введите сумму вывода',
        },
        {
            id: 'error_of_payout_html',
            content:
                'Введите корректную сумму списания. Напишите в ответном сообщении целое число\n' +
                '\n' +
                'Например: 100, 200, 500, 1000',
        },
        {
            id: 'get_big_money_btn',
            content: 'Забрать 10 000€',
        },
        {
            id: 'invalid_sum_of_payout_html',
            content:
                `❗️Минимальное количество для вывода: 500€\n` +
                `💰Ваш баланс: {session.balance}€\n` +
                `Необходимо заработать ещё {500 - session.balance}€, для вывода\n` +
                `\n` +
                `Заработать можно:\n` +
                `• просматривая видео\n` +
                `• приглашая друзей\n` +
                `• получить от спонсоров\n` +
                `\n` +
                `🔥 Более 10 000 € можно забрать на канале спонсора. Внимательно изучите информацию на канале, чтобы забрать свои деньги уже сегодня`,
            formatted: true,
        },
        {
            id: 'valid_sum_of_payout_html',
            content:
                `✅ Ваш запрос передан на обработку в платежный шлюз..\n` +
                `Обработка платежа занимает до 3-х рабочих дней!`,
        },
        {
            id: 'watched_btn',
            content: '✅ Просмотрено (+1€)',
        },
        {
            id: 'ending_btn',
            content: '🖐️ Закончить',
        },
        {
            id: 'money-gif',
            content: 'money.gif',
        },
        {
            id: 'go_to_channel_btn',
            content: '📲 Перейти на канал',
        },
        {
            id: 'get_bonus_btn',
            content: '☑️ Получить бонус',
        },
        {
            id: 'get_present_btn',
            content: '🎁 Получить подарок',
        },
        {
            id: 'continued_working_btn',
            content: 'Продолжить заработок',
        },
        {
            id: 'videos_get_limit_push_html',
            content:
                `🎁🎁🎁 Мы отслеживаем Вашу активность и дарим +20 рекламных роликов 🎁🎁🎁\n` +
                '\n' +
                `+ 20 Роликов доступны Вам для просмотра`,
        },
        {
            id: 'daily_push_html',
            content:
                '🎁🎁🎁  У нас для Вас новые ролики !🎁🎁🎁\n' +
                '\n' +
                '+ 10 Роликов доступны Вам для просмотра\n' +
                '\n' +
                '❗❗❗ Важно, за наличие подписки на канал спонсора дарим еще + 10 роликов❗❗❗',
        },
        {
            id: '10_videos',
            content: '🎁 + 10 роликов',
        },
        {
            id: '20_videos',
            content: '🎁 + 20 роликов',
        },
        {
            id: 'continued_for_btn',
            content: 'Продолжить',
        },
        {
            id: 'firstVideoLimit_html',
            content:
                `⭕ Вы достигли лимита по роликам ⭕\n` +
                `\n` +
                `🟢 Каждому новому пользователю Мы предоставляем ускоренный режим обновляния роликов, через 12 часов 🕐\n` +
                `🟢 🏦 Система вывода средств работает исправно\n`,
        },
        {
            id: 'videoLimit_html',
            content:
                `⭕ Вы достигли лимита по роликам ⭕\n` +
                `\n` +
                `Новые станут доступны через 12 часов\n` +
                `🟢 🏦 Система вывода средств работает исправно\n`,
        },
    ],
    pushes: [
        {
            id: '5.0',
            timer: 2,
            initialScreen: '5.1',
            filter: [],
            looping: false,
            screens: [
                {
                    id: '5.1',
                    text: 'daily_push_html',
                    buttons: [
                        [
                            {
                                text: 'get_present_btn',
                                action: 'channel',
                            },
                        ],
                        [
                            {
                                text: 'continued_working_btn',
                                action: 'run script get_bonus_for_videos',
                            },
                        ],
                    ],
                },
                {
                    id: '5.3',
                    text: '10_videos',
                    buttons: [
                        [
                            {
                                text: 'continued_for_btn',
                                action: 'delete\n' + 'enter scene Videos',
                            },
                        ],
                    ],
                },
                {
                    id: '5.4',
                    text: '20_videos',
                    buttons: [
                        [
                            {
                                text: 'continued_for_btn',
                                action: 'delete\n' + 'enter scene Videos',
                            },
                        ],
                    ],
                },
            ],
        },
        {
            id: '6.0',
            timer: 0.1,
            initialScreen: '6.1',
            filter: ['Videos'],
            condition: 'videoCounter >= videoLimit',
            looping: false,
            screens: [
                {
                    id: '6.1',
                    text: 'videos_get_limit_push_html',
                    buttons: [
                        [
                            {
                                text: 'continued_working_btn',
                                action:
                                    'delete\n' +
                                    'session videoLimit + 20\n' +
                                    'enter scene Videos',
                            },
                        ],
                    ],
                },
            ],
        },
    ],
};
