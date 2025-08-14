export const surveyJson = {
  locale: "fr",
  widthMode: "static",
  width: "1000px",
  pages: [
    {
      name: "page1",
      elements: [
        {
          type: "text",
          name: "question1",
          title: "Name",
          startWithNewLine: false,
          placeholder: "Enter your name",
        },
        {
          type: "text",
          name: "question2",
          title: "Age",
          startWithNewLine: false,
          inputType: "number",
          placeholder: "Enter your age"
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
          title: "SELECT NESTED",
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
