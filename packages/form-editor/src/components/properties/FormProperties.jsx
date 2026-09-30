import { useLanguage } from '../../i18n/index.jsx'
import { Badge, Button, Checkbox, Input, Select, Textarea, cx } from '../../ui/index.js'
import { SectionHeader, sectionClass, sectionTitle, Row } from './Row.jsx'
import { formAvailability } from '../../core/index.js'
import { rangeLabel } from '../../format.js'

function ResizeHandle({ onResizeStart, onResizeKey }) {
  if (!onResizeStart) return null
  return (
    <div
      role="separator"
      aria-orientation="vertical"
      aria-label="Resize properties panel"
      tabIndex={0}
      className="absolute inset-y-0 left-0 hidden w-2 cursor-col-resize rounded-full transition hover:bg-blue-300/70 focus-visible:bg-blue-300/70 focus-visible:outline-none lg:block"
      onPointerDown={onResizeStart}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') { e.preventDefault(); onResizeKey(20) }
        else if (e.key === 'ArrowRight') { e.preventDefault(); onResizeKey(-20) }
      }}
    />
  )
}

export default function FormProperties({ form, fields, errors, onChangeForm, onResizeStart, onResizeKey }) {
  const { t } = useLanguage()
  const availability = formAvailability(form)

  return (
    <aside className="props relative flex min-h-0 flex-col gap-4 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 p-3.5 lg:overflow-y-auto">
      <ResizeHandle onResizeStart={onResizeStart} onResizeKey={onResizeKey} />
      <h2 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">{t('props.form')}</h2>

      <section className="props-section flex flex-col gap-2.5">
        <Row label={t('props.name')} htmlFor="form-name" error={errors.general.name} hint={form.slug ? t('props.slug', { slug: form.slug }) : undefined}>
          <Input id="form-name" value={form.name || ''} error={Boolean(errors.general.name)} onChange={(e) => onChangeForm({ name: e.target.value })} />
        </Row>
        <Row label={t('props.description')} htmlFor="form-desc">
          <Textarea id="form-desc" rows={3} placeholder={t('props.descriptionHint')} value={form.description || ''} onChange={(e) => onChangeForm({ description: e.target.value })} />
        </Row>
      </section>

      <section className={sectionClass}>
        <SectionHeader title={t('props.visibility')} badge={<Badge color={form.visible !== false ? 'emerald' : 'red'}>{form.visible !== false ? t('props.visible') : t('props.hidden')}</Badge>} />
        <label className="flex cursor-pointer items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
          <Checkbox id="form-visible" className="mt-0.5" checked={form.visible !== false} onChange={(e) => onChangeForm({ visible: e.target.checked })} />
          <span>{t('props.formVisible')}</span>
        </label>
        <p className="text-xs text-gray-500 dark:text-gray-400">{t('props.formVisibleHint')}</p>
      </section>

      <section className={sectionClass}>
        <SectionHeader
          title={t('props.availability')}
          badge={availability.hasRange ? <Badge color={availability.available ? 'emerald' : 'amber'}>{availability.available ? t('props.available') : t('props.unavailable')}</Badge> : null}
        />
        <div className="flex flex-col gap-2.5">
          <Row label={t('props.availableFrom')} htmlFor="form-from">
            <input id="form-from" type="datetime-local" className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-gray-900 dark:text-gray-50 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30" value={(form.available_from || '').replace(' ', 'T').slice(0, 16)} onChange={(e) => onChangeForm({ available_from: e.target.value ? e.target.value.replace('T', ' ') : '' })} />
          </Row>
          <Row label={t('props.availableTo')} htmlFor="form-to">
            <input id="form-to" type="datetime-local" className="w-full rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-950 px-3 py-2 text-sm text-gray-900 dark:text-gray-50 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30" value={(form.available_to || '').replace(' ', 'T').slice(0, 16)} onChange={(e) => onChangeForm({ available_to: e.target.value ? e.target.value.replace('T', ' ') : '' })} />
          </Row>
        </div>
        {errors.general.available_to && <p className="text-xs font-medium text-red-600 dark:text-red-400">{errors.general.available_to}</p>}
        <p className="text-xs text-gray-500 dark:text-gray-400">
          {t('props.availabilityHint')}
          {availability.hasRange ? t('props.availabilityCurrent', { range: rangeLabel(form.available_from, form.available_to) }) : ''}
        </p>
      </section>

      <section className={sectionClass}>
        <SectionHeader title={t('props.consent')} badge={<Badge color={form.consent_required ? 'emerald' : 'gray'}>{form.consent_required ? t('props.consentRequiredBadge') : t('props.consentOff')}</Badge>} />
        <label className="flex cursor-pointer items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
          <Checkbox id="form-consent" className="mt-0.5" checked={form.consent_required === true} onChange={(e) => onChangeForm({ consent_required: e.target.checked })} />
          <span>{t('props.consentRequiredLabel')}</span>
        </label>
        <Row label={t('props.consentText')} htmlFor="form-consent-text" error={errors.general.consent_text} hint={t('props.consentTextHint')}>
          <Textarea id="form-consent-text" rows={4} placeholder={t('props.consentTextPlaceholder')} value={form.consent_text || ''} onChange={(e) => onChangeForm({ consent_text: e.target.value })} />
        </Row>
        <Row label={t('props.privacyUrl')} htmlFor="form-privacy-url" error={errors.general.privacy_url} hint={t('props.privacyUrlHint')}>
          <Input id="form-privacy-url" placeholder="https://…" value={form.privacy_url || ''} onChange={(e) => onChangeForm({ privacy_url: e.target.value })} />
        </Row>
      </section>

      <section className={sectionClass}>
        <SectionHeader title={t('props.remote')} badge={<Badge color={form.remote_url ? 'blue' : 'gray'}>{form.remote_url ? t('props.remoteActive') : t('props.remoteOff')}</Badge>} />
        <Row label={t('props.remoteEndpoint')} htmlFor="form-remote-url" error={errors.general.remote_url} hint={t('props.remoteEndpointHint')}>
          <Input id="form-remote-url" placeholder="https://…" value={form.remote_url || ''} onChange={(e) => onChangeForm({ remote_url: e.target.value })} />
        </Row>
      </section>

      <section className={sectionClass}>
        <h3 className={sectionTitle}>{t('props.notifications')}</h3>
        <Row label={t('props.notifyEmail')} htmlFor="form-notify-email" error={errors.general.notify_email} hint={t('props.notifyEmailHint')}>
          <Input id="form-notify-email" type="email" value={form.notify_email || ''} onChange={(e) => onChangeForm({ notify_email: e.target.value })} />
        </Row>
        <Row label={t('props.notifyField')} htmlFor="form-notify-field" error={errors.general.notify_field} hint={t('props.notifyFieldHint')}>
          <Select id="form-notify-field" value={form.notify_field || ''} onChange={(e) => onChangeForm({ notify_field: e.target.value })}>
            <option value="">{t('props.notifyNone')}</option>
            {fields.filter((f) => f.type === 'email').map((f) => (
              <option key={f.id} value={f.name || ''}>{f.label} ({f.name})</option>
            ))}
          </Select>
        </Row>
        {!fields.some((f) => f.type === 'email') && <p className="text-xs text-gray-500 dark:text-gray-400">{t('props.notifyNoEmail')}</p>}
      </section>
    </aside>
  )
}
