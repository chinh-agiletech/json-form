import { JSONSchema7 } from 'json-schema';

export const formSchema: JSONSchema7 = {
  type: "object",
  required: [
    "unitTestScore",
    "recommendation",
    "teacherCommentENG",
  ],
  properties: {
    unitTestScore: {
      type: "string",
      title: "Unit test score",
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
  },
};
