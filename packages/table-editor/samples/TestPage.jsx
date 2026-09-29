import { Printer } from "lucide-react";
import { useState } from "react";
import { DataView } from "../src/components/DataView/index.js";
import { Button, Card, cx } from "../src/ui/index.js";
import productsConfig from "./data/products.json";
import tasksConfig from "./data/tasks.json";
import usersConfig from "./data/users.json";

const samples = [
  { id: "products", label: "Produtos", config: productsConfig },
  { id: "users", label: "Equipa", config: usersConfig },
  { id: "tasks", label: "Tarefas", config: tasksConfig },
];

/** Página de testes dos JSONs em `samples/data`. */
export default function TestPage() {
  const [sampleId, setSampleId] = useState("products");
  const [locale, setLocale] = useState("pt");
  const [lastChange, setLastChange] = useState(null);

  const active = samples.find((sample) => sample.id === sampleId);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <main className="mx-auto max-w-6xl space-y-6 px-4 py-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">samples</p>
            <h1 className="mt-1 text-2xl font-bold">Página de testes</h1>
            <p className="mt-1 text-sm text-gray-500">
              Configurações JSON carregadas de <code>samples/data</code>.
            </p>
          </div>
          <div className="flex rounded-lg border border-gray-200 bg-white p-0.5">
            {["pt", "en"].map((value) => (
              <button
                key={value}
                onClick={() => setLocale(value)}
                className={cx(
                  "rounded-md px-3 py-1.5 text-xs font-semibold uppercase",
                  locale === value ? "bg-gray-900 text-white" : "text-gray-500",
                )}
              >
                {value}
              </button>
            ))}
          </div>
        </header>

        <nav className="flex flex-wrap gap-2">
          {samples.map((sample) => (
            <Button
              key={sample.id}
              variant={sample.id === sampleId ? "primary" : "secondary"}
              onClick={() => setSampleId(sample.id)}
            >
              {sample.label}
            </Button>
          ))}
        </nav>

        <DataView
          key={sampleId}
          config={active.config}
          locale={locale}
          actions={[
            {
              key: "print",
              label: "Imprimir",
              icon: <Printer className="h-4 w-4" />,
              onClick: () => window.print(),
            },
          ]}
          onChange={(rows) => setLastChange(rows.length)}
        />

        {lastChange !== null && (
          <p className="text-xs text-gray-400">Última alteração: {lastChange} registos.</p>
        )}

        <Card className="overflow-hidden">
          <div className="border-b border-gray-100 px-5 py-3">
            <h2 className="text-sm font-semibold">Configuração ativa</h2>
          </div>
          <pre className="max-h-96 overflow-auto bg-gray-950 p-4 text-xs text-gray-100">
            {JSON.stringify(active.config, null, 2)}
          </pre>
        </Card>
      </main>
    </div>
  );
}
