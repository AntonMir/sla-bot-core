import { ISLALocale } from '../interfaces/ISLABot'

export const sampleLocale: ISLALocale[]  = [
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
        id: 'good_answer-button',
        content: 'Запомнил',
    },
    {
        id: 'bad_answer-button',
        content: 'Не запомнил',
    },
    {
        id: 'good_answer-html',
        content:
            '🟢 Молодец! 🟢\n' +
            '\n' +
            'Можешь начинать.\n'
    },
    {
        id: 'bad_answer-html',
        content:
            '🔴 Плохо... 🔴\n' +
            '\n' +
            'Подумай еще!\n'
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
]