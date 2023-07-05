import { ISLALocale } from '@src/ts/ISLABot'

export const sampleLocale: ISLALocale[]  = [
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
            + `➕ Приглашено человек: 0`,
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
            + `Друзей приглашено: {session._invitedFriends}\n`
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
            + `• Баланс: {session.balance}€ → {session.balance + 100}€\n`
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
]

