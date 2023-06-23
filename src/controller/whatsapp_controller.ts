import { type Request, type Response } from 'express'
import { logger } from '../utils/logger'
import { client } from '../utils/whatsapp_web'
import { verifyCodeValidation } from '../validation/whatsapp_validation'

export const sendCodeVerification = async (req: Request, res: Response): Promise<any> => {
  const { error, value } = verifyCodeValidation(req.body)
  if (error) {
    logger.error(`WhatsApp - Send Code = ${error.details[0].message}`)
    return res.status(422).send({ status: false, statusCode: 422, message: error.details[0].message })
  }
  const confirmationCode = Math.floor(100000 + Math.random() * 900000)
  try {
    const response = await client.sendMessage(
      `62${value.phone}@c.us`,
      `Kode konfirmasi Aplikasi Anda adalah: ${confirmationCode}`
    )
    // format phone: 85312341234t
    // save confirmationCode into your database and confirm wiht another your endpoint
    //
    logger.info(`WhatsApp - Send Code = Pesan terkirim: ${response.body}`)
    return res.status(200).send({
      status: true,
      statusCode: 200,
      message: 'Pesan verifikasi telah dikirim ke nomor WhatsApp Anda.',
      data: { chat: response.body, code: confirmationCode }
    })
  } catch (error) {
    logger.error(`WhatsApp - Send Code = Gagal mengirim pesan: ${error}`)
    return res.status(422).send({ status: false, statusCode: 422, message: `${error}` })
  }
}
