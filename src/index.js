"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const wechaty_1 = require("wechaty");
const QrcodeTerminal = require('qrcode-terminal');
const bot = wechaty_1.Wechaty.instance({ profile: wechaty_1.config.DEFAULT_PROFILE });
bot
    .on('login', function (user) {
    wechaty_1.log.info('Bot', `${user.name()} logined`);
})
    .on('logout', user => wechaty_1.log.info('Bot', `${user.name()} logouted`))
    .on('error', e => wechaty_1.log.info('Bot', 'error: %s', e))
    .on('scan', (url, code) => {
    if (!/201|200/.test(String(code))) {
        const loginUrl = url.replace(/\/qrcode\//, '/l/');
        QrcodeTerminal.generate(loginUrl);
    }
    console.log(`${url}\n[${code}] Scan QR Code in above url to login: `);
})
    .on('friend', (contact, request) => __awaiter(this, void 0, void 0, function* () {
    let logMsg;
    const fileHelper = wechaty_1.Contact.load('filehelper');
    try {
        logMsg = 'received `friend` event from ' + contact.get('name');
        fileHelper.say(logMsg);
        console.log(logMsg);
        if (request) {
            /**
             *
             * 1. New Friend Request
             *
             * when request is set, we can get verify message from `request.hello`,
             * and accept this request by `request.accept()`
             */
            if (request.hello === 'ding') {
                logMsg = 'accepted because verify messsage is "ding"';
                request.accept();
            }
            else {
                logMsg = 'not auto accepted, because verify message is: ' + request.hello;
            }
        }
        else {
            /**
             *
             * 2. Friend Ship Confirmed
             *
             */
            logMsg = 'friend ship confirmed with ' + contact.get('name');
        }
    }
    catch (e) {
        logMsg = e.message;
    }
    console.log(logMsg);
    fileHelper.say(logMsg);
}))
    .on('message', (message) => __awaiter(this, void 0, void 0, function* () {
    const room = message.room();
    const sender = message.from();
    const content = message.content();
    if (room != null)
        room.say(sender.name() + "念了两句诗");
}))
    .on('room-join', (room, inviteeList, inviter) => {
    const nameList = inviteeList.map(c => c.name()).join(',');
    console.log(`Room ${room.topic()} got new member ${nameList}, invited by ${inviter}`);
});
bot.init()
    .catch(e => {
    wechaty_1.log.error('Bot', 'init() fail: %s', e);
    bot.quit();
    process.exit(-1);
});
