import React from 'react';
import Form, { IChangeEvent } from '@rjsf/core';
import validator from '@rjsf/validator-ajv8';
import { formSchema } from '../../../schemas/formSchema';
import { createFormUiSchema } from '../../../schemas/formUiSchema';
import styles from './MyForm.module.css';

interface FormData {
  unitTestScore: number;
  levelFit: string;
  progressCheck: string;
  passPrediction: string;
  recommendation: string;
  teacherCommentENG: string;
  teacherCommentVIE: string;
  parentsPartnership: string;
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

export default function UnitTestScoreForm({ onFormChange, onValidation, resetTrigger }: MyFormProps) {
  const formUiSchema = createFormUiSchema(styles);
  
  const initialFormData = {
    unitTestScore: 0,
    levelFit: '',
    progressCheck: '',
    passPrediction: '',
    recommendation: '',
    teacherCommentENG: '',
    teacherCommentVIE: '',
    parentsPartnership: '',
  };
  
  const [currentData, setCurrentData] = React.useState<FormData>(initialFormData);

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
    const requiredFields = ['levelFit', 'progressCheck', 'passPrediction', 'recommendation', 'teacherCommentENG', 'teacherCommentVIE', 'parentsPartnership'];
    const hasEmptyRequiredFields = requiredFields.some(field => !currentData[field as keyof FormData] || currentData[field as keyof FormData].toString().trim() === '');
    const hasInvalidUnitScore = currentData.unitTestScore <= 0;
    
    const isValid = !hasErrors && !hasEmptyRequiredFields && !hasInvalidUnitScore;
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
  }, [resetTrigger]);

  return (
    <div className={styles.formContainer}>
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
      />
    </div>
  );
}
