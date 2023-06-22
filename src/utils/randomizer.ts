import { BotContext } from "@src/context/botContext";
import { ISLABot } from "@src/interfaces/ISLABot";

class Randomizer {

    array(ctx: BotContext, bot: ISLABot, mediaList: string[]): string | null {
        if (!mediaList || !mediaList.length) {
            console.error('arrRandomizer: List is empty')
            return null
        }
        const filteredEl = mediaList.filter(
            (el: string) => !bot.session.watched.includes(el)
        );
        if (!filteredEl || !filteredEl.length) {
            console.error('arrRandomizer: Unwatched elements left')
            return null
        }
        const randomEl = filteredEl[Math.floor(Math.random() * filteredEl.length)];

        // ctx.session.watched.push(randomEl);
        // TODO: прокинуть название локализации медиа элементов
        ctx.session[`_watched-${'video'}`].push(randomEl);
        return randomEl
    }

}

export default new Randomizer()
