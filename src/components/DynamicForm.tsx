// import React, { useState, useCallback, useEffect } from "react";
// import Form, { IChangeEvent } from "@rjsf/core";
// import validator from "@rjsf/validator-ajv8";
// import { JSONSchema7 } from "json-schema";

// // Custom Widgets
// import CustomTextWidget from "./ui/CustomTextWidget/CustomTextWidget";
// import CustomTextArea from "./ui/CustomTextArea/CustomTextArea";
// import CustomNumberWidget from "./ui/CustomNumberWidget/CustomNumberWidget";
// import CheckboxWidget from "./ui/CheckboxWidget/CheckboxWidget";
// import CheckboxesWidget from "./ui/CheckboxesWidget/CheckboxesWidget";
// import SelectWidget from "./ui/SelectWidget/SelectWidget";
// import RadioWidget from "./ui/RadioWidget/RadioWidget";
// import EmailWidget from "./ui/EmailWidget/EmailWidget";
// import DateWidget from "./ui/DateWidget/DateWidget";
// import PasswordWidget from "./ui/PasswordWidget/PasswordWidget";
// import RangeWidget from "./ui/RangeWidget/RangeWidget";

// interface DynamicFormProps {
//   schema: JSONSchema7;
//   uiSchema?: any;
//   initialData?: Record<string, unknown>; // Thêm prop để nhận dữ liệu khởi tạo
//   onClose?: () => void;
//   onFormChange?: (data: Record<string, unknown>) => void;
//   onValidation?: (isValid: boolean, errors: ValidationError[]) => void;
//   resetTrigger?: number;
// }

// interface ValidationError {
//   message?: string;
//   stack?: string;
//   name?: string;
//   property?: string;
// }

// export default function DynamicForm({
//   schema,
//   uiSchema,
//   initialData = {}, // Nhận dữ liệu khởi tạo với giá trị mặc định là object rỗng
//   onClose,
//   onFormChange,
//   onValidation,
//   resetTrigger,
// }: DynamicFormProps) {
//   const [formData, setFormData] = useState<Record<string, unknown>>(initialData);
//   const [isFormValid, setIsFormValid] = useState(false);

//   // Xác định widget phù hợp cho mỗi field
//   const getWidgetForField = (property: JSONSchema7): string => {
//     const type = property.type as string;

//     if (type === "array" && property.items) {
//       const items = property.items as JSONSchema7;
//       if (items.enum?.length) return "CheckboxesWidget";
//       return "SelectWidget";
//     }

//     if (property.format) {
//       switch (property.format) {
//         case "email":
//           return "EmailWidget";
//         case "date":
//           return "DateWidget";
//         case "password":
//           return "PasswordWidget";
//       }
//     }

//     if (property.enum?.length) {
//       return property.enum.length <= 3 ? "RadioWidget" : "SelectWidget";
//     }

//     switch (type) {
//       case "boolean":
//         return "CheckboxWidget";
//       case "string":
//         return property.maxLength && property.maxLength > 100
//           ? "TextAreaWidget"
//           : "TextWidget";
//       case "number":
//       case "integer":
//         return "NumberWidget";
//       default:
//         return "TextWidget";
//     }
//   };

//   // Sinh ra uiSchema mặc định
//   const createUiSchema = (schema: JSONSchema7) => {
//     const generated: Record<string, any> = {
//       "ui:submitButtonOptions": { norender: true },
//     };

//     if (schema.properties) {
//       const keys = Object.keys(schema.properties);
//       generated["ui:order"] = keys;

//       keys.forEach((key, index) => {
//         const prop = schema.properties![key] as JSONSchema7;
//         const widget = getWidgetForField(prop);

//         let layoutClass = "form-single-col";
//         if (widget === "TextAreaWidget") {
//           layoutClass = "form-textarea-full";
//         } else if (keys.length <= 2) {
//           layoutClass = "form-row-2-col";
//         } else if (keys.length <= 3) {
//           layoutClass = "form-row-3-col";
//         } else if (keys.length <= 4) {
//           layoutClass = "form-row-4-col";
//         }

//         generated[key] = {
//           "ui:widget": widget,
//           "ui:options": {
//             classNames: layoutClass,
//             rows: widget === "TextAreaWidget" ? 4 : undefined,
//           },
//           ...(prop.description && { "ui:description": prop.description }),
//         };
//       });
//     }

//     return generated;
//   };

//   const finalUiSchema = uiSchema || createUiSchema(schema);

//   const onSubmit = ({ formData }: IChangeEvent) => {
//     console.log("Form Data Submitted:", formData);
    
//     // Hiển thị dữ liệu đã submit với format đẹp hơn
//     const submittedData = {
//       ...formData,
//       _submittedAt: new Date().toISOString(),
//       _schemaFields: Object.keys(schema.properties || {}),
//     };
    
//     alert(`Form Submitted Successfully!\n\n${JSON.stringify(submittedData, null, 2)}`);
    
//     // Reset form về dữ liệu khởi tạo
//     setFormData(initialData || {});
//     setIsFormValid(false);
//     onClose?.();
//   };

//   const onChange = ({ formData }: IChangeEvent) => {
//     setFormData(formData || {});
//     onFormChange?.(formData);
//   };

//   const onError = (errors: ValidationError[]) => {
//     onValidation?.(false, errors);
//   };

//   const validateForm = useCallback(() => {
//     const result = validator.validateFormData(formData, schema);
//     const requiredFields = schema.required || [];
//     const hasEmptyRequired = requiredFields.some(
//       (field) =>
//         !formData[field] ||
//         (typeof formData[field] === "string" && formData[field].trim() === "")
//     );
//     const isValid = !result.errors.length && !hasEmptyRequired;
//     setIsFormValid(isValid);
//     onValidation?.(isValid, result.errors as ValidationError[]);
//   }, [formData, schema, onValidation]);

//   // Cập nhật formData khi có dữ liệu khởi tạo mới
//   useEffect(() => {
//     if (initialData && Object.keys(initialData).length > 0) {
//       setFormData(initialData);
//     }
//   }, [initialData]);

//   useEffect(() => {
//     validateForm();
//   }, [validateForm]);

//   useEffect(() => {
//     if (resetTrigger && resetTrigger > 0) {
//       setFormData(initialData || {}); // Reset về dữ liệu khởi tạo thay vì object rỗng
//     }
//   }, [resetTrigger, initialData]);

//   return (
//     <>
//       <Form
//         schema={schema}
//         uiSchema={finalUiSchema}
//         validator={validator}
//         onSubmit={onSubmit}
//         onChange={onChange}
//         onError={onError}
//         formData={formData}
//         liveValidate={true} // Bật liveValidate
//         showErrorList={false}
//         noValidate={true} // Tắt noValidate
//         widgets={{
//           TextWidget: CustomTextWidget,
//           TextAreaWidget: CustomTextArea,
//           NumberWidget: CustomNumberWidget,
//           CheckboxWidget,
//           CheckboxesWidget,
//           SelectWidget,
//           RadioWidget,
//           EmailWidget,
//           DateWidget,
//           PasswordWidget,
//           RangeWidget,
//         }}
//       />

//       {onClose && (
//         <div style={{ marginTop: "20px" }}>
//           <div
//             style={{
//               padding: "12px",
//               backgroundColor: "#f9fafb",
//               borderRadius: "8px",
//               border: "1px solid #e5e7eb",
//               marginBottom: "20px",
//             }}
//           >
//             <h3 style={{ margin: "0 0 8px", fontSize: "16px" }}>Schema Info</h3>
//             <p style={{ margin: "0 0 4px", fontSize: "14px" }}>
//               Required fields:{" "}
//               {schema.required?.length ? schema.required.join(", ") : "None"}
//             </p>
//             <p style={{ margin: "0 0 4px", fontSize: "14px" }}>
//               Total fields: {Object.keys(schema.properties || {}).length}
//             </p>
//             <p style={{ margin: 0, fontSize: "14px", color: "#6b7280" }}>
//               X-Keys: {Object.entries(schema.properties || {})
//                 .map(([_, prop]: [string, any]) => prop["x-key"])
//                 .filter(Boolean)
//                 .join(", ") || "None"}
//             </p>
//             {initialData && Object.keys(initialData).length > 0 && (
//               <p style={{ margin: "4px 0 0", fontSize: "14px", color: "#059669" }}>
//                 ✓ Form initialized with data
//               </p>
//             )}
//           </div>

//           <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
//             <button
//               type="button"
//               style={{
//                 padding: "12px 24px",
//                 backgroundColor: "#fff",
//                 border: "1px solid #d1d5db",
//                 borderRadius: "8px",
//                 cursor: "pointer",
//               }}
//               onClick={() => {
//                 setFormData(initialData || {}); // Reset về dữ liệu khởi tạo
//                 onClose();
//               }}
//             >
//               Cancel
//             </button>

//             <button
//               type="button"
//               style={{
//                 padding: "12px 24px",
//                 backgroundColor: isFormValid ? "#3b82f6" : "#d1d5db",
//                 color: isFormValid ? "#fff" : "#6b7280",
//                 border: "none",
//                 borderRadius: "8px",
//                 cursor: isFormValid ? "pointer" : "not-allowed",
//               }}
//               onClick={() => {
//                 if (isFormValid) onSubmit({ formData } as IChangeEvent);
//               }}
//               disabled={!isFormValid}
//             >
//               Submit
//             </button>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }
