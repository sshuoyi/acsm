'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { CheckCircle2, ArrowRight } from 'lucide-react'
import type { Dictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/config'

type Variant = 'join' | 'platform'

const inputClass =
  'w-full rounded-xl border border-hairline bg-ink/40 px-4 py-3 text-sm text-sand placeholder:text-sand-muted/60 outline-none transition-colors focus:border-gold/60 focus:ring-1 focus:ring-gold/40'

const typeKeys = [
  'chineseEnterprise',
  'mauritanianEnterprise',
  'financial',
  'school',
  'hospital',
  'government',
  'other',
] as const

export function JoinForm({
  dict,
  locale,
  variant,
  defaultRole,
}: {
  dict: Dictionary
  locale: Locale
  variant: Variant
  defaultRole?: string
}) {
  const f = dict.form
  const [submitted, setSubmitted] = useState(false)
  const [role, setRole] = useState(defaultRole ?? '')

  useEffect(() => {
    setRole(new URLSearchParams(window.location.search).get('role') ?? defaultRole ?? '')
  }, [defaultRole])
  const [errors, setErrors] = useState<Record<string, string>>({})

  const successTitle = dict.platformPage.successTitle
  const successMsg = dict.platformPage.success
  const submitLabel = variant === 'platform' ? dict.cta.requestAccess : dict.cta.submit

  const showContact = variant === 'join'
  const showPhone = variant === 'join'
  const showIntent = variant === 'join'

  function validate(form: HTMLFormElement) {
    const next: Record<string, string> = {}
    const data = new FormData(form)
    const requiredFields = ['org', 'country', 'type', 'sector', 'email', 'langPref']
    if (showContact) requiredFields.push('contact')

    for (const field of requiredFields) {
      const value = (data.get(field) as string | null)?.trim()
      if (!value) next[field] = f.errorRequired
    }
    const email = (data.get('email') as string | null)?.trim() ?? ''
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      next.email = f.errorEmail
    }
    return next
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const next = validate(e.currentTarget)
    setErrors(next)
    if (Object.keys(next).length === 0) {
      setSubmitted(true)
    } else {
      const firstError = Object.keys(next)[0]
      e.currentTarget.querySelector<HTMLElement>(`[name="${firstError}"]`)?.focus()
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-emerald/40 bg-emerald/10 p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full border border-emerald/50 text-emerald">
          <CheckCircle2 className="h-7 w-7" aria-hidden />
        </span>
        <h3 className="font-display text-xl font-medium text-sand">{successTitle}</h3>
        <p className="max-w-sm text-sm leading-relaxed text-sand-muted">{successMsg}</p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={f.org} name="org" error={errors.org} required requiredLabel={f.required}>
          <input id="org" name="org" type="text" className={inputClass} autoComplete="organization" />
        </Field>
        <Field label={f.country} name="country" error={errors.country} required requiredLabel={f.required}>
          <input id="country" name="country" type="text" className={inputClass} />
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={f.type} name="type" error={errors.type} required requiredLabel={f.required}>
          <select id="type" name="type" value={role}
            onChange={(e) => setRole(e.target.value)} className={inputClass}>
            <option value="" disabled>
              {f.selectPlaceholder}
            </option>
            {typeKeys.map((key) => (
              <option key={key} value={key}>
                {f.typeOptions[key]}
              </option>
            ))}
          </select>
        </Field>
        <Field label={f.sector} name="sector" error={errors.sector} required requiredLabel={f.required}>
          <input id="sector" name="sector" type="text" className={inputClass} />
        </Field>
      </div>

      {showContact ? (
        <div className="grid gap-5 sm:grid-cols-2">
          <Field label={f.contact} name="contact" error={errors.contact} required requiredLabel={f.required}>
            <input id="contact" name="contact" type="text" className={inputClass} autoComplete="name" />
          </Field>
          <Field label={f.email} name="email" error={errors.email} required requiredLabel={f.required}>
            <input id="email" name="email" type="email" className={inputClass} autoComplete="email" />
          </Field>
        </div>
      ) : (
        <Field label={f.email} name="email" error={errors.email} required requiredLabel={f.required}>
          <input id="email" name="email" type="email" className={inputClass} autoComplete="email" />
        </Field>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {showPhone ? (
          <Field label={f.phone} name="phone">
            <input id="phone" name="phone" type="tel" className={inputClass} autoComplete="tel" />
          </Field>
        ) : null}
        <Field label={f.langPref} name="langPref" error={errors.langPref} required requiredLabel={f.required}>
          <select id="langPref" name="langPref" defaultValue={locale} className={inputClass}>
            <option value="zh">{f.langOptions.zh}</option>
            <option value="en">{f.langOptions.en}</option>
            <option value="fr">{f.langOptions.fr}</option>
            <option value="ar">{f.langOptions.ar}</option>
          </select>
        </Field>
      </div>

      {showIntent ? (
        <Field label={f.intent} name="intent">
          <textarea
            id="intent"
            name="intent"
            rows={4}
            placeholder={f.intentPlaceholder}
            className={`${inputClass} resize-none`}
          />
        </Field>
      ) : null}

      <button
        type="submit"
        className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:bg-gold-soft sm:w-auto"
      >
        {submitLabel}
        <ArrowRight className="h-4 w-4 rtl:-scale-x-100" aria-hidden />
      </button>
    </form>
  )
}

function Field({
  label,
  name,
  error,
  required,
  requiredLabel,
  children,
}: {
  label: string
  name: string
  error?: string
  required?: boolean
  requiredLabel?: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="flex items-center gap-2 text-sm text-sand">
        {label}
        {required ? (
          <span className="text-[10px] uppercase tracking-wide text-gold/70">{requiredLabel}</span>
        ) : null}
      </label>
      {children}
      {error ? (
        <span role="alert" className="text-xs text-[#d98a8a]">
          {error}
        </span>
      ) : null}
    </div>
  )
}
