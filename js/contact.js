// About and Contact page: form validation, Local Storage, and a list of saved suggestions.

(function () {
  const SUBMISSIONS_KEY = "artscape:suggestions";

  const form = document.getElementById("suggest-form");
  const success = document.getElementById("success");
  const list = document.getElementById("submissions");
  const clearButton = document.getElementById("clear-suggestions");
  const detailsInput = document.getElementById("details");
  const counter = document.getElementById("details-count");

  // One rule per field. Each returns an error message, or "" when the value is fine.
  const rules = {
    name: function (value) {
      return value.trim().length >= 2 ? "" : "Enter your name (at least 2 characters).";
    },
    email: function (value) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()) ? "" : "Enter a valid email, like name@example.com.";
    },
    kind: function (value) {
      return value ? "" : "Choose what you are suggesting.";
    },
    title: function (value) {
      return value.trim().length >= 2 ? "" : "Enter the name of your suggestion.";
    },
    link: function (value) {
      if (value.trim() === "") return ""; // optional field
      try {
        const url = new URL(value.trim());
        return url.protocol === "http:" || url.protocol === "https:" ? "" : "Start the link with https://";
      } catch (error) {
        return "Enter a full link, like https://example.com";
      }
    },
    details: function (value) {
      return value.trim().length >= 20 ? "" : "Tell us why it belongs here (at least 20 characters).";
    }
  };

  function validateField(name) {
    const input = form.elements[name];
    const message = rules[name](input.value);
    document.getElementById(name + "-error").textContent = message;
    input.setAttribute("aria-invalid", message ? "true" : "false");
    return message === "";
  }

  function getSubmissions() {
    try {
      const raw = localStorage.getItem(SUBMISSIONS_KEY);
      const items = raw ? JSON.parse(raw) : [];
      return Array.isArray(items) ? items : [];
    } catch (error) {
      return [];
    }
  }

  function renderSubmissions() {
    const items = getSubmissions().slice(-5).reverse();
    clearButton.hidden = items.length === 0;
    if (items.length === 0) {
      list.innerHTML = "<li>No suggestions yet. Send the first one with the form.</li>";
      return;
    }
    list.innerHTML = items.map(function (item) {
      const date = new Date(item.date).toLocaleDateString();
      return "<li><strong>" + escapeHtml(item.title) + "</strong> (" + escapeHtml(item.kind) + ", " + date + ")</li>";
    }).join("");
  }

  // Check a field when the user leaves it, and re-check while they fix it
  Object.keys(rules).forEach(function (name) {
    const input = form.elements[name];
    input.addEventListener("blur", function () {
      validateField(name);
    });
    input.addEventListener("input", function () {
      if (input.getAttribute("aria-invalid") === "true") validateField(name);
    });
  });

  detailsInput.addEventListener("input", function () {
    counter.textContent = detailsInput.value.trim().length + " characters";
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    success.hidden = true;

    let firstInvalid = null;
    Object.keys(rules).forEach(function (name) {
      if (!validateField(name) && !firstInvalid) firstInvalid = form.elements[name];
    });

    if (firstInvalid) {
      firstInvalid.focus();
      return;
    }

    const submissions = getSubmissions();
    submissions.push({
      name: form.elements.name.value.trim(),
      email: form.elements.email.value.trim(),
      kind: form.elements.kind.value,
      title: form.elements.title.value.trim(),
      link: form.elements.link.value.trim(),
      details: form.elements.details.value.trim(),
      date: new Date().toISOString()
    });

    try {
      localStorage.setItem(SUBMISSIONS_KEY, JSON.stringify(submissions));
    } catch (error) {
      showToast("Could not save. Your browser may be blocking storage.");
      return;
    }

    success.innerHTML = "<p><strong>Thanks, " + escapeHtml(form.elements.name.value.trim()) +
      ".</strong> Your " + escapeHtml(form.elements.kind.value.toLowerCase()) + " suggestion, \"" +
      escapeHtml(form.elements.title.value.trim()) + "\", was saved on this device.</p>";
    success.hidden = false;
    success.focus();

    form.reset();
    counter.textContent = "0 characters";
    Object.keys(rules).forEach(function (name) {
      form.elements[name].setAttribute("aria-invalid", "false");
    });
    renderSubmissions();
  });

  clearButton.addEventListener("click", function () {
    if (confirm("Clear your saved suggestions?")) {
      localStorage.removeItem(SUBMISSIONS_KEY);
      renderSubmissions();
      showToast("Suggestions cleared");
    }
  });

  renderSubmissions();
})();
