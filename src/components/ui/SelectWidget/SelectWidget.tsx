import React from "react";
import { WidgetProps } from "@rjsf/utils";

const SelectWidget: React.FC<WidgetProps> = (props) => {
  const {
    id,
    options,
    value,
    required,
    disabled,
    readonly,
    onChange,
    placeholder,
  } = props;

  const { enumOptions = [] } = options || {};

  return (
    <select
      id={id}
      value={typeof value === "undefined" ? "" : value}
      required={required}
      disabled={disabled || readonly}
      onChange={(event) =>
        onChange(event.target.value === "" ? undefined : event.target.value)
      }
      aria-disabled={disabled || readonly}
      aria-required={required}
      style={{
        width: "100%",
        padding: "10px 14px",
        border: "1.5px solid #cbd5e1", // nhẹ hơn, tinh tế
        borderRadius: "8px",
        fontSize: "15px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        outline: "none",
        boxSizing: "border-box",
        backgroundColor: disabled || readonly ? "#f3f4f6" : "white",
        cursor: disabled || readonly ? "not-allowed" : "pointer",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
      }}
      onFocus={(e) => {
        e.currentTarget.style.borderColor = "#2563eb"; // xanh dương đậm
        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.4)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.borderColor = "#cbd5e1";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Để placeholder không bị disabled và có thể chọn để show prompt */}
      {placeholder && (
        <option value="" disabled={required} hidden={required}>
          {placeholder}
        </option>
      )}
      {enumOptions.map(
        (option: { value: string | number | boolean; label: string }, index: number) => (
          <option key={index} value={String(option.value)}>
            {option.label}
          </option>
        )
      )}
    </select>
  );
};

export default SelectWidget;
