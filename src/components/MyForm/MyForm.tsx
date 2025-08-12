import React from "react";
import Form, { IChangeEvent } from "@rjsf/core";
import validator from "@rjsf/validator-ajv8";
import { formSchema } from "../../schemas/formSchema";
import formUiSchema from "../../schemas/formUiSchema.json";
// import styles from "./MyForm.module.css"; // Commented out as it's unused
// import CustomTextWidget from '../ui/CustomTextWidget/CustomTextWidget'; // Commented out as it's unused
import CustomTextArea from '../ui/CustomTextArea/CustomTextArea';
import CustomNumberWidget from '../ui/CustomNumberWidget/CustomNumberWidget';

interface FormData {
  unitTestScore: string;
  recommendation: string;
  teacherCommentENG: string;
}

interface ValidationError {
  message?: string;
  stack?: string;
  name?: string;
  property?: string;
}

interface MyFormProps {
  onFormChange?: (data: FormData) => void;
  onValidation?: (isValid: boolean, errors: ValidationError[]) => void;
  resetTrigger?: number; // Add trigger to reset form
}

export default function UnitTestScoreForm({
  onFormChange,
  onValidation,
  resetTrigger,
}: MyFormProps) {
  // const formUiSchema = createFormUiSchema(styles);

  const initialFormData = React.useMemo(() => ({
    unitTestScore: "",
    recommendation: "",
    teacherCommentENG: "",
  }), []);

  const [currentData, setCurrentData] =
    React.useState<FormData>(initialFormData);

  const onSubmit = ({ formData }: IChangeEvent<FormData>) => {
    alert(JSON.stringify(formData, null, 2));
  };

  const onChange = ({ formData }: IChangeEvent<FormData>) => {
    if (formData) {
      setCurrentData(formData);
      onFormChange?.(formData);
    }
  };

  const onError = (errors: ValidationError[]) => {
    onValidation?.(false, errors);
  };

  // Validate form data manually
  const validateForm = React.useCallback(() => {
    const result = validator.validateFormData(currentData, formSchema);
    const hasErrors = result.errors && result.errors.length > 0;

    // Additional check for empty required fields
    const requiredFields = [
      "unitTestScore",
      "recommendation",
      "teacherCommentENG",
    ];
    const hasEmptyRequiredFields = requiredFields.some(
      (field) =>
        !currentData[field as keyof FormData] ||
        currentData[field as keyof FormData].toString().trim() === ""
    );

    const isValid = !hasErrors && !hasEmptyRequiredFields;
    onValidation?.(isValid, (result.errors || []) as ValidationError[]);
    return isValid;
  }, [currentData, onValidation]);

  // Call validation whenever data changes
  React.useEffect(() => {
    validateForm();
  }, [validateForm]);

  // Reset form when resetTrigger changes
  React.useEffect(() => {
    if (resetTrigger !== undefined && resetTrigger > 0) {
      setCurrentData(initialFormData);
    }
  }, [resetTrigger, initialFormData]);

  return (
      <Form<FormData>
        schema={formSchema}
        uiSchema={formUiSchema}
        validator={validator}
        onSubmit={onSubmit}
        onChange={onChange}
        onError={onError}
        formData={currentData}
        liveValidate={false}
        showErrorList={false}
        noValidate={true}
        widgets={{ NumberWidget: CustomNumberWidget, TextAreaWidget: CustomTextArea }}
      />
  );
}
