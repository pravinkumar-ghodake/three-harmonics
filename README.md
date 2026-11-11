# Three Harmonics

> **A daily reading in three frequencies** — quotes from films, books, and scientists who taught me how to keep going, and the deep think that connects them.

### **[→ Read the journal](https://pravinkumar-ghodake.github.io/three-harmonics/)**

---

## The conceit

In wave mechanics, a signal is not defined by its fundamental alone. It is defined by the *harmonics* that ride on top — the overtones that emerge when you drive a system hard enough, coherently enough, for long enough.

This journal applies that idea to a life.

Every entry is **three quotes and one theme** — the three overtones of a single day. The quotes are mostly from films, sometimes from books, and occasionally from scientists I've spent a lifetime reading. After each quote sits a short, first-person reflection on what it means for my work and my life.

The physics will find its way into every entry. That is not an affectation. It is the way I actually think.

---

## Format

Every entry follows the same three-part structure:

| Harmonic | Role | What it does |
| :--- | :--- | :--- |
| **I** | Anchor | Sets the day's fundamental — the first move |
| **II** | Counterpoint | Complicates it — the second voice |
| **III** | Landing | Resolves it — the third voice that lets the chord close |

Three quotes. One theme. One composite signal that reaches the boundary.

---

## The journal so far

| Day | Title | Theme |
| :--- | :--- | :--- |
| [01](day-01.html) | The Unruly Learner | Origin, curiosity, protecting the signal |
| [02](day-02.html) | Small Moves, Long Run | Pedigree, persistence, the un-decomposed impossible |

---

## Structure

```
.nojekyll              GitHub Pages: disable Jekyll
LICENSE                MIT — applies to the code
README.md              this file
robots.txt             crawl directive + sitemap pointer
sitemap.xml            one URL per published day
style.css              the design system (frozen)
script.js              theme toggle, hero waves, progress, fade-in (frozen)
index.html             homepage + archive
about.html             the conceit, the sources, the author
404.html               off-the-page
day-01.html            daily post
day-02.html            daily post

---

## Adding a new day — the four-file routine

Every new day touches exactly **four files**, in this order:

### 1. `day-NN.html` — create

Copy the previous day's file. Change nine things:

- `<title>`
- `<meta name="description">`
- `<link rel="canonical">`
- JSON-LD `headline`, `description`, `datePublished`, `url`
- eyebrow `Day NN`
- `day-number`
- `<h1>` + `<p class="lede">`
- the harmonic content (intro, three harmonics, post-closing)
- footer `Three Harmonics · Day NN`

Leave every class, selector, and SVG untouched. The design system handles the rest.

### 2. `index.html` — update

- Bump `<span>N entries · ongoing</span>` to the new count
- Append a `.day-card` block after the previous day's card (see Day 02 for the pattern)

### 3. `sitemap.xml` — update

Append one `<url>` block before `</urlset>`:

```xml
<url>
  <loc>https://pravinkumar-ghodake.github.io/three-harmonics/day-NN.html</loc>
  <changefreq>monthly</changefreq>
  <priority>0.8</priority>
</url>
