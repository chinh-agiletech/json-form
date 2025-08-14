export const surveyJson = {
  elements: [
    {
      type: "text",
      name: "name",
      title: "Name",
      startWithNewLine: false,
      placeholder: "Enter your name",
    },
    {
      type: "comment",
      name: "additionalNotes",
      title: "Additional Notes",

      placeholder: "Enter any extra information here...",
      maxLength: 250,
      charCounter: true,
    },
    {
      type: "comment",
      name: "additionalNotes2",
      title: "Additional Notes 2",
      startWithNewLine: false,
      placeholder: "Enter any extra information here...",
      maxLength: 250,
      charCounter: true,
    },
  ],
};
