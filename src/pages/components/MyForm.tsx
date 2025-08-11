import React from 'react';
import Form, { IChangeEvent } from '@rjsf/core';
import { JSONSchema7 } from 'json-schema';
import validator from '@rjsf/validator-ajv8';
import CustomNumberWidget from './ui/CustomNumberWidget/CustomNumberWidget';
import CustomTextArea from './ui/CustomTextArea/CustomTextArea';
import CustomTextWidget from './ui/CustomTextWidget/CustomTextWidget';

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

const schema: JSONSchema7 = {
  type: "object",
  required: [
    "unitTestScore",
    "levelFit",
    "progressCheck",
    "passPrediction",
    "recommendation",
    "teacherCommentENG",
    "teacherCommentVIE",
    "parentsPartnership",
  ],
  properties: {
    unitTestScore: {
      type: "number",
      title: "Unit test score",
      minimum: 0
    },
    // Text areas - 2 columns layout
    levelFit: {
      type: "string",
      title: "Level fit",
      maxLength: 250,
    },
    progressCheck: {
      type: "string",
      title: "Progress check",
      maxLength: 250,
    },
    passPrediction: {
      type: "string",
      title: "Pass prediction",
      maxLength: 250,
    },
    recommendation: {
      type: "string",
      title: "Recommendation",
      maxLength: 250,
    },
    teacherCommentENG: {
      type: "string",
      title: "Teacher comment (ENG)",
      maxLength: 250,
    },
    teacherCommentVIE: {
      type: "string",
      title: "Teacher comment (VIE)",
      maxLength: 250,
    },
    parentsPartnership: {
      type: "string",
      title: "Parents partnership",
      maxLength: 250,
    },
  },
};

const uiSchema = {
  "ui:submitButtonOptions": {
    "norender": true
  },
  "ui:order": [
    "unitTestScore",
    "levelFit", "progressCheck",
    "passPrediction", "recommendation", 
    "teacherCommentENG", "teacherCommentVIE",
    "parentsPartnership"
  ],
  unitTestScore: {
    "ui:widget": CustomNumberWidget,
    "ui:placeholder": "Enter number",
    "ui:options": {
      classNames: "form-single-col"
    }
  },
  levelFit: {
    "ui:widget": CustomTextArea,
    "ui:options": {
      rows: 4,
      classNames: "form-textarea-left"
    },
    "ui:placeholder": "Enter text",
  },
  progressCheck: {
    "ui:widget": CustomTextArea,
    "ui:options": {
      rows: 4,
      classNames: "form-textarea-right"
    },
    "ui:placeholder": "Enter text",
  },
  passPrediction: {
    "ui:widget": CustomTextArea,
    "ui:options": {
      rows: 4,
      classNames: "form-textarea-left"
    },
    "ui:placeholder": "Enter text",
  },
  recommendation: {
    "ui:widget": CustomTextArea,
    "ui:options": {
      rows: 4,
      classNames: "form-textarea-right"
    },
    "ui:placeholder": "Enter text",
  },
  teacherCommentENG: {
    "ui:widget": CustomTextArea,
    "ui:options": {
      rows: 4,
      classNames: "form-textarea-left"
    },
    "ui:placeholder": "Enter text",
  },
  teacherCommentVIE: {
    "ui:widget": CustomTextArea,
    "ui:options": {
      rows: 4,
      classNames: "form-textarea-right"
    },
    "ui:placeholder": "Enter text",
  },
  parentsPartnership: {
    "ui:widget": CustomTextArea,
    "ui:options": {
      rows: 4,
      classNames: "form-textarea-left"
    },
    "ui:placeholder": "Enter text",
  },
};

export default function UnitTestScoreForm({ onFormChange }: MyFormProps) {
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
    <div style={{ maxWidth: 1000, margin: "auto"}}>
      <style>{`
        .form-row-4-col {
          width: 23% !important;
          display: inline-block !important;
          margin-right: 2.66% !important;
          vertical-align: top !important;
        }
        .form-row-4-col:last-child {
          margin-right: 0 !important;
        }
        .form-row-3-col {
          width: 31.33% !important;
          display: inline-block !important;
          margin-right: 3% !important;
          vertical-align: top !important;
        }
        .form-row-3-col:last-child {
          margin-right: 0 !important;
        }
        .form-single-col {
          width: 100% !important;
          margin-bottom: 20px !important;
        }
        .form-textarea-left {
          width: 48% !important;
          display: inline-block !important;
          margin-right: 4% !important;
          vertical-align: top !important;
        }
        .form-textarea-right {
          width: 48% !important;
          display: inline-block !important;
          vertical-align: top !important;
        }
        .form-textarea-full {
          width: 100% !important;
        }
        .rjsf > fieldset {
          border: none !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .field-object {
          display: flex !important;
          flex-wrap: wrap !important;
          gap: 0 !important;
        }
        .field-object > .form-group {
          margin-bottom: 16px !important;
        }
        .form-group.form-row-4-col,
        .form-group.form-row-3-col,
        .form-group.form-textarea-left,
        .form-group.form-textarea-right {
          margin-bottom: 16px !important;
        }
      `}</style>
      <Form<FormData>
        schema={schema}
        uiSchema={uiSchema}
        validator={validator}
        onSubmit={onSubmit}
        onChange={onChange}
        formData={currentData}
      />
    </div>
  );
}
