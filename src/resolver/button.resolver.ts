import { BotContext } from "@src/ts/botContext"
import { ISLAButton, ScreenLike } from "@src/ts/ISLABot"
import { Markup } from "telegraf"

/**
 * Отрисовать один из экранов доступных в текущей сцене
 * @param {BotContext} ctx BotContext
 * @param {ScreenLike} screen текущий экран
 */
const buttonResolver = (
    ctx: BotContext,
    screen: ScreenLike,
) => {
    return {
        inline_keyboard: screen.buttons.map((buttonRow) => {
            return buttonRow.map((buttonCol) => {
                return buttonPainter(ctx, buttonCol)
            })
        })
    }
}

const buttonPainter = (
    ctx: BotContext, 
    buttonCol: ISLAButton
) => {
    if(buttonCol.action === 'referral') {
        return Markup.button.switchToChat(
            ctx.loc(buttonCol.text, ctx),
            `https://t.me/${ctx.botInfo.username}?start=${ctx.from.id}`
        )
    }
    return Markup.button.callback(
        ctx.loc(buttonCol.text, ctx),
        buttonCol.action
    )
}

export default buttonResolver