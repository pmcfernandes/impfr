import { useEffect, useMemo, useState } from "react";
import { getRowId } from "../core/config.js";
import { applyFieldFilters, applySearch, applySort, paginate } from "../core/filtering.js";
import { useDebouncedValue } from "./useDebouncedValue.js";

/**
 * Estado central do DataView: dados, vista, pesquisa, ordenação,
 * paginação, seleção e linha em edição.
 */
export function useDataView(config, onChange) {
  const [internalData, setInternalData] = useState(config.data);
  const [view, setView] = useState(config.defaultView);
  const [query, setQuery] = useState("");
  const [fieldFilters, setFieldFilters] = useState({});
  const [hiddenColumnKeys, setHiddenColumnKeys] = useState(config.hiddenColumns ?? []);
  const [sortKey, setSortKey] = useState(null);
  const [sortDir, setSortDir] = useState("asc");
  const [page, setPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState([]);
  const [editingRow, setEditingRow] = useState(null); // { mode: "create"|"edit", row }
  const [pageSize, setPageSize] = useState(config.pageSize);

  // Sincroniza quando o JSON de config muda (ex.: samples).
  useEffect(() => {
    setInternalData(config.data);
    setPage(1);
    setSelectedIds([]);
    setEditingRow(null);
    setFieldFilters({});
    setHiddenColumnKeys(config.hiddenColumns ?? []);
  }, [config.data]);

  useEffect(() => {
    setView(config.defaultView);
    setPageSize(config.pageSize);
  }, [config.defaultView, config.pageSize]);

  const debouncedQuery = useDebouncedValue(query);

  const processed = useMemo(() => {
    const searched = applySearch(internalData, debouncedQuery, config.searchKeys ?? []);
    const filtered = applyFieldFilters(searched, fieldFilters);
    return applySort(filtered, sortKey, sortDir);
  }, [internalData, debouncedQuery, fieldFilters, config.searchKeys, sortKey, sortDir]);

  const pagination = useMemo(() => {
    if (!config.paginated) return { page: 1, totalPages: 1, total: processed.length, rows: processed };
    return paginate(processed, page, pageSize);
  }, [processed, config.paginated, page, pageSize]);

  // Se filtros encolherem o total, volta para a última página válida.
  useEffect(() => {
    if (page !== pagination.page) setPage(pagination.page);
  }, [page, pagination.page]);

  function commit(nextData) {
    setInternalData(nextData);
    onChange?.(nextData);
  }

  function toggleSort(key) {
    if (sortKey !== key) {
      setSortKey(key);
      setSortDir("asc");
    } else {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    }
  }

  function toggleSelect(id) {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id],
    );
  }

  function toggleSelectAll(visibleRows) {
    const ids = visibleRows.map((r, i) => getRowId(r, config.idKey, i));
    const allSelected = ids.every((id) => selectedIds.includes(id));
    setSelectedIds(allSelected ? [] : ids);
  }

  function saveRow(row) {
    if (editingRow?.mode === "create") {
      const withId =
        row[config.idKey] === undefined || row[config.idKey] === ""
          ? { ...row, [config.idKey]: nextId(internalData, config.idKey) }
          : row;
      commit([...internalData, withId]);
    } else if (editingRow?.mode === "edit") {
      const targetId = getRowId(editingRow.row, config.idKey);
      commit(
        internalData.map((r, i) =>
          getRowId(r, config.idKey, i) === targetId ? { ...r, ...row } : r,
        ),
      );
    }
    setEditingRow(null);
  }

  function deleteRow(row) {
    const targetId = getRowId(row, config.idKey);
    commit(internalData.filter((r, i) => getRowId(r, config.idKey, i) !== targetId));
    setSelectedIds((prev) => prev.filter((id) => id !== targetId));
  }

  function deleteSelected() {
    commit(
      internalData.filter(
        (_, i) => !selectedIds.includes(getRowId(internalData[i], config.idKey, i)),
      ),
    );
    setSelectedIds([]);
  }

  return {
    rows: internalData,
    visibleRows: pagination.rows,
    total: pagination.total,
    totalPages: pagination.totalPages,
    page: pagination.page,
    view,
    setView,
    query,
    setQuery,
    fieldFilters,
    setFieldFilters,
    hiddenColumnKeys,
    setHiddenColumnKeys,
    sortKey,
    sortDir,
    toggleSort,
    setPage,
    pageSize,
    setPageSize,
    selectedIds,
    toggleSelect,
    toggleSelectAll,
    editingRow,
    setEditingRow,
    saveRow,
    deleteRow,
    deleteSelected,
    allFilteredRows: processed,
  };
}

function nextId(rows, idKey) {
  const nums = rows
    .map((r) => Number(r[idKey]))
    .filter((n) => Number.isFinite(n));
  return nums.length > 0 ? Math.max(...nums) + 1 : rows.length + 1;
}
