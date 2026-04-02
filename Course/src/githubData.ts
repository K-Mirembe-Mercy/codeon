import { MainLesson } from './data';

export const GITHUB_LESSONS: MainLesson[] = [
  {
    id: "1",
    title: "GitHub Foundations",
    subLessons: [
      {
        id: "1-1",
        title: "GitHub: The Global African Workspace",
        description: "Collaborating with the world.",
        content: "GitHub is where the world builds software. For African engineers, it's the gateway to global collaboration. Whether you're contributing to open-source projects in Lagos or building the next big startup in Cape Town, GitHub allows you to host your code, track changes, and work with developers across the planet. Mastering GitHub means your code is no longer isolated—it's part of a global movement.",
        xp: 25,
        hideEditor: true
      },
      {
        id: "1-2",
        title: "What is Git?",
        description: "Version control basics.",
        content: "Git is a version control system that tracks changes in your code. GitHub is a cloud-based platform that hosts Git repositories.",
        givenCode: "console.log(\"Git: Tracking Changes\");",
        codeExplanation: {
          given: "Git definition log.",
          rules: "Git is the tool; GitHub is the host.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Git: Tracking Changes",
        validationKeyword: "Tracking",
        xp: 50
      },
      {
        id: "1-3",
        title: "Repositories (Repos)",
        description: "Project containers.",
        content: "A repository is like a folder for your project, containing all code files and their revision history.",
        givenCode: "console.log(\"Repo: Project Container\");",
        codeExplanation: {
          given: "Repo definition log.",
          rules: "Can be public or private.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Repo: Project Container",
        validationKeyword: "Container",
        xp: 50
      },
      {
        id: "1-4",
        title: "Commits: Saving Progress",
        description: "Snapshots of code.",
        content: "A commit is a snapshot of your changes at a specific point in time. Each commit has a message describing the change.",
        givenCode: "console.log(\"Commit: Snapshot of Code\");",
        codeExplanation: {
          given: "Commit definition log.",
          rules: "Write clear, descriptive messages.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Commit: Snapshot of Code",
        validationKeyword: "Snapshot",
        xp: 50
      },
      {
        id: "1-5",
        title: "Branches: Parallel Worlds",
        description: "Working on features.",
        content: "Branches allow you to work on new features without affecting the main codebase. The default branch is usually called 'main'.",
        givenCode: "console.log(\"Branch: Parallel Workspace\");",
        codeExplanation: {
          given: "Branch definition log.",
          rules: "Merge branches when work is done.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Branch: Parallel Workspace",
        validationKeyword: "Workspace",
        xp: 50
      },
      {
        id: "1-6",
        title: "Pull Requests (PRs)",
        description: "Proposing changes.",
        content: "A PR is how you propose changes to a repository. It allows for code review and discussion before merging.",
        givenCode: "console.log(\"PR: Proposing Changes\");",
        codeExplanation: {
          given: "PR definition log.",
          rules: "The heart of collaboration.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "PR: Proposing Changes",
        validationKeyword: "Proposing",
        xp: 50
      },
      {
        id: "1-7",
        title: "Issues: Tracking Tasks",
        description: "Project management.",
        content: "Issues are used to track bugs, tasks, and feature requests within a repository.",
        givenCode: "console.log(\"Issue: Tracking Tasks\");",
        codeExplanation: {
          given: "Issue definition log.",
          rules: "Helps organize team efforts.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Issue: Tracking Tasks",
        validationKeyword: "Tasks",
        xp: 50
      },
      {
        id: "1-8",
        title: "Forks: Copying Repos",
        description: "Personal copies.",
        content: "A fork is a personal copy of someone else's repository. You can experiment without affecting the original.",
        givenCode: "console.log(\"Fork: Personal Copy\");",
        codeExplanation: {
          given: "Fork definition log.",
          rules: "Basis for contributing to open source.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Fork: Personal Copy",
        validationKeyword: "Copy",
        xp: 50
      },
      {
        id: "1-9",
        title: "Cloning: Local Development",
        description: "Downloading code.",
        content: "Cloning is downloading a repository from GitHub to your local computer for development.",
        givenCode: "console.log(\"Clone: Local Development\");",
        codeExplanation: {
          given: "Clone definition log.",
          rules: "Uses the `git clone` command.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Clone: Local Development",
        validationKeyword: "Local",
        xp: 50
      },
      {
        id: "1-10",
        title: "Pushing and Pulling",
        description: "Syncing code.",
        content: "Pushing sends your local changes to GitHub. Pulling fetches changes from GitHub to your local machine.",
        givenCode: "console.log(\"Sync: Push and Pull\");",
        codeExplanation: {
          given: "Sync definition log.",
          rules: "Keeps your team in sync.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Sync: Push and Pull",
        validationKeyword: "Sync",
        xp: 50
      },
      {
        id: "1-11",
        title: "GitHub Profiles",
        description: "Your developer CV.",
        content: "Your profile showcases your repositories, contributions, and skills to potential employers.",
        givenCode: "console.log(\"Profile: Developer Identity\");",
        codeExplanation: {
          given: "Profile definition log.",
          rules: "Keep it professional and active.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Profile: Developer Identity",
        validationKeyword: "Identity",
        xp: 50
      },
      {
        id: "1-12",
        title: "Foundations Mastered",
        description: "Summary of GitHub basics.",
        content: "You've mastered the core concepts of GitHub. You understand repos, commits, branches, and PRs. You are now ready to collaborate with the global engineering community. Next, we look at advanced collaboration.",
        xp: 100,
        hideEditor: true
      }
    ]
  }
];
