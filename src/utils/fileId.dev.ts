import { StorageItem } from '@src/db/models/storageItems';
import path = require('path');
import { Message } from 'telegraf/types';

export class DevFileIdService {
    private botId: string;
    private storage: Record<string, any>;

    constructor(botObject: any) {
        this.botId = botObject._id;
        this.storage = {};
    }

    async getFileId(fileId: string) {
        if (this.storage[fileId]) return this.storage[fileId];
        return {
            source: path.join(process.cwd(), 'assets', fileId)
        };
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
