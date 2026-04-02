import { MainLesson } from './data';

export const HTML_LESSONS: MainLesson[] = [
  {
    id: "1",
    title: "HTML Foundations",
    subLessons: [
      {
        id: "1-1",
        title: "HTML: The Skeleton of the African Web",
        description: "The starting point of every website.",
        content: "Every digital solution in Africa—from the mobile banking apps in Nairobi to the e-commerce platforms in Lagos—starts with HTML. HTML (HyperText Markup Language) is the skeleton of the web. It defines the structure of a page, telling the browser what is a heading, what is a paragraph, and where an image should go. Without HTML, the web would just be a mess of unorganized text.",
        xp: 25,
        hideEditor: true
      },
      {
        id: "1-2",
        title: "The Basic Structure",
        description: "The boilerplate code.",
        content: "Every HTML document follows a standard structure. The `<!DOCTYPE html>` declaration tells the browser we are using HTML5. The `<html>` tag wraps everything, `<head>` contains metadata, and `<body>` contains the visible content.",
        givenCode: "<!DOCTYPE html>\n<html>\n<head>\n  <title>My First Page</title>\n</head>\n<body>\n  <h1>Jambo Africa!</h1>\n</body>\n</html>",
        codeExplanation: {
          given: "Standard HTML boilerplate.",
          rules: "Tags must be opened and closed correctly.",
          toUse: "Run the code to see the heading."
        },
        challenge: "Run the code.",
        expectedOutput: "Jambo Africa!",
        validationKeyword: "<html>",
        xp: 50
      },
      {
        id: "1-3",
        title: "Headings: Hierarchy of Content",
        description: "Organizing your message.",
        content: "HTML has six levels of headings, from `<h1>` (most important) to `<h6>` (least important). Use them to structure your content logically.",
        givenCode: "<h1>Main Title</h1>\n<h2>Sub-heading</h2>\n<h3>Section Title</h3>",
        codeExplanation: {
          given: "H1, H2, and H3 tags.",
          rules: "Only use one H1 per page for SEO.",
          toUse: "Add an <h4> tag with the text 'Small Heading'."
        },
        challenge: "Add an <h4> tag with 'Small Heading'.",
        expectedOutput: "Main Title\nSub-heading\nSection Title\nSmall Heading",
        validationKeyword: "<h4>",
        xp: 50
      },
      {
        id: "1-4",
        title: "Paragraphs: Telling the Story",
        description: "Writing text content.",
        content: "The `<p>` tag is used for paragraphs of text. It automatically adds some space before and after the text.",
        givenCode: "<p>Engineering is the future of the continent.</p>\n<p>We build for the next generation.</p>",
        codeExplanation: {
          given: "Two paragraph tags.",
          rules: "Paragraphs are block-level elements.",
          toUse: "Add a third paragraph with 'Join the movement'."
        },
        challenge: "Add a paragraph with 'Join the movement'.",
        expectedOutput: "Engineering is the future of the continent.\nWe build for the next generation.\nJoin the movement",
        validationKeyword: "<p>",
        xp: 50
      },
      {
        id: "1-5",
        title: "Formatting: Bold and Italic",
        description: "Emphasizing text.",
        content: "Use `<strong>` for bold text (importance) and `<em>` for italics (emphasis).",
        givenCode: "<p>This is <strong>very important</strong>.</p>\n<p>This is <em>emphasized</em>.</p>",
        codeExplanation: {
          given: "Strong and Em tags.",
          rules: "Use semantic tags over <b> and <i>.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "This is very important.\nThis is emphasized.",
        validationKeyword: "<strong>",
        xp: 50
      },
      {
        id: "1-6",
        title: "Unordered Lists: Bullet Points",
        description: "Grouping items.",
        content: "The `<ul>` tag creates a bulleted list. Each item inside must be wrapped in an `<li>` tag.",
        givenCode: "<ul>\n  <li>Nairobi</li>\n  <li>Lagos</li>\n  <li>Accra</li>\n</ul>",
        codeExplanation: {
          given: "Unordered list with three items.",
          rules: "li stands for List Item.",
          toUse: "Add 'Kigali' to the list."
        },
        challenge: "Add 'Kigali' to the list.",
        expectedOutput: "• Nairobi\n• Lagos\n• Accra\n• Kigali",
        validationKeyword: "<li>Kigali</li>",
        xp: 50
      },
      {
        id: "1-7",
        title: "Ordered Lists: Numbered Steps",
        description: "Step-by-step guides.",
        content: "The `<ol>` tag creates a numbered list. Useful for instructions or rankings.",
        givenCode: "<ol>\n  <li>Plan</li>\n  <li>Code</li>\n  <li>Deploy</li>\n</ol>",
        codeExplanation: {
          given: "Ordered list with three steps.",
          rules: "Numbers are generated automatically.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "1. Plan\n2. Code\n3. Deploy",
        validationKeyword: "<ol>",
        xp: 50
      },
      {
        id: "1-8",
        title: "Links: Connecting the Web",
        description: "Navigating between pages.",
        content: "The `<a>` (anchor) tag creates links. The `href` attribute specifies the destination URL.",
        givenCode: "<a href=\"https://codeon.africa\">Visit Codeon Africa</a>",
        codeExplanation: {
          given: "Anchor tag with href.",
          rules: "Always include the protocol (https://).",
          toUse: "Change the text to 'Mastery Portal'."
        },
        challenge: "Change the link text to 'Mastery Portal'.",
        expectedOutput: "Mastery Portal",
        validationKeyword: "Mastery Portal",
        xp: 50
      },
      {
        id: "1-9",
        title: "Images: Visual Engineering",
        description: "Adding pictures.",
        content: "The `<img>` tag is self-closing. It uses `src` for the image path and `alt` for accessibility.",
        givenCode: "<img src=\"https://picsum.photos/200\" alt=\"Random Image\">",
        codeExplanation: {
          given: "Image tag with source and alt text.",
          rules: "Alt text is required for screen readers.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "[Image]",
        validationKeyword: "src=",
        xp: 50
      },
      {
        id: "1-10",
        title: "Comments: Hidden Notes",
        description: "Documenting your code.",
        content: "Comments are for developers. They don't show up on the page. Use `<!-- Comment -->`.",
        givenCode: "<!-- This is a secret note -->\n<p>Visible Content</p>",
        codeExplanation: {
          given: "HTML comment.",
          rules: "Comments cannot be nested.",
          toUse: "Add a comment saying 'Africa Rising'."
        },
        challenge: "Add a comment with 'Africa Rising'.",
        expectedOutput: "Visible Content",
        validationKeyword: "<!-- Africa Rising -->",
        xp: 50
      },
      {
        id: "1-11",
        title: "Line Breaks and Horizontal Rules",
        description: "Spacing and separation.",
        content: "Use `<br>` for a single line break and `<hr>` for a horizontal line.",
        givenCode: "Line One<br>Line Two<hr>Section Two",
        codeExplanation: {
          given: "Br and Hr tags.",
          rules: "Both are self-closing tags.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Line One\nLine Two\n----------\nSection Two",
        validationKeyword: "<hr>",
        xp: 50
      },
      {
        id: "1-12",
        title: "Foundations Mastered",
        description: "Summary of HTML basics.",
        content: "You've mastered the core building blocks of HTML. You can structure text, create lists, add links, and insert images. This is the foundation of every professional website. Next, we dive into Tables and Forms.",
        xp: 100,
        hideEditor: true
      }
    ]
  },
  {
    id: "2",
    title: "Tables & Media",
    subLessons: [
      {
        id: "2-1",
        title: "Basic Tables",
        description: "Organizing data.",
        content: "Tables use `<table>`, `<tr>` (row), and `<td>` (data).",
        givenCode: "<table>\n  <tr>\n    <td>City</td>\n    <td>Country</td>\n  </tr>\n  <tr>\n    <td>Lagos</td>\n    <td>Nigeria</td>\n  </tr>\n</table>",
        codeExplanation: {
          given: "Simple table structure.",
          rules: "Rows contain data cells.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "City Country\nLagos Nigeria",
        validationKeyword: "<td>",
        xp: 60
      },
      {
        id: "2-2",
        title: "Table Headers",
        description: "Defining columns.",
        content: "Use `<th>` for header cells. They are bold and centered by default.",
        givenCode: "<table>\n  <tr>\n    <th>Name</th>\n    <th>Role</th>\n  </tr>\n  <tr>\n    <td>Kofi</td>\n    <td>Engineer</td>\n  </tr>\n</table>",
        codeExplanation: {
          given: "Table with headers.",
          rules: "Th stands for Table Header.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Name Role\nKofi Engineer",
        validationKeyword: "<th>",
        xp: 60
      },
      {
        id: "2-3",
        title: "Video Embedding",
        description: "Adding motion.",
        content: "The `<video>` tag allows you to play video files directly in the browser.",
        givenCode: "<video width=\"320\" height=\"240\" controls>\n  <source src=\"movie.mp4\" type=\"video/mp4\">\n</video>",
        codeExplanation: {
          given: "Video tag with controls.",
          rules: "Always include 'controls' attribute.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "[Video Player]",
        validationKeyword: "controls",
        xp: 60
      },
      {
        id: "2-4",
        title: "Audio Embedding",
        description: "Adding sound.",
        content: "The `<audio>` tag works similarly to video, allowing sound playback.",
        givenCode: "<audio controls>\n  <source src=\"song.mp3\" type=\"audio/mpeg\">\n</audio>",
        codeExplanation: {
          given: "Audio tag with controls.",
          rules: "Supports MP3, WAV, and OGG.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "[Audio Player]",
        validationKeyword: "<audio",
        xp: 60
      }
    ]
  },
  {
    id: "3",
    title: "Forms & Inputs",
    subLessons: [
      {
        id: "3-1",
        title: "The Form Tag",
        description: "Collecting user data.",
        content: "The `<form>` tag wraps all input elements. It uses `action` and `method` attributes.",
        givenCode: "<form action=\"/submit\" method=\"POST\">\n  <!-- Inputs go here -->\n</form>",
        codeExplanation: {
          given: "Basic form wrapper.",
          rules: "Method is usually GET or POST.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "",
        validationKeyword: "<form",
        xp: 70
      },
      {
        id: "3-2",
        title: "Text Inputs",
        description: "Single line text.",
        content: "The `<input type=\"text\">` is the most common form element.",
        givenCode: "<label>Name:</label>\n<input type=\"text\" placeholder=\"Enter name\">",
        codeExplanation: {
          given: "Label and text input.",
          rules: "Placeholder shows temporary text.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Name: [_______]",
        validationKeyword: "type=\"text\"",
        xp: 70
      },
      {
        id: "3-3",
        title: "Password Inputs",
        description: "Secure entry.",
        content: "The `<input type=\"password\">` masks the characters entered.",
        givenCode: "<label>Password:</label>\n<input type=\"password\">",
        codeExplanation: {
          given: "Password input.",
          rules: "Characters are hidden for security.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Password: [*******]",
        validationKeyword: "type=\"password\"",
        xp: 70
      },
      {
        id: "3-4",
        title: "Submit Buttons",
        description: "Sending the form.",
        content: "Use `<button type=\"submit\">` or `<input type=\"submit\">` to send data.",
        givenCode: "<form>\n  <input type=\"text\">\n  <button type=\"submit\">Send</button>\n</form>",
        codeExplanation: {
          given: "Form with submit button.",
          rules: "Triggers the form action.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "[_______] [Send]",
        validationKeyword: "type=\"submit\"",
        xp: 70
      }
    ]
  },
  {
    id: "4",
    title: "Semantic HTML",
    subLessons: [
      {
        id: "4-1",
        title: "Header and Footer",
        description: "Page structure.",
        content: "Use `<header>` for the top section and `<footer>` for the bottom.",
        givenCode: "<header>\n  <h1>Site Title</h1>\n</header>\n<footer>\n  <p>© 2024 Codeon Africa</p>\n</footer>",
        codeExplanation: {
          given: "Header and Footer tags.",
          rules: "Improves accessibility and SEO.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Site Title\n© 2024 Codeon Africa",
        validationKeyword: "<header>",
        xp: 80
      },
      {
        id: "4-2",
        title: "Main and Section",
        description: "Content areas.",
        content: "The `<main>` tag holds the unique content of the page. `<section>` groups related content.",
        givenCode: "<main>\n  <section>\n    <h2>About Us</h2>\n    <p>We are engineers.</p>\n  </section>\n</main>",
        codeExplanation: {
          given: "Main and Section tags.",
          rules: "Only one <main> per page.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "About Us\nWe are engineers.",
        validationKeyword: "<main>",
        xp: 80
      }
    ]
  }
];
