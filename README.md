# Lean In — Design Assignment
**Thomas Toan**
---

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose

### Setup

1. Copy the environment template:

   ```bash
   cp .env.example .env
   ```

2. Build and start all services:

   ```bash
   docker compose up --build
   ```

Once running:

| Service      | URL                        |
| ------------ | -------------------------- |
| Frontend     | http://localhost:3000      |
| Backend API  | http://localhost:8000      |
| PostgreSQL   | localhost:5432             |

### Environment Variables

Supplied via `.env` in the project root, loaded automatically by Docker Compose. `.env` is git-ignored — copy `.env.example` to get started.

| Variable      | Description            | Default        |
| ------------- | ---------------------- | -------------- |
| `DB_USER`     | PostgreSQL username    | `dev_user`     |
| `DB_PASSWORD` | PostgreSQL password    | `dev_password` |
| `DB_NAME`     | PostgreSQL database    | `dev_db`       |

---

## Architecture

```
.
├── frontend/      # Next.js 15 (App Router)
├── backend/       # FastAPI + Uvicorn
└── docker-compose.yml
```

Three Docker services share an internal `app-network`: a PostgreSQL 16 database, a FastAPI backend that proxies article and circle data, and a Next.js frontend that server-renders pages and fetches from the API.

---



## Short Rational


Tech Stack explanation: 

Frontend Stack: Next.js, TypeScript, Tailwind CSS; additional dependencies Framer Motion, D3, Masonic
Backend Stack: FastAPI, Uvicorn

This stack was chosen to quickly spin up a working frontend environment. The biggest frontend decision was whether or not to introduce Next.js in this small assignment. Next.js was ultimately chosen for its image optimization. The Lean In site is very data and image heavy. Next.js’s image optimization alone was worth its introduction to the project. With Next.js further optimizations such as the use of server side rendering and even hybrid rendering could take place. This would further improve web metrics but also greatly enhance the overall site’s SEO. 

FastAPI and Uvicorn were used to quickly mock apis used by the project. While these apis could have been handled inside Next.js itself, bringing in this tech better emulates the stack used in production 


Design choice explanation: 

The pages that were redesigned (and are mocked to work) are leanin.org’s landing, `/circles`, and `/articles` pages.

I chose to rebuild the homepage in order to give the site a shared complementary color pallette across all pages. The current site’s usage of background color would occasionally cause color contrast failures. The original nav bar, while great for mobile, was a bit laggy and unintuitive for desktop. Desktop nav links are slow to change its hover state and all nav links do not have a hover state which makes the component feel broken (About doesn’t behave the same as the other nav links). Given more time I would have created a more robust redesign of this component. The homepage’s redesign only represents a few of the original sections and given more time, I would ensure all pertinent information was included The focus of this page was to convey how a new pallette and structure could help refresh the landing page. 

The circles page was the next page to receive a redesign. Network graphs (circle nodes connected by straight lines) were introduced as a design element to represent the Lean In circles created by local communities across the world and the greater connection that all of these circles (nodes) have to each other and to the Lean In organization. These circle elements can also be found on the home page’s “Lean In Circles” section as well as the circles page’s “Six steps to your circle” ScrollExperience component. Given more time, I would have fully fleshed out the content found on the circles page. Also note the circles page behaves differently for logged-in and logged-out users (click the “Sign In” or “Sign Out” button to toggle this state). Logged in users would have more circle discovery content as well a global map (or localized to the user’s country) with circle pins for each Lean In circle. Other enhancements for logged in users would be a “message circle” CTA added alongside the “Request to Join” CTA for those individuals that are visiting a new city and want to interact with the local Lean In Circles. 

The articles page was the last page to receive a redesign. The Lean In organization is great about generating articles and new content. This page would serve as a hub for readers to discover new content and all of Lean In’s content could potentially be housed here. Users who know what they want to read can use Lean In’s rich “Topics” and “This is for” filters to find exactly what they want. Each article card is labeled with their “Topics” and “This is for” tags so readers can organically discover the content that matters most to them as they browse through the Lean In mosaic of information. Given more time I would have further refined the design on the page. The title section and colors can still use a bit of polish, not to mention none of article links work.  

Overall, these pages represent a first draft of what a redesigned leanin.org can look like. Thank you for taking the time to review my work. I hope some of it has inspired you as you continue to grow and improve the Lean In organization. 

                                               - Cheers,
                                               Thomas Toan