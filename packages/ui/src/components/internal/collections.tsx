'use client';

import {
  Fragment,
  createContext,
  useContext,
  type ReactNode,
  type CSSProperties,
} from 'react';
import { cn } from '../../lib/cn';
import { useValue, Checkbox } from './controls';
import { ResourceItem } from '../resource-item';
import { Button } from '../button';
import './components.css';

export interface DataTableProps {
  headings?: ReactNode[];
  rows?: ReactNode[][];
  columnContentTypes?: ('text' | 'numeric')[];
  sortable?: boolean[];
  defaultSortDirection?: 'ascending' | 'descending';
  initialSortColumnIndex?: number;
  onSort?: (columnIndex: number, direction: 'ascending' | 'descending') => void;
  totals?: ReactNode[];
  items?: { id: string; content: ReactNode }[];
  loading?: boolean;
  isFiltered?: boolean;
  emptyState?: ReactNode;
  className?: string;
  caption?: string;
}
export function DataTable({
  headings = ['Item'],
  rows,
  items = [],
  columnContentTypes = [],
  sortable = [],
  defaultSortDirection = 'ascending',
  initialSortColumnIndex = 0,
  onSort,
  totals,
  loading,
  isFiltered,
  emptyState,
  className,
  caption = 'Data table',
}: DataTableProps) {
  const [sort, setSort] = useValue(undefined, {
    column: initialSortColumnIndex,
    direction: defaultSortDirection,
  });
  const data = rows ?? items.map((item) => [item.content]);
  const ordered = sortable[sort.column]
    ? [...data].sort((a, b) => {
        const av = a[sort.column],
          bv = b[sort.column];
        const result =
          typeof av === 'number' && typeof bv === 'number'
            ? av - bv
            : String(av ?? '').localeCompare(String(bv ?? ''), undefined, {
                numeric: true,
              });
        return sort.direction === 'ascending' ? result : -result;
      })
    : data;
  const align = (column: number): CSSProperties => ({
    textAlign: columnContentTypes[column] === 'numeric' ? 'right' : 'left',
  });
  return (
    <div
      className={cn('ps-table-container', className)}
      aria-busy={loading || undefined}
    >
      <table className="ps-table">
        <caption className="ps-visually-hidden">{caption}</caption>
        <thead>
          <tr>
            {headings.map((heading, column) => (
              <th
                key={column}
                scope="col"
                style={align(column)}
                aria-sort={
                  sortable[column]
                    ? sort.column === column
                      ? sort.direction
                      : 'none'
                    : undefined
                }
              >
                {sortable[column] ? (
                  <button
                    type="button"
                    className="ps-sort-button"
                    onClick={() => {
                      const direction =
                        sort.column === column && sort.direction === 'ascending'
                          ? 'descending'
                          : 'ascending';
                      setSort({ column, direction });
                      onSort?.(column, direction);
                    }}
                  >
                    {heading}
                    <span aria-hidden>
                      {sort.column === column
                        ? sort.direction === 'ascending'
                          ? ' ↑'
                          : ' ↓'
                        : ' ↕'}
                    </span>
                  </button>
                ) : (
                  heading
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={headings.length} className="ps-table-empty">
                Loading…
              </td>
            </tr>
          ) : ordered.length ? (
            ordered.map((row, i) => (
              <tr key={i}>
                {row.map((cell, col) => (
                  <td key={col} style={align(col)}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headings.length} className="ps-table-empty">
                {emptyState ??
                  (isFiltered
                    ? 'No results match these filters.'
                    : 'Nothing here yet.')}
              </td>
            </tr>
          )}
        </tbody>
        {totals && (
          <tfoot>
            <tr>
              {totals.map((total, col) => (
                <td key={col} style={align(col)}>
                  {total}
                </td>
              ))}
            </tr>
          </tfoot>
        )}
      </table>
    </div>
  );
}
const IndexContext = createContext<{
  selectable: boolean;
  selected: string[];
  onSelectionChange?: (ids: string[]) => void;
}>({ selectable: false, selected: [] });
export interface IndexTableProps {
  headings?: { title: ReactNode; alignment?: 'start' | 'center' | 'end' }[];
  items?: { id: string; content: ReactNode }[];
  children?: ReactNode;
  itemCount?: number;
  resourceName?: { singular: string; plural: string };
  loading?: boolean;
  isFiltered?: boolean;
  emptyState?: ReactNode;
  className?: string;
  selectable?: boolean;
  selectedItems?: string[];
  onSelectionChange?: (ids: string[]) => void;
  itemIds?: string[];
}
export function IndexTable({
  headings = [{ title: 'Item' }],
  items = [],
  children,
  loading,
  isFiltered,
  emptyState,
  className,
  selectable = false,
  selectedItems = [],
  onSelectionChange,
  itemIds,
  itemCount,
  resourceName = { singular: 'item', plural: 'items' },
}: IndexTableProps) {
  const ids = itemIds ?? items.map((item) => item.id),
    count = itemCount ?? items.length;
  return (
    <IndexContext.Provider
      value={{ selectable, selected: selectedItems, onSelectionChange }}
    >
      <div
        className={cn('ps-table-container', className)}
        aria-busy={loading || undefined}
      >
        <table className="ps-table">
          <caption className="ps-visually-hidden">
            {resourceName.plural}
          </caption>
          <thead>
            <tr>
              {selectable && (
                <th scope="col">
                  <Checkbox
                    label={`Select all ${resourceName.plural}`}
                    checked={
                      ids.length > 0 &&
                      ids.every((id) => selectedItems.includes(id))
                        ? true
                        : selectedItems.length
                          ? 'indeterminate'
                          : false
                    }
                    onChange={(checked) =>
                      onSelectionChange?.(checked ? ids : [])
                    }
                    disabled={!ids.length}
                    className="ps-table-selection"
                  />
                </th>
              )}
              {headings.map((heading, i) => (
                <th
                  key={i}
                  scope="col"
                  style={{
                    textAlign:
                      heading.alignment === 'end'
                        ? 'right'
                        : heading.alignment === 'center'
                          ? 'center'
                          : 'left',
                  }}
                >
                  {heading.title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={headings.length + Number(selectable)}
                  className="ps-table-empty"
                >
                  Loading…
                </td>
              </tr>
            ) : children ? (
              children
            ) : count ? (
              items.map((item, i) => (
                <IndexTable.Row key={item.id} id={item.id} position={i}>
                  <IndexTable.Cell>{item.content}</IndexTable.Cell>
                </IndexTable.Row>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headings.length + Number(selectable)}
                  className="ps-table-empty"
                >
                  {emptyState ??
                    (isFiltered
                      ? 'No results match these filters.'
                      : `No ${resourceName.plural} yet.`)}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </IndexContext.Provider>
  );
}
IndexTable.Row = function Row({
  id,
  children,
  selected,
  onClick,
}: {
  id: string;
  position?: number;
  children?: ReactNode;
  selected?: boolean;
  onClick?: () => void;
}) {
  const context = useContext(IndexContext),
    checked = selected ?? context.selected.includes(id);
  return (
    <tr
      className={checked ? 'ps-table-row-selected' : undefined}
      onClick={onClick}
    >
      {context.selectable && (
        <td onClick={(event) => event.stopPropagation()}>
          <Checkbox
            label={`Select ${id}`}
            checked={checked}
            onChange={(value) =>
              context.onSelectionChange?.(
                value
                  ? [...context.selected, id]
                  : context.selected.filter((item) => item !== id),
              )
            }
            className="ps-table-selection"
          />
        </td>
      )}
      {children}
    </tr>
  );
};
IndexTable.Cell = function Cell({
  children,
  numeric,
  className,
}: {
  children?: ReactNode;
  numeric?: boolean;
  className?: string;
}) {
  return (
    <td
      className={className}
      style={{ textAlign: numeric ? 'right' : undefined }}
    >
      {children}
    </td>
  );
};
export interface ResourceListProps<
  T extends { id: string; content?: ReactNode },
> {
  items?: T[];
  renderItem?: (item: T, index: number) => ReactNode;
  loading?: boolean;
  isFiltered?: boolean;
  emptyState?: ReactNode;
  className?: string;
  resourceName?: { singular: string; plural: string };
  selectedItems?: string[];
  onSelectionChange?: (ids: string[]) => void;
  selectable?: boolean;
  bulkActions?: { content: string; onAction?: () => void }[];
  filterControl?: ReactNode;
}
export function ResourceList<T extends { id: string; content?: ReactNode }>({
  items = [],
  renderItem,
  loading,
  isFiltered,
  emptyState,
  className,
  resourceName = { singular: 'item', plural: 'items' },
  selectedItems,
  onSelectionChange,
  selectable,
  bulkActions = [],
  filterControl,
}: ResourceListProps<T>) {
  const [selection, change] = useValue(
    selectedItems,
    [] as string[],
    onSelectionChange,
  );
  return (
    <div
      className={cn('ps-resource-list', className)}
      aria-busy={loading || undefined}
    >
      {filterControl}
      {selectable && items.length > 0 && (
        <div className="ps-resource-toolbar">
          <Checkbox
            label={
              selection.length
                ? `${selection.length} selected`
                : `Select all ${resourceName.plural}`
            }
            checked={
              selection.length === items.length
                ? true
                : selection.length
                  ? 'indeterminate'
                  : false
            }
            onChange={(checked) =>
              change(checked ? items.map((item) => item.id) : [])
            }
          />
          {selection.length > 0 &&
            bulkActions.map((action) => (
              <Button key={action.content} onClick={action.onAction}>
                {action.content}
              </Button>
            ))}
        </div>
      )}
      {loading ? (
        <div role="status" className="ps-table-empty">
          Loading…
        </div>
      ) : !items.length ? (
        <div className="ps-table-empty">
          {emptyState ??
            (isFiltered
              ? 'No results match these filters.'
              : `No ${resourceName.plural} yet.`)}
        </div>
      ) : (
        <ul className="ps-resource-items">
          {items.map((item, index) =>
            renderItem ? (
              <Fragment key={item.id}>{renderItem(item, index)}</Fragment>
            ) : (
              <ResourceItem
                key={item.id}
                id={item.id}
                selectable={selectable}
                selected={selection.includes(item.id)}
                onSelectionChange={(value) =>
                  change(
                    value
                      ? [...selection, item.id]
                      : selection.filter((id) => id !== item.id),
                  )
                }
              >
                {item.content}
              </ResourceItem>
            ),
          )}
        </ul>
      )}
    </div>
  );
}
