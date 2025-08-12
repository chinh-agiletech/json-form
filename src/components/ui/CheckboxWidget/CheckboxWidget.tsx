import React from "react";
import { WidgetProps } from "@rjsf/utils";

const CheckboxWidget: React.FC<WidgetProps> = (props) => {
  const { id, value, required, disabled, readonly, onChange } = props;
  // const label = props.label; // Commented out as it's unused

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <input
        type="checkbox"
        id={id}
        checked={typeof value === "undefined" ? false : value}
        required={required}
        disabled={disabled || readonly}
        onChange={(event) => onChange(event.target.checked)}
        style={{
          width: "16px",
          height: "16px",
          cursor: disabled || readonly ? "not-allowed" : "pointer",
        }}
      />
    </div>
  );
};

export default CheckboxWidget;
