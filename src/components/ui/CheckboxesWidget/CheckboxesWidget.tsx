import React from "react";
import { WidgetProps } from "@rjsf/utils";

const CheckboxesWidget: React.FC<WidgetProps> = (props) => {
  const { id, options, value, required, disabled, readonly, onChange, label } = props;

  const { enumOptions = [] } = options || {};
  const selectedValues = Array.isArray(value) ? value : [];

  const handleChange = (optionValue: string | number | boolean, checked: boolean) => {
    let newValues;
    if (checked) {
      // Add value if checked
      newValues = [...selectedValues, optionValue];
    } else {
      // Remove value if unchecked
      newValues = selectedValues.filter((v: string | number | boolean) => v !== optionValue);
    }
    onChange(newValues.length > 0 ? newValues : undefined);
  };

  return (
    <div>
      {label && (
        <label style={{
          display: "block",
          marginBottom: "12px",
          fontWeight: "500",
          color: "#374151",
          fontSize: "14px",
        }}>
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </label>
      )}
      <div style={{ 
        display: "flex", 
        flexDirection: "column", 
        gap: "8px",
        padding: "12px",
        border: "1px solid #d1d5db",
        borderRadius: "6px",
        backgroundColor: disabled || readonly ? "#f9fafb" : "white",
      }}>
        {enumOptions.map((option: { value: string | number | boolean; label: string }, index: number) => {
          const isChecked = selectedValues.includes(option.value);
          
          return (
            <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                id={`${id}_${index}`}
                checked={isChecked}
                disabled={disabled || readonly}
                onChange={(event) => handleChange(option.value, event.target.checked)}
                style={{
                  width: "16px",
                  height: "16px",
                  cursor: disabled || readonly ? "not-allowed" : "pointer",
                }}
              />
              <label
                htmlFor={`${id}_${index}`}
                style={{
                  fontSize: "14px",
                  color: "#374151",
                  cursor: disabled || readonly ? "not-allowed" : "pointer",
                  userSelect: "none",
                }}
              >
                {option.label}
              </label>
            </div>
          );
        })}
      </div>
      {enumOptions.length === 0 && (
        <div style={{ 
          padding: "12px", 
          border: "1px dashed #d1d5db", 
          borderRadius: "6px",
          color: "#6b7280",
          fontSize: "14px",
          textAlign: "center"
        }}>
          No options available
        </div>
      )}
    </div>
  );
};

export default CheckboxesWidget;
