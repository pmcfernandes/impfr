import {
  Button,
  Kpi,
  PanelContainer,
  useCreate,
  useDelete,
  useDeleteMany,
  useGetList,
  useGetMany,
  useGetOne,
  useInfiniteGetList,
  useUpdate,
} from "@pmcfernandes/app-shell";

const endpoint = "https://jsonplaceholder.typicode.com/todos";

export function DataHooksDemo() {
  const list = useGetList(`${endpoint}?_limit=3`);
  const one = useGetOne(endpoint, 1);
  const many = useGetMany(endpoint, [1, 2]);
  const infiniteList = useInfiniteGetList(endpoint, { pageParam: "_page", pageSize: 2, pageSizeParam: "_limit" });
  const createMutation = useCreate(endpoint);
  const updateMutation = useUpdate(endpoint);
  const deleteMutation = useDelete(endpoint);
  const deleteManyMutation = useDeleteMany(endpoint);

  return (
    <PanelContainer className="mt-6" description="Exemplo dos hooks REST contra JSONPlaceholder." title="Data hooks">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Kpi title="Lista" value={list.isLoading ? "..." : list.data?.length ?? 0} />
        <Kpi title="Registo" value={one.isLoading ? "..." : one.data?.id ?? "-"} />
        <Kpi title="Múltiplos" value={many.isLoading ? "..." : many.data?.length ?? 0} />
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <Button onClick={() => createMutation.create({ title: "Novo item", completed: false, userId: 1 })}>Criar</Button>
        <Button onClick={() => updateMutation.update(1, { completed: true })} variant="secondary">Atualizar</Button>
        <Button onClick={() => deleteMutation.remove(1)} variant="danger">Eliminar</Button>
        <Button onClick={() => deleteManyMutation.removeMany([1, 2])} variant="danger">Eliminar vários</Button>
      </div>
      <div className="mt-5 border-t border-gray-200 pt-5 dark:border-gray-800">
        <p className="text-sm font-medium text-gray-950 dark:text-gray-50">Lista infinita: {infiniteList.data.length} itens</p>
        <Button
          className="mt-3"
          disabled={!infiniteList.hasNextPage || infiniteList.isLoadingMore}
          onClick={() => infiniteList.fetchNextPage()}
          variant="secondary"
        >
          {infiniteList.isLoadingMore ? "A carregar..." : "Carregar mais"}
        </Button>
      </div>
    </PanelContainer>
  );
}
