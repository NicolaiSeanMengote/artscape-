// Artscape data: all the content of the site lives here.
// Each list is an array of objects, so pages can search, filter, and display them.

const FONTS = [
  { id: "playfair-display", name: "Playfair Display", category: "Serif", mood: "Elegant, editorial", bestFor: "Magazine headlines and invitations", css: "'Playfair Display', serif" },
  { id: "lora", name: "Lora", category: "Serif", mood: "Calm, readable", bestFor: "Blog posts and long reading", css: "'Lora', serif" },
  { id: "cormorant-garamond", name: "Cormorant Garamond", category: "Serif", mood: "Refined, classic", bestFor: "Fashion branding and book covers", css: "'Cormorant Garamond', serif" },
  { id: "merriweather", name: "Merriweather", category: "Serif", mood: "Sturdy, friendly", bestFor: "Articles and text-heavy screens", css: "'Merriweather', serif" },
  { id: "montserrat", name: "Montserrat", category: "Sans-serif", mood: "Clean, urban", bestFor: "Logos and website headings", css: "'Montserrat', sans-serif" },
  { id: "poppins", name: "Poppins", category: "Sans-serif", mood: "Geometric, friendly", bestFor: "Apps and landing pages", css: "'Poppins', sans-serif" },
  { id: "work-sans", name: "Work Sans", category: "Sans-serif", mood: "Neutral, practical", bestFor: "Interfaces and presentations", css: "'Work Sans', sans-serif" },
  { id: "dm-sans", name: "DM Sans", category: "Sans-serif", mood: "Low-contrast, modern", bestFor: "Body text on websites", css: "'DM Sans', sans-serif" },
  { id: "pacifico", name: "Pacifico", category: "Script", mood: "Relaxed, retro surf", bestFor: "Cafe signs and playful logos", css: "'Pacifico', cursive" },
  { id: "dancing-script", name: "Dancing Script", category: "Script", mood: "Lively, handwritten", bestFor: "Greeting cards and names", css: "'Dancing Script', cursive" },
  { id: "great-vibes", name: "Great Vibes", category: "Script", mood: "Formal, flowing", bestFor: "Wedding invitations and certificates", css: "'Great Vibes', cursive" },
  { id: "bebas-neue", name: "Bebas Neue", category: "Display", mood: "Tall, bold capitals", bestFor: "Posters and movie titles", css: "'Bebas Neue', sans-serif" },
  { id: "abril-fatface", name: "Abril Fatface", category: "Display", mood: "High contrast, dramatic", bestFor: "Big headlines and fashion layouts", css: "'Abril Fatface', serif" },
  { id: "righteous", name: "Righteous", category: "Display", mood: "Retro futuristic", bestFor: "Event banners and game titles", css: "'Righteous', sans-serif" },
  { id: "caveat", name: "Caveat", category: "Handwriting", mood: "Casual, personal", bestFor: "Notes, captions, and quotes", css: "'Caveat', cursive" },
  { id: "permanent-marker", name: "Permanent Marker", category: "Handwriting", mood: "Loud, hand-inked", bestFor: "Stickers and street-style posters", css: "'Permanent Marker', cursive" },
  { id: "space-mono", name: "Space Mono", category: "Monospace", mood: "Quirky, technical", bestFor: "Code snippets and tech branding", css: "'Space Mono', monospace" },
  { id: "courier-prime", name: "Courier Prime", category: "Monospace", mood: "Typewriter feel", bestFor: "Screenplays and vintage documents", css: "'Courier Prime', monospace" }
];

const PALETTES = [
  { id: "sunset-riso", name: "Sunset Riso", tone: "Warm", usage: "Posters and event graphics with a printed look", colors: ["#FF5E5B", "#FFB400", "#FFE8A3", "#D8315B", "#3E1F47"] },
  { id: "ocean-studio", name: "Ocean Studio", tone: "Cool", usage: "Calm websites, dashboards, and travel pages", colors: ["#03045E", "#0077B6", "#00B4D8", "#90E0EF", "#CAF0F8"] },
  { id: "forest-floor", name: "Forest Floor", tone: "Earthy", usage: "Nature brands and eco-friendly packaging", colors: ["#1B4332", "#2D6A4F", "#52B788", "#B7E4C7", "#F1FAEE"] },
  { id: "candy-pop", name: "Candy Pop", tone: "Bold", usage: "Playful brands, stickers, and kids' content", colors: ["#FF70A6", "#FF9770", "#FFD670", "#E9FF70", "#70D6FF"] },
  { id: "desert-clay", name: "Desert Clay", tone: "Earthy", usage: "Pottery, interiors, and handmade shops", colors: ["#7F5539", "#B08968", "#DDB892", "#E6CCB2", "#EDE0D4"] },
  { id: "midnight-neon", name: "Midnight Neon", tone: "Dark", usage: "Gaming, music, and night-mode interfaces", colors: ["#0B0C10", "#1F2833", "#66FCF1", "#45A29E", "#C5C6C7"] },
  { id: "lavender-haze", name: "Lavender Haze", tone: "Pastel", usage: "Wellness, beauty, and soft illustrations", colors: ["#5E548E", "#9F86C0", "#BE95C4", "#E0B1CB", "#E7D7F5"] },
  { id: "retro-diner", name: "Retro Diner", tone: "Bold", usage: "Vintage menus, signs, and food branding", colors: ["#D62828", "#F77F00", "#FCBF49", "#EAE2B7", "#003049"] },
  { id: "monochrome-ink", name: "Monochrome Ink", tone: "Dark", usage: "Minimal portfolios and editorial layouts", colors: ["#111827", "#374151", "#6B7280", "#D1D5DB", "#F9FAFB"] },
  { id: "matcha-latte", name: "Matcha Latte", tone: "Earthy", usage: "Cafes, bakeries, and calm packaging", colors: ["#606C38", "#A3B18A", "#DAD7CD", "#F2E8CF", "#BC6C25"] },
  { id: "cherry-blossom", name: "Cherry Blossom", tone: "Pastel", usage: "Spring campaigns, invitations, and cards", colors: ["#FFC8DD", "#FFAFCC", "#BDE0FE", "#A2D2FF", "#CDB4DB"] },
  { id: "autumn-harvest", name: "Autumn Harvest", tone: "Warm", usage: "Seasonal promos and cozy illustrations", colors: ["#6A040F", "#9D0208", "#D00000", "#E85D04", "#FAA307"] }
];

const ART_FORMS = [
  {
    id: "painting", name: "Painting", group: "Traditional", difficulty: "Beginner", emoji: "🎨",
    summary: "Applying pigment to a surface with brushes, knives, or sponges.",
    description: "Painting covers acrylic, oil, gouache, and more. Artists build images with color, texture, and brushwork on canvas, paper, or wood.",
    tools: ["Acrylic or oil paints", "A few brushes in different sizes", "Canvas or thick paper", "A mixing palette"],
    tips: ["Start with three primary colors plus white to learn mixing", "Sketch light guidelines before painting", "Step back often to judge the whole picture"],
    example: "Vincent van Gogh's The Starry Night"
  },
  {
    id: "watercolor", name: "Watercolor", group: "Traditional", difficulty: "Intermediate", emoji: "💧",
    summary: "Painting with transparent pigment and water for soft, glowing color.",
    description: "Watercolor is hard to correct, so artists plan their lights and darks first. Water control creates blooms, gradients, and delicate washes.",
    tools: ["Watercolor paint set", "Round brushes", "Cold-press watercolor paper", "Two jars of water"],
    tips: ["Work from light colors to dark", "Let each layer dry before adding the next", "Leave the white of the paper for highlights"],
    example: "J.M.W. Turner's atmospheric landscapes"
  },
  {
    id: "drawing", name: "Drawing and Sketching", group: "Traditional", difficulty: "Beginner", emoji: "✏️",
    summary: "Building images with line, shade, and texture using pencil, ink, or charcoal.",
    description: "Drawing is the base skill behind most visual art. Practicing shapes, proportion, and shading makes every other art form easier.",
    tools: ["Graphite pencils (HB to 6B)", "Sketchbook", "Kneaded eraser", "Fineliner pens"],
    tips: ["Draw a little every day, even for ten minutes", "Break complex objects into simple shapes", "Squint to see big areas of light and shadow"],
    example: "Leonardo da Vinci's sketchbooks"
  },
  {
    id: "calligraphy", name: "Calligraphy", group: "Traditional", difficulty: "Intermediate", emoji: "🖋️",
    summary: "The art of beautiful, deliberate handwriting.",
    description: "Calligraphy turns letters into artwork through consistent strokes, spacing, and rhythm. Styles range from brush calligraphy to pointed-pen scripts.",
    tools: ["Brush pen or dip pen", "Ink", "Smooth practice paper", "Guideline sheets"],
    tips: ["Learn the basic strokes before full letters", "Keep a steady angle with your pen", "Slow down; speed comes with practice"],
    example: "Chinese brush calligraphy and Western copperplate script"
  },
  {
    id: "printmaking", name: "Printmaking", group: "Traditional", difficulty: "Intermediate", emoji: "🖨️",
    summary: "Making repeatable images by transferring ink from a carved or prepared surface.",
    description: "Linocut, woodcut, etching, and screen printing all create multiples of one design. Carving and layering plan ahead because each mark is permanent.",
    tools: ["Linoleum block and carving tools", "Block printing ink", "Brayer (roller)", "Printing paper"],
    tips: ["Draw your design in reverse before carving", "Carve away only what should stay white", "Roll thin, even layers of ink"],
    example: "Hokusai's The Great Wave off Kanagawa"
  },
  {
    id: "street-art", name: "Street Art", group: "Traditional", difficulty: "Intermediate", emoji: "🖌️",
    summary: "Public artwork made with spray paint, stencils, paste-ups, and murals.",
    description: "Street art brings creativity into public spaces. Artists often use bold shapes, strong contrast, and messages that connect with the neighborhood.",
    tools: ["Spray paint or mural paint", "Stencils", "Wheat paste for paste-ups", "Gloves and a mask"],
    tips: ["Always get permission for the wall", "Test your design on cardboard first", "Use bold shapes that read from far away"],
    example: "Banksy's stencil artworks"
  },
  {
    id: "sculpture", name: "Sculpture", group: "Craft", difficulty: "Advanced", emoji: "🗿",
    summary: "Shaping materials like clay, stone, wood, or metal into three-dimensional forms.",
    description: "Sculptors think about form from every angle. They add material (clay modeling), remove it (carving), or join pieces together (assemblage).",
    tools: ["Modeling clay", "Wire armature", "Sculpting tools", "A sturdy work surface"],
    tips: ["Check your piece from all sides", "Build a wire frame for tall clay forms", "Start small before attempting large pieces"],
    example: "Michelangelo's David"
  },
  {
    id: "origami", name: "Origami", group: "Craft", difficulty: "Beginner", emoji: "🦢",
    summary: "The Japanese art of folding paper into shapes without cutting or glue.",
    description: "Origami starts from a flat square and ends as an animal, flower, or geometric form. Neat, accurate folds matter more than speed.",
    tools: ["Square origami paper", "A flat table", "A bone folder (optional)"],
    tips: ["Crease every fold firmly", "Start with the traditional paper crane", "Follow diagrams slowly, one step at a time"],
    example: "The traditional paper crane"
  },
  {
    id: "collage", name: "Collage", group: "Craft", difficulty: "Beginner", emoji: "✂️",
    summary: "Combining paper, photos, and found materials into a single composition.",
    description: "Collage lets you create without drawing skill. Artists arrange cut pieces to play with color, texture, and surprising combinations.",
    tools: ["Magazines and old papers", "Scissors or a craft knife", "Glue stick or matte medium", "A sturdy backing board"],
    tips: ["Arrange everything before gluing", "Mix big shapes with small details", "Repeat a color to tie the piece together"],
    example: "Henri Matisse's paper cut-outs"
  },
  {
    id: "digital-illustration", name: "Digital Illustration", group: "Digital", difficulty: "Beginner", emoji: "💻",
    summary: "Creating artwork with a tablet or computer and drawing software.",
    description: "Digital illustration mixes drawing skills with software tools like layers, brushes, and undo. It is used in games, animation, books, and social media.",
    tools: ["A drawing tablet or tablet device", "Software like Krita (free), Procreate, or Photoshop", "A reference image folder"],
    tips: ["Work on separate layers for sketch, color, and shading", "Save versions of your file often", "Use references, not memory alone"],
    example: "Concept art for video games and animation"
  },
  {
    id: "pixel-art", name: "Pixel Art", group: "Digital", difficulty: "Beginner", emoji: "👾",
    summary: "Drawing images one square pixel at a time with a very small canvas.",
    description: "Pixel art grew from early video game limits. Every pixel is chosen on purpose, and a small color palette helps keep the style clear.",
    tools: ["Aseprite or the free Piskel editor", "A limited color palette", "A zoomed-in grid canvas"],
    tips: ["Limit yourself to 8 to 16 colors", "Keep the outline clean and consistent", "Zoom out often to check readability"],
    example: "Sprites from classic 8-bit and 16-bit video games"
  },
  {
    id: "photography", name: "Photography", group: "Digital", difficulty: "Beginner", emoji: "📷",
    summary: "Capturing light to record or reinterpret what you see.",
    description: "Photography combines composition, light, and timing. A phone camera is enough to practice framing, color, and storytelling.",
    tools: ["Any camera or smartphone", "Free editing app like Snapseed", "A tripod (optional)"],
    tips: ["Shoot during the soft light after sunrise or before sunset", "Use the rule of thirds to place your subject", "Move your feet to find a better angle"],
    example: "Ansel Adams's black-and-white landscapes"
  },
  {
    id: "graphic-design", name: "Graphic Design", group: "Design", difficulty: "Intermediate", emoji: "📐",
    summary: "Communicating ideas visually with type, color, images, and layout.",
    description: "Graphic designers create logos, posters, packaging, and websites. Good design is clear first, then expressive.",
    tools: ["Figma, Canva, or Adobe Illustrator", "A grid or layout guide", "A color palette and two typefaces"],
    tips: ["Limit yourself to two fonts", "Use contrast to show what matters most", "Leave empty space so the design can breathe"],
    example: "Paul Rand's corporate logo designs, including IBM"
  },
  {
    id: "typography", name: "Typography and Lettering", group: "Design", difficulty: "Intermediate", emoji: "🔤",
    summary: "Arranging or drawing letters so words look as good as they sound.",
    description: "Typography is about choosing and arranging type; lettering means drawing each letter by hand. Both shape how readers feel about a message.",
    tools: ["Pencil and tracing paper", "Brush pens or a tablet", "A font library like Google Fonts"],
    tips: ["Pair a decorative font with a simple one", "Adjust spacing between letters (kerning) by eye", "Test your text at small and large sizes"],
    example: "Hand-lettered movie posters and book covers"
  }
];
