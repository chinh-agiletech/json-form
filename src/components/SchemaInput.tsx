import React, { useState } from "react";
import { JSONSchema7 } from 'json-schema';

interface SchemaInputProps {
  onSchemaGenerated?: (schema: JSONSchema7) => void;
}

export default function SchemaInput({ onSchemaGenerated }: SchemaInputProps) {
  const [schemaText, setSchemaText] = useState("");
  // const [parsedSchema, setParsedSchema] = useState<JSONSchema7 | null>(null); // Commented out as it's unused
  const [error, setError] = useState("");

  const defaultSchema = {
    type: "object",
    required: ["name", "email", "isActive"],
    properties: {
      name: {
        type: "string",
        title: "Full Name",
        description: "Enter your full name"
      },
      email: {
        type: "string",
        title: "Email Address", 
        format: "email",
        description: "We'll never share your email"
      },
      password: {
        type: "string",
        title: "Password",
        format: "password",
        minLength: 6
      },
      age: {
        type: "integer",
        title: "Age",
        minimum: 18,
        maximum: 100,
        description: "Must be 18 or older"
      },
      rating: {
        type: "number",
        title: "Rating",
        minimum: 1,
        maximum: 10,
        description: "Rate from 1 to 10"
      },
      birthdate: {
        type: "string",
        title: "Birth Date",
        format: "date"
      },
      country: {
        type: "string",
        title: "Country",
        enum: ["US", "UK", "Canada", "Australia", "Germany", "France"],
        description: "Select your country"
      },
      gender: {
        type: "string", 
        title: "Gender",
        enum: ["Male", "Female", "Other"],
        description: "Select your gender"
      },
      isActive: {
        type: "boolean",
        title: "Active User",
        description: "Check if you want to receive notifications"
      },
      bio: {
        type: "string",
        title: "Biography",
        maxLength: 500,
        description: "Tell us about yourself"
      },
      skills: {
        type: "array",
        title: "Skills",
        items: {
          type: "string",
          enum: ["JavaScript", "Python", "Java", "C++", "React", "Vue", "Angular"]
        },
        uniqueItems: true,
        description: "Select your skills"
      },
      hobbies: {
        type: "array", 
        title: "Hobbies",
        items: {
          type: "string",
          enum: ["Reading", "Gaming", "Sports", "Music", "Cooking", "Travel"]
        },
        uniqueItems: true,
        description: "Select your hobbies"
      },
      favoriteColor: {
        type: "string",
        title: "Favorite Color",
        enum: ["Red", "Blue", "Green", "Yellow", "Purple", "Orange"],
        description: "Pick your favorite color"
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
      
      // setParsedSchema(schema); // Commented out as parsedSchema is unused
      setError("");
      
      // Send schema to parent component
      if (onSchemaGenerated) {
        onSchemaGenerated(schema);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid JSON schema");
      // setParsedSchema(null); // Commented out as parsedSchema is unused
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
            placeholder={`Try this simple test schema:
{
  "type": "object",
  "properties": {
    "name": {"type": "string", "title": "Name"},
    "isActive": {"type": "boolean", "title": "Active"},
    "skills": {
      "type": "array",
      "title": "Skills",
      "items": {"type": "string", "enum": ["JS", "Python", "Java"]}
    },
    "color": {"type": "string", "title": "Color", "enum": ["Red", "Blue", "Green"]}
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
