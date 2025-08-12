import React from "react";
import { WidgetProps } from "@rjsf/utils";

const RangeWidget: React.FC<WidgetProps> = (props) => {
  const { id, value, required, disabled, readonly, onChange, schema } = props;
  // const label = props.label; // Commented out as it's unused

  const min = schema?.minimum || 0;
  const max = schema?.maximum || 100;
  const step = schema?.multipleOf || 1;

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <span style={{ fontSize: "12px", color: "#6b7280", minWidth: "30px" }}>{min}</span>
        <input
          type="range"
          id={id}
          min={min}
          max={max}
          step={step}
          required={required}
          disabled={disabled}
          readOnly={readonly}
          value={value || min}
          onChange={(event) => onChange(Number(event.target.value))}
          style={{
            flex: 1,
            height: "6px",
            borderRadius: "3px",
            background: "#e5e7eb",
            outline: "none",
            cursor: disabled || readonly ? "not-allowed" : "pointer",
          }}
        />
        <span style={{ fontSize: "12px", color: "#6b7280", minWidth: "30px" }}>{max}</span>
      </div>
      <div style={{ 
        textAlign: "center", 
        marginTop: "4px", 
        fontSize: "14px", 
        fontWeight: "500", 
        color: "#374151" 
      }}>
        {value || min}
      </div>
    </div>
  );
};

export default RangeWidget;
