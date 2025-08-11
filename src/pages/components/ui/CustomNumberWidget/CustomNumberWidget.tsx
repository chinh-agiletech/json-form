import React from "react";
import type { WidgetProps } from "@rjsf/utils";

const CustomNumberWidget = (props: WidgetProps) => {
  const {
    id,
    value,
    required,
    disabled,
    readonly,
    onChange,
    onBlur,
    onFocus,
    options,
    schema,
    rawErrors = [],
  } = props;

  return (
    <div>
      <style jsx>{`
        input[type="number"]::-webkit-outer-spin-button,
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        input[type="number"] {
          -moz-appearance: textfield;
        }
      `}</style>
      <input
        type="text"
        id={id}
        value={value ?? ""}
        required={required}
        disabled={disabled}
        readOnly={readonly}
        onChange={(event) => {
          const newValue = event.target.value;
          // Chỉ cho phép số, dấu chấm và dấu trừ
          const cleanValue = newValue.replace(/[^0-9.-]/g, '');
          
          if (cleanValue === "" || cleanValue === "-") {
            onChange(undefined);
          } else {
            const numValue = Number(cleanValue);
            if (!isNaN(numValue)) {
              onChange(numValue);
            }
          }
        }}
        onBlur={onBlur && ((event) => onBlur(id, event.target.value))}
        onFocus={onFocus && ((event) => onFocus(id, event.target.value))}
        onKeyDown={(e) => {
          // Chỉ cho phép: số, Backspace, Delete, Tab, Enter, Arrow keys, Ctrl+A/C/V
          const isNumber = /^[0-9]$/.test(e.key);
          const isNavigationKey = ['Backspace', 'Delete', 'Tab', 'Enter', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key);
          const isShortcut = (e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x', 'z'].includes(e.key.toLowerCase());
          const isDot = e.key === '.' && schema?.type === "number" && !String(value || '').includes('.');
          const isMinus = e.key === '-' && (!value || value === '') && schema?.minimum !== undefined && schema.minimum < 0;
          
          if (isNumber || isNavigationKey || isShortcut || isDot || isMinus) {
            return;
          }
          
          e.preventDefault();
        }}
        onPaste={(e) => {
          e.preventDefault();
          const pastedText = e.clipboardData.getData('text');
          const cleanValue = pastedText.replace(/[^0-9.-]/g, '');
          
          if (cleanValue && !isNaN(Number(cleanValue))) {
            const numValue = Number(cleanValue);
            onChange(numValue);
          }
        }}
        style={{
          color: "black",
          fontWeight: "bold",
          width: "100%",
          padding: "5px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
      {rawErrors.length > 0 && (
        <ul style={{ color: "red" }}>
          {rawErrors.map((error, i) => (
            <li key={i}>{error}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomNumberWidget;
