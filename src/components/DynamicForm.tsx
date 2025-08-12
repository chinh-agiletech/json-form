import React, { useState, useCallback, useEffect } from "react";
import Form, { IChangeEvent } from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { JSONSchema7 } from 'json-schema';
import CustomTextWidget from './ui/CustomTextWidget/CustomTextWidget';
import CustomTextArea from './ui/CustomTextArea/CustomTextArea';
import CustomNumberWidget from './ui/CustomNumberWidget/CustomNumberWidget';
import CheckboxWidget from './ui/CheckboxWidget/CheckboxWidget';
import CheckboxesWidget from './ui/CheckboxesWidget/CheckboxesWidget';
import SelectWidget from './ui/SelectWidget/SelectWidget';
import RadioWidget from './ui/RadioWidget/RadioWidget';
import EmailWidget from './ui/EmailWidget/EmailWidget';
import DateWidget from './ui/DateWidget/DateWidget';
import PasswordWidget from './ui/PasswordWidget/PasswordWidget';
import RangeWidget from './ui/RangeWidget/RangeWidget';

// Widget mapping based on field types and formats (currently unused but kept for future reference)
// const widgetMap = {
//   boolean: {
//     checkbox: "CheckboxWidget",
//     radio: "RadioWidget", 
//     select: "SelectWidget",
//   },
//   string: {
//     text: "TextWidget",
//     password: "PasswordWidget",
//     email: "EmailWidget",
//     textarea: "TextAreaWidget",
//     radio: "RadioWidget",
//     select: "SelectWidget",
//     date: "DateWidget",
//     color: "ColorWidget",
//   },
//   number: {
//     text: "TextWidget",
//     select: "SelectWidget",
//     range: "RangeWidget",
//     radio: "RadioWidget",
//   },
//   integer: {
//     text: "TextWidget", 
//     select: "SelectWidget",
//     range: "RangeWidget",
//     radio: "RadioWidget",
//   },
//   array: {
//     select: "SelectWidget",
//     checkboxes: "CheckboxesWidget",
//   },
// };

interface DynamicFormProps {
  schema: JSONSchema7;
  onClose?: () => void;
  onFormChange?: (data: Record<string, unknown>) => void;
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
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [isFormValid, setIsFormValid] = useState(false);

  // Function to determine the best widget based on field properties
  const getWidgetForField = (property: JSONSchema7): string => {
    const type = property.type as string;
    
    // Handle arrays first
    if (type === 'array' && property.items) {
      const items = property.items as JSONSchema7;
      if (items.enum && items.enum.length > 0) {
        return 'CheckboxesWidget'; // Multiple selection for arrays with enum
      }
      return 'SelectWidget';
    }
    
    // Handle specific formats first
    if (property.format) {
      switch (property.format) {
        case 'email':
          return 'EmailWidget';
        case 'date':
          return 'DateWidget';
        case 'password':
          return 'PasswordWidget';
        default:
          break;
      }
    }
    
    // Handle enums (select or radio)
    if (property.enum && property.enum.length > 0) {
      if (property.enum.length <= 3) {
        return type === 'boolean' ? 'CheckboxWidget' : 'RadioWidget';
      } else {
        return 'SelectWidget';
      }
    }
    
    // Handle based on type
    switch (type) {
      case 'boolean':
        return 'CheckboxWidget';
      case 'string':
        if (property.maxLength && property.maxLength > 100) {
          return 'TextAreaWidget';
        }
        return 'TextWidget';
      case 'number':
      case 'integer':
        return 'NumberWidget';
      default:
        return 'TextWidget';
    }
  };

  // Create default UI schema for better styling
  const createUiSchema = (schema: JSONSchema7) => {
    const uiSchema: Record<string, Record<string, unknown> | string[] | unknown> = {
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
        const widgetType = getWidgetForField(property);
        
        // Determine layout class based on widget type and field count
        let layoutClass = "form-single-col";
        
        if (widgetType === 'TextAreaWidget') {
          // Textarea fields
          if (propertyCount <= 2) {
            layoutClass = index % 2 === 0 ? "form-textarea-left" : "form-textarea-right";
          } else {
            layoutClass = "form-textarea-full";
          }
        } else if (widgetType === 'CheckboxWidget' || widgetType === 'RadioWidget') {
          // Boolean and radio fields take full width
          layoutClass = "form-single-col";
        } else {
          // Regular fields
          if (propertyCount <= 2) {
            layoutClass = "form-row-2-col";
          } else if (propertyCount <= 3) {
            layoutClass = "form-row-3-col";
          } else if (propertyCount <= 4) {
            layoutClass = "form-row-4-col";
          } else {
            layoutClass = "form-single-col";
          }
        }
        
        uiSchema[key] = {
          "ui:widget": widgetType,
          "ui:options": {
            classNames: layoutClass,
            rows: widgetType === 'TextAreaWidget' ? 4 : undefined,
          }
        };
        
        // Add specific options for certain widgets
        if (property.format === 'email') {
          (uiSchema[key] as Record<string, unknown>)["ui:options"] = {
            ...(uiSchema[key] as Record<string, unknown>)["ui:options"] as Record<string, unknown>,
            inputType: "email"
          };
        }
        
        if (property.description) {
          (uiSchema[key] as Record<string, unknown>)["ui:description"] = property.description;
        }
      });
    }
    
    return uiSchema;
  };

  const uiSchema = createUiSchema(schema);

  const onSubmit = ({ formData }: IChangeEvent) => {
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

  const onChange = ({ formData }: IChangeEvent) => {
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
          TextWidget: CustomTextWidget,
          
          // Additional widgets
          CheckboxWidget: CheckboxWidget,
          CheckboxesWidget: CheckboxesWidget,
          SelectWidget: SelectWidget,
          RadioWidget: RadioWidget,
          EmailWidget: EmailWidget,
          DateWidget: DateWidget,
          PasswordWidget: PasswordWidget,
          RangeWidget: RangeWidget,
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
