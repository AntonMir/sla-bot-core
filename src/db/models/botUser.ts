import mongoose from 'mongoose';

export const BotUsers = mongoose.connection.collection('botUsers');

const userModel = new mongoose.Schema({
    _id: String,
    id: Number,
    data: Object,
    createDate: Date,
    bot: String,
    buyerRefer: String,
    buyerTag: String,
    subId: String,
    leadChannel: Boolean,
    leadChannelDate: Date,
    leadPm: Boolean,
    leadPmDate: Date,
    leadSale: Boolean,
    leadSaleDate: Date,
});

export const BotUser = mongoose.model('BotUser', userModel, 'botUsers', {
    connection: mongoose.connection,
});
