import { Message } from 'telegraf/types';
import { StorageItem } from '../models/storageItems';

export class FileIdService {
    private botId: string;
    private storage: Record<string, any>;

    constructor(botObject: any) {
        this.botId = botObject._id;
        this.storage = {};
    }

    async getFileId(fileId: string) {
        if (this.storage[fileId]) return this.storage[fileId];
        const item = await StorageItem.findOne({ _id: fileId });
        if (!item)
            console.error('BotPlatform: FileIdService: File not found', {
                botId: this.botId,
            });
        if (!item.fileId || !item.fileId?.[this.botId]) {
            return {
                source: item.path,
            };
        } else {
            this.storage[fileId] = item.fileId[this.botId];
            return item.fileId[this.botId];
        }
    }

    // sentMessage is response of ctx.replyWithPhoto, ctx.replyWithVideo, ctx.replyWithDocument
    async callbackFunction(
        sentMessage: Message.VideoMessage | Message.PhotoMessage,
        fileId: string,
        typeOf: string
    ) {
        await StorageItem.updateOne(
            { _id: fileId },
            {
                $set: {
                    [`fileId.${this.botId}`]: sentMessage?.[typeOf]?.file_id,
                },
            }
        );
        this.storage[fileId] = sentMessage[typeOf].file_id;
    }
}
