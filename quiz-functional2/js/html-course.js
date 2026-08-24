// ============================================================
// html-course.js — renders the HTML Course/Learning page for
// one syllabus topic, with a right-hand sidebar showing the
// full HTML syllabus so a learner can jump between topics.
// ============================================================

(function () {
  const user = Auth.requireAuth();
  if (!user) return;

  const params = new URLSearchParams(window.location.search);
  const topicKey = params.get("topic") || HTML_SYLLABUS[0].key;
  const topic = findTopic(topicKey);

  if (!topic) { window.location.href = "./html-syllabus.html"; return; }

  let learning = Storage.getLearningData(user.email);
  learning.lastVisited = { topic: topic.key, lesson: null, at: Date.now() };
  Storage.saveLearningData(user.email, learning);

  // ---------- header ----------
  document.querySelector('[data-dynamic="course-eyebrow"]').textContent = `HTML Course · ${topic.name}`;
  document.querySelector('[data-dynamic="course-title"]').textContent = `${topic.name}`;
  document.querySelector('[data-dynamic="course-desc"]').textContent =
    `Work through ${topic.lessons.length} focused lesson${topic.lessons.length === 1 ? "" : "s"} on ${topic.name.toLowerCase()}, complete with explanations and code examples. No prior experience assumed.`;

  // ---------- summary cards ----------
  const firstLesson = topic.lessons[0];
  const allPoints = topic.lessons.flatMap((l) => l.points);
  const summaryCards = [
    { icon: "🎯", title: "What You Will Learn", body: allPoints.slice(0, 3).map((p) => `<li>${p}</li>`).join("") , isList: true },
    { icon: "🧩", title: "Core Concepts Covered", body: topic.lessons.map((l) => l.title).join(", ") },
    { icon: "🔑", title: "Key Takeaway", body: firstLesson ? firstLesson.note : "" },
    { icon: "📎", title: "About This Topic", body: `${topic.lessons.length} lesson${topic.lessons.length === 1 ? "" : "s"} · part of the HTML syllabus. Finish them all, then take the adaptive HTML quiz.` },
  ];
  const summaryEl = document.querySelector('[data-dynamic="summary-cards"]');
  summaryCards.forEach((c) => {
    const div = document.createElement("div");
    div.className = "card summary-mini-card";
    div.innerHTML = `<b>${c.icon} ${c.title}</b>${c.isList ? `<ul class="small" style="margin:8px 0 0;padding-left:18px">${c.body}</ul>` : `<p class="small" style="margin-top:8px">${c.body}</p>`}`;
    summaryEl.appendChild(div);
  });

  // ---------- code example ----------
  const codeEl = document.querySelector('[data-dynamic="course-code"]');
  if (firstLesson) {
    codeEl.innerHTML = `<pre><code>${escapeHtml(firstLesson.code)}</code></pre><p class="small" style="margin-top:10px;color:#cfc9e2">${firstLesson.codeExplain}</p>`;
  }

  // ---------- watch button (no real video source in this build) ----------
  const watchBtn = document.querySelector('[data-dynamic="course-watch-btn"]');
  if (watchBtn) {
    watchBtn.addEventListener("click", (e) => {
      e.preventDefault();
      Notify.showInfo("Video playback isn't connected to a real video source in this build.");
    });
  }

  // ---------- progress + stats sidebar ----------
  function renderProgress() {
    learning = Storage.getLearningData(user.email);
    const total = topic.lessons.length;
    const done = topic.lessons.filter((l) => isLessonComplete(learning, topic.key, l.key)).length;
    const pct = total ? Math.round((done / total) * 100) : 0;
    document.querySelector('[data-dynamic="course-progress-pct"]').textContent = `${pct}%`;
    document.querySelector('[data-dynamic="course-progress-fill"]').style.width = `${pct}%`;
    document.querySelector('[data-dynamic="course-progress-note"]').textContent = `${done} of ${total} lessons completed`;
  }

  const totalMinutes = topic.lessons.reduce((s, l) => s + (parseInt(l.duration, 10) || 0), 0);
  document.querySelector('[data-dynamic="course-duration"]').textContent = `${totalMinutes} min`;
  document.querySelector('[data-dynamic="course-modules"]').textContent = `${HTML_SYLLABUS.length} topics`;

  // ---------- full syllabus sidebar (all topics, current one expanded) ----------
  const syllabusEl = document.querySelector('[data-dynamic="course-syllabus"]');
  function renderSyllabus() {
    syllabusEl.innerHTML = "";
    HTML_SYLLABUS.forEach((t, i) => {
      const isCurrent = t.key === topic.key;
      const group = document.createElement("div");
      group.className = "syllabus-module" + (isCurrent ? " open" : "");

      const doneInT = t.lessons.filter((l) => isLessonComplete(learning, t.key, l.key)).length;
      const head = document.createElement("button");
      head.type = "button";
      head.className = "syllabus-module-head";
      head.innerHTML = `<span>${i + 1}. ${t.name}</span><span class="small muted">${doneInT}/${t.lessons.length} &nbsp; ${isCurrent ? "▾" : "▸"}</span>`;
      head.addEventListener("click", () => group.classList.toggle("open"));
      group.appendChild(head);

      const lessonList = document.createElement("div");
      lessonList.className = "syllabus-module-lessons";
      t.lessons.forEach((l) => {
        const done = isLessonComplete(learning, t.key, l.key);
        const a = document.createElement("a");
        a.className = "syllabus-lesson-row" + (done ? " done" : "");
        a.href = `./html-lesson.html?topic=${encodeURIComponent(t.key)}&lesson=${encodeURIComponent(l.key)}`;
        a.innerHTML = `<span class="syllabus-lesson-dot">${done ? "✓" : "○"}</span><span>${l.title}</span><span class="small muted" style="margin-left:auto">${l.duration}</span>`;
        lessonList.appendChild(a);
      });
      group.appendChild(lessonList);
      syllabusEl.appendChild(group);
    });
  }

  function escapeHtml(str) {
    return String(str).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
  }

  renderProgress();
  renderSyllabus();
})();
