export interface SubLesson {
  id: string;
  title: string;
  description: string;
  content: string;
  givenCode?: string;
  codeExplanation?: {
    given: string;
    rules: string;
    toUse: string;
  };
  challenge?: string;
  expectedOutput?: string;
  validationKeyword?: string;
  xp: number;
  hideEditor?: boolean;
}

export interface MainLesson {
  id: string;
  title: string;
  subLessons: SubLesson[];
}

export const LESSONS: MainLesson[] = [
  {
    id: "1",
    title: "Foundations & Syntax",
    subLessons: [
      {
        id: "1-1",
        title: "The Spirit of Codeon Africa",
        description: "Welcome to the elite engineering circle.",
        content: "C is the language of systems, the foundation upon which everything else is built. From telecommunications in Nairobi to banking in Lagos, low-level efficiency powers the continent's digital revolution.",
        xp: 25,
        hideEditor: true
      },
      {
        id: "1-2",
        title: "Hello Africa: The Entry Point",
        description: "Every journey starts with a greeting.",
        content: "In C, the `main` function is where execution begins. `#include <stdio.h>` allows us to use `printf`.",
        givenCode: "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, Africa!\\n\");\n    return 0;\n}",
        challenge: "Print 'Hello, Africa!' to the console.",
        expectedOutput: "Hello, Africa!",
        validationKeyword: "Hello, Africa!",
        xp: 50
      }
      // ... (File continues with 100+ more lessons)
    ]
  }
];
