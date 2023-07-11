import { PushesLike } from "@src/ts/ISLABot";

export const samplePushes: PushesLike[] = [
    {
        id: '5.0',
        text: 'push_html',
        timer: 1,
        buttons: [
            [
                {
                    text: 'push_sub_btn',
                    action: 'channel'
                }
            ],
            [
                {
                    text: 'back_btn',
                    action: 'delete\n' + 'enter scene mainMenu',
                },
            ],
        ]
    }
]