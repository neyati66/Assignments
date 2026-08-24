// ============================================================
// html-lesson.js — renders one detailed lesson. Marks the lesson
// complete in Storage's separate learning-progress key only —
// never touches sm2/quiz data.
// ============================================================

(function () {
  const user = Auth.requireAuth();
  if (!user) return;

  const params = new URLSearchParams(window.location.search);
  const topicKey = params.get("topic");
  const lessonKey = params.get("lesson");
  const found = findLesson(topicKey, lessonKey);

  if (!found) { window.location.href = "./html-syllabus.html"; return; }
  const { topic, lesson } = found;

  // mark complete on view (simple, honest model: reaching the lesson counts as progress)
  let learning = Storage.getLearningData(user.email);
  markLessonComplete(learning, topic.key, lesson.key);
  Storage.saveLearningData(user.email, learning);

  function escapeHtml(str) {
    return String(str).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  }

  // ---------- header ----------
  document.querySelector('[data-dynamic="lesson-breadcrumb"]').innerHTML =
    `<a href="./html-syllabus.html">HTML Syllabus</a> &rsaquo; <a href="./html-course.html?topic=${encodeURIComponent(topic.key)}">${topic.name}</a> &rsaquo; ${lesson.title}`;
  document.querySelector('[data-dynamic="lesson-eyebrow"]').textContent = topic.name;
  document.querySelector('[data-dynamic="lesson-title"]').textContent = lesson.title;
  document.querySelector('[data-dynamic="lesson-intro"]').textContent = lesson.intro;

  const lessonIdxInTopic = topic.lessons.findIndex((l) => l.key === lesson.key);
  document.querySelector('[data-dynamic="lesson-progress-indicator"]').innerHTML =
    `Lesson <b>${lessonIdxInTopic + 1}</b> of <b>${topic.lessons.length}</b>`;
  document.querySelector('[data-dynamic="lesson-progress-fill"]').style.width =
    `${Math.round(((lessonIdxInTopic + 1) / topic.lessons.length) * 100)}%`;

  // ---------- key points ----------
  const pointsEl = document.querySelector('[data-dynamic="lesson-points"]');
  lesson.points.forEach((p) => {
    const li = document.createElement("li");
    li.textContent = p;
    pointsEl.appendChild(li);
  });

  // ---------- code ----------
  document.querySelector('[data-dynamic="lesson-code"]').innerHTML =
    `<pre><code>${escapeHtml(lesson.code)}</code></pre><p class="small" style="margin-top:10px;color:#cfc9e2">${lesson.codeExplain}</p>`;

  // ---------- note ----------
  document.querySelector('[data-dynamic="lesson-note"]').innerHTML = `💡 <b>Note:</b> ${lesson.note}`;

  // ---------- prev/next ----------
  const prevBtn = document.querySelector('[data-dynamic="lesson-prev"]');
  const nextBtn = document.querySelector('[data-dynamic="lesson-next"]');
  const prevRef = adjacentLesson(topic.key, lesson.key, -1);
  const nextRef = adjacentLesson(topic.key, lesson.key, 1);

  if (prevRef) {
    prevBtn.addEventListener("click", () => {
      window.location.href = `./html-lesson.html?topic=${encodeURIComponent(prevRef.topicKey)}&lesson=${encodeURIComponent(prevRef.lessonKey)}`;
    });
  } else {
    prevBtn.disabled = true;
  }
  if (nextRef) {
    nextBtn.addEventListener("click", () => {
      window.location.href = `./html-lesson.html?topic=${encodeURIComponent(nextRef.topicKey)}&lesson=${encodeURIComponent(nextRef.lessonKey)}`;
    });
  } else {
    nextBtn.textContent = "Finished this topic ✓";
    nextBtn.disabled = true;
  }

  // ---------- this topic's lesson list ----------
  const listEl = document.querySelector('[data-dynamic="lesson-topic-list"]');
  topic.lessons.forEach((l) => {
    const done = isLessonComplete(learning, topic.key, l.key);
    const isCurrent = l.key === lesson.key;
    const a = document.createElement("a");
    a.className = "syllabus-lesson-row" + (done ? " done" : "") + (isCurrent ? " current" : "");
    a.href = `./html-lesson.html?topic=${encodeURIComponent(topic.key)}&lesson=${encodeURIComponent(l.key)}`;
    a.innerHTML = `<span class="syllabus-lesson-dot">${done ? "✓" : "○"}</span><span>${l.title}</span>`;
    listEl.appendChild(a);
  });
})();
