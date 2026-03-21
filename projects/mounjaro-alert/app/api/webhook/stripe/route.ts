import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import nodemailer from 'nodemailer'
import { Resend } from 'resend'

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const RESEND_API_KEY = process.env.RESEND_API_KEY
const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null

async function sendEmailWithResend(to: string, downloadUrl: string) {
  if (!resend) throw new Error('Resend not configured')
  await resend.emails.send({
    from: 'Mounjaro Alert <suporte@mounjaro-alert.com.br>',
    to,
    subject: '🎉 Seu acesso ao Mounjaro Alert está liberado!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #111; color: #fff;">
        <h1 style="color: #D4AF37; text-align: center;">OBRIGADO PELA COMPRA!</h1>
        <p>Seu pagamento foi confirmado. Agora você tem acesso imediato ao <strong>Mounjaro Alert</strong>.</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${downloadUrl}" style="background: linear-gradient(to right, #D4AF37, #C5A028); color: #000; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block;">
            📥 BAIXAR AGORA O PDF
          </a>
        </p>
        <p>Caso o botão não funcione, copie e cole este link no navegador:</p>
        <p style="word-break: break-all; color: #aaa;">${downloadUrl}</p>
        <hr style="border-color: #333; margin: 30px 0;" />
        <p style="font-size: 12px; color: #666;">Este e-mail foi enviado automaticamente. Não responda a esta mensagem.</p>
      </div>
    `,
  })
}

async function sendEmailWithNodemailer(to: string, downloadUrl: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  })

  await transporter.sendMail({
    from: `"Mounjaro Alert" <${process.env.GMAIL_USER}>`,
    to,
    subject: '🎉 Seu acesso ao Mounjaro Alert está liberado!',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #111; color: #fff;">
        <h1 style="color: #D4AF37; text-align: center;">OBRIGADO PELA COMPRA!</h1>
        <p>Seu pagamento foi confirmado. Agora você tem acesso imediato ao <strong>Mounjaro Alert</strong>.</p>
        <p style="text-align: center; margin: 30px 0;">
          <a href="${downloadUrl}" style="background: linear-gradient(to right, #D4AF37, #C5A028); color: #000; padding: 15px 30px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block;">
            📥 BAIXAR AGORA O PDF
          </a>
        </p>
        <p>Caso o botão não funcione, copie e cole este link no navegador:</p>
        <p style="word-break: break-all; color: #aaa;">${downloadUrl}</p>
        <hr style="border-color: #333; margin: 30px 0;" />
        <p style="font-size: 12px; color: #666;">Este e-mail foi enviado automaticamente. Não responda a esta mensagem.</p>
      </div>
    `,
  })
}

export async function POST(request: Request) {
  const body = await request.text()
  const signature = request.headers.get('stripe-signature') || ''
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  let event

  try {
    if (webhookSecret) {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } else {
      // Development mode: parse without verification
      console.log('⚠️  No STRIPE_WEBHOOK_SECRET set, parsing event without verification')
      event = JSON.parse(body)
    }
  } catch (err: any) {
    console.error('❌ Webhook signature verification failed:', err.message)
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    )
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as any

      console.log('✅ Payment completed for session:', session.id)
      console.log('📧 Customer email:', session.customer_details?.email || session.customer_email)

      // Build download URL
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL || 'https://mounjaro-alert.vercel.app'
      const downloadUrl = `${appUrl}/api/download/${session.id}`

      // Send email
      try {
        const email = session.customer_details?.email || session.customer_email
        if (email) {
          if (resend) {
            await sendEmailWithResend(email, downloadUrl)
            console.log('📨 Email sent via Resend to', email)
          } else {
            await sendEmailWithNodemailer(email, downloadUrl)
            console.log('📨 Email sent via Nodemailer to', email)
          }
        } else {
          console.warn('⚠️ No customer email found for session', session.id)
        }
      } catch (emailErr: any) {
        console.error('❌ Email sending failed:', emailErr.message)
        // Don't fail the webhook because of email error
      }

      // Optionally, you could mark session as sent in DB to avoid resending

      break

    case 'checkout.session.expired':
      const expiredSession = event.data.object as any
      console.log('❌ Session expired:', expiredSession.id)
      break

    default:
      console.log(`Unhandled event type ${event.type}`)
  }

  return NextResponse.json({ received: true })
}
