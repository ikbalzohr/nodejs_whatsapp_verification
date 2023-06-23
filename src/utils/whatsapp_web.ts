import { Client, LocalAuth } from 'whatsapp-web.js'
import qrcode from 'qrcode-terminal'
import { logger } from './logger'

export const client = new Client({
  authStrategy: new LocalAuth({ clientId: 'client-one' })
})

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true })
})

client.on('ready', () => {
  logger.info('Client is ready!')
})

client.on('message', (message) => {
  if (message.body === '/test') {
    console.log(message.from)
    void client.sendMessage(message.from, 'Bot is ready!')
  }
})

export const waInit = async (): Promise<void> => {
  await client.initialize()
}
