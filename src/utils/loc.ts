import { BotContext } from '../ts/botContext'
import { ISLABot } from '../ts/ISLABot'

const ResolvingErrorValue = '<b>*RESOLVING_ERROR*</b>'

// TODO: изучить
const localeFormatter = (
    txt: string,
    ctx: BotContext,
    bot: ISLABot
): string => {
    const foundEntities = [...txt.matchAll(/\{([a-zA-Z_]*)\.([a-zA-Z_]*)}/g)]
    const entities = []

    for (const rawEntity of foundEntities) {
        const namespace = rawEntity[1]
        const variable = rawEntity[2]
        const fullMatch = rawEntity[0]
        
        let value = ''
        switch (namespace) {
            case 'user': {
                value = ctx?.from?.[variable]
                break
            }
            case 'session': {
                const typeValue = typeof bot.session[variable]
                if(typeValue === 'string' || typeValue === 'number' ) {
                    value = bot.session[variable]
                    break
                } 
                if(typeValue === 'object') {
                    value = bot.session[variable].length
                    break
                }
                value = ResolvingErrorValue
                break
            }
            case 'loc': {
                value = bot.locale.find((el) => el.id === variable)?.content 
                break
            }
            default: {
                value = ResolvingErrorValue
                break
            }
        }
        entities.push({
            fullMatch,
            value,
        })
    }

    let resolvedText = txt

    for (const entity of entities) {
        resolvedText = resolvedText.replace(entity.fullMatch, entity.value)
    }
    return resolvedText
}

// TODO: изучить
export const localeStorage = (bot: ISLABot) => {
    return (key: string, ctx: BotContext) => {
        const loc = bot.locale.find((el) => el.id === key)
        if (loc.formatted) {
            return localeFormatter(loc.content, ctx, bot)
        }
        return loc.content
    }
}
