import { Badge, Checkbox, Input, Textarea } from '../../ui/index.js'
import { Row, SectionHeader, sectionClass } from './Row.jsx'

export default function FormConsentSection({ form, errors, onChange }) {
  return (
    <section className={sectionClass}>
      <SectionHeader
        title="Consentimento RGPD"
        badge={
          <Badge color={form.consent_required ? 'emerald' : 'gray'}>
            {form.consent_required ? 'Obrigatório' : 'Desligado'}
          </Badge>
        }
      />
      <label className="flex cursor-pointer items-start gap-2 text-xs text-gray-700 dark:text-gray-300">
        <Checkbox
          id="form-consent"
          className="mt-0.5"
          checked={form.consent_required === true}
          onChange={(e) => onChange({ consent_required: e.target.checked })}
        />
        <span>Exigir consentimento antes de submeter</span>
      </label>
      <Row
        label="Texto do aviso"
        htmlFor="form-consent-text"
        error={errors.consent_text}
        hint="É mostrado junto ao botão de submissão e fica guardado com cada registo como prova do consentimento."
      >
        <Textarea
          id="form-consent-text"
          rows={4}
          placeholder="Declaro que li e aceito o tratamento dos meus dados pessoais descrito na política de privacidade."
          value={form.consent_text || ''}
          onChange={(e) => onChange({ consent_text: e.target.value })}
        />
      </Row>
      <Row
        label="Política de privacidade (opcional)"
        htmlFor="form-privacy-url"
        error={errors.privacy_url}
        hint="Ligação apresentada no aviso de consentimento."
      >
        <Input
          id="form-privacy-url"
          placeholder="https://exemplo.pt/privacidade"
          value={form.privacy_url || ''}
          onChange={(e) => onChange({ privacy_url: e.target.value })}
        />
      </Row>
    </section>
  )
}
