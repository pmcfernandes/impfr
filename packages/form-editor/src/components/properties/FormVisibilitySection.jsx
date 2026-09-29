import { Badge, Checkbox } from '../../ui/index.js'
import { SectionHeader, sectionClass } from './Row.jsx'

export default function FormVisibilitySection({ form, onChange }) {
  return (
    <section className={sectionClass}>
      <SectionHeader
        title="Visibilidade"
        badge={
          <Badge color={form.visible !== false ? 'emerald' : 'red'}>
            {form.visible !== false ? 'Visível' : 'Oculto'}
          </Badge>
        }
      />
      <label className="flex cursor-pointer items-start gap-2 text-xs text-gray-700">
        <Checkbox
          id="form-visible"
          className="mt-0.5"
          checked={form.visible !== false}
          onChange={(e) => onChange({ visible: e.target.checked })}
        />
        <span>Formulário visível</span>
      </label>
      <p className="text-xs text-gray-500">
        Quando oculto, ninguém pode preencher nem submeter registos.
      </p>
    </section>
  )
}
