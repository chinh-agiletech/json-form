// import React, { useState } from "react";
// import { JSONSchema7 } from "json-schema";
// import demoSchema from "../schemas/demoSchema.json"; // Import file JSON có sẵn

// interface SchemaInputProps {
//   onSchemaGenerated?: (schema: JSONSchema7, data: any) => void;
// }

// export default function SchemaInput({ onSchemaGenerated }: SchemaInputProps) {
//   const [fieldText, setFieldText] = useState("");
//   const [dataText, setDataText] = useState("");
//   const [error, setError] = useState("");
//   const [availableKeys, setAvailableKeys] = useState<string[]>([]);

//   // Lấy danh sách tất cả x-key có sẵn khi component mount
//   React.useEffect(() => {
//     const keys = Object.entries(demoSchema.properties || {})
//       .map(([propName, propSchema]) => (propSchema as any)["x-key"])
//       .filter(Boolean);
//     setAvailableKeys(keys);
//   }, []);

//   const handleSubmit = () => {
//     try {
//       const selectedKeys = fieldText
//         .split(",")
//         .map((k) => k.trim())
//         .filter(Boolean);

//       const filteredProps: Record<string, any> = {};
//       const filteredRequired: string[] = [];

//       for (const [propName, propSchema] of Object.entries(
//         demoSchema.properties || {}
//       )) {
//         const xKey = (propSchema as any)["x-key"];
//         if (selectedKeys.includes(xKey)) {
//           filteredProps[propName] = propSchema;
//           if (demoSchema.required?.includes(propName)) {
//             filteredRequired.push(propName);
//           }
//         }
//       }

//       if (Object.keys(filteredProps).length === 0) {
//         throw new Error("No matching fields found for the provided x-keys");
//       }

//       const finalSchema: JSONSchema7 = {
//         type: "object",
//         required: filteredRequired,
//         properties: filteredProps,
//       };
//       console.log("Generated Schema:", finalSchema);

//       let parsedData = {};
//       if (dataText.trim()) {
//         parsedData = JSON.parse(dataText);
//       }
//       console.log("Parsed Data:", parsedData);

//       setError("");
//       onSchemaGenerated?.(finalSchema, parsedData);
//     } catch (err) {
//       setError(
//         err instanceof Error
//           ? err.message
//           : "Invalid field list or data JSON"
//       );
//     }
//   };

//   const textareaStyle = {
//     width: "100%",
//     minHeight: "120px",
//     padding: "8px",
//     border: "1px solid #ccc",
//     borderRadius: "6px",
//     fontFamily: "monospace",
//   };

//   return (
//     <div style={{ maxWidth: "800px", margin: "0 auto", padding: "20px" }}>
//       <h2>Schema Input</h2>

//       <div style={{ marginBottom: "16px", padding: "12px", backgroundColor: "#f3f4f6", borderRadius: "6px" }}>
//         <h4 style={{ margin: "0 0 8px", fontSize: "14px", fontWeight: "600" }}>Available X-Keys:</h4>
//         <p style={{ margin: 0, fontSize: "12px", color: "#6b7280", lineHeight: "1.5" }}>
//           {availableKeys.join(", ")}
//         </p>
//       </div>

//       <label>Field (comma separated, match x-key):</label>
//       <textarea
//         style={textareaStyle}
//         value={fieldText}
//         onChange={(e) => setFieldText(e.target.value)}
//         placeholder="Example: fullName,age,gender"
//       />

//       <label>Data JSON (optional - for pre-filling form):</label>
//       <textarea
//         style={textareaStyle}
//         value={dataText}
//         onChange={(e) => setDataText(e.target.value)}
//         placeholder={`Example:
//           {
//             "fullName": "John Doe",
//             "age": 25,
//             "gender": "Male"
//           }`}
//         />

//       {error && <div style={{ color: "red", marginTop: "8px", padding: "8px", backgroundColor: "#fef2f2", borderRadius: "4px" }}>{error}</div>}

//       <button
//         style={{
//           marginTop: "10px",
//           padding: "10px 20px",
//           backgroundColor: "#3b82f6",
//           color: "white",
//           border: "none",
//           borderRadius: "6px",
//           cursor: "pointer",
//         }}
//         onClick={handleSubmit}
//       >
//         Generate Form
//       </button>
//     </div>
//   );
// }
