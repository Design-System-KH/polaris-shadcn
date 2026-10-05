'use client';

import { useId, useState, useRef, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import {
  Field,
  described,
  useValue,
  type FieldProps,
  type Option,
} from './controls';
import { TextField } from '../text-field';
import { Button } from '../button';
import { Tag } from '../tag';
import './components.css';

export interface ComboboxProps extends FieldProps {
  options?: Option[];
  value?: string;
  onChange?: (value: string) => void;
  onSelect?: (value: string) => void;
  selected?: string[];
  placeholder?: string;
  loading?: boolean;
  allowMultiple?: boolean;
}
export function Combobox({
  options = [],
  value,
  onChange,
  onSelect,
  selected = [],
  placeholder,
  loading,
  allowMultiple,
  ...props
}: ComboboxProps) {
  const uid = useId(),
    id = props.id ?? uid,
    listId = `${id}-list`;
  const [query, change] = useValue(value, '', onChange),
    [open, setOpen] = useState(false),
    [active, setActive] = useState(-1);
  const results = options.filter((option) =>
    option.label.toLowerCase().includes(query.toLowerCase()),
  );
  const pick = (option: Option) => {
    if (option.disabled) return;
    change(allowMultiple ? '' : option.label);
    onSelect?.(option.value);
    setOpen(!!allowMultiple);
    setActive(-1);
  };
  return (
    <Field {...props} id={id}>
      <div
        className="ps-combobox"
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) setOpen(false);
        }}
      >
        <input
          className="ps-input"
          id={id}
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={open}
          aria-controls={listId}
          aria-activedescendant={
            open && active >= 0 ? `${id}-option-${active}` : undefined
          }
          aria-describedby={described(id, props.helpText, props.error)}
          aria-invalid={!!props.error || undefined}
          disabled={props.disabled}
          value={query}
          placeholder={placeholder}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            change(e.target.value);
            setOpen(true);
            setActive(-1);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setOpen(false);
              e.stopPropagation();
            }
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
              e.preventDefault();
              setOpen(true);
              const direction = e.key === 'ArrowDown' ? 1 : -1;
              let next = active;
              for (let n = 0; n < results.length; n++) {
                next = (next + direction + results.length) % results.length;
                if (!results[next]?.disabled) break;
              }
              setActive(next);
            }
            if (e.key === 'Enter' && open && active >= 0 && results[active]) {
              e.preventDefault();
              pick(results[active]);
            }
          }}
        />
        {open && (
          <ul
            id={listId}
            role="listbox"
            aria-label={`${props.label} options`}
            aria-multiselectable={allowMultiple || undefined}
            className="ps-options"
          >
            {loading ? (
              <li role="presentation">Loading…</li>
            ) : results.length === 0 ? (
              <li role="presentation">No matching options</li>
            ) : (
              results.map((option, index) => (
                <li
                  id={`${id}-option-${index}`}
                  key={option.value}
                  role="option"
                  aria-selected={selected.includes(option.value)}
                  aria-disabled={option.disabled || undefined}
                  className={cn(
                    'ps-option',
                    active === index && 'ps-option-active',
                    option.disabled && 'ps-disabled',
                  )}
                  onMouseDown={(e) => e.preventDefault()}
                  onMouseEnter={() => setActive(index)}
                  onClick={() => pick(option)}
                >
                  {option.label}
                  {selected.includes(option.value) && (
                    <span aria-hidden> ✓</span>
                  )}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
      {props.children}
    </Field>
  );
}
Combobox.TextField = TextField;
export type AutocompleteProps = ComboboxProps;
export const Autocomplete = Combobox;
export type PickerProps = ComboboxProps;
export const Picker = Combobox;

export interface ListboxProps {
  items?: { id: string; content: ReactNode; disabled?: boolean }[];
  options?: Option[];
  selected?: string[];
  onSelect?: (value: string) => void;
  allowMultiple?: boolean;
  ariaLabel?: string;
  className?: string;
  children?: ReactNode;
  loading?: boolean;
  emptyState?: ReactNode;
  isFiltered?: boolean;
}
export function Listbox({
  items = [],
  options,
  selected = [],
  onSelect,
  allowMultiple,
  ariaLabel = 'Options',
  className,
  children,
  loading,
  emptyState,
  isFiltered,
}: ListboxProps) {
  const ref = useRef<HTMLUListElement>(null),
    [active, setActive] = useState(0);
  const choices =
    options?.map((o) => ({
      id: o.value,
      content: o.label,
      disabled: o.disabled,
    })) ?? items;

  return (
    <ul
      ref={ref}
      role="listbox"
      aria-label={ariaLabel}
      aria-multiselectable={allowMultiple || undefined}
      aria-busy={loading || undefined}
      className={cn('ps-listbox', className)}
      onKeyDown={(e) => {
        if (!['ArrowDown', 'ArrowUp', 'Home', 'End'].includes(e.key)) return;
        e.preventDefault();
        const enabled = Array.from(
          ref.current?.querySelectorAll<HTMLElement>(
            '[role="option"]:not([aria-disabled="true"])',
          ) ?? [],
        );
        if (!enabled.length) return;
        const current = enabled.indexOf(document.activeElement as HTMLElement),
          next =
            e.key === 'Home'
              ? 0
              : e.key === 'End'
                ? enabled.length - 1
                : (current +
                    (e.key === 'ArrowDown' ? 1 : -1) +
                    enabled.length) %
                  enabled.length;
        enabled[next]?.focus();
      }}
    >
      {loading ? (
        <li role="presentation">Loading…</li>
      ) : choices.length ? (
        choices.map((choice, index) => (
          <li
            key={choice.id}
            role="option"
            aria-selected={selected.includes(choice.id)}
            aria-disabled={choice.disabled || undefined}
            tabIndex={
              choice.disabled
                ? -1
                : index ===
                    (choices[active] && !choices[active].disabled
                      ? active
                      : choices.findIndex((choice) => !choice.disabled))
                  ? 0
                  : -1
            }
            className={cn(
              'ps-option',
              selected.includes(choice.id) && 'ps-option-active',
              choice.disabled && 'ps-disabled',
            )}
            onFocus={() => setActive(index)}
            onClick={() => !choice.disabled && onSelect?.(choice.id)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                if (!choice.disabled) onSelect?.(choice.id);
              }
            }}
          >
            {choice.content}
          </li>
        ))
      ) : (
        !children && (
          <li role="presentation">
            {emptyState ??
              (isFiltered ? 'No matching options' : 'No options available')}
          </li>
        )
      )}
      {children}
    </ul>
  );
}
Listbox.Option = function ListboxOption({
  value,
  children,
  selected,
  disabled,
  onSelect,
}: {
  value: string;
  children?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onSelect?: (value: string) => void;
}) {
  return (
    <li
      role="option"
      aria-selected={!!selected}
      aria-disabled={disabled || undefined}
      tabIndex={disabled ? -1 : 0}
      className="ps-option"
      onClick={() => !disabled && onSelect?.(value)}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
          e.preventDefault();
          onSelect?.(value);
        }
      }}
    >
      {children}
    </li>
  );
};
export interface OptionListProps extends ListboxProps {
  title?: string;
  onChange?: (selected: string[]) => void;
}
export function OptionList({
  onChange,
  selected = [],
  allowMultiple,
  onSelect,
  title,
  ...props
}: OptionListProps) {
  return (
    <div>
      {title && <h3 className="ps-heading">{title}</h3>}
      <Listbox
        {...props}
        selected={selected}
        allowMultiple={allowMultiple}
        onSelect={(value) => {
          onSelect?.(value);
          onChange?.(
            allowMultiple
              ? selected.includes(value)
                ? selected.filter((v) => v !== value)
                : [...selected, value]
              : [value],
          );
        }}
      />
    </div>
  );
}

export interface FiltersProps {
  queryValue?: string;
  queryPlaceholder?: string;
  onQueryChange?: (value: string) => void;
  onQueryClear?: () => void;
  onClearAll?: () => void;
  filters?: { key: string; label: string; filter: ReactNode }[];
  appliedFilters?: { key: string; label: string; onRemove: () => void }[];
  children?: ReactNode;
  className?: string;
  gap?: string;
  padding?: string;
}
export function Filters({
  queryValue,
  queryPlaceholder = 'Search',
  onQueryChange,
  onQueryClear,
  onClearAll,
  filters = [],
  appliedFilters = [],
  children,
  className,
}: FiltersProps) {
  const [query, change] = useValue(queryValue, '', onQueryChange);
  return (
    <div className={cn('ps-stack', className)}>
      <div className="ps-row ps-wrap">
        <div className="ps-grow">
          <TextField
            label="Search and filter"
            labelHidden
            value={query}
            onChange={change}
            placeholder={queryPlaceholder}
            clearButton
            onClearButtonClick={onQueryClear}
          />
        </div>
        {filters.map((filter) => (
          <details key={filter.key} className="ps-filter">
            <summary>{filter.label}</summary>
            <div className="ps-filter-content">{filter.filter}</div>
          </details>
        ))}
        {onClearAll && (
          <Button variant="plain" onClick={onClearAll}>
            Clear all
          </Button>
        )}
        {children}
      </div>
      {appliedFilters.length > 0 && (
        <div className="ps-row ps-wrap">
          {appliedFilters.map((filter) => (
            <Tag key={filter.key} onRemove={filter.onRemove}>
              {filter.label}
            </Tag>
          ))}
        </div>
      )}
    </div>
  );
}
export interface IndexFiltersProps extends FiltersProps {
  sortOptions?: Option[];
  sortSelected?: string[];
  onSort?: (value: string[]) => void;
}
export function IndexFilters({
  sortOptions = [],
  sortSelected = [],
  onSort,
  children,
  ...props
}: IndexFiltersProps) {
  return (
    <Filters {...props}>
      {children}
      {sortOptions.length > 0 && (
        <select
          className="ps-input ps-sort"
          aria-label="Sort by"
          value={sortSelected[0] ?? sortOptions[0]?.value}
          onChange={(e) => onSort?.([e.target.value])}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      )}
    </Filters>
  );
}
export type LegacyFiltersProps = FiltersProps;
export const LegacyFilters = Filters;
