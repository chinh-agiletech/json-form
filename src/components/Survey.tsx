'use client'
import 'survey-core/survey-core.css';
import { Model } from 'survey-core';
import { Survey } from 'survey-react-ui';
import styles from './Survey.module.css';

const surveyJson = {
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "panel",
          name: "row1",
          elements: [
            {
              type: "text",
              name: "question1",
              title: "Name",
              // Sửa ở đây
              cssClasses: { root: styles['row-layout-item'] }
            },
            {
              type: "text",
              name: "question2",
              title: "Age",
              inputType: "number",
              cssClasses: { root: styles['row-layout-item'] }
            }
          ],
          // Sửa ở đây
          cssClasses: { panel: styles['row-layout'] }
        },
        {
          type: "dropdown",
          name: "question3",
          title: "Select 1",
          choices: [
            { value: "item_1", text: "A" },
            { value: "item_2", text: "B" }
          ]
        },
        {
          type: "dropdown",
          name: "question4",
          visibleIf: "{question3} notempty",
          title: "Select Nested",
          choices: [
            { value: "a.1", text: "A.1", visibleIf: "{question3} = 'item_1'" },
            { value: "a.2", text: "A.2", visibleIf: "{question3} = 'item_1'" },
            { value: "a.3", text: "B.1", visibleIf: "{question3} = 'item_2'" },
            { value: "a.4", text: "B.2", visibleIf: "{question3} = 'item_2'" }
          ]
        }
      ]
    }
  ]
};


interface SurveyProps {
  surveyRef: React.MutableRefObject<Model | null>;
}

export default function SurveyComponent({ surveyRef }: SurveyProps) {
  const survey = new Model(surveyJson);
  survey.showNavigationButtons = false;
  survey.showCompletePage = false;
  survey.onAfterRenderSurvey.add(() => {
  const panels = document.querySelectorAll('.row-layout');
  panels.forEach(panel => {
    panel.setAttribute(
      "style",
      "display:flex; align-items:center; gap:16px; margin-bottom:16px; background-color:#f9f9f9; padding:12px; border-radius:8px; box-shadow:0 2px 4px rgba(0,0,0,0.1)"
    );
  });
});

  surveyRef.current = survey;

  return <Survey model={survey} />;
}
