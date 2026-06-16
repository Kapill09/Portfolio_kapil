'use client'

import { FormEvent, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Loader2, XCircle } from 'lucide-react'
import { Container } from '@/components/layout/Container'
import styles from './Contact.module.css'

type ContactFormValues = {
  name: string
  email: string
  phone: string
  message: string
}

type ToastState = {
  type: 'success' | 'error'
  message: string
} | null

type InputFieldProps = {
  id: keyof Pick<ContactFormValues, 'name' | 'email' | 'phone'>
  label: string
  type?: 'text' | 'email' | 'tel'
  value: string
  onChange: (value: string) => void
}

type TextAreaFieldProps = {
  value: string
  onChange: (value: string) => void
}

const initialFormValues: ContactFormValues = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

const emailJsConfig = {
  serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
  templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
  publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY,
}

export function Contact() {
  return <ContactSection />
}

export function ContactSection() {
  return (
    <section
      id="contact"
      className={styles.section}
    >
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 34 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className={styles.shell}
        >
          <div className={styles.header}>
            <h2 className={styles.title}>
              Say hello
            </h2>
            <p className={styles.subtitle}>
              Not into meetings? Leave me a message below, and I'll shoot you an
              email in no time!
            </p>
          </div>

          <ContactForm />
        </motion.div>
      </Container>
    </section>
  )
}

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(initialFormValues)
  const [toast, setToast] = useState<ToastState>(null)
  const [isSending, setIsSending] = useState(false)

  const updateValue = (field: keyof ContactFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
  }

  const showToast = (nextToast: ToastState) => {
    setToast(nextToast)
    window.setTimeout(() => setToast(null), 4200)
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!emailJsConfig.serviceId || !emailJsConfig.templateId || !emailJsConfig.publicKey) {
      showToast({
        type: 'error',
        message: 'EmailJS is missing its public environment variables.',
      })
      return
    }

    setIsSending(true)

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: emailJsConfig.serviceId,
          template_id: emailJsConfig.templateId,
          user_id: emailJsConfig.publicKey,
          template_params: {
            from_name: values.name,
            from_email: values.email,
            phone_number: values.phone,
            message: values.message,
          },
        }),
      })

      if (!response.ok) {
        throw new Error('EmailJS request failed')
      }

      setValues(initialFormValues)
      showToast({
        type: 'success',
        message: 'Message sent. I will get back to you soon.',
      })
    } catch {
      showToast({
        type: 'error',
        message: 'Could not send the message. Please try again.',
      })
    } finally {
      setIsSending(false)
    }
  }

  return (
    <div className={styles.formWrap}>
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            className={`${styles.toast} ${
              toast.type === 'success' ? styles.toastSuccess : styles.toastError
            }`}
            role="status"
          >
            {toast.type === 'success' ? (
              <CheckCircle2 className={styles.toastIcon} />
            ) : (
              <XCircle className={styles.toastIcon} />
            )}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      <form
        onSubmit={handleSubmit}
        className={styles.postcard}
      >
        <div
          className={styles.divider}
          aria-hidden="true"
        />

        <TextAreaField
          value={values.message}
          onChange={(value) => updateValue('message', value)}
        />

        <div className={styles.rightColumn}>
          <div className={styles.stampSlot}>
            <StampPhoto />
          </div>

          <div className={styles.fields}>
            <InputField
              id="name"
              label="Name"
              value={values.name}
              onChange={(value) => updateValue('name', value)}
            />
            <InputField
              id="email"
              label="Email"
              type="email"
              value={values.email}
              onChange={(value) => updateValue('email', value)}
            />
            <InputField
              id="phone"
              label="Phone Number"
              type="tel"
              value={values.phone}
              onChange={(value) => updateValue('phone', value)}
            />

            <motion.button
              type="submit"
              disabled={isSending}
              whileHover={{ y: -2, scale: 1.01 }}
              whileTap={{ y: 1, scale: 0.985 }}
              transition={{ type: 'spring', stiffness: 360, damping: 24 }}
              className={styles.sendButton}
            >
              {isSending && <Loader2 className={styles.spinner} />}
              Send
            </motion.button>
          </div>
        </div>
      </form>
    </div>
  )
}

export function StampPhoto() {
  const [hasImage, setHasImage] = useState(true)

  return (
    <motion.div
      animate={{ y: [0, -7, 0], rotate: [-1.2, 1.2, -1.2] }}
      transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut' }}
      className={styles.stamp}
      aria-label="Kapil Meena postage stamp"
    >
      <div
        className={styles.stampPaper}
        style={{
          WebkitMask:
            'radial-gradient(circle at 6px 6px, transparent 5px, #000 5.5px) -6px -6px / 18px 18px',
          mask:
            'radial-gradient(circle at 6px 6px, transparent 5px, #000 5.5px) -6px -6px / 18px 18px',
        }}
      />
      <div className={styles.stampFrame}>
        <div className={styles.stampImageWrap}>
          {hasImage ? (
            <img
              src="/images/profile/avatar.svg"
              alt="Kapil Meena"
              onError={() => setHasImage(false)}
              className={styles.stampImage}
            />
          ) : (
            <div className={styles.stampFallback}>
              <div className={styles.stampFallbackHead} />
              <div className={styles.stampFallbackText}>
                KM
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export function InputField({
  id,
  label,
  type = 'text',
  value,
  onChange,
}: InputFieldProps) {
  return (
    <label className={styles.fieldLabel} htmlFor={id}>
      <span className={styles.srOnly}>{label}</span>
      <motion.input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        whileFocus={{ scale: 1.012 }}
        required={id !== 'phone'}
        placeholder={label}
        className={styles.input}
      />
    </label>
  )
}

export function TextAreaField({ value, onChange }: TextAreaFieldProps) {
  return (
    <label className={styles.textareaLabel} htmlFor="message">
      <span className={styles.srOnly}>Message</span>
      <motion.textarea
        id="message"
        name="message"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        whileFocus={{ scale: 1.006 }}
        required
        placeholder={'Tell me about your project...\nOr just say hello'}
        className={styles.textarea}
      />
    </label>
  )
}
