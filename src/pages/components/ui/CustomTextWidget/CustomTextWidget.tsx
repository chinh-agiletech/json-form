import React from "react";
import type { WidgetProps } from "@rjsf/utils";

const CustomTextWidget = (props: WidgetProps) => {
  const {
    id,
    value,
    required,
    disabled,
    readonly,
    label,
    onChange,
    onBlur,
    onFocus,
    rawErrors = [],
    placeholder,
  } = props;

  return (
    <div style={{ marginBottom: "16px" }}>
      {label && (
        <label 
          htmlFor={id} 
          style={{ 
            display: "block", 
            marginBottom: "6px", 
            fontWeight: "500",
            color: "#374151",
            fontSize: "14px"
          }}
        >
          {label}
          {required && <span style={{ color: "red" }}> *</span>}
        </label>
      )}
      <input
        type="text"
        id={id}
        value={value ?? ""}
        required={required}
        disabled={disabled}
        readOnly={readonly}
        placeholder={placeholder || "Enter text"}
        onChange={(event) => {
          onChange(event.target.value === "" ? undefined : event.target.value);
        }}
        onBlur={onBlur && ((event) => onBlur(id, event.target.value))}
        onFocus={onFocus && ((event) => onFocus(id, event.target.value))}
        style={{
          width: "100%",
          padding: "8px 12px",
          border: rawErrors.length > 0 ? "1px solid #ef4444" : "1px solid #d1d5db",
          borderRadius: "6px",
          fontSize: "14px",
          lineHeight: "1.5",
          fontFamily: "inherit",
          outline: "none",
          transition: "border-color 0.2s ease-in-out",
          backgroundColor: disabled ? "#f9fafb" : "#ffffff",
          color: disabled ? "#6b7280" : "#374151",
          boxSizing: "border-box"
        }}
        onFocusCapture={(e) => {
          e.target.style.borderColor = "#3b82f6";
          e.target.style.boxShadow = "0 0 0 3px rgba(59, 130, 246, 0.1)";
        }}
        onBlurCapture={(e) => {
          e.target.style.borderColor = rawErrors.length > 0 ? "#ef4444" : "#d1d5db";
          e.target.style.boxShadow = "none";
        }}
      />
      {rawErrors.length > 0 && (
        <div style={{ color: "#ef4444", fontSize: "12px", marginTop: "4px" }}>
          {rawErrors.map((error, i) => (
            <div key={i}>{error}</div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomTextWidget;
