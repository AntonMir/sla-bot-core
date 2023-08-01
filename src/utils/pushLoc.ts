import { BotContext } from '../ts/botContext';
import { ISLABot, ISLASession } from '../ts/ISLABot';
import Parser from './parser';
import { Telegraf } from 'telegraf';

const ResolvingErrorValue = '<b>*RESOLVING_ERROR*</b>';

const localePushFormatter = (
    txt: string,
    session: ISLASession,
    bot: Telegraf<BotContext>
) => {
    const regExp =
        /\{?([a-zA-Z_]*)\.*([a-zA-Z_]*) ?([0-9]*) ?(\+|\-*) ?([a-zA-Z_]*)\.*([a-zA-Z_]*) ?([0-9]*)}/g;
    const foundEntities = [...txt.matchAll(regExp)];
    const entities = [];

    for (const rawEntity of foundEntities) {
        // console.log(`rawEntity`, rawEntity);
        const fullMatch = rawEntity[0];
        const namespace = rawEntity[1] || rawEntity[5];
        const firstVariable = rawEntity[2];
        const mathValue_before = rawEntity[3];
        const mathOperationSymbol = rawEntity[4];
        // const secondNamespace = rawEntity[5];
        const secondVariable = rawEntity[6];
        const mathValue_after = rawEntity[7];

        let value = '';
        if (namespace) {
            console.log(`namespace`, namespace);
            console.log(`firstVariable`, firstVariable);
            // МАТЕМАТИЧЕСКАЯ ОПЕРАЦИЯ
            if (mathOperationSymbol) {
                const fVar = session[firstVariable] || mathValue_before;
                const sVar = session[secondVariable] || mathValue_after;
                value = String(
                    Parser.arithmetic.parseStr(
                        `${fVar} ${mathOperationSymbol} ${sVar}`
                    )
                );
            }

            // ЕСЛИ НЕТ МАТЕМАТИКИ, ВЫЧИСЛЯЕМ ТИП ДАННЫХ ДЛЯ ВОЗВРАТА
            const typeMainSessionVar = typeof session[firstVariable];

            console.log(`typeMainSessionVar`, typeMainSessionVar);

            // ВОЗВРАТ ЗНАЧЕНИЯ
            if (
                typeMainSessionVar === 'string' ||
                typeMainSessionVar === 'number'
            ) {
                value = session[firstVariable];
                break;
            }

            // ВОЗВРАТ ДЛИННЫ СПИСКА
            if (typeMainSessionVar === 'object') {
                value = session[firstVariable].length;
                break;
            }

            // РЕФЕРАЛЬНАЯ ССЫЛКА
            if (firstVariable === '_referralLink') {
                value = `https://t.me/${bot.botInfo.username}?start=${bot.context.from.id}`;
                break;
            }

            // ССЫЛКА НА КАНАЛ
            if (firstVariable === '_channelLink') {
                value = bot.context.channel.link.replace('+', 'joinchat/');

                console.log(`value`, value);
                break;
            }

            // ОШИБКА ПАРСИНГА ЛОКАЛИЗАЦИИ
            value = ResolvingErrorValue;
        } else {
            value = String(
                Parser.arithmetic.parseStr(
                    `${mathValue_before} ${mathOperationSymbol} ${mathValue_after}`
                )
            );
        }

        entities.push({
            fullMatch,
            value,
        });
    }

    let resolvedText = txt;

    for (const entity of entities) {
        resolvedText = resolvedText.replace(entity.fullMatch, entity.value);
    }

    // console.log(`resolvedText`, resolvedText);
    return resolvedText;
};

export const pushLocaleStorage = (bot: Telegraf<BotContext>) => {
    return (key: string, session: ISLASession) => {
        const loc = bot.context.botObject.locale.find((el) => el.id === key);
        if (loc.formatted) {
            return localePushFormatter(loc.content, session, bot);
        }
        return loc.content;
    };
};
