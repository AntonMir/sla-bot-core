import { ISLABot } from '@src/ts/ISLABot'

export const testCheeleBot: ISLABot = {
    id: 'TestCheeleBot', // имя бота (при создании)
    token: '6348888874:AAHw134-Iel5TlLwQswDRPGRrYHtidQTvPQ', // токен бота
    username: 'TestCheeleBot_Bot', // уникальный идентификатор бота (при создании)
    channel: `BLYr6965stNY56NNP`, // сохраненный через slaver канал (оставляем текущий)

    initialScene: 'start', // начальная сцена
    flowTracking: true, // ВКЛ/ВЫКЛ логировани (оставляем не тронутым)
    locale: [
        {
            id: 'agreement_html',
            content:
                `Мы создатели 🔒 закрытой социальной сети “cheelee” (https://cheelee.io/) 🔒\n` +
                `\n` +
                `это наш 🔐 бот для регистрации 🔐\n` +
                `\n` +
                `💶 В ней вы сможете смотреть видеоролики и зарабатывать реальные деньги за просмотр роликов\n`
            ,
        },
        {
            id: 'welcome_video',
            content: 'ywv8wuY9eHXJaWLtL.mp4',
        },
        {
            id: 'rewardForWatching',
            content: 
                '+5€\n' +
                '\n' +
                'Спасибо  Вам за просмотр\n' +
                '\n' +
                '💰Всего заработали: {session.balance}€\n' +
                '\n' +
                'Осталось роликов до открытия возможности регистрации: {5 - session.videoCounter}\n',
                formatted: true
        },
        {
            id: 'after_watching_reward_5',
            content: 
                'Спасибо  Вам за просмотр\n' +
                '\n' +
                '💰Всего заработали : {session.balance}€\n' +
                '\n' +
                '⛔ К сожалению, Вы исчерпали лимит, чтобы продолжить зарабатывать - перейдите в социальную сеть. Ваши средства перенесутся на Ваш аккаунт “cheelee” ⛔\n',
            formatted: true


        },
        {
            id: 'did_not_watch',
            content:
                '❌ 🤔 Кажется, Вы не посмотрели ролик❌'
        },
        {
            id: 'beforRegistration',
            content:
                '✨✨🎉  Поздравляем  🎉✨✨\n' +
                '\n' +
                 'Регистрация доступна для Вас\n' +
                '\n' +
                '📃Время заполнения формы занимает 1 минуту📃\n'
        },
        {
            id: 'start_btn',
            content: 'Start'
        },
        {
            id: 'watches_btn',
            content: 'Посмотрел +5€'
        },
        {
            id: 'to_registration_btn',
            content: 'Перейти к регистрации'
        },
        {
            id: 'info_text',
            content:
                '⁉️ Хотите Подробнее узнать о социальной сети и деятельности нашей команды ⁉️\n' +
                '\n' +
                '💰Крупные бренды платят н️️ам за рекламу, а мы уже платим Вам за просмотр💰\n' +
                '\n' +
                `Ваше внимание/время, потраченное на просмотр роликов конвертируется в деньги. 💵  ➡️  🙆\n` +
                '\n' +
                `Вы и другие пользователи могут начать уже тут, а после продолжить в “cheelee” (https://cheelee.io/)\n` +
                '\n' +
                `Все средства перенесутся на ваш аккаунт после 🔐регистрации🔐\n`
        },
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
                'ywv8wuY9eHXJaWLtL.mp4',
            ]

        },
        {
            id: 'didnt_watch_5_videos',
            content: 
                'Извините, Вы не посмотрели достаточное количество видеороликов\n' +
                '\n' +
                'Просмотров видео для открытия возможности регистрации осталось: {5 - session.videoCounter}',
            formatted: true
        },
        // сцена регистрации
        {
            id: 'userName_txt',
            content: 
                '✏️ Ваше имя '
        },
        {
            id: 'userName2_txt',
            content: 
                '✏️ Ваша Фамилия 🔐 (информация необходима для востановления вашего аккаунта)'
        },
        {
            id: 'userLogin_txt',
            content: 
                '✏️  Логин (от 3-х символов)'
        },
        {
            id: 'lastStepRegistration_txt',
            content: 
                '🎖️Последний шаг регистрации\n' +
                'Вам необходимо подписаться на партнера нашей социальной сети\n' +
                '\n' +
                'Так же Мы дарим 100€ 💰 за каждого приглашенного Вами друга 👨\n'
        },
        {
            id: 'Subscribe_btn',
            content: 'Подписаться'
        },
        {
            id: 'Invite_btn',
            content: 'Пригласить друга (+100€)'
        },
        {
            id: 'ifSubscribes_btn',
            content: 'Я подписался'
        },
        {
            id: 'ifNotInvited_txt',
            content: 
                '⌛ Наша система изучает данные других пользователей 👩‍💼👨‍⚕️👨‍🌾👨🔍‍👨‍💻🙍‍\n' +
                '\n' +
                'Ваше место в очереди: 45\n' + 
                '\n' +
                '❗Не волнуйтесь Мы обязательно оповестим Вас, когда ваша информация обработается❗'
        },
        {
            id: 'ifInvited_txt',
            content: 
                '+100€\n' +
                '\n' +
                'Всего заработали: {session.balance}€\n'+
                '\n' +
                '⌛ Наша система изучает данные других пользователей 👩‍💼👨‍⚕️👨‍🌾👨🔍‍👨‍💻🙍‍\n' +
                '\n' +
                'Ваше место в очереди: 45\n' + 
                '\n' +
                '❗Не волнуйтесь Мы обязательно оповестим Вас, когда ваша информация обработается❗',
            formatted: true

        },
        {
            id: 'is_not_sbsc_popup',
            content:
                '❌ Извините, мы не можем Вас пропустить\n' +
                'Вы не подписчик {session._channelLink} ❌',
            formatted: true
        },
        // пуши

        {
            id: 'push_html',
            content: 
                '‼️Ваше место в очереди: 17 \n' +
                '\n' +
                '⌛ Извините за ожидание, просим Вас еще немного подождать, а за это дарим 💰\n' +
                '+300€\n' +
                '\n' +
                'Бонус дарится, при налии подписки на нашего партнера'
        },
        {
            id: 'continued_registration',
            content: 'Продолжить регистрацию'
        },
        {
            id: 'push_if_dont_wright_html',
            content: 
                '🤔 Если у Вас возникли трудности с заполнением данных, можете пропустить и сделать это потом уже в самой социальной сети 😉'
        },
        {
            id: 'skip_btn',
            content: 'Пропустить'
        },

    ],
    scenes: [
        {
            id: 'start',
            initialScreen: '0.1',
            screens: [

                // экран 0.1
                {
                    id: '0.1',
                    text: 'agreement_html',
                    action: 'sleep 2\n' + 'delete\n' + 'enter screen 0.1.1'
                },

                // экран 0.1.1
                {
                    id: '0.1.1',
                    video: 'welcome_video',
                    buttons: [
                        [
                            {
                                text: 'start_btn',
                                action: 'delete\n' + 'enter screen 0.2'
                            }
                        ],
                    ]
                },

                // экран 0.2
                {
                    id: '0.2',
                    text: 'info_text',
                    action: 'sleep 5\n' + 'delete\n' + 'enter screen 0.3.1'
                },

                // экран 0.3.1
                {
                    id: '0.3.1',
                    video: 'videos',
                    buttons: [
                        [
                            {
                                text: 'watches_btn',
                                action: 'run script video-watch-conditional'
                            }
                        ],
                        [
                            {
                                text: 'to_registration_btn',
                                action: 'run script checkVideosBeforeRegistration',
                            }
                        ],
                    ]

                },

                // экран 0.3.3
                {
                    id: '0.3.3',
                    text: 'rewardForWatching',
                    action: 'sleep 2\n' + 'delete\n' + 'run script 5_video-watch-conditional'
                },
               // экран 0.3.5
                {
                    id: '0.3.5',
                    text: 'after_watching_reward_5',
                    buttons: [
                        [
                            {
                                text: 'to_registration_btn',
                                action: 'delete\n' + 'enter screen 0.4'
                            }  
                        ]
                    ]
                },
                // экран 0.4
                {
                    id: '0.4',
                    text: 'beforRegistration',
                    action: 'sleep 3\n' + 'delete\n' + 'enter scene registration'
                },

                //попап 0.3.2


            ],
            popups: [
                {
                    id: '0.3.2',
                    text: 'did_not_watch'
                }, 
                {
                    id: '0.3.6',
                    text: 'didnt_watch_5_videos'
                },   
            ]
        },
        {
            id: 'registration',
            initialScreen: '1.1',
            screens: [
               // экран 1.1
                {
                    id: '1.1',
                    text: 'userName_txt',
                    hears: 'userName',
                    actionAfterHear: 'delete\n' + 'enter screen 1.2'
                },
                // экран 1.2
                {
                    id: '1.2',
                    text: 'userName2_txt',
                    hears: 'userName2',
                    actionAfterHear: 'delete\n' + 'enter screen 1.3'    
                },
                // экран 1.3
                {
                    id: '1.3',
                    text: 'userLogin_txt',
                    hears: 'userLogin',
                    actionAfterHear: 'delete\n' + 'enter scene subs'
                },
            ]
        },
        {
            id: 'subs',
            initialScreen: '2.0',
            screens: [
                // экран 2.0
                {
                    id: '2.0',
                    text: 'lastStepRegistration_txt',
                    buttons: [
                        [
                            {
                                text: 'Subscribe_btn',
                                action: 'channel'
                            },
                        ],
                        [
                            {
                                text: 'Invite_btn',
                                action: 'referral'
                            },
                        ],
                        [
                            {
                                text: 'ifSubscribes_btn',
                                action: 'run script checkSubscribedUsers',
                            },
                        ],
                    ],
                },
                {
                    id: '3.0',
                    text: 'ifNotInvited_txt'
                },
                {
                    id: '3.1',
                    text: 'ifInvited_txt'
                },
            ],
            popups: [
                {
                    id: '2.4',
                    text: 'is_not_sbsc_popup'
                },
            ],
        }
    ],
    scripts: [
        {
            id: 'video-watch-conditional',
            text: 'if _watchedTime >= 3\n' 
                + 'run script enter_screen_0.3.3\n' 
                + 'enter popup 0.3.2',
        },
        {
            id: '5_video-watch-conditional',
            text: 'if videoCounter >= 5\n'
                + 'run script enter_screen_0.3.5\n'
                + 'run script enter_screen_0.3.1'
        },
        {
            id: 'enter_screen_0.3.5',
            text: 'delete\n' 
                + 'enter screen 0.3.5'
        },
        {
            id: 'enter_screen_0.3.1',
            text: 'delete\n' 
                + 'enter screen 0.3.1'
        },
        {
            id: 'enter_screen_0.3.3',
            text: `session videoCounter + 1\n` + 
                `session balance + 5\n` + 
                'delete\n' + 
                `enter screen 0.3.3`
        },
        {
            id: 'checkSubscribedUsers',
            text: 'if _subscribed === true\n'
            + 'run script checkInvitedFriends\n'
            + 'enter popup 2.4\n'
        },
        {
            id: 'enter_screen_3.0',
            text: 'delete\n' 
                + 'enter screen 3.0'
        },
        {
            id: 'checkInvitedFriends',
            text: 'if _invitedUsers > 0\n'
                + 'run script enter_screen_3.1\n'
                + 'run script enter_screen_3.0'
        },
        {
            id: 'enter_screen_3.1',
            text: 
                `session balance + 100\n`
                + 'delete\n' 
                + 'enter screen 3.1'
        },
        {
            id: 'checkVideosBeforeRegistration',
            text: 'if videoCounter >= 5\n'
                + 'run script enter_screen_0.4\n'
                + 'enter popup 0.3.6'
        },
        {
            id: 'enter_screen_0.4',
            text: 'delete\n' 
                + 'enter screen 0.4'
        },
        // не сделан 
        {
            id: 'pushCheckSubscribedUsers',
            text: 'if _subscribed === true\n'
            + 'run script checkInvitedFriends\n'
            + 'enter popup 2.4\n'
        },
        
    ],
    session: {
        videoCounter: 0,
        balance: 0,
    },
    pushes: [
        // пуш ожидания очереди (+300)
        {
            id: 'globalPush',
            timer: 0.1,
            initialScreen: '4.1',
            filter: [], // список сцен, после остановки на которых может появиться пуш
            looping: true, // зациклить пуш или показать 1 раз
            screens: [
                {
                    id: '4.1',
                    text: 'push_html',
                    buttons: [
                        [
                            {
                                text: 'continued_registration',
                                action: 'channel'
                            }
                        ],
                        [
                            {
                                text: 'Subscribe_btn',
                                action: 'enter screen 4.2',
                            },
                        ],
                    ]
                },
                {
                    id: '4.2',
                    text: 'push_html',
                    buttons: [
                        [
                            {
                                text: 'Subscribe_btn',
                                action: 'channel',
                            },
                        ],
                    ]
                },
            ],
        },
        
        // пуш при тупняке на стадии регистрации
        {
            id: 'stopRegPush',
            timer: 0.1,
            initialScreen: '9.1',
            filter: ['registration'],
            looping: false,
            screens: [
                {
                    id: '9.1',
                    text: 'push_if_dont_wright_html',
                    buttons: [
                        [
                            {
                                text: 'skip_btn',
                                action: 'delete\n' + 'enter scene subs',
                            },
                        ],
                    ]
                }
            ],
        }
    ],
}

