import { TelegramChannel } from "@src/db/models/channel";
import { BotContext } from "@src/ts/botContext";
import { logger } from "./logger";

export class ChannelObject {
    private _id: string;
    private channel: any;

    constructor(_id: string) {
        this._id = _id;
        this.fetchChannel();
        const interval = setInterval(() => {
            this.fetchChannel();
        }, 1000 * 60 * 5);
    }

    async fetchChannel(): Promise<void> {
        this.channel = await TelegramChannel.findById(this._id);
    }

    get title() {
        return this.channel?.title;
    }

    get link() {
        return this.channel?.link;
    }

    get telegramId() {
        return this.channel?.channelId;
    }

    async isSubscribed(ctx: BotContext) {
        const { id } = ctx.from;
        try {
            const res = await ctx.telegram.getChatMember(this.telegramId, id);
            return res.status !== 'left';
        } catch (e) {
            logger.error(e);
            return false;
        }
    }
}
