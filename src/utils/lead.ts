import { BotUser } from '@src/db/models/botUser';
import { TelegramChannel } from '@src/db/models/channel';
import { SmartLink } from '@src/db/models/smartLink';
import { BotContext } from '@src/ts/botContext';
import axios from 'axios';
import { logger } from './logger';

export const isLeadChannel = async (ctx: BotContext) => {
    const botUser = await BotUser.findOne({
        id: ctx.from.id,
        bot: ctx.botObject.id,
    });
    return botUser?.leadChannel;
};

export const leadBot = async (
    ctx: BotContext,
    smartLinkId: string,
    buyerTag = '',
    subId = ''
) => {
   
    // first, check if parseInt(smartLinkId) is not NaN
    if (!isNaN(parseInt(smartLinkId))) {
        const referrer = await BotUser.findOne({
            id: parseInt(smartLinkId),
            bot: ctx.botObject.id,
        });
        
        if (referrer) {
            await BotUser.updateOne(
                {
                    id: parseInt(smartLinkId),
                    bot: ctx.botObject.id,
                },
                {
                    $push: { 'data.invitedUsers': ctx.from.id },
                    $inc: {
                        'data.balance': parseInt(ctx.loc('rewardReferral', ctx)),
                    },
                }
            );
        }
    }
    await BotUser.updateOne(
        {
            id: ctx.from.id,
            bot: ctx.botObject.id,
        },
        {
            $set: {
                createDate: new Date(),
                buyerRefer: smartLinkId,
                buyerTag,
                subId,
                id: ctx.from.id,
                bot: ctx.botObject.id,
            },
        },
        {
            upsert: true
        }
    );
    if (!subId) return;
    try {
        const channel = await TelegramChannel.findById(ctx.botObject.channel);
        const buyerRefer = await SmartLink.findById(smartLinkId);
        const emojiRegex =
            /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])/g;
        const params = {
            extra_param_1: ctx.from.id,
            // extra_param_2: `${
            //     user.data.first_name?.replace(emojiRegex, '') || ''
            // } ${user.data.last_name?.replace(emojiRegex, '') || ''}`,
            extra_param_3: ctx.botObject.id,
            extra_param_4: ctx.botObject.username,
            sub_id_8: ctx.botObject.username,
            extra_param_5: channel._id,
            extra_param_6: channel.title.replace(emojiRegex, ''),
            sub_id_9: channel.title.replace(emojiRegex, ''),
            extra_param_7: smartLinkId,
            extra_param_8: buyerRefer.buyerName.replace(/[^а-яА-Я]/g, ''),
            sub_id_10: buyerRefer.buyerName.replace(/[^а-яА-Я]/g, ''),
        };
        const query = {
            subid: subId,
            ...params,
            lead_status: 'leadBot,leadChannel,leadDialog,cleverAffReg',
            status: 'leadBot',
        };
        return await axios.get(process.env.KEITARO_URL, { params: query });
    } catch (e) {
        logger.error(
            'failed to get channel or buyerRefer or send keitaro webhook: ' +
                e.message
        );
        return;
    }
};

export const leadChannel = async (ctx: BotContext) => {
    const botUser = await BotUser.findOne({
        id: ctx.from.id,
        bot: ctx.botObject.id,
    });
    await BotUser.updateOne(
        {
            id: ctx.from.id,
            bot: ctx.botObject.id,
        },
        {
            $set: { leadChannelDate: new Date(), leadChannel: true },
        }
    );
    if (botUser.subId) {
        try {
            const query = { subid: botUser.subId, status: 'leadChannel' };
            return await axios.get(process.env.KEITARO_URL, { params: query });
        } catch (e) {
            logger.error('failed to send keitaro webhook: ' + e.message);
            return;
        }
    }
};
