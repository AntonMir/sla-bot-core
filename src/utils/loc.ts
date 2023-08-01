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
        /\{?([0-9]*) ?(\+|\-*) ?(([a-zA-Z_]*)\.*([a-zA-Z_]*) ?(\+|\-*) ?([0-9]*))}/g;

    const foundEntities = [...txt.matchAll(regExp)];
    const entities = [];

    for (const rawEntity of foundEntities) {
        const fullMatch = rawEntity[0];
        const mathValue_before = rawEntity[1];
        const mathOperationSymbol = rawEntity[2] || rawEntity[6];
        const namespace = rawEntity[4];
        const firstVariable = rawEntity[5];
        const mathValue_after = rawEntity[7];
        // const secondNamespace = rawEntity[8];
        const secondVariable = rawEntity[9];

        let value = '';
        switch (namespace) {
            case 'user': {
                value = ctx?.from?.[firstVariable];
                break;
            }
            case 'session': {
                const typeOfFirstSessionValue =
                    typeof ctx.session[firstVariable];
                const typeOfSecondSessionValue =
                    typeof ctx.session[secondVariable];

                if (
                    typeOfFirstSessionValue === 'string' ||
                    typeOfFirstSessionValue === 'number'
                ) {
                    if (mathOperationSymbol) {
                        if (secondVariable) {
                            value = String(
                                Parser.arithmetic.parseStr(
                                    `${ctx.session[firstVariable]} ${mathOperationSymbol} ${ctx.session[secondVariable]}`
                                )
                            );
                        }
                        value = mathValue_before
                            ? String(
                                  Parser.arithmetic.parseStr(
                                      `${mathValue_before} ${mathOperationSymbol} ${ctx.session[firstVariable]}`
                                  )
                              )
                            : String(
                                  Parser.arithmetic.parseStr(
                                      `${ctx.session[firstVariable]} ${mathOperationSymbol} ${mathValue_after}`
                                  )
                              );
                        break;
                    }
                    value = ctx.session[firstVariable];
                    break;
                }
                if (typeOfFirstSessionValue === 'object') {
                    value = ctx.session[firstVariable].length;
                    break;
                }
                if (firstVariable === '_referralLink') {
                    value = `https://t.me/${ctx.botInfo.username}?start=${ctx.from.id}`;
                    break;
                }
                if (firstVariable === '_channelLink') {
                    value = ctx.channel.link.replace('+', 'joinchat/');
                    break;
                }

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
