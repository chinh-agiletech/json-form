import React from "react";
import { WidgetProps } from "@rjsf/utils";

const RadioWidget: React.FC<WidgetProps> = (props) => {
  const { id, options, value, required, disabled, readonly, onChange } = props;
  // const label = props.label; // Commented out as it's unused

  const { enumOptions = [] } = options || {};

  return (
    <div>
      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
        {enumOptions.map((option: { value: string | number | boolean; label: string }, index: number) => (
          <div key={index} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <input
              type="radio"
              id={`${id}_${index}`}
              name={id}
              value={String(option.value)}
              checked={value === option.value}
              required={required}
              disabled={disabled || readonly}
              onChange={() => onChange(option.value)}
              style={{
                width: "16px",
                height: "16px",
                cursor: disabled || readonly ? "not-allowed" : "pointer",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RadioWidget;
