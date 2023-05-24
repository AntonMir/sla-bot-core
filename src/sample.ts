import { ISLABot } from './ts/ISLABot';

export const sampleBot: ISLABot = {
    id: 'cat-fox-bot',
    token: '5696724086:AAGvBdCMS3bnMcNRAFbWwzmA_BOXlCnWEa0',
    username: 'allblyat_bot',
    initialScene: 'agreement',
    scenes: [
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
    ],
    locale: [
        {
            id: 'welcome-html',
            content:
                'Привет, {user.first_name}\n' +
                '\n' +
                '💼 Вы стали оплачиваемым помощником в обучении нейронной сети\n' +
                '\n' +
                '💵 За помощь в её обучении мы готовы платить Вам по 100 рублей за определение объектов на видео 💵\n' +
                '\n' +
                '👑 Нажмите "Старт" чтобы начать зарабатывать',
            formatted: true,
        },
        {
            id: 'start-button',
            content: 'Старт',
        },
        {
            id: 'rules-html',
            content:
                '📱 Главные правила пользования нашей платформой обучения 📱\n' +
                '\n' +
                '🟢 Вам необходимо правильно отвечать, а иначе Ваши выплаты и аккаунт будут заморожены\n' +
                '\n' +
                '🔴 Ваши накопленные средства могут быть выведены в любой момент',
        },
        {
            id: 'cat-fox-videos',
            content: '',
        },
        {
            id: 'cat-fox-earn-counter',
            content: 'Какое животное изображено на видео?',
        },
        {
            id: 'cat-button',
            content: '🐱 Кот',
        },
        {
            id: 'fox-button',
            content: '🦊 Лиса',
        },
        {
            id: 'mice-button',
            content: '🐭 Мышь',
        },
        {
            id: 'end-earn-button',
            content: 'Закончить и вывести деньги',
        },
    ],
    scripts: [
        {
            id: 'rules-and-earn',
            script: 'sleep 3\n' + 'enter scene cycle-1',
        },
    ],
};
