import { MainLesson } from './data';

export const CSS_LESSONS: MainLesson[] = [
  {
    id: "1",
    title: "CSS Foundations",
    subLessons: [
      {
        id: "1-1",
        title: "CSS: The Paint of the African Web",
        description: "Why we style the web.",
        content: "If HTML is the skeleton, CSS (Cascading Style Sheets) is the skin and paint. It's how we make our digital solutions beautiful, professional, and uniquely African. From the vibrant colors of our textiles to the clean interfaces of modern fintech, CSS allows us to express our identity through design. Mastering CSS means you can turn a basic structure into a world-class user experience.",
        xp: 25,
        hideEditor: true
      },
      {
        id: "1-2",
        title: "Inline Styles",
        description: "Styling directly on elements.",
        content: "The simplest way to add style is using the `style` attribute. It's quick but hard to maintain for large projects.",
        givenCode: "<h1 style=\"color: green;\">Green Heading</h1>",
        codeExplanation: {
          given: "Heading with inline color style.",
          rules: "Uses property: value; syntax.",
          toUse: "Change 'green' to 'blue'."
        },
        challenge: "Change the color to 'blue'.",
        expectedOutput: "Blue Heading",
        validationKeyword: "color: blue",
        xp: 50
      },
      {
        id: "1-3",
        title: "The Style Tag",
        description: "Internal CSS.",
        content: "You can put all your styles in a `<style>` tag inside the `<head>` section. This keeps your HTML cleaner.",
        givenCode: "<style>\n  p {\n    color: orange;\n  }\n</style>\n<p>Orange Text</p>",
        codeExplanation: {
          given: "Internal style targeting all paragraphs.",
          rules: "Selectors target HTML elements.",
          toUse: "Change 'orange' to 'purple'."
        },
        challenge: "Change the color to 'purple'.",
        expectedOutput: "Purple Text",
        validationKeyword: "color: purple",
        xp: 50
      },
      {
        id: "1-4",
        title: "External CSS",
        description: "The professional way.",
        content: "Most websites use a separate `.css` file linked with a `<link>` tag. This allows you to style multiple pages at once.",
        givenCode: "/* in style.css */\nbody {\n  background-color: #f0f0f0;\n}",
        codeExplanation: {
          given: "External CSS rule for the body.",
          rules: "Requires a link tag in HTML.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "",
        validationKeyword: "background-color",
        xp: 50
      },
      {
        id: "1-5",
        title: "Selectors: Element",
        description: "Targeting by tag name.",
        content: "Element selectors target all instances of a specific HTML tag.",
        givenCode: "h2 {\n  text-align: center;\n}",
        codeExplanation: {
          given: "Targets all <h2> tags.",
          rules: "Simple and broad.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "",
        validationKeyword: "h2 {",
        xp: 50
      },
      {
        id: "1-6",
        title: "Selectors: Class",
        description: "Targeting by class name.",
        content: "Classes are reusable. Use a dot `.` followed by the class name in CSS.",
        givenCode: ".highlight {\n  background-color: yellow;\n}\n<p class=\"highlight\">Highlighted</p>",
        codeExplanation: {
          given: "Class selector and HTML usage.",
          rules: "Classes can be used on multiple elements.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Highlighted",
        validationKeyword: ".highlight",
        xp: 50
      },
      {
        id: "1-7",
        title: "Selectors: ID",
        description: "Targeting unique elements.",
        content: "IDs are unique. Use a hash `#` followed by the ID name in CSS.",
        givenCode: "#main-title {\n  font-size: 40px;\n}\n<h1 id=\"main-title\">Big Title</h1>",
        codeExplanation: {
          given: "ID selector and HTML usage.",
          rules: "IDs should only be used once per page.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Big Title",
        validationKeyword: "#main-title",
        xp: 50
      },
      {
        id: "1-8",
        title: "Colors: Hex and RGB",
        description: "Defining colors.",
        content: "You can use names (red), Hex codes (#ff0000), or RGB (255, 0, 0).",
        givenCode: "p {\n  color: #2ecc71;\n}",
        codeExplanation: {
          given: "Hex color code for green.",
          rules: "Hex uses 6 characters (0-F).",
          toUse: "Change to #e74c3c (red)."
        },
        challenge: "Change color to #e74c3c.",
        expectedOutput: "",
        validationKeyword: "#e74c3c",
        xp: 50
      },
      {
        id: "1-9",
        title: "Font Family",
        description: "Choosing typefaces.",
        content: "The `font-family` property sets the font. Always provide fallbacks.",
        givenCode: "body {\n  font-family: Arial, sans-serif;\n}",
        codeExplanation: {
          given: "Setting the base font.",
          rules: "Browser uses first available font.",
          toUse: "Add 'Roboto' as the first font."
        },
        challenge: "Add 'Roboto' as the first font.",
        expectedOutput: "",
        validationKeyword: "Roboto",
        xp: 50
      },
      {
        id: "1-10",
        title: "Font Size and Weight",
        description: "Sizing and boldness.",
        content: "Use `font-size` (px, em, rem) and `font-weight` (bold, 400, 700).",
        givenCode: "p {\n  font-size: 18px;\n  font-weight: bold;\n}",
        codeExplanation: {
          given: "Sizing and bolding text.",
          rules: "Rem is preferred for accessibility.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "",
        validationKeyword: "font-size",
        xp: 50
      },
      {
        id: "1-11",
        title: "Text Decoration",
        description: "Underlines and more.",
        content: "Commonly used to remove underlines from links.",
        givenCode: "a {\n  text-decoration: none;\n}",
        codeExplanation: {
          given: "Removing link underline.",
          rules: "Can also be 'underline' or 'line-through'.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "",
        validationKeyword: "none",
        xp: 50
      },
      {
        id: "1-12",
        title: "Foundations Mastered",
        description: "Summary of CSS basics.",
        content: "You've mastered the core building blocks of CSS. You can select elements, apply colors, and format text. You are now ready to build layouts and add advanced effects. Next, we explore the Box Model.",
        xp: 100,
        hideEditor: true
      }
    ]
  },
  {
    id: "2",
    title: "The Box Model",
    subLessons: [
      {
        id: "2-1",
        title: "Everything is a Box",
        description: "The core concept.",
        content: "In CSS, every element is a rectangular box. Understanding this is key to layout.",
        givenCode: "<div style=\"border: 1px solid black;\">I am a box</div>",
        codeExplanation: {
          given: "Div with a border.",
          rules: "Boxes have content, padding, border, and margin.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "I am a box",
        validationKeyword: "border",
        xp: 60
      },
      {
        id: "2-2",
        title: "Padding",
        description: "Space inside the box.",
        content: "Padding is the space between the content and the border.",
        givenCode: "<div style=\"padding: 20px; border: 1px solid black;\">Padded Box</div>",
        codeExplanation: {
          given: "Box with 20px padding.",
          rules: "Increases the size of the box.",
          toUse: "Change padding to 40px."
        },
        challenge: "Change padding to 40px.",
        expectedOutput: "Padded Box",
        validationKeyword: "padding: 40px",
        xp: 60
      },
      {
        id: "2-3",
        title: "Margin",
        description: "Space outside the box.",
        content: "Margin creates space around the element, outside its border.",
        givenCode: "<div style=\"margin: 20px; border: 1px solid black;\">Box with Margin</div>",
        codeExplanation: {
          given: "Box with 20px margin.",
          rules: "Pushes other elements away.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Box with Margin",
        validationKeyword: "margin",
        xp: 60
      },
      {
        id: "2-4",
        title: "Border",
        description: "The box edge.",
        content: "Borders have width, style, and color.",
        givenCode: "<div style=\"border: 5px dashed blue;\">Dashed Border</div>",
        codeExplanation: {
          given: "Box with a thick dashed border.",
          rules: "Style can be solid, dashed, dotted, etc.",
          toUse: "Change 'dashed' to 'solid'."
        },
        challenge: "Change border style to 'solid'.",
        expectedOutput: "Dashed Border",
        validationKeyword: "solid",
        xp: 60
      },
      {
        id: "2-5",
        title: "Width and Height",
        description: "Sizing the box.",
        content: "Explicitly set the dimensions of an element.",
        givenCode: "<div style=\"width: 200px; height: 100px; background: gray;\">Sized Box</div>",
        codeExplanation: {
          given: "Box with fixed width and height.",
          rules: "Can use px, %, vh, vw.",
          toUse: "Change width to 300px."
        },
        challenge: "Change width to 300px.",
        expectedOutput: "Sized Box",
        validationKeyword: "width: 300px",
        xp: 60
      },
      {
        id: "2-6",
        title: "Border Radius",
        description: "Rounded corners.",
        content: "Make your boxes look modern with rounded corners.",
        givenCode: "<div style=\"border-radius: 10px; background: orange; padding: 10px;\">Rounded Box</div>",
        codeExplanation: {
          given: "Box with rounded corners.",
          rules: "50% makes a circle if width=height.",
          toUse: "Change to 25px."
        },
        challenge: "Change border-radius to 25px.",
        expectedOutput: "Rounded Box",
        validationKeyword: "25px",
        xp: 60
      }
    ]
  },
  {
    id: "3",
    title: "Layout & Positioning",
    subLessons: [
      {
        id: "3-1",
        title: "Display: Block vs Inline",
        description: "Element flow.",
        content: "Block elements take full width. Inline elements only take needed width.",
        givenCode: "<div style=\"display: block; background: red;\">Block</div>\n<span style=\"display: inline; background: blue;\">Inline</span>",
        codeExplanation: {
          given: "Block and Inline examples.",
          rules: "Divs are block by default; Spans are inline.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Block\nInline",
        validationKeyword: "display",
        xp: 70
      },
      {
        id: "3-2",
        title: "Position: Relative",
        description: "Moving from normal spot.",
        content: "Offsets an element relative to its original position.",
        givenCode: "<div style=\"position: relative; top: 10px; left: 20px;\">Moved</div>",
        codeExplanation: {
          given: "Relatively positioned box.",
          rules: "Still takes up original space in flow.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Moved",
        validationKeyword: "relative",
        xp: 70
      },
      {
        id: "3-3",
        title: "Position: Absolute",
        description: "Moving relative to parent.",
        content: "Positions relative to the nearest positioned ancestor.",
        givenCode: "<div style=\"position: relative;\">\n  <div style=\"position: absolute; top: 0; right: 0;\">Top Right</div>\n</div>",
        codeExplanation: {
          given: "Absolute positioning inside relative parent.",
          rules: "Removed from normal document flow.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Top Right",
        validationKeyword: "absolute",
        xp: 70
      },
      {
        id: "3-4",
        title: "Position: Fixed",
        description: "Sticking to the screen.",
        content: "Stays in the same place even when scrolling.",
        givenCode: "<div style=\"position: fixed; bottom: 0; right: 0;\">Sticky</div>",
        codeExplanation: {
          given: "Fixed positioning.",
          rules: "Relative to the viewport.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Sticky",
        validationKeyword: "fixed",
        xp: 70
      },
      {
        id: "3-5",
        title: "Float and Clear",
        description: "Old-school layout.",
        content: "Push elements to left or right. Used for wrapping text around images.",
        givenCode: "<div style=\"float: left;\">Left</div>\n<div style=\"clear: both;\">Below</div>",
        codeExplanation: {
          given: "Float and clear example.",
          rules: "Mostly replaced by Flex and Grid.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Left\nBelow",
        validationKeyword: "float",
        xp: 70
      },
      {
        id: "3-6",
        title: "Z-Index",
        description: "Stacking order.",
        content: "Controls which element is on top. Higher numbers are 'closer' to you.",
        givenCode: "<div style=\"position: absolute; z-index: 10;\">Top</div>\n<div style=\"position: absolute; z-index: 1;\">Bottom</div>",
        codeExplanation: {
          given: "Two overlapping boxes with z-index.",
          rules: "Only works on positioned elements.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Top\nBottom",
        validationKeyword: "z-index",
        xp: 70
      }
    ]
  },
  {
    id: "4",
    title: "Flexbox Mastery",
    subLessons: [
      {
        id: "4-1",
        title: "Display: Flex",
        description: "The flexible container.",
        content: "Turn on flexbox to align children easily.",
        givenCode: "<div style=\"display: flex;\">\n  <div>1</div>\n  <div>2</div>\n</div>",
        codeExplanation: {
          given: "Flex container with two items.",
          rules: "Items align horizontally by default.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "12",
        validationKeyword: "flex",
        xp: 80
      },
      {
        id: "4-2",
        title: "Flex Direction",
        description: "Rows or Columns.",
        content: "Change the axis of the flex items.",
        givenCode: "<div style=\"display: flex; flex-direction: column;\">\n  <div>1</div>\n  <div>2</div>\n</div>",
        codeExplanation: {
          given: "Flex items in a column.",
          rules: "Default is 'row'.",
          toUse: "Change to 'row'."
        },
        challenge: "Change flex-direction to 'row'.",
        expectedOutput: "12",
        validationKeyword: "row",
        xp: 80
      },
      {
        id: "4-3",
        title: "Justify Content",
        description: "Main axis alignment.",
        content: "Align items along the main axis (horizontal for rows).",
        givenCode: "<div style=\"display: flex; justify-content: space-between;\">\n  <div>1</div>\n  <div>2</div>\n</div>",
        codeExplanation: {
          given: "Items pushed to the edges.",
          rules: "Options: center, flex-start, flex-end, space-around.",
          toUse: "Change to 'center'."
        },
        challenge: "Change justify-content to 'center'.",
        expectedOutput: "1 2",
        validationKeyword: "center",
        xp: 80
      }
    ]
  },
  {
    id: "5",
    title: "Advanced Layouts",
    subLessons: [
      {
        id: "5-1",
        title: "Align Items",
        description: "Cross axis alignment.",
        content: "Center, Stretch, etc.",
        givenCode: "<div style=\"display: flex; align-items: center;\">Item</div>",
        codeExplanation: {
          given: "Align items property.",
          rules: "Aligns along the cross axis.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Item",
        validationKeyword: "align-items",
        xp: 90
      },
      {
        id: "5-2",
        title: "Flex Grow",
        description: "Filling space.",
        content: "Relative growth factor.",
        givenCode: "<div style=\"flex-grow: 1;\">Grow</div>",
        codeExplanation: {
          given: "Flex grow property.",
          rules: "Applied to flex children.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Grow",
        validationKeyword: "flex-grow",
        xp: 90
      },
      {
        id: "5-3",
        title: "Grid Basics",
        description: "Modern 2D layout.",
        content: "Rows and columns grid.",
        givenCode: "<div style=\"display: grid; grid-template-columns: 1fr 1fr;\"><div>1</div><div>2</div></div>",
        codeExplanation: {
          given: "Display grid.",
          rules: "Define columns and rows.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "12",
        validationKeyword: "grid",
        xp: 90
      },
      {
        id: "5-4",
        title: "Grid Gap",
        description: "Spacing.",
        content: "Space between cells.",
        givenCode: "<div style=\"display: grid; gap: 10px;\">Grid</div>",
        codeExplanation: {
          given: "Gap property.",
          rules: "Works for both Flex and Grid.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Grid",
        validationKeyword: "gap:",
        xp: 90
      },
      {
        id: "5-5",
        title: "Grid Template Areas",
        description: "Named layout.",
        content: "Visual grid mapping.",
        givenCode: "<div style=\"display: grid; grid-template-areas: 'h h' 'm s';\">Layout</div>",
        codeExplanation: {
          given: "Template areas.",
          rules: "Very intuitive for complex layouts.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Layout",
        validationKeyword: "grid-template-areas",
        xp: 90
      },
      {
        id: "5-6",
        title: "Media Queries",
        description: "Responsive design.",
        content: "Change styles by screen size.",
        givenCode: "@media (max-width: 600px) { body { color: red; } }",
        codeExplanation: {
          given: "Media query syntax.",
          rules: "Basis of mobile-first design.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "",
        validationKeyword: "@media",
        xp: 90
      },
      {
        id: "5-7",
        title: "CSS Variables",
        description: "Custom properties.",
        content: "--name: value.",
        givenCode: ":root { --main: blue; }\n<p style=\"color: var(--main);\">Var</p>",
        codeExplanation: {
          given: "Variable example.",
          rules: "Reusable values.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Var",
        validationKeyword: "var(--",
        xp: 90
      },
      {
        id: "5-8",
        title: "Calc Function",
        description: "Dynamic math.",
        content: "Mix units.",
        givenCode: "<div style=\"width: calc(100% - 20px);\">Calc</div>",
        codeExplanation: {
          given: "Calc function.",
          rules: "Must have spaces around operators.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Calc",
        validationKeyword: "calc(",
        xp: 90
      },
      {
        id: "5-9",
        title: "Aspect Ratio",
        description: "Shape control.",
        content: "Maintain proportions.",
        givenCode: "<div style=\"aspect-ratio: 16 / 9; background: gray;\">Video</div>",
        codeExplanation: {
          given: "Aspect ratio property.",
          rules: "Modern replacement for padding-top hacks.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Video",
        validationKeyword: "aspect-ratio",
        xp: 90
      },
      {
        id: "5-10",
        title: "Object Fit",
        description: "Image scaling.",
        content: "Cover, Contain, Fill.",
        givenCode: "<img src=\"#\" style=\"object-fit: cover; width: 100px;\">",
        codeExplanation: {
          given: "Object fit property.",
          rules: "Controls how media fills its box.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "",
        validationKeyword: "object-fit",
        xp: 90
      },
      {
        id: "5-11",
        title: "CSS Reset",
        description: "Consistency.",
        content: "Removing browser defaults.",
        givenCode: "* { margin: 0; padding: 0; }",
        codeExplanation: {
          given: "Reset example.",
          rules: "Ensures same look across browsers.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "",
        validationKeyword: "* {",
        xp: 90
      }
    ]
  },
  {
    id: "6",
    title: "Animations & Effects",
    subLessons: [
      {
        id: "6-1",
        title: "Transitions",
        description: "Smooth changes.",
        content: "Animate property changes.",
        givenCode: "<div style=\"transition: color 1s;\">Hover</div>",
        codeExplanation: {
          given: "Transition property.",
          rules: "Requires a state change (like :hover).",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Hover",
        validationKeyword: "transition:",
        xp: 100
      },
      {
        id: "6-2",
        title: "Transforms (Rotate)",
        description: "Spinning.",
        content: "rotate(deg).",
        givenCode: "<div style=\"transform: rotate(45deg);\">Rotated</div>",
        codeExplanation: {
          given: "Rotate transform.",
          rules: "Doesn't affect document flow.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Rotated",
        validationKeyword: "rotate",
        xp: 100
      },
      {
        id: "6-3",
        title: "Transforms (Scale)",
        description: "Resizing.",
        content: "scale(x, y).",
        givenCode: "<div style=\"transform: scale(1.5);\">Big</div>",
        codeExplanation: {
          given: "Scale transform.",
          rules: "1 is normal size.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Big",
        validationKeyword: "scale",
        xp: 100
      },
      {
        id: "6-4",
        title: "Keyframes",
        description: "Complex animations.",
        content: "Define steps.",
        givenCode: "@keyframes slide { from { left: 0; } to { left: 100px; } }",
        codeExplanation: {
          given: "Keyframes syntax.",
          rules: "Use with `animation` property.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "",
        validationKeyword: "@keyframes",
        xp: 100
      },
      {
        id: "6-5",
        title: "Animation Property",
        description: "Running keyframes.",
        content: "Name, Duration, Iteration.",
        givenCode: "<div style=\"animation: slide 2s infinite;\">Moving</div>",
        codeExplanation: {
          given: "Animation shorthand.",
          rules: "Links to a @keyframes rule.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Moving",
        validationKeyword: "animation:",
        xp: 100
      },
      {
        id: "6-6",
        title: "Box Shadow",
        description: "Depth.",
        content: "X, Y, Blur, Spread, Color.",
        givenCode: "<div style=\"box-shadow: 5px 5px 10px gray;\">Shadow</div>",
        codeExplanation: {
          given: "Box shadow property.",
          rules: "Can be `inset`.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Shadow",
        validationKeyword: "box-shadow",
        xp: 100
      },
      {
        id: "6-7",
        title: "Opacity",
        description: "Transparency.",
        content: "0 to 1.",
        givenCode: "<div style=\"opacity: 0.5;\">Faded</div>",
        codeExplanation: {
          given: "Opacity property.",
          rules: "Affects children too.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Faded",
        validationKeyword: "opacity:",
        xp: 100
      },
      {
        id: "6-8",
        title: "Gradients (Linear)",
        description: "Color blends.",
        content: "Smooth transitions.",
        givenCode: "<div style=\"background: linear-gradient(red, blue);\">Gradient</div>",
        codeExplanation: {
          given: "Linear gradient.",
          rules: "Used as background-image.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Gradient",
        validationKeyword: "linear-gradient",
        xp: 100
      },
      {
        id: "6-9",
        title: "Filters",
        description: "Image effects.",
        content: "Blur, Grayscale, etc.",
        givenCode: "<img src=\"#\" style=\"filter: grayscale(100%);\">",
        codeExplanation: {
          given: "Filter property.",
          rules: "Post-processing effects.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "",
        validationKeyword: "filter:",
        xp: 100
      },
      {
        id: "6-10",
        title: "Cursor",
        description: "Mouse pointer.",
        content: "Pointer, Help, Wait, etc.",
        givenCode: "<div style=\"cursor: pointer;\">Clickable</div>",
        codeExplanation: {
          given: "Cursor property.",
          rules: "Visual hint for users.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Clickable",
        validationKeyword: "pointer",
        xp: 100
      },
      {
        id: "6-11",
        title: "User Select",
        description: "Text selection.",
        content: "None, All, Auto.",
        givenCode: "<div style=\"user-select: none;\">Unselectable</div>",
        codeExplanation: {
          given: "User select property.",
          rules: "Prevents text highlighting.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "Unselectable",
        validationKeyword: "user-select",
        xp: 100
      },
      {
        id: "6-12",
        title: "CSS Architecture (BEM)",
        description: "Clean CSS.",
        content: "Naming conventions.",
        givenCode: "<div class=\"card card--large\">BEM</div>",
        codeExplanation: {
          given: "BEM example.",
          rules: "Block__Element--Modifier.",
          toUse: "Run it."
        },
        challenge: "Run it.",
        expectedOutput: "BEM",
        validationKeyword: "card--",
        xp: 100
      }
    ]
  }
];
