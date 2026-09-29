import { Input, Textarea } from '../../ui/index.js'
import { Row } from './Row.jsx'

export default function FormNameSection({ form, error, onChange }) {
  return (
    <section className="props-section flex flex-col gap-2.5">
      <Row label="Nome" htmlFor="form-name" error={error} hint={form.slug ? `Slug: ${form.slug}` : undefined}>
        <Input
          id="form-name"
          value={form.name || ''}
          error={Boolean(error)}
          onChange={(e) => onChange({ name: e.target.value })}
        />
      </Row>
      <Row label="Descrição" htmlFor="form-desc">
        <Textarea
          id="form-desc"
          rows={3}
          placeholder="Para que serve este formulário?"
          value={form.description || ''}
          onChange={(e) => onChange({ description: e.target.value })}
        />
      </Row>
    </section>
  )
}
