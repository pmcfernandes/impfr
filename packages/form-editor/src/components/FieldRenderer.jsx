import { useId } from 'react'
import { clampColumns } from '../core/index.js'
import { cx } from '../ui/index.js'
import FileControl from './FileControl.jsx'
import TextInput from './controls/TextInput.jsx'
import TextareaInput from './controls/TextareaInput.jsx'
import SelectInput from './controls/SelectInput.jsx'
import DateInput from './controls/DateInput.jsx'
import RadioInput from './controls/RadioInput.jsx'
import CheckboxInput from './controls/CheckboxInput.jsx'
import CheckboxGroupInput from './controls/CheckboxGroupInput.jsx'
import StepsBlock from './controls/StepsBlock.jsx'
import HtmlBlock from './controls/HtmlBlock.jsx'
import HeadingBlock from './controls/HeadingBlock.jsx'

const CONTROL_MAP = {
  text: TextInput,
  number: TextInput,
  email: TextInput,
  password: TextInput,
  textarea: TextareaInput,
  select: SelectInput,
  date: DateInput,
  radio: RadioInput,
  checkbox: CheckboxInput,
  checkboxgroup: CheckboxGroupInput,
}

export default function FieldRenderer({
  field,
  value,
  onChange,
  error,
  disabled,
  children,
  hideTitle = false,
  hideDivider = false,
  hideSteps = false,
  stepsLabels,
  stepsActive,
}) {
  const inputId = useId()
  const span = { gridColumn: `span ${clampColumns(field.columns)}` }

  if (field.type === 'steps') {
    if (hideSteps) {
      return (
        <div className="field" style={span}>
          {children && <div className="grid grid-cols-12 items-start gap-4">{children}</div>}
        </div>
      )
    }
    return (
      <div style={span}>
        <StepsBlock field={field} stepsLabels={stepsLabels} stepsActive={stepsActive}>
          {children}
        </StepsBlock>
      </div>
    )
  }

  if (field.type === 'html') {
    return (
      <div style={span}>
        <HtmlBlock field={field} />
      </div>
    )
  }

  if (field.type === 'heading') {
    return (
      <div style={span}>
        <HeadingBlock field={field} hideTitle={hideTitle} hideDivider={hideDivider}>
          {children}
        </HeadingBlock>
      </div>
    )
  }

  const readOnly = field.readOnly === true
  const controlDisabled = disabled || readOnly
  const Control = CONTROL_MAP[field.type] || TextInput

  return (
    <div className={cx('field flex flex-col gap-1.5', error && 'has-error')} style={span}>
      {field.type !== 'checkbox' && (
        <label className="field-label block text-sm font-semibold text-gray-900 dark:text-gray-50" htmlFor={inputId}>
          {field.label}
          {field.required && <span className="ml-1 text-red-500 dark:text-red-400" title="Obrigatório">*</span>}
        </label>
      )}
      {field.type === 'file' ? (
        <FileControl field={field} value={value} onChange={onChange} error={error} disabled={controlDisabled} />
      ) : (
        <Control
          field={field}
          value={value}
          onChange={onChange}
          error={error}
          disabled={controlDisabled}
          readOnly={readOnly}
          inputId={inputId}
        />
      )}
      {field.helpText && <p className="field-help text-xs text-gray-500 dark:text-gray-400">{field.helpText}</p>}
      {error && <p className="field-error text-xs font-medium text-red-600 dark:text-red-400">{error}</p>}
    </div>
  )
}
