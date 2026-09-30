import {
  BarChart,
  Button,
  ChartContainer,
  DonutChart,
  Kpi,
  LineChart,
  PanelContainer,
  SubHeader,
} from "@pmcfernandes/app-shell";

const monthlySpend = [
  { name: "Jan", value: 4200 },
  { name: "Feb", value: 5100 },
  { name: "Mar", value: 4800 },
  { name: "Apr", value: 6200 },
  { name: "May", value: 5900 },
  { name: "Jun", value: 7100 },
];

const eur = (value) => `€${Number(value || 0).toLocaleString("en-US")}`;

export default function Dashboard({ projects, onNavigate }) {
  const totalBudget = projects.reduce((sum, project) => sum + Number(project.budget || 0), 0);
  const activeCount = projects.filter((project) => project.status !== "Complete").length;
  const doneCount = projects.length - activeCount;
  const completion = projects.length > 0 ? Math.round((doneCount / projects.length) * 100) : 0;

  const budgetByOwner = Object.entries(
    projects.reduce((acc, project) => {
      acc[project.owner] = (acc[project.owner] || 0) + Number(project.budget || 0);
      return acc;
    }, {}),
  ).map(([name, value]) => ({ name, value }));

  const countByStatus = Object.entries(
    projects.reduce((acc, project) => {
      acc[project.status] = (acc[project.status] || 0) + 1;
      return acc;
    }, {}),
  ).map(([name, value]) => ({ name, value }));

  const topProjects = [...projects].sort((a, b) => Number(b.budget || 0) - Number(a.budget || 0)).slice(0, 3);

  return (
    <section className="space-y-6">
      <SubHeader
        title="Dashboard"
        description="Metrics, charts and containers from @pmcfernandes/app-shell, fed by the projects dataset."
        actions={<Button onClick={() => onNavigate("projects")}>Open projects</Button>}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Kpi title="Total budget" value={eur(totalBudget)} change={`${projects.length} projects`} changeType="neutral" description="Sum of all project budgets." />
        <Kpi title="Active projects" value={activeCount} change={`${doneCount} done`} changeType={activeCount === 0 ? "positive" : "neutral"} description="Projects not yet complete." />
        <Kpi title="Completion" value={`${completion}%`} change={completion >= 50 ? "+ on track" : "behind"} changeType={completion >= 50 ? "positive" : "negative"} description="Share of completed projects." />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <ChartContainer title="Budget by owner" actions={<span className="text-xs text-gray-500 dark:text-gray-400">{budgetByOwner.length} owners</span>}>
          <BarChart data={budgetByOwner} valueFormatter={eur} />
        </ChartContainer>
        <ChartContainer title="Projects by status">
          <div className="flex justify-center">
            <DonutChart data={countByStatus} label="Projects" valueFormatter={(value) => value} />
          </div>
        </ChartContainer>
      </div>

      <ChartContainer title="Monthly spend" description="Sample series rendered with the SVG line chart.">
        <LineChart data={monthlySpend} valueFormatter={eur} />
      </ChartContainer>

      <PanelContainer
        title="Top projects"
        description="Highest budgets first."
        actions={<Button variant="secondary" onClick={() => onNavigate("projects")}>View all</Button>}
      >
        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
          {topProjects.map((project) => (
            <li key={project.id} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-gray-950 dark:text-gray-50">{project.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{project.owner} · {project.status}</p>
              </div>
              <span className="text-sm font-semibold text-gray-950 dark:text-gray-50">{eur(project.budget)}</span>
            </li>
          ))}
        </ul>
      </PanelContainer>
    </section>
  );
}
