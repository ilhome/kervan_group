export function Field({ id, label, children, ...props }) {
  return (
    <div>
      <label className="label" htmlFor={id}>{label}</label>
      {children || <input id={id} className="field" {...props} />}
    </div>
  );
}

export function Button({ children, variant = 'primary', className = '', ...props }) {
  return (
    <button type="button" className={`btn ${variant} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Badge({ children }) {
  return <span className="badge">{children}</span>;
}

export function Card({ children, className = '' }) {
  return <div className={`panel p-4 sm:p-5 ${className}`}>{children}</div>;
}

export function QuantityControl({ id, label, value, step = 1, disabled, onChange, t, compact = false }) {
  const number = Number(value) || 0;
  return (
    <div>
      <label className="label" htmlFor={id}>{label}</label>
      <div className={`quantity-row${compact ? ' quantity-row-compact' : ''}`}>
        <button
          type="button"
          disabled={disabled}
          aria-label={`${t('decreaseQuantity')}: ${label}`}
          onClick={() => onChange(String(Math.max(0, Math.round((number - step) * 100) / 100)))}
        >
          −
        </button>
        <input
          id={id}
          className="field"
          inputMode="decimal"
          type="number"
          min="0"
          step={step}
          disabled={disabled}
          value={value}
          onChange={(event) => onChange(event.target.value)}
        />
        <button
          type="button"
          disabled={disabled}
          aria-label={`${t('increaseQuantity')}: ${label}`}
          onClick={() => onChange(String(Math.round((number + step) * 100) / 100))}
        >
          +
        </button>
      </div>
    </div>
  );
}
