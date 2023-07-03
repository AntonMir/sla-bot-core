import { BotContext } from "@src/ts/botContext";
import { ISLABaseScene, ISLABot, ISLAScript } from "@src/ts/ISLABot";
import { sleep } from "@src/utils/sleep";
import screenResolver from "./screen.resolver";
import { Context } from "telegraf";
import sceneResolver from "./scene.resolver";
import popupResolver from "./popup.resolver";
import { conditionParser, arithmeticParser } from "@src/utils/parser"


class ScriptResolver { 
    private readonly botConfig: ISLABot

    constructor(config: ISLABot) {
        this.botConfig = config
    }

    getScript(id: string) {
        return this.botConfig.scripts.find(el => el.id === id)
    }
    
    /**
     * Проверяем БОЛЬШОЙ мультистрочный скрипт
     * @param {string} scriptValue - скрипт для обработки (текст)
     */
    async resolveMany(
        bot: ISLABot, 
        ctx: BotContext, 
        scene: ISLABaseScene, 
        scriptValue: string,
        usedItem?: string
    ) {
        const actions = scriptValue.split('\n')

        for (const action of actions) {
            await this.resolveOne(bot, ctx, scene, action, usedItem)
        }
    }
    
    async resolveConditional(
        bot: ISLABot,
        ctx: BotContext,
        scene: ISLABaseScene,
        script: string,
        usedItem?: string
    ) {
        const [strCondition, ...args] = script.split('\n')
        let condition: boolean 

        // если мы обращаемся ко времени просмотра, вычисляем его
        // актуально для сцены с видео 
         if(script.includes('_watchedTime')) {
            const currentTime = Date.parse(String(new Date()))
            bot.session._watchedTime = (currentTime - bot.session.startWatching) / 1000
        }

        if(strCondition.includes('_subscribed')) {
            console.log('check subscribed not released!')
            // TODO: реализовать проверку подписки на канал
            // condition = ctx.channel.isSubscribed()
            // bot.session.subscribed = ctx.channel.isSubscribed()
        } else {
        }

        condition = conditionParser.parseBoolean(bot, strCondition)

        if(condition) {
            await this.resolveOne(bot, ctx, scene, args[0], usedItem)
        } else {
            await this.resolveOne(bot, ctx, scene, args[1], usedItem)
        }
    }

    async resolveOne(
        bot: ISLABot,
        ctx: BotContext,
        scene: ISLABaseScene,
        scriptValue: string,
        usedItem?: string
    ) {

        const [command, ...args] = scriptValue.split(' ')

        switch (command) {
            case 'run': {
                const entity = args[0]
                if (entity !== 'script') return null
                const scriptId: string = args[1]
                const script: ISLAScript = this.getScript(scriptId)
                if(script.text.includes('if')) {
                    await ctx.resolver.resolveConditional(bot, ctx, scene, script.text, 'button')
                    break
                }
                await this.resolveMany(bot, ctx, scene, script.text)
                break
            }
            case 'sleep': {
                if(usedItem === 'button') break
                const timer: number = +args[0]
                await sleep(timer)
                break
            }
            case 'enter': {
                const entity: string = args[0]
                const entityId: string = args[1]
                switch (entity) {
                    case 'scene': {
                        await sceneResolver(ctx, entityId)
                        break
                    }
                    case 'screen': {
                        await screenResolver(bot, ctx, scene, scene.screens, entityId)
                        break
                    }
                    case 'popups': {
                        await popupResolver(bot, ctx, scene, scene.popups, entityId)
                        break
                    }
                }
                break
            }
            case 'editTo': {
                const entity: string = args[0]
                const entityId: string = args[1]
                switch (entity) {
                    case 'screen': {
                        await screenResolver(bot, ctx, scene, scene.screens, entityId, 'editTo')
                        break
                    }
                }
                break
            }
            case 'session': {
                const entity: string = args[0]
                const operator: string = args[1]
                const value: string = args[2]

                switch(typeof bot.session[entity]) {
                    case 'number': {
                        const prew = bot.session[entity]
                        bot.session[entity] = arithmeticParser.parseStr(
                            `${bot.session[entity]} ${operator} ${value}`
                        )
                        break
                    }
                    case 'object': {
                        bot.session[entity].push(value)
                        break
                    }
                }
                break
            }
            case 'delete': {
                const lastMessageId: number = +bot.session.lastMessageId
                try {
                    await ctx.deleteMessage(lastMessageId)
                } catch(e) {
                    console.log('delete ERROR>', e)
                }
                break
            }
            case 'if': {
                await ctx.resolver.resolveConditional(bot, ctx, scene, scriptValue, 'button')
                break
            }
        }
    }
}

// class SLABot extends Telegraf {
//     consutructor (token: string) {
//         super(token)
//         super.context.loc = new LocalisationObject(...)
//     }
// }


export default ScriptResolver;
