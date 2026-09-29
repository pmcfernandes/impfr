import { useState } from "react";
import { fromEditableValue, toEditableValue } from "../../core/formatting.js";
import { Button, Field, Input, Modal, Select } from "../../ui/index.js";

function EditorControl({ column, value, onChange }) {
  if (column.type === "boolean") {
    return (
      <input
        type="checkbox"
        checked={Boolean(value)}
        onChange={(e) => onChange(e.target.checked)}
        className="h-4 w-4 accent-blue-600"
      />
    );
  }
  if (column.type === "select" || Array.isArray(column.options)) {
    return (
      <Select value={value} onChange={(e) => onChange(e.target.value)} className="w-full">
        <option value="">—</option>
        {(column.options ?? []).map((opt) => (
          <option key={String(opt)} value={String(opt)}>
            {String(opt)}
          </option>
        ))}
      </Select>
    );
  }
  const inputType =
    column.type === "number" || column.type === "currency" || column.type === "percent"
      ? "number"
      : column.type === "date"
        ? "date"
        : "text";
  return (
    <Input type={inputType} value={value} onChange={(e) => onChange(e.target.value)} className="w-full" />
  );
}

/**
 * Modal de criação/edição gerado a partir das colunas `editable`.
 */
export function DataViewEditor({ config, editingRow, onSave, onClose, t }) {
  const editableCols = config.columns.filter((c) => c.editable !== false);
  const [form, setForm] = useState(() => {
    const source = editingRow?.row ?? {};
    return Object.fromEntries(
      editableCols.map((col) => [col.key, toEditableValue(source[col.key], col)]),
    );
  });

  if (!editingRow) return null;
  const isCreate = editingRow.mode === "create";

  function handleSubmit(e) {
    e.preventDefault();
    const parsed = Object.fromEntries(
      editableCols.map((col) => [col.key, fromEditableValue(form[col.key], col)]),
    );
    onSave(isCreate ? parsed : { ...editingRow.row, ...parsed });
  }

  return (
    <Modal
      title={isCreate ? t("createTitle") : t("editTitle")}
      onClose={onClose}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            {t("cancel")}
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {t("save")}
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {editableCols.map((col) => (
          <Field key={col.key} label={col.label}>
            <EditorControl
              column={col}
              value={form[col.key] ?? ""}
              onChange={(v) => setForm((f) => ({ ...f, [col.key]: v }))}
            />
          </Field>
        ))}
      </form>
    </Modal>
  );
}
