import { Checkbox } from '../../ui/index.js'
import { sectionClass, sectionTitle } from './Row.jsx'

export default function ReadOnlySection({ field, patch }) {
  return (
    <section className={sectionClass}>
      <h3 className={sectionTitle}>Leitura</h3>
      <label className="flex cursor-pointer items-start gap-2 text-xs text-gray-700">
        <Checkbox
          className="mt-0.5"
          checked={field.readOnly === true}
          onChange={(e) => patch({ readOnly: e.target.checked })}
        />
        <span>Apenas de leitura</span>
      </label>
      <p className="text-xs text-gray-500">
        Mostra o valor (ex.: valor por omissão) mas não permite editar no formulário.
      </p>
    </section>
  )
}
