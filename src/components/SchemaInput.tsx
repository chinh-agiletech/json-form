import React, { useState } from "react";
import { JSONSchema7 } from "json-schema";

interface SchemaInputProps {
  onSchemaGenerated?: (schema: JSONSchema7) => void;
  onUiSchemaGenerated?: (uiSchema: any) => void;
}

export default function SchemaInput({
  onSchemaGenerated,
  onUiSchemaGenerated,
}: SchemaInputProps) {
  const [uiSchemaText, setUiSchemaText] = useState("");
  const [jsonSchemaText, setJsonSchemaText] = useState("");
  const [error, setError] = useState("");

  const defaultUiSchema = {
    "ui:submitButtonOptions": {
      norender: true,
    },
    "ui:order": ["unitTestScore", "recommendation", "teacherCommentENG"],
    unitTestScore: {
      "ui:widget": "number",
      "ui:options": {
        classNames: "form-single-col",
      },
      "ui:placeholder": "Enter number",
    },
    recommendation: {
      "ui:widget": "textarea",
      "ui:options": {
        rows: 4,
        classNames: "form-textarea-left",
      },
      "ui:placeholder": "Enter text",
    },
    teacherCommentENG: {
      "ui:widget": "textarea",
      "ui:options": {
        rows: 4,
        classNames: "form-textarea-right",
      },
      "ui:placeholder": "Enter text",
    },
  };

  const defaultJsonSchema: JSONSchema7 = {
    type: "object",
    required: ["unitTestScore", "recommendation", "teacherCommentENG"],
    properties: {
      unitTestScore: {
        type: "number",
        title: "Unit Test Score",
        minimum: 0,
        maximum: 100,
      },
      recommendation: {
        type: "string",
        title: "Recommendation",
      },
      teacherCommentENG: {
        type: "string",
        title: "Teacher Comment (English)",
      },
    },
  };

  // Function to generate JSON schema from UI schema
  const generateJsonSchemaFromUiSchema = (uiSchema: any): JSONSchema7 => {
    const properties: Record<string, any> = {};
    const required: string[] = [];

    // Get field order from ui:order or extract from uiSchema keys
    const fieldOrder =
      uiSchema["ui:order"] ||
      Object.keys(uiSchema).filter((key) => !key.startsWith("ui:"));

    fieldOrder.forEach((fieldName: string) => {
      const fieldConfig = uiSchema[fieldName];
      if (fieldConfig && typeof fieldConfig === "object") {
        const widget = fieldConfig["ui:widget"];

        // Determine field type based on widget
        let fieldType = "string";
        let format: string | undefined;

        switch (widget) {
          case "NumberWidget":
            fieldType = "number";
            break;
          case "TextAreaWidget":
            fieldType = "string";
            break;
          case "EmailWidget":
            fieldType = "string";
            format = "email";
            break;
          case "CheckboxWidget":
            fieldType = "boolean";
            break;
          case "DateWidget":
            fieldType = "string";
            format = "date";
            break;
          case "PasswordWidget":
            fieldType = "string";
            format = "password";
            break;
          default:
            fieldType = "string";
        }

        const property: any = {
          type: fieldType,
          title:
            fieldName.charAt(0).toUpperCase() +
            fieldName.slice(1).replace(/([A-Z])/g, " $1"),
        };

        if (format) {
          property.format = format;
        }

        // Add some default constraints
        if (fieldType === "number") {
          property.minimum = 0;
          property.maximum = 100;
        }

        properties[fieldName] = property;
        required.push(fieldName);
      }
    });

    return {
      type: "object",
      required,
      properties,
    };
  };

  const handleSchemaSubmit = () => {
    try {
      let uiSchema;
      let jsonSchema;

      if (uiSchemaText.trim() === "" && jsonSchemaText.trim() === "") {
        // Use default schemas if both inputs are empty
        uiSchema = defaultUiSchema;
        jsonSchema = defaultJsonSchema;
      } else if (jsonSchemaText.trim() !== "") {
        // Use provided JSON schema if available
        jsonSchema = JSON.parse(jsonSchemaText);
        // Use provided UI schema or generate from JSON schema
        if (uiSchemaText.trim() !== "") {
          uiSchema = JSON.parse(uiSchemaText);
        } else {
          uiSchema = defaultUiSchema;
        }
      } else if (uiSchemaText.trim() !== "") {
        uiSchema = JSON.parse(uiSchemaText);
        jsonSchema = generateJsonSchemaFromUiSchema(uiSchema);
      }

      setError("");

      // Send both schemas to parent component
      if (onSchemaGenerated) {
        onSchemaGenerated(jsonSchema);
      }

      if (onUiSchemaGenerated) {
        onUiSchemaGenerated(uiSchema);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Invalid JSON schema or UI schema"
      );
    }
  };

  const inputStyle = {
    width: "100%",
    minHeight: "300px",
    padding: "12px",
    border: "1px solid #d1d5db",
    borderRadius: "8px",
    fontSize: "14px",
    fontFamily: "monospace",
    outline: "none",
    resize: "vertical" as const,
    boxSizing: "border-box" as const,
  };

  const buttonStyle = {
    padding: "12px 24px",
    backgroundColor: "#3b82f6",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s ease",
  };

  const errorStyle = {
    color: "#ef4444",
    fontSize: "14px",
    marginTop: "8px",
    padding: "8px",
    backgroundColor: "#fef2f2",
    border: "1px solid #fecaca",
    borderRadius: "4px",
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
      <div style={{ marginBottom: "20px" }}>
        <h2
          style={{
            marginBottom: "16px",
            color: "#1f2937",
            fontSize: "24px",
            fontWeight: "600",
          }}
        >
          UI Schema Input
        </h2>

        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "500",
              color: "#374151",
            }}
          >
            Enter UI Schema JSON (leave empty to use default UI schema):
          </label>

          <textarea
            value={uiSchemaText}
            onChange={(e) => setUiSchemaText(e.target.value)}
            placeholder={`Try this UI schema example:
{
  "ui:submitButtonOptions": {
    "norender": true
  },
  "ui:order": ["unitTestScore", "recommendation", "teacherCommentENG"],
  "unitTestScore": {
    "ui:widget": "NumberWidget",
    "ui:options": {
      "classNames": "form-single-col"
    },
    "ui:placeholder": "Enter number"
  },
  "recommendation": {
    "ui:widget": "TextAreaWidget",
    "ui:options": {
      "rows": 4,
      "classNames": "form-textarea-left"
    },
    "ui:placeholder": "Enter text"
  },
  "teacherCommentENG": {
    "ui:widget": "TextAreaWidget",
    "ui:options": {
      "rows": 4,
      "classNames": "form-textarea-right"
    },
    "ui:placeholder": "Enter text"
  }
}`}
            style={inputStyle}
          />
        </div>
        <h2
          style={{
            marginBottom: "16px",
            color: "#1f2937",
            fontSize: "24px",
            fontWeight: "600",
          }}
        >
          Schema Input
        </h2>

        <div style={{ marginBottom: "16px" }}>
          <label
            style={{
              display: "block",
              marginBottom: "8px",
              fontWeight: "500",
              color: "#374151",
            }}
          >
            Enter JSON Schema (leave empty to use default or generate from UI
            schema):
          </label>

          <textarea
            value={jsonSchemaText}
            onChange={(e) => setJsonSchemaText(e.target.value)}
            placeholder={`Try this JSON schema example:
{
  "type": "object",
  "required": ["name", "email", "age"],
  "properties": {
    "name": {
      "type": "string",
      "title": "Full Name"
    },
    "email": {
      "type": "string",
      "title": "Email Address",
      "format": "email"
    },
    "age": {
      "type": "number",
      "title": "Age",
      "minimum": 0,
      "maximum": 120
    }
  }
}`}
            style={inputStyle}
          />
        </div>

        {error && (
          <div style={errorStyle}>
            <strong>Error:</strong> {error}
          </div>
        )}

        <button
          onClick={handleSchemaSubmit}
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = "#2563eb";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = "#3b82f6";
          }}
        >
          Generate Form
        </button>
      </div>
    </div>
  );
}
