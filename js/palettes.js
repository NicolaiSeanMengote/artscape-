// Color Palettes page: search and tone filter.

(function () {
  const grid = document.getElementById("palette-grid");
  const countEl = document.getElementById("result-count");
  const searchInput = document.getElementById("palette-search");
  const toneSelect = document.getElementById("tone-filter");

  function render() {
    const query = searchInput.value.trim().toLowerCase();
    const tone = toneSelect.value;

    const list = PALETTES.filter(function (palette) {
      const matchesTone = tone === "All" || palette.tone === tone;
      const searchable = (palette.name + " " + palette.tone + " " + palette.usage + " " + palette.colors.join(" ")).toLowerCase();
      return matchesTone && (query === "" || searchable.includes(query));
    });

    countEl.textContent = list.length + (list.length === 1 ? " palette" : " palettes");

    if (list.length === 0) {
      grid.innerHTML = '<div class="empty"><p>No palettes match your search. Try a color name, a hex code, or a different tone.</p>' +
        '<button type="button" class="btn btn-small" id="reset-filters">Reset filters</button></div>';
      return;
    }

    grid.innerHTML = list.map(paletteCard).join("");
  }

  searchInput.addEventListener("input", render);
  toneSelect.addEventListener("change", render);

  grid.addEventListener("click", function (event) {
    if (!event.target.closest("#reset-filters")) return;
    searchInput.value = "";
    toneSelect.value = "All";
    render();
  });

  render();
})();
