# Cut the Red Wire · FTC Team 6078

Team website for FIRST Tech Challenge Team 6078 "Cut the Red Wire" (Apex, NC).
Plain HTML, CSS and JavaScript. No build step, no dependencies besides two Google Fonts.

## Run it locally

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8503
```

Then visit http://localhost:8503.

## Files

- `index.html` — the whole page
- `css/site.css` — all styles; tokens at the top
- `img/logo.png`, `img/favicon.png` — team logo
- `js/site.js` — mobile menu, the scroll-drawn red wire, balloon-to-parts-list highlighting
- `DESIGN.md` — the design system (fonts, colors, spacing, rules). Read it before changing the look.
- `img/photos/` — photo placeholders
- `img/sponsors/` — sponsor logo placeholders
- `img/og-image.png` — the preview image shown when the link is shared

## Swap in real photos

Every placeholder is already at its final path. Replace the file with a real photo **using the same name** and the page picks it up. Photos are cropped to fit, so anything at or above the listed size works.

| File | What to shoot | Minimum size |
|---|---|---|
| `img/photos/hero.jpg` | Whole team with the robot on the field. Keep faces inside the middle 4:3 area; phones crop to it. | 2400 × 1050 |
| `img/photos/robot-render.jpg` | CAD render of the current robot, padded to 4:3 so nothing gets cropped | 1600 × 1200 |
| `img/photos/team.jpg` | Candid team shot | 1800 × 1200 |
| `img/photos/outreach-pll.jpg`, `outreach-budd.jpg`, `outreach-rao.jpg`, `outreach-nickel.jpg` | Purpose Learning Lab, Senator Budd’s office, Steve Rao, Wiley Nickel | 1200 × 900 |
| `img/photos/outreach-featured.jpg` | Biggest outreach event | 1800 × 1200 |
| `img/photos/outreach-2.jpg` | Second outreach program | 1200 × 900 |
| `img/sponsors/*.png` | Sponsor logos (SVG or PNG; if you switch to SVG, update the `src` in `index.html`) | any |

## Fill in the text

- Search `index.html` for `class="tbd"`. Each one is a bracketed fill-in shown in red on the page.
- Search for `tbd-link`. Those links point at `#` or `example.org` (sponsor email, PDFs, Instagram, GitHub).
- Robot parts list: the rows are example data. Replace them with the real parts list, then delete the `<div class="stamp">` PRELIMINARY block.
- Robot balloons: each `<button class="balloon">` has `--x` and `--y` percentages. Move them so each number sits on its part in the render.
