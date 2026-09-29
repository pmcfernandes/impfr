import { useLanguage } from '../../i18n/index.jsx'
import RichTextEditor from '../RichTextEditor.jsx'
import { sectionClass, sectionTitle } from './Row.jsx'

export default function HtmlSection({ field, HtmlEditor, tinymceBaseUrl, patch }) {
  const { t } = useLanguage()
  return (
    <section className={sectionClass}>
      <h3 className={sectionTitle}>{t('field.htmlSection')}</h3>
      {HtmlEditor ? (
        <HtmlEditor key={field.id} value={field.html || ''} onChange={(html) => patch({ html })} />
      ) : (
        <RichTextEditor key={field.id} id={`html-editor-${field.id}`} value={field.html || ''} onChange={(html) => patch({ html })} tinymceBaseUrl={tinymceBaseUrl} />
      )}
      <p className="text-xs text-gray-500">{t('field.htmlSectionHint')}</p>
    </section>
  )
}
