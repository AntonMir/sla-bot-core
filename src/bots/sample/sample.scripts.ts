import { ISLAScript } from "@src/ts/ISLABot";

export const sampleScripts: ISLAScript[]  = [
    {
        id: 'video-watch-reward',
        text: `session videoCounter + 1\n` + 
            `session balance + 10\n` + 
            'delete\n' + 
            `enter screen 1.1.2`
    },
    {
        id: 'video-watch-conditional',
        text: 'if _watchedTime >= 3\n' 
            + 'run script video-watch-reward\n' 
            + 'enter popup 1.1.1',
    },
    {
        id: 'reward-subscribed-conditional',
        text: 'if _subscribed === true\n'
            + 'run script enter-screen-3.3\n' 
            + 'run script enter-screen-3.2',
    },
    {
        id: 'enter-screen-3.3',
        text: 'delete\n' 
            + `enter screen 3.3`
    },
    {
        id: 'enter-screen-3.2',
        text: 'delete\n' 
            + `enter screen 3.2`
    },
    {
        id: 'after-first-video-reward',
        text: 'sleep 2000\n'
            + `session balance + 10\n`
            + 'delete\n' 
            + 'enter screen 1.0'
    },
    {
        id: 'check-one-watched-video-conditional',
        text: 'if videoCounter === 1\n'
            + 'run script enter-screen-1.2\n' 
            + 'run script check-five-watched-video-conditional',
    },
    {
        id: 'check-five-watched-video-conditional',
        text: 'if videoCounter === 5\n'
            + 'run script enter-screen-1.3\n' 
            + 'run script enter-screen-video-no-delete',
    },
    {
        id: 'enter-screen-1.2',
        text: 'sleep 2000\n' 
            + `enter screen 1.2`
    },
    {
        id: 'enter-screen-1.3',
        text: 'sleep 2000\n' 
            + `enter screen 1.3`
    },
    {
        id: 'enter-screen-video-no-delete',
        text: 'sleep 2000\n' 
            + `enter screen 1.0`
    },
    {
        id: 'get_partner_reward_conditional',
        text: 'if _subscribed === true\n'
            + 'run script get_partner_reward\n' 
            + 'enter popup 2.3',
    },
    {
        id: 'get_partner_reward',
        text: `session balance + 100\n`
            + 'delete\n' 
            + `enter screen 2.4`
    },
    {
        id: 'check_valid_payout_sum_condition',
        text: 'if paymentSum > 0\n' 
            + 'run script check_500_payout_sum_condition\n'
            + 'run script invalid_payout_sum'
    },
    {
        id: 'check_500_payout_sum_condition',
        text: 'if balance < 500\n' 
            + 'run script low_payout_sum\n'
            + 'run script valid_payout_sum'
    },
    {
        id: 'valid_payout_sum',
        text: 'delete\n' + 'enter screen 4.2.5'
    },
    {
        id: 'low_payout_sum',
        text: 'delete\n' + 'enter screen 4.2.5.1'
    },
    {
        id: 'invalid_payout_sum',
        text: 'enter popup 4.2.4'
    },
]