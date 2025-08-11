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

interface MyFormProps {
  onFormChange?: (data: FormData) => void;
}

export default function UnitTestScoreForm({ onFormChange }: MyFormProps) {
  const formUiSchema = createFormUiSchema(styles);
  
  const [currentData, setCurrentData] = React.useState<FormData>({
    unitTestScore: 0,
    levelFit: '',
    progressCheck: '',
    passPrediction: '',
    recommendation: '',
    teacherCommentENG: '',
    teacherCommentVIE: '',
    parentsPartnership: '',
  });

  const onSubmit = ({ formData }: IChangeEvent<FormData>) => {
    alert(JSON.stringify(formData, null, 2));
  };

  const onChange = ({ formData }: IChangeEvent<FormData>) => {
    if (formData) {
      setCurrentData(formData);
      onFormChange?.(formData);
    }
  };

  return (
    <div className={styles.formContainer}>
      <Form<FormData>
        schema={formSchema}
        uiSchema={formUiSchema}
        validator={validator}
        onSubmit={onSubmit}
        onChange={onChange}
        formData={currentData}
      />
    </div>
  );
}
