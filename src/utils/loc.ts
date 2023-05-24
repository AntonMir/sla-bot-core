import { BotContext } from '../botContext';
import { ISLABot } from '../ts/ISLABot';

const ResolvingErrorValue = '<b>*RESOLVING_ERROR*</b>';

const localeFormatter = (
    txt: string,
    ctx: BotContext,
    bot: ISLABot
): string => {
    const foundEntities = [...txt.matchAll(/\{([a-zA-Z_]*)\.([a-zA-Z_]*)}/g)];
    const entities = [];
    for (const rawEntity of foundEntities) {
        const namespace = rawEntity[1];
        const variable = rawEntity[2];
        const fullMatch = rawEntity[0];
        let value = '';
        switch (namespace) {
            case 'user':
                value = ctx?.from?.[variable] || ResolvingErrorValue;
                break;
            case 'loc':
                value =
                    bot.locale.find((el) => el.id === variable)?.content ||
                    ResolvingErrorValue;
                break;
            default:
                value = ResolvingErrorValue;
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

export const localeStorage = (bot: ISLABot) => {
    return (key: string, ctx: BotContext) => {
        const loc = bot.locale.find((el) => el.id === key);
        if (loc.formatted) {
            return localeFormatter(loc.content, ctx, bot);
        }
        return loc.content;
    };
};
