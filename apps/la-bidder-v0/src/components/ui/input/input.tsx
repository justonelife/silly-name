import * as React from 'react';
import './input.css';

type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'prefix'
> & {
  /** Rendered left of the input text */
  prefix?: React.ReactNode;
  /** Rendered right of the input text */
  suffix?: React.ReactNode;
  /** Applies error styling and sets aria-invalid */
  isInvalid?: boolean;
  /** Wrapper className — usually for sizing (e.g. w-[420px]) */
  wrapperClassName?: string;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      prefix,
      suffix,
      isInvalid,
      wrapperClassName,
      className,
      disabled,
      ...inputProps
    },
    ref
  ) => {
    return (
      <div
        data-disabled={disabled || undefined}
        data-invalid={isInvalid || undefined}
        className={[
          'input',
          'flex gap-2 px-3 h-14 items-center',
          'backdrop-blur-[33px] rounded-lg border border-solid',
          wrapperClassName,
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {prefix && (
          <span className="shrink-0 flex items-center px-2" aria-hidden="true">
            {prefix}
          </span>
        )}

        <input
          ref={ref}
          disabled={disabled}
          aria-invalid={isInvalid || undefined}
          className={['grow bg-transparent focus:outline-none', className]
            .filter(Boolean)
            .join(' ')}
          {...inputProps}
        />

        {suffix && (
          <span className="shrink-0 flex items-center" aria-hidden="true">
            {suffix}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
export default Input;
