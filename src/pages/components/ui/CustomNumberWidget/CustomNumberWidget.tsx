import React from "react";
import type { WidgetProps } from "@rjsf/utils";

const CustomNumberWidget = (props: WidgetProps) => {
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
    options,
    schema,
    rawErrors = [],
  } = props;

  return (
    <div>
      <input
        type="number"
        id={id}
        value={value ?? ""}
        required={required}
        disabled={disabled}
        readOnly={readonly}
        min={schema.minimum}
        max={schema.maximum}
        step={(typeof options?.step === "number" || typeof options?.step === "string") ? options.step : 1}
        onChange={(event) => {
          const newValue = event.target.value;
          onChange(newValue === "" ? undefined : Number(newValue));
        }}
        onBlur={onBlur && ((event) => onBlur(id, event.target.value))}
        onFocus={onFocus && ((event) => onFocus(id, event.target.value))}
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
