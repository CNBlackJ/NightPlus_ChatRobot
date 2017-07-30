import {
  config,
  Contact,
  log,
  Wechaty,
} from 'wechaty'
import {
  Verifier
} from './biz/MyRequest'
const QrcodeTerminal = require('qrcode-terminal')

const bot = Wechaty.instance({ profile: config.DEFAULT_PROFILE })
const requestVerifier = new Verifier()

bot
  .on('login', function (user) {
    log.info('Bot', `${user.name()} logined`)
  }
  )
  .on('logout', user => log.info('Bot', `${user.name()} logouted`))
  .on('error', e => log.info('Bot', 'error: %s', e))
  .on('scan', (url, code) => {
    if (!/201|200/.test(String(code))) {
      const loginUrl = url.replace(/\/qrcode\//, '/l/')
      QrcodeTerminal.generate(loginUrl)
    }
    console.log(`${url}\n[${code}] Scan QR Code in above url to login: `)
  })
  /**
   *
   * Wechaty Event: `friend`
   *
   */
  .on('friend', async (contact, request) => {
    let logMsg
    const fileHelper = Contact.load('filehelper')

    logMsg = 'received `friend` event from ' + contact.get('name')

    fileHelper.say(logMsg)
    console.log(logMsg)

    let from = requestVerifier.acceptOrDeny(request)
    console.log(from)

  })
  .on('message', async (message) => {
    const room = message.room()
    const sender = message.from()
    const content = message.content()
    if (room != null)
      room.say(sender.name() + "念了两句诗")
  })
  .on('room-join', (room, inviteeList, inviter) => {
    const nameList = inviteeList.map(c => c.name()).join(',')
    console.log(`Room ${room.topic()} got new member ${nameList}, invited by ${inviter}`)
  })

bot.init()
  .catch(e => {
    log.error('Bot', 'init() fail: %s', e)
    bot.quit()
    process.exit(-1)
  })

