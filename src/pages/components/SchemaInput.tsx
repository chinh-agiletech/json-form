import React, { useState } from "react";
import { JSONSchema7 } from 'json-schema';

interface SchemaInputProps {
  onSchemaGenerated?: (schema: JSONSchema7) => void;
}

export default function SchemaInput({ onSchemaGenerated }: SchemaInputProps) {
  const [schemaText, setSchemaText] = useState("");
  const [parsedSchema, setParsedSchema] = useState<JSONSchema7 | null>(null);
  const [error, setError] = useState("");

  const defaultSchema = {
    type: "object",
    required: ["name", "email"],
    properties: {
      name: {
        type: "string",
        title: "Full Name"
      },
      email: {
        type: "string",
        title: "Email Address",
        format: "email"
      },
      age: {
        type: "number",
        title: "Age",
        minimum: 1,
        maximum: 120
      },
      message: {
        type: "string",
        title: "Message",
        maxLength: 500
      }
    }
  };

  const handleSchemaSubmit = () => {
    try {
      let schema;
      
      if (schemaText.trim() === "") {
        // Use default schema if input is empty
        schema = defaultSchema;
      } else {
        // Parse the input schema
        schema = JSON.parse(schemaText);
      }
      
      // Basic validation
      if (!schema.type || !schema.properties) {
        throw new Error("Invalid schema: must have 'type' and 'properties'");
      }
      
      setParsedSchema(schema);
      setError("");
      
      // Send schema to parent component
      if (onSchemaGenerated) {
        onSchemaGenerated(schema);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON schema");
      setParsedSchema(null);
    }
  };

  const inputStyle = {
    width: "100%",
    minHeight: "200px",
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
        <h2 style={{ marginBottom: "16px", color: "#1f2937", fontSize: "24px", fontWeight: "600" }}>
          JSON Schema Input
        </h2>
        
        <div style={{ marginBottom: "16px" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "8px", 
            fontWeight: "500", 
            color: "#374151" 
          }}>
            Enter JSON Schema (leave empty to use default schema):
          </label>
          
          <textarea
            value={schemaText}
            onChange={(e) => setSchemaText(e.target.value)}
            placeholder={JSON.stringify(defaultSchema, null, 2)}
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
