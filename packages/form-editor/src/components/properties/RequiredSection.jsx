import { Badge, Checkbox, cx } from '../../ui/index.js'
import ConditionEditor from '../ConditionEditor.jsx'
import { SectionHeader, sectionClass, sectionTitle } from './Row.jsx'

export default function RequiredSection({ field, fields, patch }) {
  const condRequired = Boolean(field.requiredCondition && field.requiredCondition.enabled)

  return (
    <>
      <section className={sectionClass}>
        <SectionHeader
          title="Obrigatoriedade"
          badge={
            <Badge color={condRequired || field.required ? 'red' : 'gray'}>
              {condRequired ? 'Condicional' : field.required ? 'Obrigatório' : 'Opcional'}
            </Badge>
          }
        />
        <label
          className={cx(
            'flex items-start gap-2 text-xs text-gray-700',
            condRequired ? 'opacity-60' : 'cursor-pointer'
          )}
        >
          <Checkbox
            className="mt-0.5"
            checked={field.required === true}
            disabled={condRequired}
            onChange={(e) => patch({ required: e.target.checked })}
          />
          <span>
            Campo obrigatório
            {condRequired && <span className="block text-gray-500">Gerido pela condição abaixo.</span>}
          </span>
        </label>
        <p className="text-xs text-gray-500">
          Tem de ser preenchido para o registo ser submetido.
        </p>
      </section>
      <ConditionEditor
        title="Condição de obrigatoriedade"
        toggleLabel="Tornar o campo obrigatório apenas quando a condição for cumprida"
        condition={field.requiredCondition}
        fields={fields}
        fieldId={field.id}
        onChange={(requiredCondition) => patch({ requiredCondition })}
      />
    </>
  )
}
