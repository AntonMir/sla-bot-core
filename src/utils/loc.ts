import { BotContext } from '../ts/botContext'
import { ISLABot } from '../ts/ISLABot'
import { arithmeticParser } from './parser'

const ResolvingErrorValue = '<b>*RESOLVING_ERROR*</b>'

// TODO: изучить
const localeFormatter = (
    txt: string,
    ctx: BotContext,
    bot: ISLABot
): string => {
    const regExp = /\{?([0-9]*) ?(\+|\-*) ?(([a-zA-Z_]*)\.*([a-zA-Z_]*) ?(\+|\-*) ?([0-9]*))}/g
    
    const foundEntities = [...txt.matchAll(regExp)]
    const entities = []

    for (const rawEntity of foundEntities) {
        const fullMatch = rawEntity[0]
        const mathValue_before = rawEntity[1]
        const mathOperationSymbol = rawEntity[2] || rawEntity[6]
        const namespace = rawEntity[4]
        const variable = rawEntity[5]
        const mathValue_after = rawEntity[7]


        let value = ''
        switch (namespace) {
            case 'user': {
                value = ctx?.from?.[variable]
                break
            }
            case 'session': {
                const typeValue = typeof  ctx.session[variable]

                if(typeValue === 'string' || typeValue === 'number' ) {
                    if(mathOperationSymbol) {
                        value = mathValue_before 
                            ? String(arithmeticParser.parseStr(
                                `${mathValue_before} ${mathOperationSymbol} ${ ctx.session[variable]}`
                            ))
                            : String(arithmeticParser.parseStr(
                                `${ ctx.session[variable]} ${mathOperationSymbol} ${mathValue_after}`
                            ))
                        break
                    }
                    value =  ctx.session[variable]
                    break
                } 
                if(typeValue === 'object') {
                    value =  ctx.session[variable].length
                    break
                }
                if(variable === '_referralLink') {
                    value = `https://t.me/${ctx.botInfo.username}?start=${ctx.from.id}`
                    break
                }
                if(variable === '_channelLink') {
                    value = ctx.channel.link.replace('+', 'joinchat/')
                    break
                }
                
                value = ResolvingErrorValue
                break
            }
            case 'extra': {
                if(variable === 'currentDate') {
                    value = (new Date()).toLocaleDateString()
                    break
                }
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
