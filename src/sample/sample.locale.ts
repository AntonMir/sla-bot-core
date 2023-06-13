import { ISLALocale } from '@src/interfaces/ISLABot'

export const sampleLocale: ISLALocale[]  = [
    // 0.0 AGREEMENT
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
            `<pre>Ожидайте...</pre>\n` +
            `\n` +
            `[ ▯ ▯ ▯ ▯ ▯ ▯ ▯ ▯ ▯ ▯ ▯ ] 0%...`
        ,
    },
    {
        id: 'video_preparing_100_html',
        content: 
            `✅ Видео найдены, приятного просмотра!\n` +
            `\n` +
            `<pre>Завершено</pre>\n` +
            `\n` +
            `[ ▉▉▉▉▉▉▉▉▉ ] 100%...`
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

    // 1.0 VIDEO
    {
        id: 'videos',
        content: '/home/user/Projects/sla-bot-core/assets/giqMnjk8T5zJtNbdw.mp4',
    },
    {
        id: 'video_counter',
        content: 
            `📱 Тариф просмотра: {videos.reward}€\n` +
            `\n` +
            `✅ Выполнено: {videos.watched} из {videos.limit}\n` +
            `💰 Ваш баланс: {user.balance}€`
        ,
        formatted: true
    },
    {
        id: 'video_html',
        content: `✔️ Как только посмотрите ролик приступайте к следующему, чтобы заработать еще`,
    },
    {
        id: 'video_viewed_btn',
        content: `✅ Просмотрено (+{videos.reward}€)`,
    },
    {
        id: 'finish_watching_btn',
        content: `🖐️ Закончить`,
    },
    {
        id: 'did_not_watching_popup_html',
        content: `Вы еще не посмотрели видео до конца`,
    },
    {
        id: 'video_reward_html',
        content: 
            `✅ Просмотр засчитан\n` +
            `• Баланс: {user.balance}€`
        ,
    },
]