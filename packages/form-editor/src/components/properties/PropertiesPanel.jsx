import FormProperties from './FormProperties.jsx'
import FieldProperties from './FieldProperties.jsx'

export default function PropertiesPanel({
  form, field, fields,
  onChangeField, onDuplicate, onDelete, onChangeForm,
  onResizeStart, onResizeKey,
  errors = { byId: {}, general: {} },
  onFetchSource, HtmlEditor, tinymceBaseUrl,
}) {
  if (!field) {
    return (
      <FormProperties
        form={form}
        fields={fields}
        errors={errors}
        onChangeForm={onChangeForm}
        onResizeStart={onResizeStart}
        onResizeKey={onResizeKey}
      />
    )
  }

  return (
    <FieldProperties
      field={field}
      fields={fields}
      errors={errors}
      onChangeField={onChangeField}
      onDuplicate={onDuplicate}
      onDelete={onDelete}
      onResizeStart={onResizeStart}
      onResizeKey={onResizeKey}
      onFetchSource={onFetchSource}
      HtmlEditor={HtmlEditor}
      tinymceBaseUrl={tinymceBaseUrl}
    />
  )
}
