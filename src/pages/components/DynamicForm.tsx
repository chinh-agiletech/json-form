import React, { useState, useCallback, useEffect } from "react";
import Form, { IChangeEvent } from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { JSONSchema7 } from 'json-schema';
import CustomTextWidget from './ui/CustomTextWidget/CustomTextWidget';
import CustomTextArea from './ui/CustomTextArea/CustomTextArea';
import CustomNumberWidget from './ui/CustomNumberWidget/CustomNumberWidget';
import styles from './DynamicForm.module.css';

interface DynamicFormProps {
  schema: JSONSchema7;
  onClose?: () => void;
  onFormChange?: (data: any) => void;
  onValidation?: (isValid: boolean, errors: ValidationError[]) => void;
  resetTrigger?: number;
}

interface ValidationError {
  message?: string;
  stack?: string;
  name?: string;
  property?: string;
}

export default function DynamicForm({ 
  schema, 
  onClose, 
  onFormChange, 
  onValidation, 
  resetTrigger 
}: DynamicFormProps) {
  const [formData, setFormData] = useState<any>({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Create default UI schema for better styling
  const createUiSchema = (schema: JSONSchema7) => {
    const uiSchema: any = {
      "ui:submitButtonOptions": {
        "norender": true
      }
    };
    
    if (schema.properties) {
      const propertyKeys = Object.keys(schema.properties);
      const propertyCount = propertyKeys.length;
      
      // Set order for consistent layout
      uiSchema["ui:order"] = propertyKeys;
      
      propertyKeys.forEach((key, index) => {
        const property = schema.properties![key] as JSONSchema7;
        
        // Determine layout based on field type and position
        if (property.type === 'string' && property.maxLength && property.maxLength > 100) {
          // Large text fields - use textarea
          if (propertyCount <= 2) {
            uiSchema[key] = {
              "ui:widget": "TextAreaWidget",
              "ui:options": {
                rows: 4,
                classNames: index % 2 === 0 ? "form-textarea-left" : "form-textarea-right"
              }
            };
          } else {
            uiSchema[key] = {
              "ui:widget": "TextAreaWidget",
              "ui:options": {
                rows: 4,
                classNames: "form-textarea-full"
              }
            };
          }
        } else if (property.type === 'number' || property.type === 'integer') {
          // Number fields
          if (propertyCount <= 3) {
            uiSchema[key] = {
              "ui:widget": "NumberWidget",
              "ui:options": {
                classNames: "form-row-3-col"
              }
            };
          } else if (propertyCount <= 4) {
            uiSchema[key] = {
              "ui:widget": "NumberWidget",
              "ui:options": {
                classNames: "form-row-4-col"
              }
            };
          } else {
            uiSchema[key] = {
              "ui:widget": "NumberWidget",
              "ui:options": {
                classNames: "form-single-col"
              }
            };
          }
        } else {
          // Regular text fields
          if (propertyCount <= 2) {
            uiSchema[key] = {
              "ui:options": {
                classNames: "form-row-2-col"
              }
            };
          } else if (propertyCount <= 3) {
            uiSchema[key] = {
              "ui:options": {
                classNames: "form-row-3-col"
              }
            };
          } else if (propertyCount <= 4) {
            uiSchema[key] = {
              "ui:options": {
                classNames: "form-row-4-col"
              }
            };
          } else {
            uiSchema[key] = {
              "ui:options": {
                classNames: "form-single-col"
              }
            };
          }
        }
        
        // Special handling for email format
        if (property.format === 'email') {
          uiSchema[key] = {
            ...uiSchema[key],
            "ui:options": {
              ...uiSchema[key]["ui:options"],
              inputType: "email"
            }
          };
        }
      });
    }
    
    return uiSchema;
  };

  const uiSchema = createUiSchema(schema);

  const onSubmit = ({ formData }: IChangeEvent<any>) => {
    console.log("Form Data Submitted:", formData);
    alert(JSON.stringify(formData, null, 2));
    
    // Reset form
    setFormData({});
    setIsFormValid(false);
    
    // Close modal
    if (onClose) {
      onClose();
    }
  };

  const onChange = ({ formData }: IChangeEvent<any>) => {
    if (formData) {
      setFormData(formData);
      onFormChange?.(formData);
    }
  };

  const onError = (errors: ValidationError[]) => {
    onValidation?.(false, errors);
  };

  // Validate form data manually
  const validateForm = useCallback(() => {
    const result = validator.validateFormData(formData, schema);
    const hasErrors = result.errors && result.errors.length > 0;

    // Check for empty required fields
    const requiredFields = schema.required || [];
    const hasEmptyRequiredFields = requiredFields.some(
      (field) =>
        !formData[field] ||
        (typeof formData[field] === 'string' && formData[field].trim() === "")
    );

    const isValid = !hasErrors && !hasEmptyRequiredFields;
    setIsFormValid(isValid);
    onValidation?.(isValid, (result.errors || []) as ValidationError[]);
    return isValid;
  }, [formData, schema, onValidation]);

  // Call validation whenever data changes
  useEffect(() => {
    validateForm();
  }, [validateForm]);

  // Reset form when resetTrigger changes
  useEffect(() => {
    if (resetTrigger !== undefined && resetTrigger > 0) {
      setFormData({});
    }
  }, [resetTrigger]);

  return (
    <div>
      {/* Dynamic Form */}
      <Form
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        onSubmit={onSubmit}
        onChange={onChange}
        onError={onError}
        formData={formData}
        liveValidate={false}
        showErrorList={false}
        noValidate={true}
        widgets={{ 
          NumberWidget: CustomNumberWidget, 
          TextAreaWidget: CustomTextArea,
          TextWidget: CustomTextWidget
        }}
      />

      {/* Only show action buttons if this is a standalone form (has onClose) */}
      {onClose && (
        <>
          {/* Schema Info */}
          <div style={{ 
            marginBottom: "20px", 
            padding: "12px", 
            backgroundColor: "#f9fafb", 
            borderRadius: "8px",
            border: "1px solid #e5e7eb"
          }}>
            <h3 style={{ margin: "0 0 8px 0", color: "#374151", fontSize: "16px" }}>
              Schema Info
            </h3>
            <p style={{ margin: "0", fontSize: "14px", color: "#6b7280" }}>
              Required fields: {schema.required ? schema.required.join(", ") : "None"}
            </p>
          </div>

          {/* Action Buttons */}
          <div style={{
            marginTop: "20px",
            display: "flex",
            justifyContent: "flex-end",
            gap: "12px",
          }}>
            <button
              type="button"
              style={{
                padding: "12px 24px",
                backgroundColor: "#fff",
                color: "black",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onClick={() => {
                setFormData({});
                if (onClose) {
                  onClose();
                }
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#f9fafb";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "#fff";
              }}
            >
              Cancel
            </button>
            
            <button
              type="button"
              style={{
                padding: "12px 24px",
                backgroundColor: isFormValid ? "#3b82f6" : "#d1d5db",
                color: isFormValid ? "white" : "#6b7280",
                border: "none",
                borderRadius: "8px",
                fontSize: "16px",
                fontWeight: "500",
                cursor: isFormValid ? "pointer" : "not-allowed",
                opacity: isFormValid ? 1 : 0.8,
                transition: "all 0.2s ease",
              }}
              onClick={() => {
                if (isFormValid) {
                  console.log("Form Data Submitted:", formData);
                  alert(JSON.stringify(formData, null, 2));
                  
                  // Reset form
                  setFormData({});
                  setIsFormValid(false);
                  
                  // Close modal
                  if (onClose) {
                    onClose();
                  }
                }
              }}
              disabled={!isFormValid}
              onMouseEnter={(e) => {
                if (isFormValid) {
                  e.currentTarget.style.backgroundColor = "#2563eb";
                }
              }}
              onMouseLeave={(e) => {
                if (isFormValid) {
                  e.currentTarget.style.backgroundColor = "#3b82f6";
                }
              }}
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
}
