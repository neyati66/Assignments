// ============================================================
// html-syllabus.js — renders the HTML Syllabus topic cards.
// Read-only with respect to quiz/SM-2 data; only touches the
// separate learning-progress storage key.
// ============================================================

(function () {
  const user = Auth.requireAuth();
  if (!user) return;
  const learning = Storage.getLearningData(user.email);

  const list = document.querySelector('[data-dynamic="syllabus-topics"]');
  if (!list) return;

  HTML_SYLLABUS.forEach((topic) => {
    const doneInTopic = topic.lessons.filter((l) => isLessonComplete(learning, topic.key, l.key)).length;
    const card = document.createElement("a");
    card.className = "card card-hover topic-card";
    card.href = `./html-course.html?topic=${encodeURIComponent(topic.key)}`;
    card.innerHTML = `
      <span class="icon-chip">${topic.icon}</span>
      <span class="topic-card-body">
        <b>${topic.name}</b>
        <span class="small muted">${topic.lessons.length} Lesson${topic.lessons.length === 1 ? "" : "s"}${doneInTopic ? ` · ${doneInTopic} completed` : ""}</span>
      </span>
      <span class="topic-card-chevron">&rsaquo;</span>`;
    list.appendChild(card);
  });
})();
