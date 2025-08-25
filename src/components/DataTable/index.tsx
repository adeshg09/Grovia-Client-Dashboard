"use client";

import * as React from "react";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type UniqueIdentifier,
} from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
  IconDotsVertical,
  IconGripVertical,
} from "@tabler/icons-react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type Row,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CardHeader } from "../ui/card";
import { Filter, Plus, Search, SortAscIcon } from "lucide-react";

// ----------------------------------------------------------------------
// Types and Interfaces
// ----------------------------------------------------------------------

export interface DataTableProps<TData, TValue = any> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  // Optional features
  enableDrag?: boolean;
  enableSelection?: boolean;
  enableColumnVisibility?: boolean;
  enablePagination?: boolean;
  enableSearch?: boolean;
  // Customization
  pageSize?: number;
  pageSizeOptions?: number[];
  searchPlaceholder?: string;
  // Callbacks
  onRowClick?: (row: TData) => void;
  onRowsReorder?: (data: TData[]) => void;
  onRowSelectionChange?: (selectedRows: TData[]) => void;
  // Actions
  actions?: (row: TData) => React.ReactNode;
  // Custom components
  customActions?: React.ReactNode;
  // Table configuration
  getRowId?: (row: TData) => string;
  className?: string;

  addButtonTitle?: string;
  onAddButtonClick?: () => void;

  headerActions?: React.ReactNode;
}

interface DragHandleProps {
  id: string | number;
}

interface DraggableRowProps<TData> {
  row: Row<TData>;
  onRowClick?: (row: TData) => void;
}

// ----------------------------------------------------------------------
// Sub Components
// ----------------------------------------------------------------------

/**
 * Drag handle component for sortable rows
 */
function DragHandle({ id }: DragHandleProps) {
  const { attributes, listeners } = useSortable({
    id,
  });

  return (
    <Button
      {...attributes}
      {...listeners}
      variant="ghost"
      size="icon"
      className="text-muted-foreground size-7 hover:bg-transparent"
    >
      <IconGripVertical className="text-muted-foreground size-3" />
      <span className="sr-only">Drag to reorder</span>
    </Button>
  );
}

/**
 * Draggable table row component
 */
function DraggableRow<TData>({ row, onRowClick }: DraggableRowProps<TData>) {
  const { transform, transition, setNodeRef, isDragging } = useSortable({
    id: row.id,
  });

  const handleRowClick = React.useCallback(() => {
    onRowClick?.(row.original);
  }, [onRowClick, row.original]);

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      data-dragging={isDragging}
      ref={setNodeRef}
      className="relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80 cursor-pointer hover:bg-muted/50"
      style={{
        transform: CSS.Transform.toString(transform),
        transition: transition,
      }}
      onClick={handleRowClick}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

/**
 * Regular table row component (without drag functionality)
 */
function RegularRow<TData>({ row, onRowClick }: DraggableRowProps<TData>) {
  const handleRowClick = React.useCallback(() => {
    onRowClick?.(row.original);
  }, [onRowClick, row.original]);

  return (
    <TableRow
      data-state={row.getIsSelected() && "selected"}
      className="cursor-pointer hover:bg-muted/50"
      onClick={handleRowClick}
    >
      {row.getVisibleCells().map((cell) => (
        <TableCell key={cell.id}>
          {flexRender(cell.column.columnDef.cell, cell.getContext())}
        </TableCell>
      ))}
    </TableRow>
  );
}

// ----------------------------------------------------------------------
// Main Component
// ----------------------------------------------------------------------

/**
 * Reusable DataTable component with optional features
 *
 * @template TData - Type of data objects in the table
 * @template TValue - Type of cell values
 */
export function DataTable<TData, TValue = any>({
  columns: baseColumns,
  data: initialData,
  enableDrag = false,
  enableSelection = true,
  enablePagination = true,
  pageSize: initialPageSize = 10,
  pageSizeOptions = [10, 20, 30, 40, 50],
  searchPlaceholder = "Search...",
  onRowClick,
  onRowsReorder,
  onRowSelectionChange,
  actions,
  getRowId,
  className,
  addButtonTitle,
  onAddButtonClick,
  headerActions,
}: DataTableProps<TData, TValue>) {
  // ----------------------------------------------------------------------
  // State Management
  // ----------------------------------------------------------------------

  const [data, setData] = React.useState(() => initialData);
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: initialPageSize,
  });

  // ----------------------------------------------------------------------
  // Column Configuration
  // ----------------------------------------------------------------------

  const columns = React.useMemo(() => {
    const cols: ColumnDef<TData, TValue>[] = [];

    // Add drag column if enabled
    if (enableDrag) {
      cols.push({
        id: "drag",
        header: () => null,
        cell: ({ row }) => <DragHandle id={row.id} />,
        size: 40,
        enableSorting: false,
        enableHiding: false,
      } as ColumnDef<TData, TValue>);
    }

    // Add selection column if enabled
    if (enableSelection) {
      cols.push({
        id: "select",
        header: ({ table }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={
                table.getIsAllPageRowsSelected()
                  ? true
                  : table.getIsSomePageRowsSelected()
                  ? "indeterminate"
                  : false
              }
              onCheckedChange={(value) =>
                table.toggleAllPageRowsSelected(!!value)
              }
              aria-label="Select all"
            />
          </div>
        ),
        cell: ({ row }) => (
          <div className="flex items-center justify-center">
            <Checkbox
              checked={row.getIsSelected()}
              onCheckedChange={(value) => row.toggleSelected(!!value)}
              aria-label="Select row"
            />
          </div>
        ),
        size: 40,
        enableSorting: false,
        enableHiding: false,
      } as ColumnDef<TData, TValue>);
    }

    // Add base columns
    cols.push(...baseColumns);

    // Add actions column if provided
    if (actions) {
      cols.push({
        id: "actions",
        header: () => null,
        cell: ({ row }) => (
          <div onClick={(e) => e.stopPropagation()}>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="data-[state=open]:bg-muted text-muted-foreground flex size-8"
                  size="icon"
                >
                  <IconDotsVertical />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-32">
                <div className="p-1">{actions(row.original)}</div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
        size: 40,
        enableSorting: false,
        enableHiding: false,
      } as ColumnDef<TData, TValue>);
    }

    return cols;
  }, [baseColumns, enableDrag, enableSelection, actions]);

  // ----------------------------------------------------------------------
  // Drag and Drop Configuration
  // ----------------------------------------------------------------------

  const sortableId = React.useId();
  const sensors = useSensors(
    useSensor(MouseSensor, {}),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {})
  );

  const dataIds = React.useMemo<UniqueIdentifier[]>(() => {
    if (!data?.length) return [];
    return data.map((item, index) => {
      if (getRowId) {
        const id = getRowId(item);
        return id;
      }
      return index.toString();
    });
  }, [data, getRowId]);

  // ----------------------------------------------------------------------
  // Table Configuration
  // ----------------------------------------------------------------------

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
      ...(enablePagination && { pagination }),
    },
    getRowId: getRowId ? (row) => getRowId(row) : undefined,
    enableRowSelection: enableSelection,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: setGlobalFilter,
    ...(enablePagination && { onPaginationChange: setPagination }),
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    ...(enablePagination && { getPaginationRowModel: getPaginationRowModel() }),
  });

  // ----------------------------------------------------------------------
  // Event Handlers
  // ----------------------------------------------------------------------

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setData((data) => {
        const oldIndex = dataIds.indexOf(active.id);
        const newIndex = dataIds.indexOf(over.id);
        const newData = arrayMove(data, oldIndex, newIndex);
        onRowsReorder?.(newData);
        return newData;
      });
    }
  }

  // ----------------------------------------------------------------------
  // Side Effects
  // ----------------------------------------------------------------------

  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  React.useEffect(() => {
    if (enableSelection && onRowSelectionChange) {
      const selectedRows = table
        .getFilteredSelectedRowModel()
        .rows.map((row) => row.original);
      onRowSelectionChange(selectedRows);
    }
  }, [rowSelection, enableSelection, table]);

  // ----------------------------------------------------------------------
  // Render Helpers
  // ----------------------------------------------------------------------

  const renderTableRows = () => {
    const rows = table.getRowModel().rows;

    if (!rows?.length) {
      return (
        <TableRow>
          <TableCell colSpan={columns.length} className="h-24 text-center">
            No results.
          </TableCell>
        </TableRow>
      );
    }

    if (enableDrag) {
      return (
        <SortableContext items={dataIds} strategy={verticalListSortingStrategy}>
          {rows.map((row) => (
            <DraggableRow key={row.id} row={row} onRowClick={onRowClick} />
          ))}
        </SortableContext>
      );
    }

    return rows.map((row) => (
      <RegularRow key={row.id} row={row} onRowClick={onRowClick} />
    ));
  };

  // ----------------------------------------------------------------------
  // Main Render
  // ----------------------------------------------------------------------

  const tableContent = (
    <div className={`flex flex-col gap-4 ${className || ""}`}>
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <CardHeader className="dark:border-b-secondary-600 flex w-full items-center p-0">
          <div className="flex-1 max-w-md lg:max-w-xl pr-4  ">
            <div className="relative w-full cursor-pointer h-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={searchPlaceholder}
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-10 bg-muted/50 border-0 focus-visible:ring-0 w-full"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-auto ml-auto">
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-md bg-muted/50 hover:bg-muted flex"
            >
              <SortAscIcon className="h-5 w-5" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-md bg-muted/50 hover:bg-muted"
            >
              <Filter className="h-5 w-5" />
            </Button>

            <Button
              onClick={onAddButtonClick}
              className="flex items-center whitespace-nowrap"
              leftIcon={<Plus className="h-4 w-4" />}
              size="medium"
            >
              Add New {addButtonTitle}
            </Button>

            {headerActions ? headerActions : null}
          </div>
        </CardHeader>

        {/* Actions */}
        {/* <div className="flex items-center gap-2 ml-auto">
          {customActions}

          Column Visibility
          {enableColumnVisibility && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <IconLayoutColumns />
                  <span className="hidden lg:inline">Columns</span>
                  <IconChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                {table
                  .getAllColumns()
                  .filter(
                    (column) =>
                      typeof column.accessorFn !== "undefined" &&
                      column.getCanHide()
                  )
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className="capitalize"
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div> */}
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg border">
        <Table>
          <TableHeader className="bg-muted sticky top-0 z-10">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>{renderTableRows()}</TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {enablePagination && (
        <div className="flex items-center justify-between px-4">
          {/* Selection Info */}
          {enableSelection && (
            <div className="text-muted-foreground hidden flex-1 text-sm lg:flex">
              {table.getFilteredSelectedRowModel().rows.length} of{" "}
              {table.getFilteredRowModel().rows.length} row(s) selected.
            </div>
          )}

          {/* Pagination Controls */}
          <div className="flex w-full items-center gap-8 lg:w-fit ml-auto">
            {/* Page Size Selector */}
            <div className="hidden items-center gap-2 lg:flex">
              <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
              </Label>
              <Select
                value={`${table.getState().pagination.pageSize}`}
                onValueChange={(value) => {
                  table.setPageSize(Number(value));
                }}
              >
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                  <SelectValue
                    placeholder={table.getState().pagination.pageSize}
                  />
                </SelectTrigger>
                <SelectContent side="top">
                  {pageSizeOptions.map((pageSize) => (
                    <SelectItem key={pageSize} value={`${pageSize}`}>
                      {pageSize}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Page Info */}
            <div className="flex w-fit items-center justify-center text-sm font-medium">
              Page {table.getState().pagination.pageIndex + 1} of{" "}
              {table.getPageCount()}
            </div>

            {/* Navigation Buttons */}
            <div className="ml-auto flex items-center gap-2 lg:ml-0">
              <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => table.setPageIndex(0)}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to first page</span>
                <IconChevronsLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <IconChevronLeft />
              </Button>
              <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <IconChevronRight />
              </Button>
              <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                disabled={!table.getCanNextPage()}
              >
                <span className="sr-only">Go to last page</span>
                <IconChevronsRight />
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  // Wrap with DndContext if drag is enabled
  if (enableDrag) {
    return (
      <DndContext
        collisionDetection={closestCenter}
        modifiers={[restrictToVerticalAxis]}
        onDragEnd={handleDragEnd}
        sensors={sensors}
        id={sortableId}
      >
        {tableContent}
      </DndContext>
    );
  }

  return tableContent;
}
