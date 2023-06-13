import { ExtraReplyMessage, ExtraVideo } from 'telegraf/typings/telegram-types'
import { ScreenLike } from '@src/interfaces/ISLABot'
import { Markup } from 'telegraf'
import { BotContext } from '@src/context/botContext'
import { logger } from '@src/utils/logger'
import { sleep } from '@src/utils/sleep'


/**
 * Отрисовать один из экранов доступных в текущей сцене
 * @param {BotContext} ctx BotContext
 * @param {ScreenLike[]} screens Массив доступных сцен бота
 * @param {string} screenId UID сцены, на которую хотим перейти
 */
const enterScreen = async (
    ctx: BotContext,
    screens: ScreenLike[],
    screenId: string,
) => {
    logger.info(`[${ctx.from.id}] enter screen ${screenId}`)
    const screen = screens.find((sc) => sc.id === screenId)

    if ('text' in screen) {
        let extra: ExtraReplyMessage = {
            parse_mode: 'HTML',
        }
        if ('buttons' in screen) {
            extra = {
                ...extra,
                ...Markup.inlineKeyboard(
                    screen.buttons.map((buttonRow) =>
                        buttonRow.map((buttonCol) =>
                            Markup.button.callback(
                                ctx.loc(buttonCol.text, ctx),
                                buttonCol.action
                            )
                        )
                    )
                ),
            }
        }
        await ctx.reply(ctx.loc(screen.text, ctx), extra)
    }

    if('video' in screen) {
        let extra: ExtraVideo = {}

        if('caption' in screen) {
            extra.caption = ctx.loc(screen.caption, ctx)
            extra.parse_mode = 'HTML'
        }
        if ('buttons' in screen) {
            // console.log({...})
            extra = {
                ...extra,
                ...Markup.inlineKeyboard(
                    screen.buttons.map((buttonRow) =>
                        buttonRow.map((buttonCol) =>
                            Markup.button.callback(
                                ctx.loc(buttonCol.text, ctx),
                                buttonCol.action
                            )
                        )
                    )
                ),
            }
        }
        await ctx.replyWithVideo({source: ctx.loc(screen.video, ctx)}, extra)
    }
    if('action' in screen) {
        const actionList = screen.action.split('\n')

        for await (const action of actionList) {
            const script = action.split(' ')

            if(script[0] === 'sleep') {
                await sleep(Number(script[1]))
                continue
            }
            if(script[0] === 'enter') {
                if(script[1] === 'scene') {
                    await ctx.scene.enter(script[2])
                    continue
                }
                if(script[1] === 'screen') {
                    await enterScreen(ctx, screens, script[2])
                    continue
                }
            }
        }
      
    }
}

export default enterScreen
