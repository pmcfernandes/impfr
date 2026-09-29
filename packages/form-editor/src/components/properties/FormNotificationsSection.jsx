import { Input, Select } from '../../ui/index.js'
import { Row, sectionClass, sectionTitle } from './Row.jsx'

export default function FormNotificationsSection({ form, fields, errors, onChange }) {
  const hasEmail = fields.some((f) => f.type === 'email')
  return (
    <section className={sectionClass}>
      <h3 className={sectionTitle}>Notificações</h3>
      <Row
        label="Email de notificação"
        htmlFor="form-notify-email"
        error={errors.notify_email}
        hint="Quem recebe um aviso (com as respostas) a cada submissão. Vazio = sem notificação."
      >
        <Input
          id="form-notify-email"
          type="email"
          placeholder="chefia@exemplo.pt"
          value={form.notify_email || ''}
          onChange={(e) => onChange({ notify_email: e.target.value })}
        />
      </Row>
      <Row
        label="Campo email do utilizador"
        htmlFor="form-notify-field"
        error={errors.notify_field}
        hint="Campo usado para enviar ao utilizador a confirmação da submissão."
      >
        <Select
          id="form-notify-field"
          value={form.notify_field || ''}
          onChange={(e) => onChange({ notify_field: e.target.value })}
        >
          <option value="">— nenhum —</option>
          {fields
            .filter((f) => f.type === 'email')
            .map((f) => (
              <option key={f.id} value={f.name || ''}>
                {f.label} ({f.name})
              </option>
            ))}
        </Select>
      </Row>
      {!hasEmail && (
        <p className="text-xs text-gray-500">
          Adicione um campo Email ao formulário para poder notificar o utilizador.
        </p>
      )}
    </section>
  )
}
