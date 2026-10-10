// Fonts page: search, category filter, and live preview text and size.

(function () {
  const DEFAULT_TEXT = "Make something worth looking at";
  const CATEGORIES = ["All", "Serif", "Sans-serif", "Script", "Display", "Handwriting", "Monospace"];

  const state = { search: "", category: "All", text: DEFAULT_TEXT, size: 40 };

  const grid = document.getElementById("font-grid");
  const countEl = document.getElementById("result-count");
  const searchInput = document.getElementById("font-search");
  const textInput = document.getElementById("preview-text");
  const sizeInput = document.getElementById("preview-size");
  const sizeLabel = document.getElementById("size-label");
  const chipBar = document.getElementById("category-chips");

  function renderChips() {
    chipBar.innerHTML = CATEGORIES.map(function (category) {
      return '<button type="button" class="chip" data-category="' + category +
        '" aria-pressed="' + (category === state.category) + '">' + category + "</button>";
    }).join("");
  }

  function render() {
    const query = state.search.trim().toLowerCase();
    const list = FONTS.filter(function (font) {
      const matchesCategory = state.category === "All" || font.category === state.category;
      const searchable = (font.name + " " + font.category + " " + font.mood + " " + font.bestFor).toLowerCase();
      return matchesCategory && (query === "" || searchable.includes(query));
    });

    countEl.textContent = list.length + (list.length === 1 ? " font" : " fonts");

    if (list.length === 0) {
      grid.innerHTML = '<div class="empty"><p>No fonts match "' + escapeHtml(state.search) +
        '". Clear the search or choose All to see every font.</p>' +
        '<button type="button" class="btn btn-small" id="reset-filters">Reset filters</button></div>';
      return;
    }

    const previewText = state.text.trim() === "" ? DEFAULT_TEXT : state.text;
    grid.innerHTML = list.map(function (font) {
      return fontCard(font, previewText, state.size);
    }).join("");
  }

  searchInput.addEventListener("input", function () {
    state.search = searchInput.value;
    render();
  });

  textInput.addEventListener("input", function () {
    state.text = textInput.value;
    render();
  });

  sizeInput.addEventListener("input", function () {
    state.size = Number(sizeInput.value);
    sizeLabel.textContent = state.size + " px";
    render();
  });

  chipBar.addEventListener("click", function (event) {
    const chip = event.target.closest("[data-category]");
    if (!chip) return;
    state.category = chip.dataset.category;
    renderChips();
    render();
  });

  grid.addEventListener("click", function (event) {
    if (!event.target.closest("#reset-filters")) return;
    state.search = "";
    state.category = "All";
    searchInput.value = "";
    renderChips();
    render();
  });

  textInput.value = DEFAULT_TEXT;
  renderChips();
  render();
})();
