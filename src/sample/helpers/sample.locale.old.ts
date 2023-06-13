import { ISLALocale } from '@src/interfaces/ISLABot'

export const sampleLocale: ISLALocale[]  = [
    {
        id: 'welcome_html',
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
        id: 'start_btn',
        content: '☑️ Ознакомлен',
    },
    {
        id: 'rules_html',
        content:
            '📱 Главные правила пользования нашей платформой обучения 📱\n' +
            '\n' +
            '🟢 Вам необходимо правильно отвечать, а иначе Ваши выплаты и аккаунт будут заморожены\n' +
            '\n' +
            '🔴 Ваши накопленные средства могут быть выведены в любой момент',
    },
    {
        id: 'to_video_btn',
        content: 'Смотреть видео',
    },
    {
        id: 'good_answer_html',
        content:
            '🟢 Молодец! 🟢\n' +
            '\n' +
            'Можешь начинать.\n'
    },
    {
        id: 'bad_answer_html',
        content:
            '🔴 Плохо... 🔴\n' +
            '\n' +
            'Подумай еще!\n'
    },
    {
        id: 'cat_fox-videos',
        content: '/home/user/Projects/sla-bot-core/assets/giqMnjk8T5zJtNbdw.mp4',
    },
    {
        id: 'cat_fox_earn-counter',
        content: 'Какое животное изображено на видео?',
    },
    {
        id: 'cat_btn',
        content: '🐱 Кот',
    },
    {
        id: 'fox_btn',
        content: '🦊 Лиса',
    },
    {
        id: 'mice_btn',
        content: '🐭 Мышь',
    },
    {
        id: 'end_earn_btn',
        content: 'Закончить и вывести деньги',
    },
    {
        id: 'videos-counter',
        content: 
            '💵 Вы заработали {reward.video}\n' +
            '\n' +
            'Баланс, {user.balance}\n' +
            '\n' +
            '👑 Что бы продолжить зарабатывать нажмите "Смотреть"',
    },
    {
        id: 'next_video_btn',
        content: "Смотреть",
    },
    {
        id: 'main_menu_btn',
        content: "Назад",
    },
]