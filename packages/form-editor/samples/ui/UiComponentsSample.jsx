import { useState } from 'react'
import {
  Badge, Button, Callout, Checkbox, CloseButton, DatePicker, DateTimePicker,
  Dialog, Input, RadioGroup, RadioGroupItem, Select, Textarea,
  Title, Subtitle, Text, Table, TableRoot, TableHead, TableBody,
  TableRow, TableHeaderCell, TableCell,
} from '../../src/ui/index.js'

function Section({ title, children }) {
  return (
    <section className="mb-10">
      <h2 className="mb-4 text-xs font-semibold uppercase tracking-wide text-gray-500">{title}</h2>
      <div className="rounded-xl border border-gray-200 bg-white p-8">{children}</div>
    </section>
  )
}

function Row({ label, children }) {
  return (
    <div className="flex flex-wrap items-center gap-4 py-3">
      <span className="w-28 text-xs font-semibold text-gray-700">{label}</span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  )
}

export default function UiComponentsSample() {
  const [checked, setChecked] = useState(false)
  const [radio, setRadio] = useState('a')
  const [text, setText] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [date, setDate] = useState('')
  const [dateTime, setDateTime] = useState('')

  return (
    <div className="mx-auto max-w-4xl">
      <Section title="Buttons">
        <Row label="Variants">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="danger">Danger</Button>
          <Button variant="dangerGhost">Danger Ghost</Button>
        </Row>
        <Row label="Sizes">
          <Button size="sm" variant="primary">Small</Button>
          <Button size="md" variant="primary">Medium</Button>
          <Button size="lg" variant="primary">Large</Button>
        </Row>
        <Row label="States">
          <Button variant="primary" disabled>Disabled</Button>
          <Button variant="secondary" disabled>Disabled</Button>
        </Row>
      </Section>

      <Section title="Badges">
        <Row label="Colors">
          <Badge color="gray">Gray</Badge>
          <Badge color="blue">Blue</Badge>
          <Badge color="emerald">Emerald</Badge>
          <Badge color="amber">Amber</Badge>
          <Badge color="red">Red</Badge>
        </Row>
      </Section>

      <Section title="Callouts">
        <div className="flex flex-col gap-2">
          <Callout color="red">Erro: não foi possível guardar.</Callout>
          <Callout color="amber">Aviso: o formulário expira em breve.</Callout>
          <Callout color="blue">Info: tem 3 campos por preencher.</Callout>
          <Callout color="emerald">Sucesso: dados atualizados.</Callout>
        </div>
      </Section>

      <Section title="Typography">
        <Title>Este é um Title</Title>
        <Subtitle>Este é um Subtitle</Subtitle>
        <Text>Este é um Text normal.</Text>
      </Section>

      <Section title="Inputs">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">Input normal</label>
            <Input placeholder="Escreva aqui…" value={text} onChange={(e) => setText(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">Input com erro</label>
            <Input error placeholder="Valor inválido" defaultValue="" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">Input disabled</label>
            <Input disabled placeholder="Disabled" defaultValue="" />
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">Textarea</label>
            <Textarea rows={3} placeholder="Texto longo…" />
          </div>
        </div>
      </Section>

      <Section title="Select">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">Normal</label>
            <Select>
              <option value="">— Selecione —</option>
              <option value="a">Opção A</option>
              <option value="b">Opção B</option>
              <option value="c">Opção C</option>
            </Select>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">Com erro</label>
            <Select error>
              <option value="">— Selecione —</option>
              <option value="x">X</option>
            </Select>
          </div>
        </div>
      </Section>

      <Section title="Checkbox & Radio">
        <Row label="Checkbox">
          <Checkbox checked={checked} onChange={(e) => setChecked(e.target.checked)} />
          <span className="text-sm text-gray-700">Marcar (checked: {String(checked)})</span>
        </Row>
        <Row label="Indeterminate">
          <Checkbox checked="indeterminate" />
          <span className="text-sm text-gray-700">Indeterminate</span>
        </Row>
        <Row label="Disabled">
          <Checkbox disabled />
          <Checkbox checked disabled />
        </Row>
        <Row label="Radio">
          <RadioGroup value={radio} onValueChange={setRadio}>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="a" id="r-a" />
              <label htmlFor="r-a" className="cursor-pointer text-sm text-gray-700">Opção A</label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="b" id="r-b" />
              <label htmlFor="r-b" className="cursor-pointer text-sm text-gray-700">Opção B</label>
            </div>
            <div className="flex items-center gap-2">
              <RadioGroupItem value="c" id="r-c" />
              <label htmlFor="r-c" className="cursor-pointer text-sm text-gray-700">Opção C</label>
            </div>
          </RadioGroup>
          <span className="ml-2 text-xs text-gray-500">(valor: {radio})</span>
        </Row>
      </Section>

      <Section title="Date Pickers">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">DatePicker</label>
            <DatePicker value={date} onChange={(e) => setDate(e.target.value)} />
            <p className="mt-1 text-xs text-gray-500">valor: {date || '(vazio)'}</p>
          </div>
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-700">DateTimePicker</label>
            <DateTimePicker value={dateTime} onChange={(e) => setDateTime(e.target.value)} />
            <p className="mt-1 text-xs text-gray-500">valor: {dateTime || '(vazio)'}</p>
          </div>
        </div>
      </Section>

      <Section title="Dialog">
        <Button onClick={() => setDialogOpen(true)}>Abrir Dialog</Button>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} title="Título do Dialog" description="Descrição opcional">
          <p className="text-sm text-gray-700">Conteúdo do diálogo. Clique fora ou em ✕ para fechar.</p>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setDialogOpen(false)}>Cancelar</Button>
            <Button variant="primary" onClick={() => setDialogOpen(false)}>Confirmar</Button>
          </div>
        </Dialog>
      </Section>

      <Section title="Close Button">
        <Row label="Tamanhos">
          <CloseButton size="sm" />
          <CloseButton />
        </Row>
      </Section>

      <Section title="Table">
        <TableRoot>
          <Table>
            <TableHead>
              <TableRow>
                <TableHeaderCell>Nome</TableHeaderCell>
                <TableHeaderCell>Email</TableHeaderCell>
                <TableHeaderCell>Estado</TableHeaderCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Ana Silva</TableCell>
                <TableCell>ana@exemplo.pt</TableCell>
                <TableCell><Badge color="emerald">Activo</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Bruno Costa</TableCell>
                <TableCell>bruno@exemplo.pt</TableCell>
                <TableCell><Badge color="amber">Pendente</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Carla Dias</TableCell>
                <TableCell>carla@exemplo.pt</TableCell>
                <TableCell><Badge color="red">Inactivo</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableRoot>
      </Section>
    </div>
  )
}
