import { Badge, Input } from '../../ui/index.js'
import { Row, SectionHeader, sectionClass } from './Row.jsx'

export default function FormRemoteSection({ form, error, onChange }) {
  return (
    <section className={sectionClass}>
      <SectionHeader
        title="Submissão remota"
        badge={
          <Badge color={form.remote_url ? 'blue' : 'gray'}>
            {form.remote_url ? 'Activa' : 'Desligada'}
          </Badge>
        }
      />
      <Row
        label="Endpoint (POST)"
        htmlFor="form-remote-url"
        error={error}
        hint="Recebe um POST com JSON { data: … }."
      >
        <Input
          id="form-remote-url"
          placeholder="https://exemplo.pt/webhook"
          value={form.remote_url || ''}
          onChange={(e) => onChange({ remote_url: e.target.value })}
        />
      </Row>
    </section>
  )
}
