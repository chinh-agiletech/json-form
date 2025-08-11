import React from "react";
import type { WidgetProps } from "@rjsf/utils";

const CustomTextArea = (props: WidgetProps) => {
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
    placeholder,
  } = props;

  const maxLength = schema.maxLength || 250;
  const currentLength = value ? value.length : 0;
  const rows = options?.rows || 4;

  return (
    <div style={{ marginBottom: "16px" }}>
      <textarea
        id={id}
        value={value ?? ""}
        required={required}
        disabled={disabled}
        readOnly={readonly}
        maxLength={maxLength}
        rows={rows}
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
          resize: "vertical",
          minHeight: "80px",
          fontFamily: "inherit",
          outline: "none",
          transition: "border-color 0.2s ease-in-out",
          backgroundColor: disabled ? "#f9fafb" : "#ffffff",
          color: disabled ? "#6b7280" : "#374151",
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
      <div 
        style={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          marginTop: "4px"
        }}
      >
        <div>
          {rawErrors.length > 0 && (
            <div style={{ color: "#ef4444", fontSize: "12px" }}>
              {rawErrors.map((error, i) => (
                <div key={i}>{error}</div>
              ))}
            </div>
          )}
        </div>
        <div 
          style={{ 
            fontSize: "12px", 
            color: currentLength > maxLength * 0.9 ? "#ef4444" : "#6b7280",
            fontWeight: currentLength > maxLength * 0.9 ? "500" : "normal"
          }}
        >
          {currentLength}/{maxLength}
        </div>
      </div>
    </div>
  );
};

export default CustomTextArea;
