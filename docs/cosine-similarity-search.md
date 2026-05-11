# Cosine Similarity Search

## Purpose

This document explains how to implement semantic search for **The Things We Build in 48 Hours** without using a database.

The goal is to allow users to search across:

- essays
- hackathon entries
- project pages
- lessons
- memoir chapters

using meaning, not just exact keywords.

Example:

A user searches:

```txt
failure before demo day
```

The search should still find essays about:

- broken prototypes
- last-minute bugs
- failed hackathon submissions
- lessons from unfinished products

even if the exact phrase does not appear.

## Core Idea

Semantic search works by converting text into numbers called **embeddings**.

Each page becomes a vector.

Each user query also becomes a vector.

Then we compare both vectors using **cosine similarity**.

The closer the vectors are, the more related the meanings are.

```txt
User query
→ embedding vector
→ compare against page vectors
→ rank by similarity score
→ return best results
```

## Why Cosine Similarity?

Cosine similarity measures how close two vectors point in the same direction.

For semantic search:

- higher score = more similar meaning
- lower score = less similar meaning

If embeddings are already normalized, cosine similarity becomes a simple dot product.

## Recommended Architecture

For this website, use a **static search index**.

```txt
Markdown / MDX content
→ generate embeddings at build time
→ save to public/search-index.json
→ browser loads search index
→ browser embeds user query locally
→ compare query embedding against index
→ show top results
```

## Why No Database?

For the POC, a database is unnecessary.

This approach gives:

- no backend
- no database
- no monthly cost
- SEO-friendly static pages
- simple deployment on Vercel
- easy content editing through Markdown

A database like Supabase + pgvector can be added later when the content becomes large.

## Tech Stack

Use:

- Astro
- Markdown / MDX
- Tailwind CSS
- Transformers.js
- Static JSON index
- Vercel

Package:

```bash
npm i @huggingface/transformers
```

Recommended local embedding model:

```txt
Xenova/all-MiniLM-L6-v2
```

This is small enough for browser-side semantic search.

## Search Index Shape

Example:

```json
[
  {
    "id": "searching-for-purpose",
    "title": "Searching for Purpose Through Prototypes",
    "url": "/essays/searching-for-purpose",
    "type": "essay",
    "text": "Why hackathons became a way to understand myself as a builder.",
    "embedding": [0.012, -0.034, 0.056]
  }
]
```

Each item should contain:

| Field | Purpose |
|---|---|
| `id` | unique identifier |
| `title` | display title |
| `url` | page link |
| `type` | essay, project, hackathon, lesson |
| `text` | short searchable text |
| `embedding` | vector representation of the text |

## What Text Should Be Embedded?

Do not embed the whole page blindly.

For each page, create a searchable summary.

Good embedding text:

```txt
Title + description + key lesson + tags + short summary
```

Example:

```txt
Data Center Destroyer. A tower defense game built in 48 hours with OpenAI voice controls. Lesson: game engines require careful tick cycles, sync timing, and multiplayer state management.
```

This gives better search results than embedding only the title.

## Query Embedding

Create a file:

```txt
src/lib/embedText.ts
```

Example:

```ts
import { pipeline } from "@huggingface/transformers";

let extractor: any;

export async function embedText(text: string): Promise<number[]> {
  if (!extractor) {
    extractor = await pipeline(
      "feature-extraction",
      "Xenova/all-MiniLM-L6-v2"
    );
  }

  const output = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });

  return Array.from(output.data);
}
```

## Cosine Similarity Function

Create:

```txt
src/lib/cosineSimilarity.ts
```

Example:

```ts
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error("Vectors must have the same length");
  }

  let dot = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
  }

  return dot;
}
```

Because the embeddings are normalized, the dot product is enough.

## Semantic Search Function

Create:

```txt
src/lib/semanticSearch.ts
```

Example:

```ts
import { embedText } from "./embedText";
import { cosineSimilarity } from "./cosineSimilarity";

export type SearchIndexItem = {
  id: string;
  title: string;
  url: string;
  type: "essay" | "project" | "hackathon" | "lesson";
  text: string;
  embedding: number[];
};

export async function semanticSearch(
  query: string,
  index: SearchIndexItem[],
  limit = 5
): Promise<Array<SearchIndexItem & { score: number }>> {
  const queryEmbedding = await embedText(query);

  return index
    .map((item) => ({
      ...item,
      score: cosineSimilarity(queryEmbedding, item.embedding),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}
```

## Frontend Usage

Example search component logic:

```ts
import { semanticSearch } from "../lib/semanticSearch";

const response = await fetch("/search-index.json");
const index = await response.json();

const results = await semanticSearch("failure before demo day", index);

console.log(results);
```

## Suggested UI

Search box placeholder:

```txt
Search the journey...
```

Example searches:

```txt
demo day failure
AI voice agents
why I keep joining hackathons
shipping early
purpose through building
```

Display results as cards:

```txt
Essay
Searching for Purpose Through Prototypes
Why hackathons became a way to understand myself as a builder.
Score: 0.82
```

In production, hide the score from normal users.

## Build-Time Embedding Generation

For the POC, create a script:

```txt
scripts/generate-search-index.ts
```

The script should:

1. Read Markdown files
2. Extract frontmatter
3. Build searchable text
4. Generate embeddings
5. Write `public/search-index.json`

Example pseudo-flow:

```txt
Read src/content/essays
Read src/content/projects
Read src/content/hackathons
For each file:
  extract title, description, tags, summary
  generate embedding
  push into search index
Write public/search-index.json
```

## Important Performance Notes

Do not generate all embeddings in the browser.

Bad:

```txt
browser loads all Markdown
browser embeds every page
browser searches
```

Good:

```txt
build generates page embeddings once
browser only embeds the user query
browser compares against existing vectors
```

## Limitations

This approach is good for a small or medium personal website.

It may become slow when:

- there are thousands of pages
- the search index becomes very large
- the embedding model takes too long to load
- mobile devices struggle with local inference

For the first version, this is acceptable.

## When to Use a Database Later

Move to Supabase + pgvector when you need:

- thousands of entries
- faster vector search
- chatbot-style search
- admin dashboard
- filtering by metadata
- user accounts
- dynamic content editing

## Future Upgrade Path

### Phase 1

Static search index.

```txt
Markdown + local embeddings + cosine similarity
```

### Phase 2

Hybrid search.

```txt
Keyword search + semantic search
```

### Phase 3

Vector database.

```txt
Supabase Postgres + pgvector
```

### Phase 4

AI memory layer.

```txt
Ask questions across the entire hackathon memoir
```

Example:

```txt
What did I learn from hackathons where I failed?
```

## Recommendation

For **The Things We Build in 48 Hours**, start with:

```txt
Static JSON index + local query embeddings + cosine similarity
```

This is enough for the POC.

It keeps the site simple while still making it feel intelligent.
