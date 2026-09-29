import { Badge, DateTimePicker } from '../../ui/index.js'
import { formAvailability } from '../../core/index.js'
import { rangeLabel } from '../../format.js'
import { Row, SectionHeader, sectionClass } from './Row.jsx'

export default function FormAvailabilitySection({ form, error, onChange }) {
  const availability = formAvailability(form)
  return (
    <section className={sectionClass}>
      <SectionHeader
        title="Disponibilidade"
        badge={
          availability.hasRange ? (
            <Badge color={availability.available ? 'emerald' : 'amber'}>
              {availability.available ? 'Disponível' : 'Indisponível'}
            </Badge>
          ) : null
        }
      />
      <div className="flex flex-col gap-2.5">
        <Row label="Disponível de" htmlFor="form-from">
          <DateTimePicker
            id="form-from"
            value={form.available_from || ''}
            defaultTime="00:00"
            placeholder="dd/mm/aaaa 00:00"
            onChange={(e) => onChange({ available_from: e.target.value })}
          />
        </Row>
        <Row label="Disponível até" htmlFor="form-to">
          <DateTimePicker
            id="form-to"
            value={form.available_to || ''}
            defaultTime="23:59"
            placeholder="dd/mm/aaaa 23:59"
            onChange={(e) => onChange({ available_to: e.target.value })}
          />
        </Row>
      </div>
      {error && <p className="text-xs font-medium text-red-600">{error}</p>}
      <p className="text-xs text-gray-500">
        Fora deste intervalo o formulário não aceita registos. Deixe vazio para manter sempre disponível.
        {availability.hasRange ? ` Atual: ${rangeLabel(form.available_from, form.available_to)}.` : ''}
      </p>
    </section>
  )
}
