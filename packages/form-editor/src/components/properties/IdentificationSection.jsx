import { Input, Textarea } from '../../ui/index.js'
import { Row, sectionClass, sectionTitle } from './Row.jsx'

export default function IdentificationSection({ field, isData, isHtml, isSteps, fieldError, patch }) {
  return (
    <section className="props-section flex flex-col gap-2.5">
      <h3 className={sectionTitle}>Identificação</h3>
      <Row
        label="Rótulo"
        htmlFor="prop-label"
        hint={isHtml || isSteps ? 'Apenas para identificar o bloco no editor.' : undefined}
      >
        <Input id="prop-label" value={field.label || ''} onChange={(e) => patch({ label: e.target.value })} />
      </Row>
      {isData && (
        <Row
          label="Nome interno"
          htmlFor="prop-name"
          error={fieldError}
          hint="Usado nos registos. Sem espaços nem acentos."
        >
          <Input
            id="prop-name"
            value={field.name || ''}
            error={Boolean(fieldError)}
            className="font-mono text-xs"
            onChange={(e) => patch({ name: e.target.value })}
          />
        </Row>
      )}
      {!isHtml && !isSteps && (
        <Row label="Texto de ajuda" htmlFor="prop-help">
          <Textarea
            id="prop-help"
            rows={2}
            placeholder="Instruções visíveis por baixo do campo"
            value={field.helpText || ''}
            onChange={(e) => patch({ helpText: e.target.value })}
          />
        </Row>
      )}
    </section>
  )
}
