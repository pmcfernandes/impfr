import { Card } from "@pmcfernandes/app-shell";
import { DataView } from "@pmcfernandes/table-editor";
import { projectConfig } from "../data.js";

export default function Projects({ projects, onProjectsChange }) {
  return (
    <section className="space-y-6">
      <Card className="p-5">
        <h1 className="text-xl font-semibold">Project data</h1>
        <p className="mt-1 text-sm text-gray-500">
          `@pmcfernandes/table-editor` provides responsive table, list, and card views with search, grouping and bulk actions.
        </p>
      </Card>
      <DataView config={{ ...projectConfig, data: projects }} locale="en" onChange={onProjectsChange} />
    </section>
  );
}
