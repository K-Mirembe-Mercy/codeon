import { MainLesson } from './data';

export const JS_LESSONS: MainLesson[] = [
  {
    id: "1",
    title: "JavaScript Basics",
    subLessons: [
      {
        id: "js1-1",
        title: "The Logic of the Web",
        description: "Interactive Engineering.",
        content: "JavaScript makes websites come alive. It handles clicks, calculations, and data fetching.",
        xp: 25,
        hideEditor: true
      },
      {
        id: "js1-2",
        title: "Console Logging",
        description: "Debugging foundations.",
        content: "We use `console.log()` to print messages to the developer console.",
        givenCode: "console.log(\"Web Mastery Started\");",
        challenge: "Run the code.",
        expectedOutput: "Web Mastery Started",
        validationKeyword: "console.log",
        xp: 50
      }
    ]
  }
];
