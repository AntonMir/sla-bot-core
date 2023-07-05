import { BotContext } from "@src/ts/botContext";
import { ISLABot, ISLALocale } from "@src/ts/ISLABot";

class MediaParser {

    /**
     * 
     * @param {BotContext} ctx 
     * @param {ISLABot} bot 
     * @param {string} listId - id списка медиа элементов в локализации 
     * @returns 
     */
    getFileName(bot: ISLABot, listId: string): string {
        try {
            const locale: ISLALocale = bot.locale.find((el) => el.id === listId)
            const content: string[] | string = locale.content || locale.contentArr

            if (!content || !content.length) {
                console.error('arrRandomizer: Content is empty')
                return listId
            }

            if(typeof content === 'string') {
                return content
            }

            if(bot.session[`_watched-${listId}`] === undefined) {
                bot.session[`_watched-${listId}`] = []
            }

            const filteredEl = content.filter(
                (el: string) => !bot.session[`_watched-${listId}`].includes(el)
            );

            // Отдаем случайный элемент массива
            const randomEl = filteredEl[Math.floor(Math.random() * filteredEl.length)];
            
            // save watched element to session
            bot.session[`_watched-${listId}`].push(randomEl);

            return randomEl
           
        } catch(e) {
            console.error('Randomizer array Error>>>', e)
        }
    }

}

export default new MediaParser()
