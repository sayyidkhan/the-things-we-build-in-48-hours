# Tech Stack

## Project Name

**The Things We Build in 48 Hours**

## Technical Goal

Build a fast, simple, SEO-friendly memoir-style website for documenting hackathons, projects, essays, and builder lessons.

The site should be easy to maintain, easy to deploy, and friendly for AI coding agents to edit.

## Recommended Stack

### Frontend Framework

**Astro**

Reason:
- excellent for SEO
- fast static pages
- simple content structure
- great for Markdown/MDX
- less complex than Next.js
- ideal for blog/memoir websites

### Styling

**Tailwind CSS**

Reason:
- fast to design
- easy to customize
- works well with Astro
- good for clean cards, timelines, and layouts

### Content

**Markdown / MDX**

Reason:
- perfect for essays and memoir entries
- easy to version control
- easy for AI agents to generate and edit
- no database needed for POC

### Deployment

**Vercel**

Reason:
- simple GitHub integration
- fast deploys
- free tier is enough for POC
- easy preview deployments

Alternative:
- Netlify
- Cloudflare Pages

### Repository Name

`the-things-we-build-in-48-hours`

## Suggested Folder Structure

```txt
the-things-we-build-in-48-hours/
├── public/
│   ├── images/
│   └── favicon.svg
│
├── src/
│   ├── components/
│   │   ├── Hero.astro
│   │   ├── HackathonCard.astro
│   │   ├── ProjectCard.astro
│   │   ├── EssayCard.astro
│   │   └── Timeline.astro
│   │
│   ├── content/
│   │   ├── essays/
│   │   ├── hackathons/
│   │   └── projects/
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro
│   │   └── MemoirLayout.astro
│   │
│   ├── pages/
│   │   ├── index.astro
│   │   ├── about.astro
│   │   ├── hackathons.astro
│   │   ├── projects.astro
│   │   ├── essays.astro
│   │   └── contact.astro
│   │
│   └── styles/
│       └── global.css
│
├── project-vision.md
├── tech-stack.md
├── package.json
├── astro.config.mjs
└── README.md
```

## Core Pages

### 1. Home Page

Route:

`/`

Purpose:
- introduce the memoir
- show current hackathon progress
- feature latest essay/project
- guide visitors to archive

Sections:
- Hero
- Progress counter
- Featured chapter
- Hackathon timeline preview
- Featured essays
- About the builder
- Contact CTA

### 2. About Page

Route:

`/about`

Purpose:
- explain who the builder is
- explain the purpose behind the journey
- explain why hackathons matter

### 3. Hackathon Archive

Route:

`/hackathons`

Purpose:
- show all hackathons chronologically

Each hackathon entry should include:
- number
- event name
- date/year
- project
- result
- lesson
- links

### 4. Project Gallery

Route:

`/projects`

Purpose:
- showcase products and prototypes

Each project should include:
- name
- description
- stack
- hackathon number
- demo link
- GitHub link
- lesson

### 5. Essays / Memoir

Route:

`/essays`

Purpose:
- publish reflective writing

Example essays:
- Why I Keep Joining Hackathons
- What 48 Hours Can Teach You
- The Things That Break Before Demo Day
- Searching for Purpose Through Prototypes
- Volume Negates Luck

### 6. Contact

Route:

`/contact`

Purpose:
- invite speaking, mentoring, judging, workshops, collaborations

CTA:
- Invite me to speak
- Invite me to judge
- Invite me to run an AI workshop

## Content Schema

### Hackathon Entry

Example file:

`src/content/hackathons/064-data-center-destroyer.md`

```md
---
number: 64
title: "Data Center Destroyer"
event: "Hackathon Name"
date: "2026-05-01"
result: "Built prototype"
project: "Data Center Destroyer"
stack:
  - React
  - OpenAI
  - WebSockets
demoUrl: ""
githubUrl: ""
coverImage: "/images/hackathons/data-center-destroyer.png"
---

## Summary

A tower defense game built in 48 hours, inspired by Data Center Tycoon.

## What Happened

Write the story here.

## What Worked

Write what worked here.

## What Broke

Write what broke here.

## Lesson

Write the main lesson here.
```

### Project Entry

Example file:

`src/content/projects/guardian-agent.md`

```md
---
title: "Guardian Agent"
description: "An agentic voicemail that acts as your proxy when you are unavailable."
hackathonNumber: 0
stack:
  - Astro
  - React
  - OpenAI
  - Vercel
demoUrl: ""
githubUrl: ""
coverImage: "/images/projects/guardian-agent.png"
---

## Problem

People need your input when you are unavailable.

## Solution

An AI voice agent that captures context and responds based on your judgement.

## Lessons

Write the lessons here.
```

### Essay Entry

Example file:

`src/content/essays/searching-for-purpose.md`

```md
---
title: "Searching for Purpose Through Prototypes"
date: "2026-05-12"
description: "Why hackathons became a way to understand myself as a builder."
---

Write essay here.
```

## Design Direction

### Visual Style

The website should feel:
- clean
- cinematic
- quiet
- reflective
- archive-like

Suggested style:
- dark or warm neutral background
- large serif-style headings if desired
- simple cards
- timeline layout
- subtle grain/noise texture
- minimal animations

### UI Inspiration

Think:
- memoir website
- indie film archive
- personal journal
- builder documentary
- Japanese cinema poster energy, but subtle

Do not overdo anime styling.

## SEO / AEO Strategy

Each page should clearly answer:

> Who is Sayyid Khan?

Recommended repeated line:

Sayyid Khan is a Singapore-based AI builder and software engineer documenting his journey to complete one hundred hackathons.

Important keywords:
- Sayyid Khan
- Singapore AI builder
- serial hackathoner
- hackathon memoir
- AI hackathon builder
- one hundred hackathons
- The Things We Build in 48 Hours

## POC Scope

For the first version, build only:

1. Home page
2. About page
3. Hackathon archive page
4. Projects page
5. Essays page
6. 3 sample hackathon entries
7. 3 sample project entries
8. 3 sample essay entries

No database needed.

No authentication needed.

No CMS needed.

## Future Enhancements

Later versions can add:
- CMS with Sanity or Contentlayer
- search
- filters by year/result/stack
- image gallery
- speaking page
- newsletter signup
- interactive hackathon counter
- embedded YouTube demos
- timeline animation
- analytics
- sitemap
- RSS feed

## Recommended Commands

```bash
npm create astro@latest the-things-we-build-in-48-hours
cd the-things-we-build-in-48-hours
npx astro add tailwind
npm run dev
```

## Final Recommendation

Use:

- Astro
- Tailwind CSS
- Markdown/MDX
- Vercel
- GitHub

This keeps the POC simple, fast, and SEO-friendly while giving enough structure to grow into a full memoir-style platform.
