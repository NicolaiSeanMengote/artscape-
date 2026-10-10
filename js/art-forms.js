// Art Forms page: search, group chips, and difficulty filter.

(function () {
  const GROUPS = ["All", "Traditional", "Digital", "Craft", "Design"];
  const state = { group: "All" };

  const grid = document.getElementById("art-grid");
  const countEl = document.getElementById("result-count");
  const searchInput = document.getElementById("art-search");
  const difficultySelect = document.getElementById("difficulty-filter");
  const chipBar = document.getElementById("group-chips");

  function renderChips() {
    chipBar.innerHTML = GROUPS.map(function (group) {
      return '<button type="button" class="chip" data-group="' + group +
        '" aria-pressed="' + (group === state.group) + '">' + group + "</button>";
    }).join("");
  }

  function render() {
    const query = searchInput.value.trim().toLowerCase();
    const difficulty = difficultySelect.value;

    const list = ART_FORMS.filter(function (art) {
      const matchesGroup = state.group === "All" || art.group === state.group;
      const matchesDifficulty = difficulty === "All" || art.difficulty === difficulty;
      const searchable = (art.name + " " + art.group + " " + art.summary + " " + art.description).toLowerCase();
      return matchesGroup && matchesDifficulty && (query === "" || searchable.includes(query));
    });

    countEl.textContent = list.length + (list.length === 1 ? " art form" : " art forms");

    if (list.length === 0) {
      grid.innerHTML = '<div class="empty"><p>No art forms match your search. Try a shorter word or change the filters.</p>' +
        '<button type="button" class="btn btn-small" id="reset-filters">Reset filters</button></div>';
      return;
    }

    grid.innerHTML = list.map(artCard).join("");
  }

  searchInput.addEventListener("input", render);
  difficultySelect.addEventListener("change", render);

  chipBar.addEventListener("click", function (event) {
    const chip = event.target.closest("[data-group]");
    if (!chip) return;
    state.group = chip.dataset.group;
    renderChips();
    render();
  });

  grid.addEventListener("click", function (event) {
    if (!event.target.closest("#reset-filters")) return;
    state.group = "All";
    searchInput.value = "";
    difficultySelect.value = "All";
    renderChips();
    render();
  });

  renderChips();
  render();
})();
