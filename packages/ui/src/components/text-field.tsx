import {
  useId,
  type ReactNode,
  type HTMLInputTypeAttribute,
  type ChangeEvent,
} from 'react';
import { cn } from '../lib/cn';
import '../styles/polaris/text-field.css';
import '../styles/polaris/labelled.css';
import '../styles/polaris/label.css';

export interface TextFieldProps {
  label: string;
  labelHidden?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  helpText?: ReactNode;
  error?: string;
  disabled?: boolean;
  readOnly?: boolean;
  required?: boolean;
  multiline?: boolean | number;
  type?: HTMLInputTypeAttribute;
  autoComplete?: string;
  name?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  clearButton?: boolean;
  onClearButtonClick?: () => void;
  className?: string;
  id?: string;
  children?: ReactNode;
}

export function TextField({
  label,
  labelHidden,
  value,
  defaultValue,
  onChange,
  placeholder,
  helpText,
  error,
  disabled,
  readOnly,
  required,
  multiline,
  type = 'text',
  autoComplete,
  name,
  prefix,
  suffix,
  clearButton,
  onClearButtonClick,
  className,
  id,
  children,
}: TextFieldProps) {
  const generated = useId();
  const controlId = id ?? generated;
  const helpId = helpText ? `${controlId}-help` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const inputProps = {
    id: controlId,
    name,
    value,
    defaultValue,
    placeholder,
    disabled,
    readOnly,
    required,
    autoComplete,
    onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      onChange?.(event.target.value),
    className: 'Polaris-TextField__Input',
    'aria-describedby':
      [helpId, errorId].filter(Boolean).join(' ') || undefined,
    'aria-invalid': error ? true : undefined,
  };
  return (
    <div className={cn(labelHidden && 'Polaris-Labelled--hidden', className)}>
      <div className="Polaris-Labelled__LabelWrapper">
        <div className="Polaris-Label">
          <label className="Polaris-Label__Text" htmlFor={controlId}>
            {label}
          </label>
        </div>
      </div>
      <div
        className={cn(
          'Polaris-TextField',
          error && 'Polaris-TextField--error',
          disabled && 'Polaris-TextField--disabled',
          multiline && 'Polaris-TextField--multiline',
        )}
      >
        {prefix && <span className="Polaris-TextField__Prefix">{prefix}</span>}
        {multiline ? (
          <textarea
            {...inputProps}
            rows={typeof multiline === 'number' ? multiline : 4}
          />
        ) : (
          <input {...inputProps} type={type} />
        )}
        {suffix && <span className="Polaris-TextField__Suffix">{suffix}</span>}
        {clearButton && value && (
          <button
            type="button"
            className="Polaris-TextField__ClearButton"
            aria-label={`Clear ${label}`}
            onClick={() => {
              onChange?.('');
              onClearButtonClick?.();
            }}
          >
            �
          </button>
        )}
        <div className="Polaris-TextField__Backdrop" />
      </div>
      {helpText && (
        <div id={helpId} className="Polaris-Labelled__HelpText">
          {helpText}
        </div>
      )}
      {error && (
        <div
          id={errorId}
          style={{ color: 'var(--p-color-text-critical)', marginTop: 4 }}
        >
          {error}
        </div>
      )}
      {children}
    </div>
  );
}
