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
        content: `${process.cwd()}\\assets\\0_welcome.mp4`,
        // content: [
        //     '2qR9cc4Mec6tzkHKN.mp4',
        //     '4XcX4YbkmxQ7g5ppX.mp4', '9drHMC57dTM7bHpNs.mp4',
        //     'FNrNykNbrdcNcQh5K.mp4', 'FkuRZXDjywuzLs7tm.mp4',
        //     'K4DHg5aFQpofRcfMm.mp4', 'KEGjYkH2XtDPsDqYw.mp4',
        //     'LKTxbjsH2xuMKNjSm.mp4', 'Lfrot5ccuGG8kWuBM.mp4',
        //     'NiWjS3yKRMRmJRdQi.mp4', 'Qs3JwBYHEAnPQw6k2.mp4',
        //     'RuSxdspjqKbTGbqZ8.mp4', 'YiFTuK2ufpcG8ZHPb.mp4',
        //     'ajSERRS95sPRPDoCX.mp4', 'dH2WQ8gHSze4ZTwiN.mp4',
        //     'eMcYXDmQTckNewKqK.mp4', 'faj9YGxksJoGzXh7J.mp4',
        //     'g2kAG5pyskxQmzAvX.mp4', 'giqMnjk8T5zJtNbdw.mp4',
        //     'iobMGiWS6oAWRSpCK.mp4', 'jz5wn7gEmqE85M7Hy.mp4',
        //     'nkAAPpSXuGFgrg9wa.mp4', 'o9iENDckxHPMaXzhG.mp4',
        //     'oLXt3783hjTXDNFjA.mp4', 'qiB3qo77Fsvnc44xc.mp4',
        //     'sjPn3tpjjBs2hr3iT.mp4', 'vmWXc26B4g5gBYqFn.mp4',
        //     'xAegJRX9z3b7fKy9c.mp4', 'xWAyW93zZwnfeKpcT.mp4',
        //     'xfMJoCPRu9WcpEPG6.mp4', 'xySSXLLeHrGRAdi4Q.mp4',
        //     'y7eYKbHmvfh5EZd3X.mp4', 'yaYiRZ8Ee3Sb7YmXa.mp4',
        //     'ywv8wuY9eHXJaWLtL.mp4'
        // ],
    },
    {
        id: 'video_counter',
        content: 
            `📱 Тариф просмотра: {session.videoReward}€\n` +
            `\n` +
            `✅ Выполнено: {session.videoWatched} из {session.videoLimit}\n` +
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
]