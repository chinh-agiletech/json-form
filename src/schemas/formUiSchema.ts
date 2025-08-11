import CustomTextWidget from '../pages/components/ui/CustomTextWidget/CustomTextWidget';
import CustomTextArea from '../pages/components/ui/CustomTextArea/CustomTextArea';

// Type for CSS module styles
interface CSSModuleClasses {
  readonly [key: string]: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const createFormUiSchema = (_styles?: CSSModuleClasses) => ({
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
    "ui:widget": CustomTextWidget,
    "ui:options": {
      classNames: "form-single-col"
    },
    "ui:placeholder": "Enter number",
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
});

// Default export for backward compatibility
export const formUiSchema = createFormUiSchema();
