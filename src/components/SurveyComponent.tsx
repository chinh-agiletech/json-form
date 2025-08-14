"use client";
import "survey-core/survey-core.css";

import { Model } from "survey-core";
import { Survey } from "survey-react-ui";
import { surveyJson } from "../json/survey";
import styles from "./Survey.module.css";

interface SurveyProps {
  surveyRef: React.MutableRefObject<Model | null>;
}

// Custom CSS classes for SurveyJS components
const customCss = {
  "question": {
    "content": "custom-question-content",
    "titleRequirement": "custom-title-requirement",
    "title": "custom-question-title"
  },
  "text": {
    "root": "custom-text-input"
  },
  "comment": {
    "root": "custom-textarea"
  },
  "dropdown": {
    "root": "custom-dropdown"
  }
};

export default function SurveyComponent({ surveyRef }: SurveyProps) {
  const survey = new Model(surveyJson);
  
  // Survey configuration
  survey.showNavigationButtons = false;
  survey.showCompletePage = false;
  survey.backgroundImage = "";
  
  // Apply custom CSS classes
  survey.css = customCss;
  
  // Set survey theme (optional)
  survey.applyTheme({
    "cssVariables": {
      "--sjs-general-backcolor": "transparent",
      "--sjs-general-backcolor-dark": "transparent",
      "--sjs-general-forecolor": "#333333",
      "--sjs-general-dim-forecolor": "#666666",
      "--sjs-primary-backcolor": "#007acc",
      "--sjs-primary-forecolor": "#ffffff",
      "--sjs-base-unit": "8px",
      "--sjs-corner-radius": "8px",
      "--sjs-secondary-backcolor": "#f8f9fa",
      "--sjs-secondary-forecolor": "#333333",
      "--sjs-shadow-small": "0px 2px 4px rgba(0, 0, 0, 0.1)",
      "--sjs-shadow-medium": "0px 4px 8px rgba(0, 0, 0, 0.15)",
      "--sjs-border-light": "#e0e0e0",
      "--sjs-border-default": "#d0d0d0"
    }
  });
  
  surveyRef.current = survey;
  console.log("Survey initialized with custom styling", survey);

  survey.onComplete.add((sender, options) => {
    console.log(JSON.stringify(sender.data, null, 3));
  });

  return (
    <div className={styles.mySurveyContainer}>
      <Survey model={survey} />
    </div>
  );
}
