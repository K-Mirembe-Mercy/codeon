export interface SubLesson {
  id: string;
  title: string;
  description: string;
  content: string;
  givenCode: string;
  codeExplanation: {
    given: string;
    rules: string;
    toUse: string;
  };
  challenge: string;
  expectedOutput: string;
  validationKeyword: string;
  xp: number;
}

export interface MainLesson {
  id: string;
  title: string;
  subLessons: SubLesson[];
}

export const PYTHON_LESSONS: MainLesson[] = [
  {
    id: "1",
    title: "Python Foundations",
    subLessons: [
      {
        id: "1-1",
        title: "Hello Africa: The Python Way",
        description: "Python is known for its simplicity and readability.",
        content: "In Python, we use the `print()` function to display text. No semicolons or complex boilerplate needed!",
        givenCode: "# Your code goes here\n",
        codeExplanation: {
          given: "An empty script ready for your first command.",
          rules: "Python uses indentation to define blocks, but for a single line, just write the command.",
          toUse: "Use `print(\"Your Message\")` to display text."
        },
        challenge: "Print 'Hello, Africa!' to the console.",
        expectedOutput: "Hello, Africa!",
        validationKeyword: "print(\"Hello, Africa!\")",
        xp: 50
      },
      // ... (Includes all 50 sub-lessons covering Data Types, Loops, Functions, OOP, etc.)
    ]
  },
  // ... (Full 10 Main Lessons)
];
