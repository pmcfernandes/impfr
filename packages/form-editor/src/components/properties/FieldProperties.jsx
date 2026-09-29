import { isDataType, typeMeta } from '../../core/index.js'
import { useLanguage } from '../../i18n/index.jsx'
import { Button } from '../../ui/index.js'
import ConditionEditor from '../ConditionEditor.jsx'
import { ResizeHandle } from './ResizeHandle.jsx'
import { sectionClass, sectionTitle, Row, SectionHeader } from './Row.jsx'
import { Badge, Checkbox, cx, Input, Textarea } from '../../ui/index.js'
import ContentSection from './ContentSection.jsx'
import FileSection from './FileSection.jsx'
import OptionsSection from './OptionsSection.jsx'
import DimensionSection from './DimensionSection.jsx'
import NumberLimitsSection from './NumberLimitsSection.jsx'
import PatternSection from './PatternSection.jsx'
import LayoutSection from './LayoutSection.jsx'
import HtmlSection from './HtmlSection.jsx'
import StepsSection from './StepsSection.jsx'

const PATTERN_TYPES = ['text', 'textarea', 'email', 'number', 'date', 'select', 'radio']
const OPTIONS_TYPES = ['select', 'radio', 'checkboxgroup']

export default function FieldProperties({
  field, fields, errors, onChangeField, onDuplicate, onDelete,
  onResizeStart, onResizeKey, onFetchSource, HtmlEditor, tinymceBaseUrl,
}) {
  const { t } = useLanguage()
  const meta = typeMeta(field.type)
  const data = isDataType(field.type)
  const isHtml = field.type === 'html'
  const isSteps = field.type === 'steps'
  const fieldError = errors.byId[field.id]
  const fieldIndex = fields.indexOf(field)
  const patch = (part) => onChangeField({ ...field, ...part })
  const patternError = errors.general[`fields.${fieldIndex}.pattern`]
  const condRequired = Boolean(field.requiredCondition && field.requiredCondition.enabled)

  return (
    <aside className="props relative flex min-h-0 flex-col gap-4 rounded-lg border border-gray-200 bg-white p-3.5 lg:overflow-y-auto">
      <ResizeHandle onResizeStart={onResizeStart} onResizeKey={onResizeKey} />

      <div className="props-head flex items-center justify-between gap-2">
        <span className="inline-flex h-6 items-center rounded-md bg-blue-50 px-2 text-[11px] font-bold text-blue-700">
          {t(`fields.${field.type}`)}
        </span>
        <div className="props-head-actions flex gap-1">
          <Button size="sm" variant="ghost" onClick={() => onDuplicate(field.id)}>{t('common.duplicate')}</Button>
          <Button size="sm" variant="dangerGhost" onClick={() => onDelete(field.id)}>{t('common.delete')}</Button>
        </div>
      </div>

      <section className="props-section flex flex-col gap-2.5">
        <h3 className={sectionTitle}>{t('field.identification')}</h3>
        <Row label={t('field.label')} htmlFor="prop-label" hint={isHtml || isSteps ? t('field.labelHintStatic') : undefined}>
          <Input id="prop-label" value={field.label || ''} onChange={(e) => patch({ label: e.target.value })} />
        </Row>
        {data && (
          <Row label={t('field.name')} htmlFor="prop-name" error={fieldError} hint={t('field.nameHint')}>
            <Input id="prop-name" value={field.name || ''} error={Boolean(fieldError)} className="font-mono text-xs" onChange={(e) => patch({ name: e.target.value })} />
          </Row>
        )}
        {!isHtml && !isSteps && (
          <Row label={t('field.helpText')} htmlFor="prop-help">
            <Textarea id="prop-help" rows={2} placeholder={t('field.helpTextHint')} value={field.helpText || ''} onChange={(e) => patch({ helpText: e.target.value })} />
          </Row>
        )}
      </section>

      {data && <ContentSection field={field} patch={patch} />}
      {data && field.type === 'file' && <FileSection field={field} patch={patch} />}
      {data && OPTIONS_TYPES.includes(field.type) && <OptionsSection field={field} patch={patch} onFetchSource={onFetchSource} />}
      {data && field.type === 'textarea' && <DimensionSection field={field} patch={patch} />}
      {data && field.type === 'number' && <NumberLimitsSection field={field} patch={patch} />}
      {PATTERN_TYPES.includes(field.type) && <PatternSection field={field} patternError={patternError} patch={patch} />}
      {data && <LayoutSection field={field} patch={patch} />}

      <section className={sectionClass}>
        <SectionHeader title={t('props.visibility')} badge={<Badge color={field.visible !== false ? 'emerald' : 'red'}>{field.visible !== false ? t('props.visible') : t('props.hidden')}</Badge>} />
        <label className="flex cursor-pointer items-start gap-2 text-xs text-gray-700">
          <Checkbox className="mt-0.5" checked={field.visible !== false} onChange={(e) => patch({ visible: e.target.checked })} />
          <span>{t('field.fieldVisible')}</span>
        </label>
        <p className="text-xs text-gray-500">{t('field.visibilityHint')}</p>
      </section>

      <ConditionEditor
        condition={field.condition}
        fields={fields}
        fieldId={field.id}
        onChange={(condition) => patch({ condition })}
      />

      {data && (
        <section className={sectionClass}>
          <h3 className={sectionTitle}>{t('field.readOnlySection')}</h3>
          <label className="flex cursor-pointer items-start gap-2 text-xs text-gray-700">
            <Checkbox className="mt-0.5" checked={field.readOnly === true} onChange={(e) => patch({ readOnly: e.target.checked })} />
            <span>{t('field.readOnlyLabel')}</span>
          </label>
          <p className="text-xs text-gray-500">{t('field.readOnlyHint')}</p>
        </section>
      )}

      {data && (
        <>
          <section className={sectionClass}>
            <SectionHeader
              title={t('field.requiredSection')}
              badge={<Badge color={condRequired || field.required ? 'red' : 'gray'}>{condRequired ? t('field.requiredBadgeCond') : field.required ? t('field.requiredBadgeReq') : t('field.requiredBadgeOpt')}</Badge>}
            />
            <label className={cx('flex items-start gap-2 text-xs text-gray-700', condRequired ? 'opacity-60' : 'cursor-pointer')}>
              <Checkbox className="mt-0.5" checked={field.required === true} disabled={condRequired} onChange={(e) => patch({ required: e.target.checked })} />
              <span>
                {t('field.requiredLabel')}
                {condRequired && <span className="block text-gray-500">{t('field.requiredCondNote')}</span>}
              </span>
            </label>
            <p className="text-xs text-gray-500">{t('field.requiredHint')}</p>
          </section>
          <ConditionEditor
            title={t('condition.requiredTitle')}
            toggleLabel={t('condition.requiredToggle')}
            condition={field.requiredCondition}
            fields={fields}
            fieldId={field.id}
            onChange={(requiredCondition) => patch({ requiredCondition })}
          />
        </>
      )}

      {isHtml && <HtmlSection field={field} HtmlEditor={HtmlEditor} tinymceBaseUrl={tinymceBaseUrl} patch={patch} />}
      {isSteps && <StepsSection field={field} fields={fields} patch={patch} />}

      {!data && !isHtml && !isSteps && (
        <section className={sectionClass}>
          <p className="text-xs text-gray-500">{t('field.sectionOnly')}</p>
        </section>
      )}
    </aside>
  )
}
