// Artscape card builders. Each function returns an HTML string for one card.
// Needs data.js and main.js to be loaded first.

const ART_TINTS = ["#FFE9A8", "#D9E0FF", "#FFD3E6", "#CDEFE6"];

// Escapes text so it is safe to put inside HTML
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Picks dark or white text so it stays readable on a colored background
function readableColor(hex) {
  const n = parseInt(hex.slice(1), 16);
  const r = n >> 16;
  const g = (n >> 8) & 255;
  const b = n & 255;
  const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return brightness > 0.6 ? "#171A36" : "#FFFFFF";
}

function favButton(type, id, name) {
  const saved = isFavorite(type, id);
  return '<button type="button" class="fav-btn" data-fav data-type="' + type + '" data-id="' + id +
    '" data-name="' + escapeHtml(name) + '" aria-pressed="' + saved +
    '" aria-label="' + escapeHtml(favLabel(name, saved)) + '"></button>';
}

function fontCard(font, previewText, size) {
  return '<article class="card">' +
    '<div class="font-preview" style="font-family:' + escapeHtml(font.css) + ';font-size:' + size + 'px">' +
      escapeHtml(previewText) + '</div>' +
    '<div class="card-body">' +
      '<div class="card-head"><h3>' + escapeHtml(font.name) + '</h3>' + favButton("font", font.id, font.name) + '</div>' +
      '<div class="meta"><span class="tag">' + font.category + '</span><span>' + escapeHtml(font.mood) + '</span></div>' +
      '<p>Best for: ' + escapeHtml(font.bestFor) + '</p>' +
      '<button type="button" class="btn btn-ghost btn-small" data-copy="font-family: ' + escapeHtml(font.css) + ';" data-toast="CSS for ' + escapeHtml(font.name) + ' copied">Copy CSS</button>' +
    '</div></article>';
}

function paletteCard(palette) {
  const swatches = palette.colors.map(function (color) {
    return '<button type="button" class="swatch" style="background:' + color + ';color:' + readableColor(color) +
      '" data-copy="' + color + '" data-toast="Copied ' + color + '" aria-label="Copy ' + color + '">' + color + '</button>';
  }).join("");
  return '<article class="card">' +
    '<div class="swatches">' + swatches + '</div>' +
    '<div class="card-body">' +
      '<div class="card-head"><h3>' + escapeHtml(palette.name) + '</h3>' + favButton("palette", palette.id, palette.name) + '</div>' +
      '<div class="meta"><span class="tag">' + palette.tone + '</span></div>' +
      '<p>' + escapeHtml(palette.usage) + '</p>' +
      '<button type="button" class="btn btn-ghost btn-small" data-copy="' + palette.colors.join(", ") + '" data-toast="All colors in ' + escapeHtml(palette.name) + ' copied">Copy all colors</button>' +
    '</div></article>';
}

function artCard(art) {
  const tint = ART_TINTS[ART_FORMS.indexOf(art) % ART_TINTS.length];
  return '<article class="card">' +
    '<div class="art-cover" style="background:' + tint + '" aria-hidden="true">' + art.emoji + '</div>' +
    '<div class="card-body">' +
      '<div class="card-head"><h3>' + escapeHtml(art.name) + '</h3>' + favButton("art", art.id, art.name) + '</div>' +
      '<div class="meta"><span class="tag">' + art.group + '</span><span class="tag">' + art.difficulty + '</span></div>' +
      '<p>' + escapeHtml(art.summary) + '</p>' +
      '<button type="button" class="btn btn-small" data-art-open="' + art.id + '">Learn more</button>' +
    '</div></article>';
}

/* ---------- Art form detail dialog ---------- */

function listHtml(items) {
  return "<ul>" + items.map(function (item) {
    return "<li>" + escapeHtml(item) + "</li>";
  }).join("") + "</ul>";
}

function openArtDialog(id) {
  const art = ART_FORMS.find(function (item) {
    return item.id === id;
  });
  if (!art) return;

  let dialog = document.getElementById("art-dialog");
  if (!dialog) {
    dialog = document.createElement("dialog");
    dialog.id = "art-dialog";
    dialog.setAttribute("aria-labelledby", "art-dialog-title");
    document.body.appendChild(dialog);
    // Close when clicking the dark backdrop or any close button
    dialog.addEventListener("click", function (event) {
      if (event.target === dialog || event.target.closest("[data-close-dialog]")) {
        dialog.close();
      }
    });
  }

  const tint = ART_TINTS[ART_FORMS.indexOf(art) % ART_TINTS.length];
  dialog.innerHTML =
    '<div class="dialog-cover" style="background:' + tint + '">' +
      '<span class="emoji" aria-hidden="true">' + art.emoji + '</span>' +
      '<div><h2 id="art-dialog-title">' + escapeHtml(art.name) + '</h2>' +
      '<div class="meta"><span class="tag">' + art.group + '</span><span class="tag">' + art.difficulty + '</span></div></div>' +
    '</div>' +
    '<div class="dialog-body">' +
      '<p>' + escapeHtml(art.description) + '</p>' +
      '<h3>What you need</h3>' + listHtml(art.tools) +
      '<h3>Starter tips</h3>' + listHtml(art.tips) +
      '<h3>Look it up</h3><p>' + escapeHtml(art.example) + '</p>' +
      '<div class="dialog-actions">' +
        favButton("art", art.id, art.name) +
        '<button type="button" class="btn btn-ghost" data-close-dialog>Close</button>' +
      '</div>' +
    '</div>';
  dialog.showModal();
}

// Open the dialog when any "Learn more" button is clicked
document.addEventListener("click", function (event) {
  const opener = event.target.closest("[data-art-open]");
  if (opener) openArtDialog(opener.dataset.artOpen);
});
