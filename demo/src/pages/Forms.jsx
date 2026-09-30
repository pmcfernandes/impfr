import { useState } from "react";
import { Card, fetchJson } from "@app-shell/react";
import { FormEditor, FormViewer } from "@form-editor/react";
import { contactForm, intakeForm } from "../data.js";
import ResultJson from "./ResultJson.jsx";

const FORMS = [
  { id: "contact", label: "Simple", json: contactForm },
  { id: "intake", label: "Intake (wizard)", json: intakeForm },
];

async function handleUploadFiles({ files }) {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    files: files.map((file) => ({ name: file.name, original: file.name, size: file.size })),
  };
}

async function handleDeleteFile() {
  await new Promise((resolve) => setTimeout(resolve, 100));
}

function handleFileUrl() {
  return "#";
}

function handleFetchSource({ url, headers }) {
  return fetchJson(url, { headers });
}

export default function Forms() {
  const [formId, setFormId] = useState("contact");
  const [formMode, setFormMode] = useState("viewer");
  const [savedForms, setSavedForms] = useState({ contact: contactForm, intake: intakeForm });
  const [result, setResult] = useState(null);

  const active = savedForms[formId];

  return (
    <section className="space-y-6">
      <Card className="flex flex-wrap items-center justify-between gap-3 p-5">
        <div>
          <h1 className="text-xl font-semibold">{active.name}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Switch between the form viewer and the JSON form editor. The intake form adds steps, conditional fields, an API-powered select and file upload.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="demo-toggle">
            {FORMS.map((form) => (
              <button key={form.id} className={formId === form.id ? "is-active" : ""} onClick={() => setFormId(form.id)} type="button">
                {form.label}
              </button>
            ))}
          </div>
          <div className="demo-toggle">
            <button className={formMode === "viewer" ? "is-active" : ""} onClick={() => setFormMode("viewer")} type="button">Preview</button>
            <button className={formMode === "editor" ? "is-active" : ""} onClick={() => setFormMode("editor")} type="button">Edit</button>
          </div>
        </div>
      </Card>

      {formMode === "viewer" ? (
        <FormViewer
          key={`${formId}-viewer`}
          json={active}
          lang="en"
          onSubmit={(data, meta) => {
            setResult({ type: "submit", form: formId, data, meta });
            return "Submission recorded successfully!";
          }}
          onUploadFiles={handleUploadFiles}
          onDeleteFile={handleDeleteFile}
          getFileUrl={handleFileUrl}
        />
      ) : (
        <FormEditor
          key={`${formId}-editor`}
          json={active}
          lang="en"
          onCancel={() => setFormMode("viewer")}
          onSave={(nextForm) => {
            setSavedForms((current) => ({ ...current, [formId]: nextForm }));
            setResult({ type: "save", form: formId, data: nextForm });
            setFormMode("viewer");
          }}
          onUploadFiles={handleUploadFiles}
          onDeleteFile={handleDeleteFile}
          getFileUrl={handleFileUrl}
          onFetchSource={handleFetchSource}
        />
      )}

      <ResultJson title="Last form output" data={result} />
    </section>
  );
}
