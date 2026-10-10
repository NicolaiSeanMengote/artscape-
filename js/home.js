// Home page: shows item counts and a shuffle of random picks.

(function () {
  const featured = document.getElementById("featured");
  const shuffleButton = document.getElementById("shuffle");

  document.getElementById("count-fonts").textContent = FONTS.length;
  document.getElementById("count-palettes").textContent = PALETTES.length;
  document.getElementById("count-art").textContent = ART_FORMS.length;

  function pick(list) {
    return list[Math.floor(Math.random() * list.length)];
  }

  function showPicks() {
    featured.innerHTML =
      fontCard(pick(FONTS), "Aa Bb Cc 123", 44) +
      paletteCard(pick(PALETTES)) +
      artCard(pick(ART_FORMS));
  }

  shuffleButton.addEventListener("click", showPicks);
  showPicks();
})();
