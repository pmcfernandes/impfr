import { Badge, Checkbox } from '../../ui/index.js'
import { SectionHeader, sectionClass } from './Row.jsx'

export default function VisibilitySection({ field, patch }) {
  return (
    <section className={sectionClass}>
      <SectionHeader
        title="Visibilidade"
        badge={
          <Badge color={field.visible !== false ? 'emerald' : 'red'}>
            {field.visible !== false ? 'Visível' : 'Oculto'}
          </Badge>
        }
      />
      <label className="flex cursor-pointer items-start gap-2 text-xs text-gray-700">
        <Checkbox
          className="mt-0.5"
          checked={field.visible !== false}
          onChange={(e) => patch({ visible: e.target.checked })}
        />
        <span>Campo visível</span>
      </label>
      <p className="text-xs text-gray-500">
        Campos ocultos não aparecem no formulário nem são submetidos.
      </p>
    </section>
  )
}
