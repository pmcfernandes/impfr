import { AlertBox, BarChart, Button, ChartContainer, DonutChart, Kpi, LineChart, PanelContainer, SubHeader, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRoot, TableRow } from "@app-shell/react";

export function DashboardOverview({ projects, onCreateProject, onNavigate }) {
  const activeProjects = projects.filter((project) => project.status !== "Concluído");
  const completedProjects = projects.filter((project) => project.status === "Concluído");
  const activity = projects.map((project) => project.progress);
  const statusData = [
    { name: "Em curso", value: projects.filter((project) => project.status === "Em curso").length, color: "#2563eb" },
    { name: "Planeamento", value: projects.filter((project) => project.status === "Planeamento").length, color: "#d97706" },
    { name: "Concluído", value: completedProjects.length, color: "#059669" },
  ];
  const progressTrend = [
    { name: "Seg", value: 32 },
    { name: "Ter", value: 45 },
    { name: "Qua", value: 41 },
    { name: "Qui", value: 62 },
    { name: "Sex", value: 74 },
    { name: "Sáb", value: 68 },
    { name: "Dom", value: 86 },
  ];

  return (
    <div className="w-full">
      <SubHeader
        actions={<Button onClick={onCreateProject}>Novo projeto</Button>}
        className="mb-6"
        description="Acompanhe a atividade e o desempenho da equipa."
        title="Início"
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Kpi change="Em curso" changeType="positive" description="Projetos em execução" title="Projetos ativos" value={activeProjects.length} />
        <Kpi change="Concluídos" description="Entregues pela equipa" title="Projetos concluídos" value={completedProjects.length} />
        <Kpi change="Equipa" description="Membros envolvidos" title="Responsáveis" value={new Set(projects.map((project) => project.owner)).size} />
      </div>
      <ChartContainer
        actions={<button className="text-sm font-medium text-blue-600 hover:text-blue-700" onClick={() => onNavigate("projects")}>Ver projetos</button>}
        className="mt-6"
        title="Atividade semanal"
      >
        <div className="flex h-56 items-end gap-3" aria-label="Gráfico de atividade semanal" role="img">
          {activity.map((value, index) => (
            <div className="flex flex-1 flex-col items-center gap-2" key={index}>
              <div className="w-full rounded-t bg-blue-500" style={{ height: `${value}%` }} />
              <span className="text-xs text-gray-500">{index + 1}</span>
            </div>
          ))}
        </div>
      </ChartContainer>
      <ChartContainer className="mt-6" title="Distribuição de projetos">
        <div className="space-y-6">
          <DonutChart data={statusData} label="Projetos" />
          <TableRoot>
            <Table>
              <TableHead>
                <TableRow>
                  <TableHeaderCell>Série</TableHeaderCell>
                  <TableHeaderCell className="text-right">Valor / %s</TableHeaderCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {statusData.map((item) => (
                  <TableRow key={item.name}>
                    <TableCell><span className="mr-2 inline-block size-2 rounded-full" style={{ backgroundColor: item.color }} />{item.name}</TableCell>
                    <TableCell className="text-right">{item.value} ({projects.length ? Math.round((item.value / projects.length) * 100) : 0}%)</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableRoot>
        </div>
      </ChartContainer>
      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <ChartContainer title="Progresso por projeto">
          <BarChart data={projects.map((project) => ({ name: project.name, value: project.progress }))} />
        </ChartContainer>
        <ChartContainer title="Projetos por estado">
          <BarChart data={statusData} orientation="horizontal" />
        </ChartContainer>
      </div>
      <ChartContainer className="mt-6" title="Tendência de progresso">
        <LineChart data={progressTrend} valueFormatter={(value) => `${value}%`} />
      </ChartContainer>
      <PanelContainer
        actions={<button className="text-sm font-medium text-blue-600 hover:text-blue-700" onClick={() => onNavigate("projects")}>Gerir</button>}
        className="mt-6"
        description="Itens que precisam da sua atenção."
        title="Próximas tarefas"
      >
        <ul className="divide-y divide-gray-200 dark:divide-gray-800">
          {activeProjects.slice(0, 3).map((project) => <li className="py-3 text-sm text-gray-700 dark:text-gray-300" key={project.id}>{project.name} - {project.progress}% concluído</li>)}
        </ul>
      </PanelContainer>
      {activeProjects.length > 0 && <AlertBox className="mt-6" description={`${activeProjects.length} projetos precisam de acompanhamento esta semana.`} title="Atividade em curso" variant="info" />}
    </div>
  );
}
