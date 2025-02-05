import React, { useState, useMemo, useEffect, memo, useCallback } from "react";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import no_data from '@/assets/nodata.webp'
import { cn } from "@/lib/utils";
interface TableColumn {
  label: string;
  key: string;
  sortable?: boolean;
  sortKey?: string;
  render?: (value: any) => JSX.Element;
}

interface TableRow {
  [key: string]: any;
}

interface DataTableProps {
  columns: TableColumn[];
  rows: TableRow[];
  headerClassName?: string;
  actions?: (row: TableRow) => JSX.Element;
  onRowSelect?: (selectedRows: TableRow[]) => void;
  itemsPerPageOptions?: number[];
  defaultItemsPerPage?: number;
  selectable?: boolean;
  pagination?: boolean;
  shouldUnselectAll?: boolean;
}

// Memoized table header component
const TableHeader = memo(({
  columns,
  selectable,
  actions,
  headerClassName,
  selectedRows,
  paginatedRows,
  toggleSelectAll,
  sortConfig,
  handleSort
}: any) => (
  <thead className={"text-[#525866]  uppercase"}>
    <tr>
      {selectable && (
        <th className={cn("px-4 py-2 ",headerClassName)}>
          <Checkbox
            className="bg-white  border-gray-1/20 border-2  rounded-md outline-none"
            onCheckedChange={toggleSelectAll}
            checked={selectedRows?.size === paginatedRows?.length && paginatedRows?.length > 0}
          />
        </th>
      )}
      {columns.map((column: TableColumn) => (
        <th

          key={column.key}
          className={cn(`px-4 ${!selectable && "py-2"} content-center text-xs select-none font-medium ${column.sortable ? "cursor-pointer" : ""
            }`, headerClassName)}
          onClick={() => column.sortable && handleSort(column.key)}
        >
          <div className="flex items-center">
            <h3 className="inline-block">{column.label}</h3>
            {column.sortable && (
              <span className="ml-2 inline-flex text-xs -pt-9 flex-col">
                <span
                  className={`text-[7px] ${sortConfig?.key === column.key && sortConfig.direction === "asc"
                    ? "text-black font-bold"
                    : "text-white"
                    }`}
                >
                  ▲
                </span>
                <span
                  className={`text-[7px] -mt-2 ${sortConfig?.key === column.key && sortConfig.direction === "desc"
                    ? "text-black font-bold"
                    : "text-white"
                    }`}
                >
                  ▼
                </span>
              </span>
            )}
          </div>
        </th>
      ))}
      {actions && <th className="px-4 py-3 text-xs font-medium">Action</th>}
    </tr>
  </thead>
));

// Memoized table row component
const TableRow = memo(({
  row,
  rowIndex,
  columns,
  selectable,
  actions,
  selectedRows,
  toggleRowSelection
}: any) => (
  <tr className={`hover:bg-gray-50/50 rounded-xl ${rowIndex % 2 === 0 && "bg-white-1"}`}>
    {selectable && (
      <td className="px-4 py-3 border-b">
        <Checkbox
          className=" border-gray-1/20  rounded-md outline-none"
          onCheckedChange={() => toggleRowSelection(rowIndex)}
          checked={selectedRows.has(rowIndex)}
        />
      </td>
    )}
    {columns.map((column: TableColumn) => (
      <td key={column.key} className="px-4 py-3 border-b text-[13px]">
        {column.render ? column.render(row[column.key]) : row[column.key]}
      </td>
    ))}
    {actions && <td className="px-4 py-2 border-b">{actions(row)}</td>}
  </tr>
));

// Memoized pagination component
const Pagination = memo(({
  itemsPerPage,
  setItemsPerPage,
  setCurrentPage,
  itemsPerPageOptions,
  currentPage,
  totalPages,
  goToPage,
  goToFirstPage,
  goToPreviousPage,
  goToNextPage,
  goToLastPage
}: any) => (
  <div className="flex items-center flex-wrap md:pl-0 mr-4 justify-end gap-5">
    <div className="flex items-center space-x-2">
      <span className="text-sm text-gray-700">Rows per page:</span>
      <Select
        value={itemsPerPage.toString()}
        onValueChange={(value) => {
          setItemsPerPage(Number(value));
          setCurrentPage(1);
        }}
      >
        <SelectTrigger className="w-[70px] py-0 h-7">
          <SelectValue placeholder={itemsPerPage} />
        </SelectTrigger>
        <SelectContent>
          {itemsPerPageOptions.map((option: number) => (
            <SelectItem key={option} value={option.toString()}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    <div className="flex items-center gap-1">
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 border-gray-200"
        onClick={goToFirstPage}
        disabled={currentPage === 1}
      >
        <ChevronsLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 border-gray-200"
        onClick={goToPreviousPage}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      {Array.from({ length: totalPages }, (_, i) => i + 1)
        .filter((page) => {
          if (page === 1 || page === totalPages) return true;
          if (page >= currentPage - 2 && page <= currentPage + 2) return true;
          return false;
        })
        .map((page, index, array) => {
          if (index > 0 && array[index - 1] !== page - 1) {
            return (
              <React.Fragment key={`ellipsis-${page}`}>
                <span className="px-2">...</span>
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  size="icon"
                  className={`h-8 w-8 border-gray-200 ${currentPage === page ? "bg-primary text-primary-foreground" : ""
                    }`}
                  onClick={() => goToPage(page)}
                >
                  {page}
                </Button>
              </React.Fragment>
            );
          }
          return (
            <Button
              key={page}
              variant={currentPage === page ? "default" : "outline"}
              size="icon"
              className={`h-8 w-8 border-gray-200 ${currentPage === page ? "bg-gray-1/20 hover:bg-black-1/20 text-black-1" : ""
                }`}
              onClick={() => goToPage(page)}
            >
              {page}
            </Button>
          );
        })}
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 border-gray-200"
        onClick={goToNextPage}
        disabled={currentPage === totalPages}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="h-8 w-8 border-gray-200"
        onClick={goToLastPage}
        disabled={currentPage === totalPages}
      >
        <ChevronsRight className="h-4 w-4" />
      </Button>
    </div>
  </div>
));

const DataTable: React.FC<DataTableProps> = memo(({
  columns,
  rows,
  actions,
  pagination = true,
  selectable = true,
  onRowSelect,
  itemsPerPageOptions = [10, 20, 30, 50],
  defaultItemsPerPage = 10,
  shouldUnselectAll = false,
}) => {
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(defaultItemsPerPage);

  // Memoized sorting logic
  const sortedRows = useMemo(() => {
    if (!sortConfig) return rows;
    const { key, direction } = sortConfig;
    return [...rows].sort((a, b) => {
      const column = columns.find((col) => col.key === key);
      const sortKey = column?.sortKey || key;
      let aValue = a[sortKey];
      let bValue = b[sortKey];
      if (aValue < bValue) return direction === "asc" ? -1 : 1;
      if (aValue > bValue) return direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [rows, sortConfig, columns]);

  // Memoized pagination calculations
  const totalPages = useMemo(() => Math.ceil(sortedRows?.length / itemsPerPage), [sortedRows?.length, itemsPerPage]);
  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return sortedRows.slice(start, end);
  }, [sortedRows, currentPage, itemsPerPage]);

  // Memoized handlers
  const handleSort = useCallback((key: string) => {
    setSortConfig((prev) => {
      if (prev?.key === key && prev?.direction === "asc") {
        return { key, direction: "desc" };
      }
      return { key, direction: "asc" };
    });
  }, []);

  const toggleRowSelection = useCallback((rowIndex: number) => {
    setSelectedRows((prev) => {
      const updated = new Set(prev);
      if (updated.has(rowIndex)) {
        updated.delete(rowIndex);
      } else {
        updated.add(rowIndex);
      }
      const selected = [...updated].map((index) => rows[index]);
      if (onRowSelect) onRowSelect(selected);
      return updated;
    });
  }, [rows, onRowSelect]);

  const toggleSelectAll = useCallback(() => {
    setSelectedRows((prev) => {
      const newSelection = prev.size === paginatedRows?.length ? new Set() : new Set(paginatedRows.map((_, index) => index));
      if (onRowSelect) {
        onRowSelect(newSelection.size ? paginatedRows : []);
      }
      return newSelection;
    });
  }, [paginatedRows, onRowSelect]);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);

  const goToFirstPage = useCallback(() => goToPage(1), [goToPage]);
  const goToLastPage = useCallback(() => goToPage(totalPages), [goToPage, totalPages]);
  const goToPreviousPage = useCallback(() => goToPage(currentPage - 1), [goToPage, currentPage]);
  const goToNextPage = useCallback(() => goToPage(currentPage + 1), [goToPage, currentPage]);

  // Handle unselect all effect
  useEffect(() => {
    if (shouldUnselectAll) {
      setSelectedRows(new Set());
      if (onRowSelect) onRowSelect([]);
    }
  }, [shouldUnselectAll, onRowSelect]);

  return (
    <div className="space-y-4 overflow-x-auto">
      <div className="overflow-x-auto">
        <table className="w-full text-[14px] text-left border-collapse table-auto">
          <TableHeader
            columns={columns}
            selectable={selectable}
            actions={actions}
            selectedRows={selectedRows}
            paginatedRows={paginatedRows}
            toggleSelectAll={toggleSelectAll}
            sortConfig={sortConfig}
            handleSort={handleSort}
          />
          <tbody>
            {paginatedRows.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)} className="text-center py-4 lowercase first-letter:capitalize">
                  <div className="flex flex-col items-center justify-center">
                    <img src={no_data} className="w-[20%]" />
                    {/* It Seems Like You Don&apos;t Have Any Data */}
                  </div>
                </td>
              </tr>
            ) : (
              paginatedRows.map((row, rowIndex) => (
                <TableRow
                  key={rowIndex}
                  row={row}
                  rowIndex={rowIndex}
                  columns={columns}
                  selectable={selectable}
                  actions={actions}
                  selectedRows={selectedRows}
                  toggleRowSelection={toggleRowSelection}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      {pagination && (
        <Pagination
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          setCurrentPage={setCurrentPage}
          itemsPerPageOptions={itemsPerPageOptions}
          currentPage={currentPage}
          totalPages={totalPages}
          goToPage={goToPage}
          goToFirstPage={goToFirstPage}
          goToPreviousPage={goToPreviousPage}
          goToNextPage={goToNextPage}
          goToLastPage={goToLastPage}
        />
      )}
    </div>
  );
});

DataTable.displayName = 'DataTable';

export default DataTable;