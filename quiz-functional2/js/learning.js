// ============================================================
// learning.js — content + helpers for the new HTML Syllabus /
// Course / Lesson pages. Purely additive: does not touch
// QUESTION_BANK, sm2.js, or Storage's quiz/user-data keys.
// ============================================================

const HTML_SYLLABUS = [
  {
    key: "intro",
    name: "Introduction to HTML",
    icon: "📄",
    lessons: [
      {
        key: "what-is-html",
        title: "What is HTML?",
        duration: "6 min",
        intro: "HTML (HyperText Markup Language) is the standard markup language used to structure content on the web. It doesn't style or program a page — it describes what each piece of content *is*: a heading, a paragraph, a link, an image.",
        points: [
          "HTML documents are made of elements, written as tags like <p> or <h1>.",
          "Browsers read HTML and render it as a visual page.",
          "HTML works together with CSS (styling) and JavaScript (behavior).",
          "It is not a programming language — it has no logic or loops, only structure.",
        ],
        note: "Think of HTML as the skeleton of a webpage: it gives every piece of content a defined role before any styling is applied.",
        code: `<p>Hello, this is a paragraph of text.</p>\n<a href=\"https://example.com\">This is a link</a>`,
        codeExplain: "The <p> tag marks a paragraph, and <a href=\"...\"> creates a clickable hyperlink. Each tag tells the browser what kind of content it's looking at.",
      },
      {
        key: "doc-structure",
        title: "Basic HTML Document Structure",
        duration: "8 min",
        intro: "Every HTML page follows the same basic skeleton. Learning this structure is the first step to writing valid, predictable pages.",
        points: [
          "<!DOCTYPE html> tells the browser to use modern HTML5 rules.",
          "<html> is the root element that wraps everything else.",
          "<head> holds metadata — title, character set, linked CSS — nothing visible.",
          "<body> holds everything the visitor actually sees.",
        ],
        note: "A missing or misplaced <!DOCTYPE html> can make older browsers render your page in 'quirks mode', with inconsistent spacing and sizing.",
        code: `<!DOCTYPE html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <title>My First Page</title>\n  </head>\n  <body>\n    <h1>Hello, HTML!</h1>\n  </body>\n</html>`,
        codeExplain: "This is the minimum valid HTML5 document. The <meta charset> line ensures text (including special characters) displays correctly, and <title> sets the browser tab's text.",
      },
      {
        key: "headings-paragraphs",
        title: "Headings and Paragraphs",
        duration: "7 min",
        intro: "Headings and paragraphs are the most common text elements in HTML, and getting their hierarchy right matters for both readability and accessibility.",
        points: [
          "HTML provides six heading levels: <h1> through <h6>.",
          "<h1> should be used once per page for the main title.",
          "Heading levels should not be skipped (e.g. don't jump from <h1> to <h4>).",
          "<p> wraps a block of regular body text.",
        ],
        note: "Screen readers use heading levels to build a page outline — skipping levels can make a page confusing to navigate for assistive technology users.",
        code: `<h1>Web Development Basics</h1>\n<h2>Getting Started</h2>\n<p>HTML is the first language most developers learn.</p>`,
        codeExplain: "The <h1> is the page's main title, <h2> introduces a subsection, and <p> holds the descriptive text beneath it — a natural reading hierarchy.",
      },
    ],
  },
  {
    key: "elements-tags",
    name: "HTML Elements & Tags",
    icon: "🏷️",
    lessons: [
      {
        key: "heading-paragraph",
        title: "Heading and Paragraph",
        duration: "5 min",
        intro: "Beyond basic structure, headings and paragraphs can carry attributes and be combined with inline elements to add emphasis without changing meaning.",
        points: [
          "<strong> marks text as important (usually bold).",
          "<em> marks text with emphasis (usually italic).",
          "Inline elements live inside block elements like <p>.",
          "Never use headings just to make text look big — use CSS for that.",
        ],
        note: "Choose heading tags for meaning, not appearance. If you want large text without semantic weight, style a <p> or <span> with CSS instead.",
        code: `<p>HTML is <strong>essential</strong> for every website, and <em>surprisingly</em> simple to learn.</p>`,
        codeExplain: "<strong> and <em> add semantic emphasis inside a paragraph without breaking the flow of the sentence.",
      },
      {
        key: "links",
        title: "Links",
        duration: "6 min",
        intro: "The anchor tag <a> is what makes the web a 'web' — it connects pages to each other.",
        points: [
          "href sets the destination URL.",
          "target=\"_blank\" opens the link in a new tab.",
          "Links can wrap text, images, or other elements.",
          "Relative paths (./page.html) link within your own site; absolute URLs link elsewhere.",
        ],
        note: "When using target=\"_blank\", it's good practice to add rel=\"noopener\" for security and performance reasons.",
        code: `<a href=\"https://developer.mozilla.org\" target=\"_blank\" rel=\"noopener\">Open MDN docs</a>`,
        codeExplain: "This link opens the MDN documentation in a new browser tab, and rel=\"noopener\" prevents the new page from accessing the original one.",
      },
      {
        key: "images",
        title: "Images",
        duration: "6 min",
        intro: "The <img> tag embeds visual content directly into a page. Unlike most HTML elements, it's a self-closing (void) element.",
        points: [
          "src points to the image file.",
          "alt provides fallback/accessible text — never skip it.",
          "width and height help the browser reserve space and avoid layout shift.",
          "<img> has no closing tag.",
        ],
        note: "Search engines and screen readers rely entirely on the alt attribute to understand what an image shows — write it as a real description, not a filename.",
        code: `<img src=\"diagram.png\" alt=\"Diagram of the HTML document tree\" width=\"480\" height=\"280\" />`,
        codeExplain: "The browser fetches diagram.png, reserves a 480×280 box for it immediately, and falls back to the alt text if the image fails to load.",
      },
      {
        key: "lists",
        title: "Lists",
        duration: "5 min",
        intro: "HTML offers two core list types for grouping related items.",
        points: [
          "<ul> creates an unordered (bulleted) list.",
          "<ol> creates an ordered (numbered) list.",
          "<li> defines each item inside either type.",
          "Lists can be nested inside one another for sub-items.",
        ],
        note: "Use <ol> when the order of items matters (like steps in a recipe), and <ul> when it doesn't (like a set of features).",
        code: `<ol>\n  <li>Write the HTML</li>\n  <li>Add CSS for styling</li>\n  <li>Add JavaScript for behavior</li>\n</ol>`,
        codeExplain: "The browser automatically numbers each <li> in an <ol>, and renumbers automatically if an item is added or removed.",
      },
      {
        key: "tables",
        title: "Tables",
        duration: "7 min",
        intro: "Tables organize tabular data into rows and columns — not for page layout, which is CSS's job.",
        points: [
          "<table> is the container for the whole table.",
          "<tr> defines a table row.",
          "<th> defines a header cell; <td> defines a normal data cell.",
          "<thead>/<tbody> group header and body rows for structure.",
        ],
        note: "Using tables for page layout (instead of CSS Grid/Flexbox) is an outdated practice that hurts accessibility and responsiveness.",
        code: `<table>\n  <tr><th>Tag</th><th>Purpose</th></tr>\n  <tr><td>&lt;tr&gt;</td><td>Table row</td></tr>\n</table>`,
        codeExplain: "The first row uses <th> for column headers; the second row uses <td> for the actual data cells.",
      },
      {
        key: "forms-and-inputs",
        title: "Forms and Inputs",
        duration: "8 min",
        intro: "Forms let a page collect input from a visitor — text, selections, files, and more — and send it somewhere for processing.",
        points: [
          "<form> wraps all the input controls that will be submitted together.",
          "<input> is the most common control; its type attribute changes its behavior.",
          "<label> connects descriptive text to a specific input for accessibility.",
          "The required attribute prevents submission until a field is filled in.",
        ],
        note: "Always pair every input with a <label> — clicking the label should focus the input, which also greatly helps mobile and screen-reader users.",
        code: `<form>\n  <label for=\"email\">Email</label>\n  <input id=\"email\" type=\"email\" required />\n</form>`,
        codeExplain: "The label's for attribute matches the input's id, linking them together — clicking the text \"Email\" focuses the input box.",
      },
      {
        key: "semantic-html",
        title: "Semantic HTML",
        duration: "7 min",
        intro: "Semantic tags describe the *meaning* of the content they wrap, rather than just its appearance.",
        points: [
          "<header>, <nav>, <main>, <footer> describe page regions.",
          "<article> wraps self-contained content (like a blog post).",
          "<section> groups related content under a theme.",
          "Semantic tags improve accessibility and SEO over generic <div>s.",
        ],
        note: "A page built entirely from <div> elements works visually, but tells browsers, search engines, and assistive tech nothing about what each part means.",
        code: `<header><h1>My Blog</h1></header>\n<main>\n  <article><h2>Post title</h2><p>Post content…</p></article>\n</main>`,
        codeExplain: "<header> marks the introductory region, <main> marks the primary content, and <article> marks one self-contained piece of content within it.",
      },
    ],
  },
  {
    key: "forms-inputs",
    name: "Forms & Inputs",
    icon: "📝",
    lessons: [
      {
        key: "basic-form",
        title: "Building a Basic Form",
        duration: "7 min",
        intro: "A form is a container for one or more controls that collect data from a user before it's submitted.",
        points: [
          "action sets where submitted data is sent.",
          "method sets how it's sent (GET or POST).",
          "Every meaningful control should have a name attribute so its value is identifiable.",
          "A <button type=\"submit\"> (or default input type) submits the form.",
        ],
        note: "Without a name attribute, an input's value is never included when the form is submitted — a very common beginner mistake.",
        code: `<form action=\"/submit\" method=\"POST\">\n  <input name=\"username\" type=\"text\" />\n  <button type=\"submit\">Send</button>\n</form>`,
        codeExplain: "On submit, the browser sends username=<value> to /submit using a POST request.",
      },
      {
        key: "input-types",
        title: "Common Input Types",
        duration: "6 min",
        intro: "The type attribute transforms a plain text box into a purpose-built control, often with built-in validation and mobile keyboard support.",
        points: [
          "type=\"email\" validates a basic email pattern.",
          "type=\"password\" masks typed characters.",
          "type=\"checkbox\" and type=\"radio\" allow selecting one or more options.",
          "type=\"date\" and type=\"number\" show native pickers on many browsers.",
        ],
        note: "Choosing the right input type reduces the amount of custom validation you need to write yourself.",
        code: `<input type=\"email\" placeholder=\"you@example.com\" />\n<input type=\"checkbox\" id=\"agree\" /> <label for=\"agree\">I agree</label>`,
        codeExplain: "The email input rejects obviously invalid addresses on submit, and the checkbox toggles a boolean value tied to its label.",
      },
      {
        key: "labels-validation-accessibility",
        title: "Labels, Validation & Accessibility",
        duration: "7 min",
        intro: "A form is only as good as its usability — clear labels and helpful validation make the difference between a frustrating form and an easy one.",
        points: [
          "required, min, max, and pattern provide built-in client-side validation.",
          "placeholder is a hint, not a replacement for a real <label>.",
          "fieldset and legend group related controls (like a set of radio buttons).",
          "Focus states (via CSS :focus) help keyboard users see where they are.",
        ],
        note: "Never rely on placeholder text alone to identify a field — it disappears the moment the user starts typing.",
        code: `<fieldset>\n  <legend>Preferred contact method</legend>\n  <input type=\"radio\" name=\"contact\" id=\"c1\" /><label for=\"c1\">Email</label>\n  <input type=\"radio\" name=\"contact\" id=\"c2\" /><label for=\"c2\">Phone</label>\n</fieldset>`,
        codeExplain: "The <legend> announces what the group of radio buttons is for, and the shared name=\"contact\" makes the two radios mutually exclusive.",
      },
    ],
  },
  {
    key: "tables-lists",
    name: "Tables & Lists",
    icon: "📊",
    lessons: [
      {
        key: "creating-tables",
        title: "Creating Tables",
        duration: "6 min",
        intro: "Well-structured tables make tabular data easy to scan and easy for assistive technology to describe.",
        points: [
          "<caption> gives a table an accessible title.",
          "<thead>, <tbody>, and <tfoot> group rows semantically.",
          "colspan and rowspan let a cell span multiple columns or rows.",
          "Keep one row per record and one column per attribute.",
        ],
        note: "A <caption> is read aloud by screen readers before the table content, giving context that sighted users get from surrounding page design.",
        code: `<table>\n  <caption>Quarterly sales</caption>\n  <thead><tr><th>Quarter</th><th>Revenue</th></tr></thead>\n  <tbody><tr><td>Q1</td><td>$12,000</td></tr></tbody>\n</table>`,
        codeExplain: "thead groups the header row, tbody groups the data rows, and caption announces what the whole table represents.",
      },
      {
        key: "ordered-unordered-lists",
        title: "Ordered & Unordered Lists",
        duration: "5 min",
        intro: "Lists are one of the most frequently used structures on the web, from navigation menus to step-by-step guides.",
        points: [
          "<ol type=\"A\"> or type=\"i\" changes the numbering style.",
          "<ul> is commonly restyled with CSS into navigation menus.",
          "The value attribute on an <li> can override its number in an <ol>.",
          "Lists can hold any block content, not just text.",
        ],
        note: "Most site navigation bars are, semantically, an unordered list of links — CSS just removes the bullets and lays them out horizontally.",
        code: `<ul>\n  <li><a href=\"./index.html\">Home</a></li>\n  <li><a href=\"./about.html\">About</a></li>\n</ul>`,
        codeExplain: "This is the standard semantic pattern for a navigation menu: a list of links, later styled with CSS.",
      },
      {
        key: "nested-lists-table-accessibility",
        title: "Nested Lists and Table Accessibility",
        duration: "6 min",
        intro: "Real content often needs lists within lists, or tables that stay usable at every screen size.",
        points: [
          "A nested <ul>/<ol> must sit inside an <li> of its parent list.",
          "scope=\"col\" or scope=\"row\" on a <th> clarifies what it labels.",
          "Very wide tables can be wrapped in a scrollable container on small screens.",
          "Avoid nesting tables inside tables — restructure the data instead.",
        ],
        note: "The scope attribute is small but powerful: it tells screen readers exactly which cells a header describes, especially in complex tables.",
        code: `<ul>\n  <li>Frontend\n    <ul><li>HTML</li><li>CSS</li></ul>\n  </li>\n  <li>Backend</li>\n</ul>`,
        codeExplain: "The inner <ul> is nested inside the \"Frontend\" <li>, producing a sub-list visually indented beneath it.",
      },
    ],
  },
  {
    key: "semantic-html",
    name: "Semantic HTML",
    icon: "🧩",
    lessons: [
      {
        key: "why-semantic-matters",
        title: "Why Semantic HTML Matters",
        duration: "6 min",
        intro: "Semantic HTML is about choosing tags that describe meaning, which pays off in accessibility, SEO, and long-term maintainability.",
        points: [
          "Screen readers build a navigable outline from semantic landmarks.",
          "Search engines weigh semantically-marked content more accurately.",
          "Semantic tags document intent for other developers reading your code.",
          "Non-semantic <div>/<span> still have a place — for elements with no inherent meaning.",
        ],
        note: "A good rule of thumb: reach for a semantic tag first, and fall back to <div>/<span> only when nothing more specific fits.",
        code: `<!-- Less semantic -->\n<div class=\"nav\">...</div>\n\n<!-- More semantic -->\n<nav>...</nav>`,
        codeExplain: "Both can look identical after CSS, but only <nav> tells browsers and assistive tech what the region actually is.",
      },
      {
        key: "page-structure-tags",
        title: "Page Structure Tags (header, nav, main, footer)",
        duration: "7 min",
        intro: "These four tags form the skeleton of most modern pages, dividing it into recognizable landmarks.",
        points: [
          "<header> — introductory content, often a logo and title.",
          "<nav> — a block of primary navigation links.",
          "<main> — the one primary block of unique page content (used once per page).",
          "<footer> — closing content like copyright or contact links.",
        ],
        note: "There should be exactly one <main> per page — it's the fastest way for assistive tech users to skip straight to the real content.",
        code: `<header><h1>Site name</h1><nav>...</nav></header>\n<main>...</main>\n<footer>© 2026</footer>`,
        codeExplain: "This lays out the classic top-to-bottom landmark structure: header, main content, then footer.",
      },
      {
        key: "article-section-aside",
        title: "article, section & aside",
        duration: "7 min",
        intro: "These three tags divide content within the main area based on how self-contained or supplementary it is.",
        points: [
          "<article> — content that could stand alone (a blog post, a product card).",
          "<section> — a thematic grouping, usually with its own heading.",
          "<aside> — content tangentially related to the surrounding content (a sidebar, a callout).",
          "It's fine to nest <section> inside <article>, or vice versa, when it reflects real structure.",
        ],
        note: "A quick test: if you could pull the block out and it would still make sense on its own (like an RSS feed item), it's probably an <article>.",
        code: `<article>\n  <h2>Understanding Semantic HTML</h2>\n  <p>...</p>\n  <aside>Related: HTML5 landmarks</aside>\n</article>`,
        codeExplain: "The <article> is the self-contained post; the nested <aside> is supplementary content related to it, not central to it.",
      },
    ],
  },
];

function learningKey(topicKey, lessonKey) { return `${topicKey}::${lessonKey}`; }

function findTopic(topicKey) { return HTML_SYLLABUS.find((t) => t.key === topicKey) || null; }

function findLesson(topicKey, lessonKey) {
  const topic = findTopic(topicKey);
  if (!topic) return null;
  const lesson = topic.lessons.find((l) => l.key === lessonKey);
  return lesson ? { topic, lesson } : null;
}

function totalLessonCount() {
  return HTML_SYLLABUS.reduce((s, t) => s + t.lessons.length, 0);
}

function completedCount(learningData) {
  return Object.keys(learningData.completedLessons || {}).length;
}

function isLessonComplete(learningData, topicKey, lessonKey) {
  return !!(learningData.completedLessons || {})[learningKey(topicKey, lessonKey)];
}

function markLessonComplete(learningData, topicKey, lessonKey) {
  if (!learningData.completedLessons) learningData.completedLessons = {};
  learningData.completedLessons[learningKey(topicKey, lessonKey)] = true;
  learningData.lastVisited = { topic: topicKey, lesson: lessonKey, at: Date.now() };
  return learningData;
}

// flat, ordered list of {topicKey, lessonKey} across the whole syllabus — used for Prev/Next
function flatLessonList() {
  const out = [];
  HTML_SYLLABUS.forEach((t) => t.lessons.forEach((l) => out.push({ topicKey: t.key, lessonKey: l.key })));
  return out;
}

function adjacentLesson(topicKey, lessonKey, dir) {
  const flat = flatLessonList();
  const idx = flat.findIndex((x) => x.topicKey === topicKey && x.lessonKey === lessonKey);
  if (idx === -1) return null;
  const nextIdx = idx + dir;
  if (nextIdx < 0 || nextIdx >= flat.length) return null;
  return flat[nextIdx];
}
