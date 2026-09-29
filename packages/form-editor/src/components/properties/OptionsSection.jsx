import { useState } from 'react'
import { shortUrl } from '../../apiSource.js'
import { useLanguage } from '../../i18n/index.jsx'
import { Button } from '../../ui/index.js'
import OptionsEditor from '../OptionsEditor.jsx'
import ApiSourceDialog from '../ApiSourceDialog.jsx'
import { sectionClass, sectionTitle } from './Row.jsx'

export default function OptionsSection({ field, patch, onFetchSource }) {
  const { t } = useLanguage()
  const [apiOpen, setApiOpen] = useState(false)

  return (
    <section className={sectionClass}>
      <div className="flex items-center justify-between gap-2">
        <h3 className={sectionTitle}>{t('field.options')}</h3>
        {onFetchSource && (
          <Button size="sm" variant="ghost" onClick={() => setApiOpen(true)}>
            {field.apiSource ? t('api.title') + '…' : 'API…'}
          </Button>
        )}
      </div>
      {field.apiSource && (
        <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
          <span className="truncate">Endpoint: {shortUrl(field.apiSource.url)}</span>
          <button type="button" className="cursor-pointer font-semibold text-red-600 hover:underline" onClick={() => patch({ apiSource: null })}>
            {t('common.delete')}
          </button>
        </div>
      )}
      <OptionsEditor options={field.options || []} onChange={(options) => patch({ options })} />
      <ApiSourceDialog key={field.id} open={apiOpen} field={field} onCancel={() => setApiOpen(false)}
        onImport={(options, source) => { patch({ options, apiSource: source }); setApiOpen(false) }}
        onFetchSource={onFetchSource}
      />
    </section>
  )
}
