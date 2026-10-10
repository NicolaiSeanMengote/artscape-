// My Collection page: shows everything saved with the heart buttons.

(function () {
  const root = document.getElementById("collection");
  const summary = document.getElementById("collection-summary");
  const actions = document.getElementById("collection-actions");

  function findItem(list, id) {
    return list.find(function (item) {
      return item.id === id;
    });
  }

  function render() {
    const saved = { font: [], palette: [], art: [] };

    getFavorites().forEach(function (fav) {
      const source = fav.type === "font" ? FONTS : fav.type === "palette" ? PALETTES : ART_FORMS;
      const item = findItem(source, fav.id);
      if (item && saved[fav.type]) saved[fav.type].push(item);
    });

    const total = saved.font.length + saved.palette.length + saved.art.length;

    if (total === 0) {
      summary.textContent = "Nothing saved yet.";
      actions.hidden = true;
      root.innerHTML = '<div class="empty"><h2>Your collection is empty</h2>' +
        '<p>Tap the heart on any font, palette, or art form to keep it here.</p>' +
        '<div class="actions">' +
        '<a class="btn" href="fonts.html">Browse fonts</a>' +
        '<a class="btn btn-ghost" href="palettes.html">See color palettes</a>' +
        '<a class="btn btn-ghost" href="art-forms.html">Explore art forms</a></div></div>';
      return;
    }

    summary.textContent = total + (total === 1 ? " item saved on this device." : " items saved on this device.");
    actions.hidden = false;

    let html = "";
    if (saved.font.length) {
      html += '<section class="collection-group"><h2>Fonts</h2><div class="grid">' +
        saved.font.map(function (font) { return fontCard(font, "Aa Bb Cc 123", 36); }).join("") + "</div></section>";
    }
    if (saved.palette.length) {
      html += '<section class="collection-group"><h2>Color palettes</h2><div class="grid">' +
        saved.palette.map(paletteCard).join("") + "</div></section>";
    }
    if (saved.art.length) {
      html += '<section class="collection-group"><h2>Art forms</h2><div class="grid">' +
        saved.art.map(artCard).join("") + "</div></section>";
    }
    root.innerHTML = html;

    // Plain-text version of the collection for the "Copy list" button
    const lines = [];
    if (saved.font.length) lines.push("Fonts: " + saved.font.map(function (f) { return f.name; }).join(", "));
    if (saved.palette.length) lines.push("Palettes: " + saved.palette.map(function (p) { return p.name; }).join(", "));
    if (saved.art.length) lines.push("Art forms: " + saved.art.map(function (a) { return a.name; }).join(", "));
    document.getElementById("copy-list").setAttribute("data-copy", lines.join("\n"));
  }

  document.getElementById("clear-all").addEventListener("click", function () {
    if (confirm("Remove everything from My Collection?")) {
      saveFavorites([]);
      updateFavCount();
      render();
      showToast("My Collection cleared");
    }
  });

  // Re-draw when a heart is toggled here, or when another tab changes the data
  document.addEventListener("favorites:changed", render);
  window.addEventListener("storage", function () {
    updateFavCount();
    render();
  });

  render();
})();
