# Zedtells.com - Complete Design Specification
## Extracted from live site on 2026-03-28

---

## 1. PLATFORM
- Built on **Wix** (Thunderbolt renderer)
- Page background: White (default browser white, no explicit bg-color set)
- Total page height: ~7448px
- Viewport used for extraction: 1920px wide

---

## 2. FONTS (Loaded via Wix font system)

### Font Families Used:
| Font | Role |
|------|------|
| **Raleway** (400, 700) | Section headings (h2), card titles in 2-col layout |
| **Avenir LT W01 35 Light** (400) | Body text, descriptions, footer text, stats |
| **Poppins Extralight / Poppins** (700) | Navigation links |
| **Fraunces** (serif) | Decorative/special use |
| **Futura LT W01 Book** | Minor use |
| **Helvetica W01 Light/Roman** | System fallback |

### Google Fonts equivalents for replication:
- Raleway: https://fonts.google.com/specimen/Raleway
- Poppins: https://fonts.google.com/specimen/Poppins
- Fraunces: https://fonts.google.com/specimen/Fraunces
- Avenir alternative: Use "Nunito Sans" or "Lato Light" as closest free substitute

---

## 3. COLOR PALETTE

### Text Colors:
| Color | RGB | Hex | Usage |
|-------|-----|-----|-------|
| Dark Gray | rgb(85, 85, 85) | #555555 | Primary body text, section headings, descriptions |
| Medium Gray | rgb(68, 68, 68) | #444444 | Non-active nav links |
| Orange (Accent) | rgb(252, 123, 3) | #FC7B03 | Active nav link, card titles in blog grid, accent |
| Dark Card BG text | rgb(27, 27, 27) | #1B1B1B | Card dark background |
| Muted Blue | rgb(78, 125, 155) | #4E7D9B | Card stats (views, comments, likes) |
| White | rgb(255, 255, 255) | #FFFFFF | Footer link text, button text on dark bg |
| Black | rgb(0, 0, 0) | #000000 | Button label text |

### Background Colors:
| Color | RGB | Hex | Usage |
|-------|-----|-----|-------|
| White | #FFFFFF | Page background (default) |
| Dark Card BG | rgb(27, 27, 27) | #1B1B1B | Blog post card text area |
| Dark Teal/Navy | rgb(0, 75, 122) | #004B7A | Footer background |
| Orange | rgb(252, 123, 3) | #FC7B03 | Primary CTA buttons ("View our Project") |
| Semi-transparent White | rgba(255, 255, 255, 0.9) | | Overlay/hover effects |

### Border Colors:
| Color | Hex | Usage |
|-------|-----|-------|
| Orange | #FC7B03 | "Read More" button border |
| Light Gray | rgba(170, 170, 170, 0.75) | Card borders |

---

## 4. NAVIGATION BAR

### Header:
- Height: **195px** total
- Background: Transparent (rgba(0,0,0,0))
- Position: relative
- Full width (100%)
- No box-shadow, no border-bottom

### Logo:
- Position: Top-left
- Dimensions: **121px wide x 80px tall**
- Left offset: ~86px from viewport edge
- Top offset: ~80px from top

### Nav Links:
- Font: **Poppins Extralight / Poppins, sans-serif**
- Font size: **15px**
- Font weight: **700** (bold)
- Line height: **40px**
- Letter spacing: normal
- Text transform: none
- Display: inline-block (items sit next to each other, 0px gap - they touch)

### Nav Link Colors:
- Active (current page): **rgb(252, 123, 3)** / #FC7B03 (orange)
- Non-active: **rgb(68, 68, 68)** / #444444 (medium gray)

### Nav Items:
Home | FolkSongs | FolkTales | Ecology | Archive | Kacha | Contact Us

### Nav Positioning:
- First item starts at ~1181px from left (right-aligned)
- Item widths vary: ~75px to ~104px depending on text

---

## 5. HERO / BANNER IMAGE

### Image:
- Dimensions: **1031px wide x 429px tall**
- Object-fit: **cover**
- Object-position: 50% 50% (centered)
- Border-radius: **0px** (no rounding)
- Margin: 0px

### Positioning:
- **NOT full-bleed** - it is inset/centered
- Left offset from viewport: **~432px**
- Right offset from viewport: **~456px**
- Top offset from page: **~197px** (just below the header)
- Content is center-aligned within a ~1031px max content area

### Container:
- Width: 1031px
- Margin-left: ~462px (auto-centered in Wix)

---

## 6. DESCRIPTION TEXT (Below Hero)

### Text Block:
- Font: **Avenir LT W01 35 Light, sans-serif**
- Font size: **16px**
- Font weight: 400
- Color: **rgb(85, 85, 85)** / #555555
- Line height: normal
- Text align: **center**
- Margin: 0px
- Padding: 0px

---

## 7. SECTION HEADINGS (H2)

### Primary Section Titles:
(Features from our Archive, Community Initiatives, Himalayan Ecology, Current Projects, Verses and Voices, About, Meet the Team)

- Font: **Raleway, sans-serif**
- Font size: **25px**
- Font weight: **400** (regular, not bold)
- Color: **rgb(85, 85, 85)** / #555555
- Line height: **34.375px** (1.375 ratio)
- Letter spacing: normal
- Text align: start (left-aligned)
- Margin-top on container: **~32-51px**
- Margin-bottom on container: **~49-62px**

### "Meet the Team" Special:
- Same styles but text-align: **center**

---

## 8. BLOG POST CARD GRID (3-Column)

### Gallery Container:
- Total width: **~882px**
- Centered in the page (left offset ~511px at 1920px viewport)
- Display: block (Wix Pro Gallery)

### Individual Card Wrapper:
- Width: **273px**
- Height: **272px** (image portion only visible here)
- Gap between cards: **32px**
- Background: transparent

### Card Structure (post-list-item):
- Display: **flex**
- Width: **271px**
- Background color: **rgb(27, 27, 27)** / #1B1B1B (dark/black)
- Border: none visible
- Border-radius: **0px**
- Box-shadow: none
- Overflow: visible

### Card Image:
- Width: **273px**
- Height: **272px** (square-ish)
- Object-fit: cover

### Card Text Area:
- Padding: **28px 26px 25px** (top right/left bottom)
- Background: inherits dark card bg (#1B1B1B)

### Card Title:
- Font: **Raleway, sans-serif**
- Font size: **15px**
- Font weight: 400
- Color: **rgb(252, 123, 3)** / #FC7B03 (orange)
- Line height: **21px**
- Margin-bottom: **11px**

### Card Stats (views, comments, likes):
- Font: **Avenir LT W01 35 Light, sans-serif**
- Font size: **12px**
- Color: **rgb(78, 125, 155)** / #4E7D9B (muted blue)

### Pagination:
- Below the card grid
- Page numbers with arrows (< 1 2 >)

---

## 9. TWO-COLUMN LAYOUT (Community Initiatives Section)

### Layout:
- Two side-by-side cards with images overlapping text areas
- Left card image: **397px wide x 299px tall**
- Right card image: **397px wide x 299px tall**
- Gap between columns: **~125px**
- Left margin from viewport: **~484px**
- Right margin from viewport: **~518px**

### Card Title in 2-Column:
- Font: **Raleway, sans-serif**
- Font size: **18px**
- Font weight: 400
- Color: **rgb(85, 85, 85)** / #555555
- Line height: normal

### Card Description in 2-Column:
- Font: **Avenir LT W01 35 Light, sans-serif**
- Font size: **16px**
- Font weight: 400
- Color: **rgb(85, 85, 85)** / #555555
- Line height: **28px** (1.75 ratio)
- Letter spacing: normal

---

## 10. BUTTONS

### "Read More" Button (Outline):
- Width: **142px**
- Height: **40px**
- Background: **white** (#FFFFFF)
- Border: **1px solid rgb(252, 123, 3)** (orange border)
- Border-radius: **0px** (sharp corners)
- Text color: **rgb(0, 0, 0)** (black)
- Font: Arial, Helvetica, sans-serif
- Font size: 10px (label size in Wix wrapper)

### "View our Project" Button (Filled):
- Width: **142px**
- Height: **40px**
- Background: **rgb(252, 123, 3)** / #FC7B03 (orange)
- Border: none
- Border-radius: **0px** (sharp corners)
- Text color: **rgb(0, 0, 0)** (black)

---

## 11. FOOTER

### Background:
- Color: **rgb(0, 75, 122)** / #004B7A (dark teal/navy)
- Height: **~279px**
- Full width

### Footer Email Text:
- Font: **Avenir LT W01 35 Light, sans-serif**
- Font size: **15px**
- Font weight: 400
- Color: **rgb(85, 85, 85)** (on lighter area) / **rgb(255, 255, 255)** (on dark bg)
- Line height: 28.2px

### Footer Links (Contact Us, About Us, Terms of use):
- Font: **Poppins Extralight, Poppins, sans-serif**
- Font size: **15px**
- Color: **rgb(255, 255, 255)** (white)
- Text decoration: none
- Font weight: 400

### Footer Copyright:
- Font: **Avenir LT W01 35 Light, sans-serif**
- Font size: **14px**
- Color: **rgb(85, 85, 85)** / #555555
- Line height: 25.06px

### Subscribe Form H1:
- Font: **Raleway, sans-serif**
- Font size: **22px**
- Font weight: 400
- Color: **rgb(85, 85, 85)**

### Subscribe Input:
- Background: white
- Border: visible
- Standard input styling

---

## 12. SECTION SPACING (Absolute Positions from Page Top)

| Section | Y Position | Gap from Previous |
|---------|-----------|-------------------|
| Hero Image | 197px | - |
| Features from our Archive | 811px | 614px from hero |
| Community Initiatives | 1460px | 649px |
| Himalayan Ecology | 2245px | 785px |
| Current Projects | 2891px | 646px |
| Verses and Voices | 3478px | 587px |
| About | 4744px | 1266px |
| Meet the Team | 6598px | 1854px |

### Section Heading Container Margins:
- Margin-top: **32px - 51px** (varies by section)
- Margin-bottom: **49px - 62px** (varies by section)

---

## 13. CONTENT WIDTH & LAYOUT

### Content Area:
- The site does NOT use a single max-width container
- Hero image: ~1031px wide, centered
- Card gallery: ~882px wide, centered
- Two-column cards: ~920px wide (397 + 125 gap + 397), centered
- Section headings start at ~462-500px from left edge (at 1920px viewport)
- Effective content width: **~900-1030px** depending on section

### Overall Design Characteristics:
- **Magazine-style editorial layout**
- Clean white background with generous whitespace
- No visible grid lines or borders between sections
- Card-based content presentation
- Dark (#1B1B1B) card backgrounds contrast with white page
- Orange (#FC7B03) as primary accent color throughout
- Muted, warm color palette (grays, orange, teal)
- Section headings are lightweight (Raleway 400) not bold
- Body text uses light-weight fonts (Avenir Light)
- Sharp corners on all elements (no border-radius anywhere)
- Minimal shadows - flat design aesthetic

---

## 14. RESPONSIVE NOTES
- Site is built on Wix which handles responsive automatically
- At 1920px viewport, content is generously centered with large margins
- Navigation is horizontal, right-aligned
- Logo is positioned top-left

---

## 15. SUMMARY OF KEY DESIGN TOKENS

```
/* Primary Fonts */
--font-heading: 'Raleway', sans-serif;
--font-body: 'Avenir LT W01 35 Light', 'Nunito Sans', sans-serif;
--font-nav: 'Poppins', sans-serif;
--font-decorative: 'Fraunces', serif;

/* Font Sizes */
--fs-section-heading: 25px;
--fs-card-title-grid: 15px;
--fs-card-title-2col: 18px;
--fs-body: 16px;
--fs-nav: 15px;
--fs-footer-text: 14-15px;
--fs-stats: 12px;
--fs-subscribe-heading: 22px;

/* Font Weights */
--fw-heading: 400;
--fw-nav: 700;
--fw-body: 400;

/* Colors */
--color-text-primary: #555555;
--color-text-secondary: #444444;
--color-accent: #FC7B03;
--color-card-bg: #1B1B1B;
--color-card-stats: #4E7D9B;
--color-footer-bg: #004B7A;
--color-white: #FFFFFF;
--color-black: #000000;

/* Spacing */
--section-gap: 600-800px (between major sections);
--section-heading-margin-top: 32-51px;
--section-heading-margin-bottom: 49-62px;
--card-gap: 32px;
--card-text-padding: 28px 26px 25px;
--two-col-gap: 125px;

/* Dimensions */
--hero-width: 1031px;
--hero-height: 429px;
--card-width: 273px;
--card-img-height: 272px;
--button-width: 142px;
--button-height: 40px;
--header-height: 195px;
--logo-width: 121px;
--logo-height: 80px;
--content-max-width: ~1030px;

/* Other */
--border-radius: 0px; /* Sharp corners everywhere */
--box-shadow: none; /* Flat design */
```
