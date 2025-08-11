import { JSONSchema7 } from 'json-schema';

export const formSchema: JSONSchema7 = {
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
