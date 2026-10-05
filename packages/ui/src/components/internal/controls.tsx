'use client';

import { useState, useId, useEffect, useRef, type ReactNode } from 'react';
import { cn } from '../../lib/cn';
import './components.css';

export interface FieldProps {
  label: string;
  helpText?: ReactNode;
  error?: string;
  disabled?: boolean;
  className?: string;
  id?: string;
  children?: ReactNode;
  labelHidden?: boolean;
}
export function Field({
  label,
  helpText,
  error,
  children,
  id,
  className,
  labelHidden,
}: FieldProps) {
  return (
    <div className={cn('ps-field', className)}>
      <label
        htmlFor={id}
        className={labelHidden ? 'ps-visually-hidden' : undefined}
      >
        {label}
      </label>
      {children}
      {helpText && (
        <div id={`${id}-help`} className="ps-help">
          {helpText}
        </div>
      )}
      {error && (
        <div id={`${id}-error`} className="ps-error">
          {error}
        </div>
      )}
    </div>
  );
}
export function described(id: string, help?: ReactNode, error?: string) {
  return (
    [help && `${id}-help`, error && `${id}-error`].filter(Boolean).join(' ') ||
    undefined
  );
}
export function useValue<T>(
  controlled: T | undefined,
  initial: T,
  onChange?: (value: T) => void,
) {
  const [local, setLocal] = useState(initial);
  return [
    controlled === undefined ? local : controlled,
    (value: T) => {
      setLocal(value);
      onChange?.(value);
    },
  ] as const;
}
export interface Option {
  label: string;
  value: string;
  disabled?: boolean;
}
export interface SelectProps extends FieldProps {
  options?: (Option | string)[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  name?: string;
}
export function Select({
  options = [],
  value,
  defaultValue = '',
  onChange,
  placeholder,
  name,
  ...props
}: SelectProps) {
  const uid = useId(),
    id = props.id ?? uid;
  const [selected, change] = useValue(value, defaultValue, onChange);
  return (
    <Field {...props} id={id}>
      <select
        id={id}
        name={name}
        value={selected}
        disabled={props.disabled}
        aria-invalid={!!props.error || undefined}
        aria-describedby={described(id, props.helpText, props.error)}
        className="ps-input"
        onChange={(e) => change(e.target.value)}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) =>
          typeof option === 'string' ? (
            <option key={option}>{option}</option>
          ) : (
            <option
              key={option.value}
              value={option.value}
              disabled={option.disabled}
            >
              {option.label}
            </option>
          ),
        )}
      </select>
      {props.children}
    </Field>
  );
}
export interface CheckboxProps extends FieldProps {
  checked?: boolean | 'indeterminate';
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  name?: string;
  value?: string;
}
export function Checkbox({
  checked,
  defaultChecked = false,
  onChange,
  name,
  value,
  ...props
}: CheckboxProps) {
  const uid = useId(),
    id = props.id ?? uid,
    ref = useRef<HTMLInputElement>(null);
  const [selected, change] = useValue<boolean | 'indeterminate'>(
    checked,
    defaultChecked,
    (value) => onChange?.(value === true),
  );
  useEffect(() => {
    if (ref.current) ref.current.indeterminate = selected === 'indeterminate';
  }, [selected]);
  return (
    <div className={cn('ps-field', props.className)}>
      <label className="ps-choice" htmlFor={id}>
        <input
          ref={ref}
          id={id}
          type="checkbox"
          name={name}
          value={value}
          checked={selected === true}
          disabled={props.disabled}
          onChange={(e) => change(e.target.checked)}
          aria-describedby={described(id, props.helpText, props.error)}
          aria-invalid={!!props.error || undefined}
        />
        {props.label}
      </label>
      {props.helpText && (
        <div id={`${id}-help`} className="ps-help">
          {props.helpText}
        </div>
      )}
      {props.error && (
        <div id={`${id}-error`} className="ps-error">
          {props.error}
        </div>
      )}
      {props.children}
    </div>
  );
}
export interface RadioButtonProps extends Omit<CheckboxProps, 'checked'> {
  checked?: boolean;
}
export function RadioButton({
  checked,
  defaultChecked = false,
  onChange,
  name,
  value,
  ...props
}: RadioButtonProps) {
  const uid = useId(),
    id = props.id ?? uid;
  const [selected, change] = useValue(checked, defaultChecked, onChange);
  return (
    <div className={cn('ps-field', props.className)}>
      <label className="ps-choice" htmlFor={id}>
        <input
          id={id}
          type="radio"
          aria-invalid={!!props.error || undefined}
          name={name}
          value={value}
          checked={selected}
          disabled={props.disabled}
          onChange={(e) => change(e.target.checked)}
          aria-describedby={described(id, props.helpText, props.error)}
        />
        {props.label}
      </label>
      {props.helpText && (
        <div className="ps-help" id={`${id}-help`}>
          {props.helpText}
        </div>
      )}
      {props.error && (
        <div className="ps-error" id={`${id}-error`}>
          {props.error}
        </div>
      )}
    </div>
  );
}
export interface ChoiceListProps extends FieldProps {
  title?: string;
  choices?: (Option & { helpText?: ReactNode })[];
  selected?: string[];
  onChange?: (selected: string[]) => void;
  allowMultiple?: boolean;
}
export function ChoiceList({
  choices = [],
  selected,
  onChange,
  allowMultiple,
  title,
  ...props
}: ChoiceListProps) {
  const id = useId();
  const [values, change] = useValue(selected, [] as string[], onChange);
  return (
    <fieldset
      className={cn('ps-fieldset', props.className)}
      disabled={props.disabled}
    >
      <legend>{title ?? props.label}</legend>
      <div className="ps-stack">
        {choices.map((choice) => {
          const common = {
            label: choice.label,
            name: id,
            value: choice.value,
            helpText: choice.helpText,
            disabled: choice.disabled,
            checked: values.includes(choice.value),
            onChange: (checked: boolean) =>
              change(
                allowMultiple
                  ? checked
                    ? [...values, choice.value]
                    : values.filter((v) => v !== choice.value)
                  : [choice.value],
              ),
          };
          return allowMultiple ? (
            <Checkbox key={choice.value} {...common} />
          ) : (
            <RadioButton key={choice.value} {...common} />
          );
        })}
      </div>
      {props.error && <p className="ps-error">{props.error}</p>}
      {props.children}
    </fieldset>
  );
}
export interface RangeSliderProps extends FieldProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  output?: boolean;
  prefix?: ReactNode;
  suffix?: ReactNode;
}
export function RangeSlider({
  value,
  defaultValue = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  output = true,
  prefix,
  suffix,
  ...props
}: RangeSliderProps) {
  const uid = useId(),
    id = props.id ?? uid;
  const [current, change] = useValue(value, defaultValue, onChange);
  return (
    <Field {...props} id={id}>
      <div className="ps-row">
        {prefix}
        <input
          id={id}
          type="range"
          aria-invalid={!!props.error || undefined}
          min={min}
          max={max}
          step={step}
          value={current}
          disabled={props.disabled}
          onChange={(e) => change(Number(e.target.value))}
          aria-describedby={described(id, props.helpText, props.error)}
          className="ps-range"
        />
        {suffix}
        {output && <output htmlFor={id}>{current}</output>}
      </div>
    </Field>
  );
}
export interface ColorPickerProps extends FieldProps {
  color?: string;
  onChange?: (color: string) => void;
  allowAlpha?: boolean;
}
export function ColorPicker({
  color,
  onChange,
  allowAlpha,
  ...props
}: ColorPickerProps) {
  const uid = useId(),
    id = props.id ?? uid;
  const [current, change] = useValue(color, '#008060', onChange);
  const base = /^#[0-9a-f]{6}/i.test(current) ? current.slice(0, 7) : '#008060';
  const alpha = /^#[0-9a-f]{8}$/i.test(current)
    ? parseInt(current.slice(7), 16)
    : 255;
  return (
    <Field {...props} id={id}>
      <div className="ps-row">
        <input
          id={id}
          type="color"
          aria-describedby={described(id, props.helpText, props.error)}
          aria-invalid={!!props.error || undefined}
          value={base}
          disabled={props.disabled}
          onChange={(e) =>
            change(
              e.target.value +
                (allowAlpha ? alpha.toString(16).padStart(2, '0') : ''),
            )
          }
          className="ps-color"
        />
        <input
          aria-label="Hex color"
          className="ps-input"
          value={current}
          disabled={props.disabled}
          pattern={
            allowAlpha ? '#[0-9a-fA-F]{6}([0-9a-fA-F]{2})?' : '#[0-9a-fA-F]{6}'
          }
          onChange={(e) => change(e.target.value)}
        />
      </div>
      {allowAlpha && (
        <RangeSlider
          label="Opacity"
          min={0}
          max={100}
          value={Math.round((alpha / 255) * 100)}
          disabled={props.disabled}
          onChange={(value) =>
            change(
              base +
                Math.round((value / 100) * 255)
                  .toString(16)
                  .padStart(2, '0'),
            )
          }
          suffix="%"
        />
      )}
    </Field>
  );
}
export interface DatePickerProps extends Partial<FieldProps> {
  month?: number;
  year?: number;
  selected?: Date | { start: Date; end: Date };
  onChange?: (range: { start: Date; end: Date }) => void;
  onMonthChange?: (month: number, year: number) => void;
  allowRange?: boolean;
  disableDatesBefore?: Date;
  disableDatesAfter?: Date;
}
function dateOnly(date: Date) {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate(),
  ).getTime();
}
export function DatePicker({
  month,
  year,
  selected,
  onChange,
  onMonthChange,
  allowRange,
  disableDatesBefore,
  disableDatesAfter,
  label = 'Choose a date',
  disabled,
  className,
}: DatePickerProps) {
  const now = new Date();
  const [view, setView] = useState({
    month: month ?? now.getMonth(),
    year: year ?? now.getFullYear(),
  });
  useEffect(() => {
    if (month !== undefined && year !== undefined) setView({ month, year });
  }, [month, year]);
  const [range, setRange] = useValue(
    selected instanceof Date ? { start: selected, end: selected } : selected,
    undefined as { start: Date; end: Date } | undefined,
  );
  const [anchor, setAnchor] = useState<Date | null>(null);
  const first = new Date(view.year, view.month, 1),
    days = new Date(view.year, view.month + 1, 0).getDate();
  const move = (offset: number) => {
    const date = new Date(view.year, view.month + offset, 1);
    const next = { month: date.getMonth(), year: date.getFullYear() };
    setView(next);
    onMonthChange?.(next.month, next.year);
  };
  const pick = (date: Date) => {
    let next = { start: date, end: date };
    if (allowRange && anchor) {
      next =
        date < anchor
          ? { start: date, end: anchor }
          : { start: anchor, end: date };
      setAnchor(null);
    } else if (allowRange) setAnchor(date);
    setRange(next);
    onChange?.(next);
  };
  return (
    <section aria-label={label} className={cn('ps-calendar', className)}>
      <div className="ps-row ps-between">
        <button
          type="button"
          className="ps-icon-button"
          aria-label="Previous month"
          onClick={() => move(-1)}
        >
          ‹
        </button>
        <strong aria-live="polite">
          {first.toLocaleDateString('en', { month: 'long', year: 'numeric' })}
        </strong>
        <button
          type="button"
          className="ps-icon-button"
          aria-label="Next month"
          onClick={() => move(1)}
        >
          ›
        </button>
      </div>
      <div
        className="ps-calendar-grid"
        onKeyDown={(event) => {
          const offsets: Record<string, number> = {
            ArrowLeft: -1,
            ArrowRight: 1,
            ArrowUp: -7,
            ArrowDown: 7,
          };
          const offset = offsets[event.key];
          if (offset === undefined) return;
          const buttons = Array.from(
            event.currentTarget.querySelectorAll<HTMLButtonElement>('button'),
          );
          const current = buttons.indexOf(event.target as HTMLButtonElement);
          const next = buttons[current + offset];
          if (next && !next.disabled) {
            event.preventDefault();
            next.focus();
          }
        }}
      >
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day) => (
          <span key={day} className="ps-help">
            {day}
          </span>
        ))}
        {Array.from({ length: first.getDay() }, (_, i) => (
          <span key={`blank-${i}`} />
        ))}
        {Array.from({ length: days }, (_, i) => {
          const date = new Date(view.year, view.month, i + 1),
            time = dateOnly(date),
            active =
              range &&
              time >= dateOnly(range.start) &&
              time <= dateOnly(range.end);
          return (
            <button
              key={i}
              type="button"
              aria-label={date.toLocaleDateString('en', { dateStyle: 'full' })}
              aria-pressed={!!active}
              className={cn('ps-day', active && 'ps-selected')}
              disabled={
                disabled ||
                !!(disableDatesBefore && time < dateOnly(disableDatesBefore)) ||
                !!(disableDatesAfter && time > dateOnly(disableDatesAfter))
              }
              onClick={() => pick(date)}
            >
              {i + 1}
            </button>
          );
        })}
      </div>
    </section>
  );
}
export interface DropZoneProps extends Partial<FieldProps> {
  accept?: string;
  allowMultiple?: boolean;
  onDrop?: (files: File[], accepted: File[], rejected: File[]) => void;
  onDropAccepted?: (files: File[]) => void;
  onDropRejected?: (files: File[]) => void;
}
export function DropZone({
  label = 'Upload files',
  accept,
  allowMultiple = true,
  disabled,
  onDrop,
  onDropAccepted,
  onDropRejected,
  children,
  className,
  error,
}: DropZoneProps) {
  const [dragging, setDragging] = useState(false),
    [names, setNames] = useState<string[]>([]);
  const id = useId();
  const receive = (files: File[]) => {
    if (disabled) return;
    const chosen = files;
    const accepted: File[] = [],
      rejected: File[] = [];
    for (const file of chosen) {
      if (!allowMultiple && accepted.length > 0) {
        rejected.push(file);
        continue;
      }
      const valid =
        !accept ||
        accept.split(',').some((pattern) => {
          const type = pattern.trim().toLowerCase();
          return type.startsWith('.')
            ? file.name.toLowerCase().endsWith(type)
            : type.endsWith('/*')
              ? file.type.startsWith(type.slice(0, -1))
              : file.type === type;
        });
      (valid ? accepted : rejected).push(file);
    }
    setNames(accepted.map((file) => file.name));
    onDrop?.(chosen, accepted, rejected);
    if (accepted.length) onDropAccepted?.(accepted);
    if (rejected.length) onDropRejected?.(rejected);
  };
  return (
    <div
      className={cn(
        'ps-dropzone',
        dragging && 'ps-dropzone-active',
        disabled && 'ps-disabled',
        className,
      )}
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => {
        e.preventDefault();
        setDragging(false);
        receive(Array.from(e.dataTransfer.files));
      }}
    >
      <input
        id={id}
        type="file"
        aria-invalid={!!error || undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        aria-label={label}
        accept={accept}
        multiple={allowMultiple}
        disabled={disabled}
        onChange={(e) => {
          receive(Array.from(e.target.files ?? []));
          e.target.value = '';
        }}
      />
      <div aria-hidden="true">
        {children ?? (
          <>
            <strong>{label}</strong>
            <p className="ps-help">Drag files here or click to browse</p>
          </>
        )}
      </div>
      {names.length > 0 && <p role="status">{names.join(', ')}</p>}
      {error && (
        <p id={`${id}-error`} className="ps-error">
          {error}
        </p>
      )}
    </div>
  );
}
DropZone.FileUpload = function FileUpload({
  actionTitle = 'Add files',
}: {
  actionTitle?: string;
}) {
  return <span className="ps-upload-label">{actionTitle}</span>;
};
