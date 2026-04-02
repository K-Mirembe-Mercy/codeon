import { MainLesson } from './data';

export const AI_LESSONS: MainLesson[] = [
  {
    id: "1",
    title: "AI Foundations",
    subLessons: [
      {
        id: "1-1",
        title: "AI: The New Frontier for Africa",
        description: "Why AI matters for the continent.",
        content: "Artificial Intelligence is not just a buzzword; it's a transformative tool that is already solving critical challenges across Africa. From predicting crop yields in Ethiopia to diagnosing diseases in remote villages in Uganda, AI is the new frontier for African engineers. Mastering AI means you can build systems that learn, adapt, and solve problems at a scale never before possible. You are the pioneers of this digital revolution.",
        xp: 25,
        hideEditor: true
      },
      {
        id: "1-2",
        title: "What is AI?",
        description: "Defining intelligence.",
        content: "AI is the simulation of human intelligence by machines. It involves learning (acquiring information), reasoning (using rules to reach conclusions), and self-correction.",
        givenCode: "console.log(\"AI: Simulating Intelligence\");",
        codeExplanation: {
          given: "Simple log message.",
          rules: "AI is a broad field.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "AI: Simulating Intelligence",
        validationKeyword: "Intelligence",
        xp: 50
      },
      {
        id: "1-3",
        title: "Machine Learning (ML)",
        description: "Learning from data.",
        content: "ML is a subset of AI where systems learn from data patterns without being explicitly programmed for every task.",
        givenCode: "console.log(\"ML: Learning from Patterns\");",
        codeExplanation: {
          given: "ML definition log.",
          rules: "Data is the fuel for ML.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "ML: Learning from Patterns",
        validationKeyword: "Patterns",
        xp: 50
      },
      {
        id: "1-4",
        title: "Deep Learning",
        description: "Neural networks.",
        content: "Deep Learning uses multi-layered neural networks to solve complex problems like image and speech recognition.",
        givenCode: "console.log(\"Deep Learning: Neural Networks\");",
        codeExplanation: {
          given: "Deep learning log.",
          rules: "Inspired by the human brain.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Deep Learning: Neural Networks",
        validationKeyword: "Neural",
        xp: 50
      },
      {
        id: "1-5",
        title: "AI vs. Traditional Programming",
        description: "Rules vs. Data.",
        content: "Traditional programming uses explicit rules. AI uses data to find its own rules.",
        givenCode: "console.log(\"AI: Data-driven Rules\");",
        codeExplanation: {
          given: "Comparison log.",
          rules: "A shift in how we build software.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "AI: Data-driven Rules",
        validationKeyword: "Data-driven",
        xp: 50
      },
      {
        id: "1-6",
        title: "Types of AI: Narrow vs. General",
        description: "Scope of intelligence.",
        content: "Narrow AI (ANI) is designed for one task. General AI (AGI) would have human-level intelligence across all tasks.",
        givenCode: "console.log(\"Narrow AI: Task-specific\");",
        codeExplanation: {
          given: "ANI definition log.",
          rules: "We currently only have Narrow AI.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Narrow AI: Task-specific",
        validationKeyword: "Narrow",
        xp: 50
      },
      {
        id: "1-7",
        title: "The Importance of Data",
        description: "The fuel for AI.",
        content: "AI systems are only as good as the data they are trained on. High-quality, diverse data is essential.",
        givenCode: "console.log(\"Data: The Fuel for AI\");",
        codeExplanation: {
          given: "Data importance log.",
          rules: "Garbage in, garbage out.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Data: The Fuel for AI",
        validationKeyword: "Fuel",
        xp: 50
      },
      {
        id: "1-8",
        title: "AI Ethics and Bias",
        description: "Responsible AI.",
        content: "AI can inherit biases from its training data. We must build fair and ethical systems.",
        givenCode: "console.log(\"Ethics: Building Fair AI\");",
        codeExplanation: {
          given: "Ethics log.",
          rules: "Fairness is a design requirement.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Ethics: Building Fair AI",
        validationKeyword: "Fair",
        xp: 50
      },
      {
        id: "1-9",
        title: "AI in Everyday Life",
        description: "Hidden AI.",
        content: "AI is everywhere—from Netflix recommendations to Google Search and spam filters.",
        givenCode: "console.log(\"AI: Everywhere Around Us\");",
        codeExplanation: {
          given: "Everyday AI log.",
          rules: "Often invisible but powerful.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "AI: Everywhere Around Us",
        validationKeyword: "Everywhere",
        xp: 50
      },
      {
        id: "1-10",
        title: "The Turing Test",
        description: "Measuring intelligence.",
        content: "A test of a machine's ability to exhibit intelligent behavior equivalent to, or indistinguishable from, that of a human.",
        givenCode: "console.log(\"Turing Test: Measuring Intelligence\");",
        codeExplanation: {
          given: "Turing test log.",
          rules: "Proposed by Alan Turing in 1950.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Turing Test: Measuring Intelligence",
        validationKeyword: "Turing",
        xp: 50
      },
      {
        id: "1-11",
        title: "AI and the Future of Work",
        description: "Augmenting humans.",
        content: "AI will automate tasks, but it will also create new jobs and augment human capabilities.",
        givenCode: "console.log(\"Future: Augmenting Human Potential\");",
        codeExplanation: {
          given: "Future of work log.",
          rules: "Focus on collaboration with AI.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Future: Augmenting Human Potential",
        validationKeyword: "Potential",
        xp: 50
      },
      {
        id: "1-12",
        title: "Foundations Mastered",
        description: "Summary of AI basics.",
        content: "You've mastered the core concepts of AI. You understand ML, Deep Learning, and the importance of data and ethics. You are now ready to explore how AI is being applied across the continent. Next, we look at AI in Africa.",
        xp: 100,
        hideEditor: true
      }
    ]
  },
  {
    id: "2",
    title: "AI in Africa",
    subLessons: [
      {
        id: "2-1",
        title: "AI for Agriculture",
        description: "Smart farming.",
        content: "AI helps African farmers predict weather patterns, identify pests, and optimize irrigation, leading to higher yields.",
        givenCode: "console.log(\"Agri-AI: Boosting Food Security\");",
        codeExplanation: {
          given: "Agri-AI role.",
          rules: "Critical for the continent's economy.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Agri-AI: Boosting Food Security",
        validationKeyword: "Security",
        xp: 60
      },
      {
        id: "2-2",
        title: "AI for Healthcare",
        description: "Digital diagnosis.",
        content: "AI tools are being used to diagnose malaria and tuberculosis from images, bringing expert care to remote areas.",
        givenCode: "console.log(\"Health-AI: Saving Lives in Remote Areas\");",
        codeExplanation: {
          given: "Health-AI role.",
          rules: "Expands access to quality care.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Health-AI: Saving Lives in Remote Areas",
        validationKeyword: "Lives",
        xp: 60
      },
      {
        id: "2-3",
        title: "AI for Finance (Fintech)",
        description: "Financial inclusion.",
        content: "AI powers credit scoring for the unbanked and detects fraud in mobile money transactions across Africa.",
        givenCode: "console.log(\"Fintech-AI: Driving Financial Inclusion\");",
        codeExplanation: {
          given: "Fintech-AI role.",
          rules: "Africa is a global leader in mobile money.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Fintech-AI: Driving Financial Inclusion",
        validationKeyword: "Inclusion",
        xp: 60
      },
      {
        id: "2-4",
        title: "AI for Language and Culture",
        description: "Preserving heritage.",
        content: "AI is being used to translate African languages and preserve oral traditions for future generations.",
        givenCode: "console.log(\"Cultural-AI: Preserving African Heritage\");",
        codeExplanation: {
          given: "Cultural-AI role.",
          rules: "Technology serving identity.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Cultural-AI: Preserving African Heritage",
        validationKeyword: "Heritage",
        xp: 60
      }
    ]
  },
  {
    id: "3",
    title: "How AI Works",
    subLessons: [
      {
        id: "3-1",
        title: "The Learning Process",
        description: "Input, Model, Output.",
        content: "AI models take input data, process it through a mathematical model, and produce an output or prediction.",
        givenCode: "console.log(\"Process: Input -> Model -> Output\");",
        codeExplanation: {
          given: "The core AI loop.",
          rules: "The model is the 'brain'.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Process: Input -> Model -> Output",
        validationKeyword: "Model",
        xp: 70
      },
      {
        id: "3-2",
        title: "Supervised Learning",
        description: "Learning with labels.",
        content: "The model is trained on data that is already labeled (e.g., images labeled as 'cat' or 'dog').",
        givenCode: "console.log(\"Supervised: Learning with Labeled Data\");",
        codeExplanation: {
          given: "Supervised learning log.",
          rules: "Most common type of ML.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Supervised: Learning with Labeled Data",
        validationKeyword: "Labeled",
        xp: 70
      },
      {
        id: "3-3",
        title: "Unsupervised Learning",
        description: "Finding hidden patterns.",
        content: "The model finds patterns in data that has no labels (e.g., grouping customers by behavior).",
        givenCode: "console.log(\"Unsupervised: Finding Hidden Patterns\");",
        codeExplanation: {
          given: "Unsupervised learning log.",
          rules: "Useful for discovery.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Unsupervised: Finding Hidden Patterns",
        validationKeyword: "Hidden",
        xp: 70
      },
      {
        id: "3-4",
        title: "Reinforcement Learning",
        description: "Learning by trial and error.",
        content: "The model learns by receiving rewards for good actions and penalties for bad ones (e.g., teaching a robot to walk).",
        givenCode: "console.log(\"Reinforcement: Learning by Rewards\");",
        codeExplanation: {
          given: "Reinforcement learning log.",
          rules: "Used in games and robotics.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Reinforcement: Learning by Rewards",
        validationKeyword: "Rewards",
        xp: 70
      }
    ]
  },
  {
    id: "4",
    title: "Neural Networks",
    subLessons: [
      {
        id: "4-1",
        title: "The Perceptron",
        description: "The basic unit.",
        content: "A perceptron is the simplest type of artificial neuron, the building block of neural networks.",
        givenCode: "console.log(\"Perceptron: The Artificial Neuron\");",
        codeExplanation: {
          given: "Perceptron log.",
          rules: "Takes inputs and produces a binary output.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Perceptron: The Artificial Neuron",
        validationKeyword: "Neuron",
        xp: 80
      },
      {
        id: "4-2",
        title: "Layers: Input, Hidden, Output",
        description: "Network structure.",
        content: "Neural networks consist of an input layer, one or more hidden layers, and an output layer.",
        givenCode: "console.log(\"Layers: Input -> Hidden -> Output\");",
        codeExplanation: {
          given: "Network layers log.",
          rules: "Hidden layers do the 'thinking'.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Layers: Input -> Hidden -> Output",
        validationKeyword: "Hidden",
        xp: 80
      },
      {
        id: "4-3",
        title: "Weights and Biases",
        description: "Tuning the brain.",
        content: "Weights determine the importance of an input, and biases help the model make better decisions.",
        givenCode: "console.log(\"Weights: Tuning the Network\");",
        codeExplanation: {
          given: "Weights log.",
          rules: "Adjusted during the training process.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Weights: Tuning the Network",
        validationKeyword: "Tuning",
        xp: 80
      },
      {
        id: "4-4",
        title: "Backpropagation",
        description: "How AI learns.",
        content: "The process of adjusting weights and biases based on the error of the output.",
        givenCode: "console.log(\"Backpropagation: Learning from Errors\");",
        codeExplanation: {
          given: "Backpropagation log.",
          rules: "The core of the training algorithm.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Backpropagation: Learning from Errors",
        validationKeyword: "Errors",
        xp: 80
      }
    ]
  },
  {
    id: "5",
    title: "Generative AI & LLMs",
    subLessons: [
      {
        id: "5-1",
        title: "What is Generative AI?",
        description: "Creating new content.",
        content: "GenAI can create new text, images, music, and even code based on its training data.",
        givenCode: "console.log(\"GenAI: Creating New Content\");",
        codeExplanation: {
          given: "GenAI definition.",
          rules: "A creative leap for AI.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "GenAI: Creating New Content",
        validationKeyword: "Creating",
        xp: 90
      },
      {
        id: "5-2",
        title: "Large Language Models (LLMs)",
        description: "Mastering language.",
        content: "LLMs like GPT-4 are trained on massive amounts of text to understand and generate human-like language.",
        givenCode: "console.log(\"LLM: Mastering Human Language\");",
        codeExplanation: {
          given: "LLM role.",
          rules: "Uses billions of parameters.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "LLM: Mastering Human Language",
        validationKeyword: "Language",
        xp: 90
      },
      {
        id: "5-3",
        title: "Transformers: The Secret Sauce",
        description: "Understanding context.",
        content: "The Transformer architecture allows models to understand the relationships between words in a sentence.",
        givenCode: "console.log(\"Transformer: Understanding Context\");",
        codeExplanation: {
          given: "Transformer role.",
          rules: "The breakthrough behind modern LLMs.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Transformer: Understanding Context",
        validationKeyword: "Context",
        xp: 90
      },
      {
        id: "5-4",
        title: "Prompts: Talking to AI",
        description: "The art of instruction.",
        content: "A prompt is the instruction you give to an AI model. Good prompts lead to better results.",
        givenCode: "console.log(\"Prompt: Instructing the AI\");",
        codeExplanation: {
          given: "Prompt role.",
          rules: "Be specific and clear.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Prompt: Instructing the AI",
        validationKeyword: "Instructing",
        xp: 90
      },
      {
        id: "5-5",
        title: "Zero-Shot and Few-Shot Learning",
        description: "Learning with little data.",
        content: "Zero-shot means the model performs a task without examples. Few-shot means it's given a few examples in the prompt.",
        givenCode: "console.log(\"Few-Shot: Learning from Examples\");",
        codeExplanation: {
          given: "Few-shot role.",
          rules: "Shows the power of pre-trained models.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Few-Shot: Learning from Examples",
        validationKeyword: "Examples",
        xp: 90
      },
      {
        id: "5-6",
        title: "Hallucinations",
        description: "When AI makes things up.",
        content: "AI models can sometimes generate incorrect or nonsensical information confidently. Always verify!",
        givenCode: "console.log(\"Hallucination: Verify AI Output\");",
        codeExplanation: {
          given: "Hallucination warning.",
          rules: "A known limitation of LLMs.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Hallucination: Verify AI Output",
        validationKeyword: "Verify",
        xp: 90
      },
      {
        id: "5-7",
        title: "Fine-Tuning",
        description: "Specializing the model.",
        content: "Adapting a pre-trained model to a specific task or domain using a smaller, specialized dataset.",
        givenCode: "console.log(\"Fine-Tuning: Specializing the Brain\");",
        codeExplanation: {
          given: "Fine-tuning role.",
          rules: "Makes general models experts.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Fine-Tuning: Specializing the Brain",
        validationKeyword: "Brain",
        xp: 90
      },
      {
        id: "5-8",
        title: "Tokenization",
        description: "How AI reads.",
        content: "The process of breaking text into smaller units called tokens (words or parts of words).",
        givenCode: "console.log(\"Tokenization: Breaking Down Text\");",
        codeExplanation: {
          given: "Tokenization role.",
          rules: "How models process language mathematically.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Tokenization: Breaking Down Text",
        validationKeyword: "Breaking",
        xp: 90
      },
      {
        id: "5-9",
        title: "Temperature and Top-P",
        description: "Controlling creativity.",
        content: "Settings that control how random or predictable the AI's output is.",
        givenCode: "console.log(\"Temperature: Controlling Creativity\");",
        codeExplanation: {
          given: "Setting role.",
          rules: "Higher temperature = more creative/random.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Temperature: Controlling Creativity",
        validationKeyword: "Creativity",
        xp: 90
      },
      {
        id: "5-10",
        title: "The Future of GenAI in Africa",
        description: "Innovation on the continent.",
        content: "From generating educational content in local languages to helping small businesses with marketing, Generative AI holds immense promise for African innovation.",
        givenCode: "console.log(\"Future: GenAI Driving African Growth\");",
        codeExplanation: {
          given: "Future outlook.",
          rules: "Requires local talent and infrastructure.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Future: GenAI Driving African Growth",
        validationKeyword: "Growth",
        xp: 90
      },
      {
        id: "5-11",
        title: "Ethical Considerations in GenAI",
        description: "Responsible creation.",
        content: "As we use GenAI, we must be mindful of issues like copyright, misinformation, and the potential for creating harmful content.",
        givenCode: "console.log(\"Ethics: Creating Responsibly\");",
        codeExplanation: {
          given: "Ethics role.",
          rules: "Ensures technology is used for good.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Ethics: Creating Responsibly",
        validationKeyword: "Responsibly",
        xp: 90
      },
      {
        id: "5-12",
        title: "Generative AI Mastered",
        description: "Summary of GenAI concepts.",
        content: "You've explored the world of Generative AI and LLMs. You understand how they work, how to use them, and the ethical challenges they bring. You're ready for the future! Great work!",
        xp: 100,
        hideEditor: true
      }
    ]
  },
  {
    id: "6",
    title: "The Future of AI in Africa",
    subLessons: [
      {
        id: "6-1",
        title: "Africa's AI Opportunity",
        description: "The road ahead.",
        content: "Africa is uniquely positioned to leapfrog traditional technologies using AI. From smart cities to digital agriculture, the continent is becoming a global hub for AI innovation and talent.",
        xp: 50,
        hideEditor: true
      },
      {
        id: "6-2",
        title: "AI for Sustainable Development",
        description: "Solving global goals.",
        content: "AI can help Africa achieve the Sustainable Development Goals (SDGs) by improving resource management, reducing poverty, and providing quality education for all.",
        givenCode: "console.log(\"SDG-AI: Driving Sustainable Progress\");",
        codeExplanation: {
          given: "SDG-AI role.",
          rules: "Aligns technology with human needs.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "SDG-AI: Driving Sustainable Progress",
        validationKeyword: "Progress",
        xp: 100
      },
      {
        id: "6-3",
        title: "Building Local AI Ecosystems",
        description: "Fostering innovation.",
        content: "To thrive, Africa needs strong AI ecosystems—including research labs, startups, and supportive government policies—that foster local innovation and retain talent.",
        givenCode: "console.log(\"Ecosystem: Building a Tech Hub\");",
        codeExplanation: {
          given: "Ecosystem role.",
          rules: "Collaboration is key to success.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Ecosystem: Building a Tech Hub",
        validationKeyword: "Hub",
        xp: 100
      },
      {
        id: "6-4",
        title: "AI and the African Continental Free Trade Area",
        description: "Boosting trade.",
        content: "AI can help streamline trade across the continent by automating customs processes and optimizing supply chains within the AfCFTA framework.",
        givenCode: "console.log(\"AfCFTA-AI: Streamlining Continental Trade\");",
        codeExplanation: {
          given: "AfCFTA role.",
          rules: "Reduces barriers to economic growth.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "AfCFTA-AI: Streamlining Continental Trade",
        validationKeyword: "Trade",
        xp: 100
      },
      {
        id: "6-5",
        title: "Human-Centric AI",
        description: "Putting people first.",
        content: "The future of AI in Africa must be human-centric—designed to augment human capabilities and solve the most pressing needs of our communities.",
        givenCode: "console.log(\"Human-AI: Augmenting Our Potential\");",
        codeExplanation: {
          given: "Human-centric role.",
          rules: "Technology should serve humanity.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Human-AI: Augmenting Our Potential",
        validationKeyword: "Potential",
        xp: 100
      },
      {
        id: "6-6",
        title: "AI in Creative Industries",
        description: "Digital storytelling.",
        content: "African filmmakers and musicians are using AI to push the boundaries of storytelling, creating immersive experiences that showcase the continent's rich culture.",
        givenCode: "console.log(\"Creative-AI: New Era of Storytelling\");",
        codeExplanation: {
          given: "Creative role.",
          rules: "A new canvas for African artists.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Creative-AI: New Era of Storytelling",
        validationKeyword: "Era",
        xp: 100
      },
      {
        id: "6-7",
        title: "Overcoming the Digital Divide",
        description: "Inclusion for all.",
        content: "To ensure everyone benefits from AI, we must bridge the digital divide by expanding internet access and providing affordable technology across Africa.",
        givenCode: "console.log(\"Inclusion: Bridging the Digital Divide\");",
        codeExplanation: {
          given: "Inclusion role.",
          rules: "Technology must be accessible to everyone.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Inclusion: Bridging the Digital Divide",
        validationKeyword: "Divide",
        xp: 100
      },
      {
        id: "6-8",
        title: "AI Research in Africa",
        description: "Leading the way.",
        content: "African researchers are leading groundbreaking work in AI, from developing new algorithms to exploring the ethical implications of technology in the Global South.",
        givenCode: "console.log(\"Research: Leading AI Innovation\");",
        codeExplanation: {
          given: "Research role.",
          rules: "Africa is a contributor, not just a consumer.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Research: Leading AI Innovation",
        validationKeyword: "Innovation",
        xp: 100
      },
      {
        id: "6-9",
        title: "The Role of Youth in AI",
        description: "The next generation.",
        content: "Africa's young population is its greatest asset. By learning AI today, you are preparing to lead the continent's digital transformation tomorrow.",
        givenCode: "console.log(\"Youth: Leading the Digital Future\");",
        codeExplanation: {
          given: "Youth role.",
          rules: "The future belongs to those who build it.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Youth: Leading the Digital Future",
        validationKeyword: "Future",
        xp: 100
      },
      {
        id: "6-10",
        title: "AI Safety and Global Cooperation",
        description: "Working together.",
        content: "Africa must participate in global conversations about AI safety and governance to ensure that international standards reflect the continent's interests.",
        givenCode: "console.log(\"Global-AI: Cooperating for Safety\");",
        codeExplanation: {
          given: "Cooperation role.",
          rules: "Ensures a safe and equitable AI future.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Global-AI: Cooperating for Safety",
        validationKeyword: "Safety",
        xp: 100
      },
      {
        id: "6-11",
        title: "Your Journey in AI",
        description: "Keep learning.",
        content: "The field of AI is constantly evolving. Your journey doesn't end here—keep exploring, building, and using AI to make a difference in your community.",
        givenCode: "console.log(\"Journey: The Path of Lifelong Learning\");",
        codeExplanation: {
          given: "Journey role.",
          rules: "Stay curious and keep building.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Journey: The Path of Lifelong Learning",
        validationKeyword: "Learning",
        xp: 100
      },
      {
        id: "6-12",
        title: "AI Mastery Complete",
        description: "Final summary.",
        content: "Congratulations! You have completed the entire AI module. You are now equipped with the knowledge and skills to be a leader in the African AI revolution. Go forth and create!",
        xp: 200,
        hideEditor: true
      }
    ]
  }
];
