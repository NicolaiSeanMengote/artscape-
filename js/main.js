// Artscape shared helpers. Loaded on every page.
// Handles: Local Storage favorites, copy to clipboard, toast messages, mobile menu.

const FAV_KEY = "artscape:favorites";

/* ---------- Favorites (saved in Local Storage) ---------- */

function getFavorites() {
  try {
    const raw = localStorage.getItem(FAV_KEY);
    const list = raw ? JSON.parse(raw) : [];
    return Array.isArray(list) ? list : [];
  } catch (error) {
    return [];
  }
}

function saveFavorites(list) {
  try {
    localStorage.setItem(FAV_KEY, JSON.stringify(list));
  } catch (error) {
    showToast("Could not save. Your browser may be blocking storage.");
  }
}

function isFavorite(type, id) {
  return getFavorites().some(function (item) {
    return item.type === type && item.id === id;
  });
}

// Adds the item if it is not saved, removes it if it is. Returns true when saved.
function toggleFavorite(type, id) {
  const list = getFavorites();
  const index = list.findIndex(function (item) {
    return item.type === type && item.id === id;
  });
  if (index >= 0) {
    list.splice(index, 1);
  } else {
    list.push({ type: type, id: id });
  }
  saveFavorites(list);
  return index < 0;
}

function favLabel(name, saved) {
  return (saved ? "Remove " : "Save ") + name + (saved ? " from" : " to") + " My Collection";
}

function updateFavCount() {
  const badge = document.getElementById("fav-count");
  if (!badge) return;
  const count = getFavorites().length;
  badge.textContent = count;
  badge.hidden = count === 0;
}

/* ---------- Toast message ---------- */

let toastTimer;

function showToast(message) {
  let toast = document.getElementById("toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast";
    toast.className = "toast";
    toast.setAttribute("role", "status");
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(function () {
    toast.classList.remove("show");
  }, 2200);
}

/* ---------- Copy to clipboard ---------- */

function fallbackCopy(text) {
  const area = document.createElement("textarea");
  area.value = text;
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.appendChild(area);
  area.select();
  let ok = false;
  try {
    ok = document.execCommand("copy");
  } catch (error) {
    ok = false;
  }
  area.remove();
  return ok;
}

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).then(function () {
      return true;
    }).catch(function () {
      return fallbackCopy(text);
    });
  }
  return Promise.resolve(fallbackCopy(text));
}

/* ---------- Click handling for the whole site ---------- */
// One listener on the document handles every favorite and copy button,
// including buttons that are created later by JavaScript.

document.addEventListener("click", function (event) {
  const favButton = event.target.closest("[data-fav]");
  if (favButton) {
    const type = favButton.dataset.type;
    const id = favButton.dataset.id;
    const name = favButton.dataset.name;
    const saved = toggleFavorite(type, id);

    // Update every button for the same item (card and dialog can both show it)
    document.querySelectorAll('[data-fav][data-type="' + type + '"][data-id="' + id + '"]').forEach(function (btn) {
      btn.setAttribute("aria-pressed", String(saved));
      btn.setAttribute("aria-label", favLabel(btn.dataset.name, saved));
    });

    updateFavCount();
    showToast(saved ? name + " saved to My Collection" : name + " removed from My Collection");
    document.dispatchEvent(new CustomEvent("favorites:changed"));
    return;
  }

  const copyButton = event.target.closest("[data-copy]");
  if (copyButton) {
    const text = copyButton.dataset.copy;
    copyText(text).then(function (ok) {
      showToast(ok ? (copyButton.dataset.toast || "Copied") : "Could not copy. Select the text and copy it by hand.");
    });
  }
});

/* ---------- Mobile menu ---------- */

(function setupMenu() {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".menu-toggle");
  if (!header || !toggle) return;
  toggle.addEventListener("click", function () {
    const open = header.classList.toggle("nav-open");
    toggle.setAttribute("aria-expanded", String(open));
  });
})();

updateFavCount();
