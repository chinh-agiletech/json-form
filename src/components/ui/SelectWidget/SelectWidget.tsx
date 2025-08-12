import React from "react";
import { WidgetProps } from "@rjsf/utils";

const SelectWidget: React.FC<WidgetProps> = (props) => {
  const { id, options, value, required, disabled, readonly, onChange, placeholder } = props;

  const { enumOptions = [] } = options || {};

  return (
    <select
      id={id}
      value={typeof value === "undefined" ? "" : value}
      required={required}
      disabled={disabled || readonly}
      onChange={(event) => onChange(event.target.value === "" ? undefined : event.target.value)}
      style={{
        width: "100%",
        padding: "8px 12px",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        fontSize: "14px",
        fontFamily: "inherit",
        outline: "none",
        boxSizing: "border-box",
        backgroundColor: disabled || readonly ? "#f9fafb" : "white",
        cursor: disabled || readonly ? "not-allowed" : "pointer",
      }}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {enumOptions.map((option: { value: string | number | boolean; label: string }, index: number) => (
        <option key={index} value={String(option.value)}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default SelectWidget;
