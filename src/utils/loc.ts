import { BotContext } from '../ts/botContext';
import { ISLABot } from '../ts/ISLABot';
import Parser from './parser';

const ResolvingErrorValue = '<b>*RESOLVING_ERROR*</b>';

// TODO: изучить
const localeFormatter = (
    txt: string,
    ctx: BotContext,
    bot: ISLABot
): string => {
    const regExp =
        /\{?([a-zA-Z_]*)\.*([a-zA-Z_]*) ?([0-9]*) ?(\+|\-*) ?([a-zA-Z_]*)\.*([a-zA-Z_]*) ?([0-9]*)}/g;
    // /\{?([0-9]*) ?(\+|\-*) ?(([a-zA-Z_]*)\.*([a-zA-Z_]*) ?(\+|\-*) ?([0-9]*))}/g;
    // \{?([0-9]*) ?(\+|\-*) ?(([a-zA-Z_]*)\.*([a-zA-Z_]*) ?(\+|\-*) ?([0-9]*)) ?(([a-zA-Z_]*)\.*([a-zA-Z_]*) ?(\+|\-*)) ?([a-zA-Z_]*)\.*([a-zA-Z_]*)}

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
            switch (namespace) {
                case 'user': {
                    value = ctx?.from?.[firstVariable];
                    break;
                }
                case 'session': {
                    // МАТЕМАТИЧЕСКАЯ ОПЕРАЦИЯ
                    if (mathOperationSymbol) {
                        const fVar =
                            ctx.session[firstVariable] || mathValue_before;
                        const sVar =
                            ctx.session[secondVariable] || mathValue_after;
                        value = String(
                            Parser.arithmetic.parseStr(
                                `${fVar} ${mathOperationSymbol} ${sVar}`
                            )
                        );
                        break;
                    }

                    // ЕСЛИ НЕТ МАТЕМАТИКИ, ВЫЧИСЛЯЕМ ТИП ДАННЫХ ДЛЯ ВОЗВРАТА
                    const typeMainSessionVar =
                        typeof ctx.session[firstVariable];

                    // ВОЗВРАТ ЗНАЧЕНИЯ
                    if (
                        typeMainSessionVar === 'string' ||
                        typeMainSessionVar === 'number'
                    ) {
                        value = ctx.session[firstVariable];
                        break;
                    }

                    // ВОЗВРАТ ДЛИННЫ СПИСКА
                    if (typeMainSessionVar === 'object') {
                        value = ctx.session[firstVariable].length;
                        break;
                    }

                    // РЕФЕРАЛЬНАЯ ССЫЛКА
                    if (firstVariable === '_referralLink') {
                        value = `https://t.me/${ctx.botInfo.username}?start=${ctx.from.id}`;
                        break;
                    }

                    // ССЫЛКА НА КАНАЛ
                    if (firstVariable === '_channelLink') {
                        value = ctx.channel.link.replace('+', 'joinchat/');
                        break;
                    }

                    // ОШИБКА ПАРСИНГА ЛОКАЛИЗАЦИИ
                    value = ResolvingErrorValue;
                    break;
                }
                case 'extra': {
                    if (firstVariable === 'currentDate') {
                        value = new Date().toLocaleDateString();
                        break;
                    }
                }
                case 'loc': {
                    value = bot.locale.find(
                        (el) => el.id === firstVariable
                    )?.content;
                    break;
                }
                default: {
                    value = ResolvingErrorValue;
                    break;
                }
            }
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
    return resolvedText;
};

// TODO: изучить
export const localeStorage = (bot: ISLABot) => {
    return (key: string, ctx: BotContext) => {
        const loc = bot.locale.find((el) => el.id === key);

        if (loc.formatted) {
            return localeFormatter(loc.content, ctx, bot);
        }
        return loc.content;
    };
};
