import React from "react";
import { WidgetProps } from "@rjsf/utils";

const DateWidget: React.FC<WidgetProps> = (props) => {
  const { id, placeholder, required, disabled, readonly, value, onChange } = props;
  // const label = props.label; // Commented out as it's unused

  return (
    <div>
      <input
        type="date"
        id={id}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readonly}
        value={value || ""}
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
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#3b82f6";
          e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
        }}
        onBlur={(e) => {
          e.target.style.borderColor = "#d1d5db";
          e.target.style.boxShadow = "none";
        }}
      />
    </div>
  );
};

export default DateWidget;
