import { Router } from 'express'
import { sendCodeVerification } from '../controller/whatsapp_controller'

export const WhatsAppRouter: Router = Router()

WhatsAppRouter.post('/', sendCodeVerification)
