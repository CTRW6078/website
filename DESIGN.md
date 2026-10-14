---
# gstack: design-md-format=spec
name: Cut the Red Wire — FTC 6078
description: A released engineering drawing set for a robotics team. Ink on paper, square edges, one safety-red wire running through every page.
colors:
  primary: "#DA291C"          # ANSI Z535 safety red. Buttons, the wire, large display accents.
  primary-hover: "#B3200F"
  on-primary: "#FFFFFF"
  primary-text: "#B3200F"     # red for small text on paper (6.0:1). #DA291C is only 4.4:1.
  primary-on-ink: "#FF4A3D"   # red for text and lines on the ink band (5.5:1).
  ink: "#141414"              # body text, object lines, the dark robot band
  paper: "#F3F3F0"            # page ground
  surface: "#FFFFFF"          # tables, title blocks, raised sheets
  text: "#141414"
  text-muted: "#5B5B57"       # 6.1:1 on paper
  text-on-ink: "#F3F3F0"
  text-muted-on-ink: "#A3A39E"
  line: "#D4D4CE"             # thin lines, table rules
  line-on-ink: "#3A3A37"
  success: "#1E7F4F"
  warning: "#B7791F"
  error: "#B3200F"
typography:
  display:
    fontFamily: Geist
    fontWeight: 800
    fontStretch: 75%
    fontSize: clamp(2.75rem, 7.2vw, 5.5rem)
    lineHeight: 0.9
    letterSpacing: -0.005em
    textTransform: uppercase
  heading:
    fontFamily: Geist
    fontWeight: 800
    fontStretch: 75%
    fontSize: clamp(2rem, 4.2vw, 3.25rem)
    lineHeight: 0.95
    textTransform: uppercase
  subheading:
    fontFamily: Geist
    fontWeight: 700
    fontStretch: 100%
    fontSize: 1.375rem
    lineHeight: 1.2
  body:
    fontFamily: Geist
    fontWeight: 400
    fontStretch: 100%
    fontSize: 1.0625rem
    lineHeight: 1.6
  label:
    fontFamily: Geist
    fontWeight: 600
    fontStretch: 112%
    fontSize: 0.75rem
    letterSpacing: 0.06em
    textTransform: uppercase
  mono:
    fontFamily: Geist Mono
    fontWeight: 500
    fontSize: 0.875rem
    fontFeature: tnum
rounded:
  none: 0px
  sm: 2px
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  3xl: 48px
  4xl: 64px
  5xl: 96px
  6xl: 120px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-secondary:
    backgroundColor: "transparent"
    textColor: "{colors.ink}"
    borderColor: "{colors.ink}"
    rounded: "{rounded.sm}"
  table:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.ink}"
    rounded: "{rounded.none}"
  balloon:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.ink}"
    rounded: "{rounded.full}"
  nav-link:
    textColor: "{colors.text}"
---

# Cut the Red Wire — FTC 6078

## Overview

**Creative North Star:** The site is a released drawing set. Every section borrows a real engineering document (title block, revision table, parts list, routing sheet) so a sponsor reads "these students build like a shop" before reading a word.

**Product context:** Public site for FIRST Tech Challenge Team 6078 "Cut the Red Wire" (Apex, NC; competing since 2012). Primary audience right now is sponsor reviewers, starting with Fabworks, a sheet-metal fabrication company. Secondary: FTC judges, parents, prospective members, other teams.

**Mode per surface:**
- Home: Persuade. One long page that earns a sponsorship.
- Robot and record sections: Read. Dense, scannable, real data.
- Sponsor section: Persuade, with a single clear action.

**Reference sites:** fabworks.com (heavy black grotesk headlines, one accent, technical tone); team254.com, technicbots.com, simbotics.org, themomentmakers.org (category baseline: Bootstrap navbars, centered text over blurred photos, WordPress blogs).

**Key characteristics:**
- First screen is a drawing sheet: photo inside a thin sheet border, the team name huge across the bottom edge, a title block in the corner.
- One red wire runs down the page and connects every section, routed with 45° bends like a PCB trace.
- Achievements are a revision table and the robot is a parts list with balloon callouts. No stat counters, no icon cards.
- Square corners, ink line weights, no shadows.

## Colors

**Strategy:** Restrained. Ink and paper do the work. Safety red is rare and always means one of these: the wire, the primary action, the team's name, a link (as `primary-text`), or the part currently selected in the parts list. Navigation state, row highlights and hover feedback stay ink.

**Light or dark:** Light. Sponsor reviewers read this at a desk in daylight, and the drawing-set concept is ink on paper. One ink band (the robot section) is the only dark surface, used because CAD renders and robot photos read best on a dark stage. No glow on it, ever.

Red text on paper uses `primary-text` (#B3200F) because safety red fails AA at small sizes. On the ink band, red lines and text use `primary-on-ink` (#FF4A3D). Neutrals are warm-gray derived from ink, never blue-gray.

## Typography

Source world: engineering drawings, industrial signage, part labels. Geist (sans) carries display, headings, body and labels; Geist Mono carries numbers, dates and part codes. Section headings are sentence case with tight tracking; only the hero title and small labels are uppercase. (Switched from Archivo + JetBrains Mono in 2026-10 for a cleaner look; any fontStretch values above no longer apply.)

Loading: Google Fonts CSS2, `Geist:wght@400..800` and `Geist+Mono:wght@400..600`, `display=swap`, with `preconnect` to fonts.gstatic.com. Both OFL, verified 2026-10-04.

Scale: display 5.5rem max, section heading 3.25rem max, subheading 1.375rem, body 1.0625rem, label 0.75rem. Headings are uppercase only at display and section level. Nothing else is uppercase except labels.

## Layout

- Max content width 1280px. The hero sits inside a sheet frame with zone ticks on its edges.
- 12-column grid, 24px gutter. Breakpoints, each with one job: 600 (spacing steps up, parts list stops stacking), 720 (record table stops stacking), 900 (full nav, section grids go two-column), 1100 (hero title block beside the body, robot grid, routing columns, footer row).
- Left gutter belongs to the wire: 28px phone, 40px tablet, 64px desktop. Content never enters it.
- Rhythm: section padding is 64px phone, 96px tablet, 120px desktop. Sections differ in height and density on purpose: hero (poster), record (dense table), robot (dark, image-led), process (routing strip), team (split), outreach (one big + two small), sponsors (logos + action).
- Grid breaks: hero name overlaps the photo's bottom edge; robot render bleeds past the column; balloons sit on top of the image.

## Elevation & Depth

No drop shadows. Depth is line weight, like a drawing: 2px ink for object lines (table tops, frame, buttons), 1px `line` for thin rules. Raised sheets (tables, title block) are white `surface` on `paper` with a 1px ink border.

## Shapes

Square. Radius 0 on containers, tables, images. 2px on buttons and inputs so they don't look sharp-cornered on low-DPI screens. The only round things are balloon callouts and wire terminals, because they're round on real drawings and boards.

## Components

- **Buttons.** Primary: red fill, white text, 2px radius, label-style text at 0.8125rem/650 (one step larger than labels so it reads as an action). Hover darkens to `primary-hover`. Focus-visible: 2px ink outline offset 3px. Secondary: transparent with 2px ink border; hover fills ink, text paper. Every button names its outcome ("See the 2026–27 robot", "Email us about sponsoring"), never "Learn more".
- **Title block.** White sheet, ink border, grid of field cells. Each cell: label (Geist 112%, 0.75rem) over value (mono or body).
- **Tables (record, parts list).** 2px ink top rule, 1px `line` row rules, label-style headers, mono for dates and quantities. On mobile, rows stack into label/value pairs.
- **Balloons.** 32px circles, white fill, 2px ink border, mono numeral, with a 1px leader line to the part. Hover or focus a balloon highlights its parts-list row and vice versa.
- **Photo frames.** Fixed aspect ratio, `object-fit: cover`, 1px ink border, small corner crop marks. Placeholders are real image files at the final path, so swapping a photo means overwriting one file.
- **Preliminary stamp.** Red outlined box, rotated -4°, used only on example data that must be replaced before launch. It is honest: a released drawing carries no stamp.
- **The wire.** 3px `primary` stroke, 45° jogs between sections, 10px terminal circles at each section heading. The unlit route is a neutral gray (#9A9A95 at 55%) that reads on paper and on the ink band. It draws itself as you scroll and ends in a cut at the footer.
- **Parts list on phones.** Below 600px each row stacks: item and part on line one with quantity at the right, material and process on line two. Tapping a balloon also prints the part under the render, since the list sits below the image.

## Do's and Don'ts

- Do: put real data in tables (event, award, date, rank). If it isn't known yet, show the field empty with a placeholder, not a made-up value.
- Do: name every call to action by what it gets you.
- Do: keep red for the wire, the primary action, the name, links, and the selected part. If anything else turns red, something should stop being red.
- Do: test every section at 360px wide.
- Don't: add stat counters, icon cards, scrolling logo strips, testimonial rows, kicker labels above headings, gradients, glass panels, or glows.
- Don't: round the corners of containers or add drop shadows.
- Don't: use the grid-paper background every engineering-themed site reaches for. The sheet frame and title block carry the concept.
- Don't: center long text. Headings and body are left-aligned to the grid.

## Motion

- **Approach:** intentional. One authored moment, everything else is quiet.
- **Easing:** enter ease-out, exit ease-in, move ease-in-out.
- **Duration:** micro 80ms (hover color), short 200ms (header condense, balloon highlight), long 600ms (none currently).
- **The one authored moment:** the red wire draws down the page as you scroll, lighting each section's terminal as it arrives. With `prefers-reduced-motion: reduce`, the wire is drawn fully and static.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-10-04 | Initial design system created, replacing the Frog Force 503 Bootstrap clone | Created by /design-consultation for a Fabworks sponsorship application. Research: Fabworks site plus four top FIRST team sites showed a low category bar. Memorable thing: "this team builds like a real engineering shop, with a red wire running through all of it." |
| 2026-10-04 | Geist (variable width) + Geist Mono | One family covers display, body and labels via the width axis; mono for machinist-readable data. Both verified OFL on Google Fonts. |
| 2026-10-04 | Safety red #DA291C with #B3200F for small text | ANSI Z535 safety red ties the name to real danger labeling; contrast check showed #DA291C fails AA for small text. |
| 2026-10-04 | Outside design voices and AI mockups skipped | User not available mid-task; the built page on localhost serves as the preview. |
| 2026-10-04 | /design-review pass: nav collapses below 1100px, parts list stacks on phones, red narrowed, breakpoints and spacing documented as built | Header crowded at 900–1099px; Claude reviewer found the parts list unusable at 360px and red used for nav state and highlights. Spec updated to match the shipped values rather than churn every spacing value. |
