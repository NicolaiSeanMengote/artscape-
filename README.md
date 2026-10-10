# Artscape

**Student:** Nicolai Sean P. Mengote
**Section/Block:** INF248MAA
**Subject:** Integrative Programming Technologies
**Website category:** Education (a learning and inspiration resource for creatives)

## Project description

Artscape is a learning and inspiration library for people in creative fields. It lets designers, illustrators, photographers, crafters, and students look up fonts, color palettes, and art forms in one place, try them out, and save their favorites to a personal collection.

## Pages

| Page | File | What it does |
|---|---|---|
| Home | `index.html` | Introduction, links to each section, and a "Shuffle picks" area with random items |
| Fonts | `fonts.html` | Search and filter fonts, preview them with your own text and size, copy the CSS |
| Color Palettes | `palettes.html` | Search and filter palettes by tone, click a color to copy its hex code |
| Art Forms | `art-forms.html` | Search and filter art forms, open a detail window with tools and starter tips |
| About and Contact | `contact.html` | About the site and a validated form for suggesting new items |
| My Collection | `collection.html` | Shows everything saved with the heart buttons |

## Main features

- Live search and category filters on the Fonts, Color Palettes, and Art Forms pages
- Font preview with custom text and a size slider
- Click-to-copy for hex colors, whole palettes, and font CSS
- Heart buttons that save items to **My Collection** using Local Storage
- Detail dialog for each art form
- Contact form with field-by-field validation (name, email, choice, title, optional link, message length)
- Suggestions saved to Local Storage and listed on the page
- Responsive layout with a mobile menu
- Keyboard-friendly (visible focus, skip link, labeled buttons)

## Technologies used

- HTML5
- CSS3 (custom properties, Grid, Flexbox, media queries)
- JavaScript (no frameworks)
- Local Storage for saved items and form suggestions
- Google Fonts for the font previews

## How to run

1. Download or clone this repository.
2. Open `index.html` in a web browser.
3. Stay online so the Google Fonts previews can load.


## Folder structure

```
artscape/
  index.html
  fonts.html
  palettes.html
  art-forms.html
  collection.html
  contact.html
  README.md
  css/
    style.css
  js/
    data.js         fonts, palettes, and art forms data
    main.js         favorites, copy, toast, mobile menu
    cards.js        builds the cards and the art dialog
    home.js         home page
    fonts.js        fonts page
    palettes.js     palettes page
    art-forms.js    art forms page
    collection.js   collection page
    contact.js      contact form and validation
