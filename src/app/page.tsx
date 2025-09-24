"use client";

import { useMemo, useState } from "react";

type Article = { id: number; title: string; body: string; date: string };

const ARTICLES: Article[] = [
  { id: 1, title: "Understanding the difference between grid-template and grid-auto", body: "CSS Grid offers grid-template-columns and grid-auto-columns. Learn when each applies and how they interact in explicit vs implicit grids.", date: "2018-10-09" },
  { id: 2, title: "A gentle intro to Flexbox gaps", body: "Flexbox now supports the gap property. It simplifies spacing between items without margins and negative tricks.", date: "2020-03-01" },
  { id: 3, title: "React keys and list rendering", body: "Why keys matter for reconciliation, what makes a good key, and common pitfalls when mapping arrays.", date: "2019-07-15" },
  { id: 4, title: "Grid areas for quick page layouts", body: "Name your grid areas to make page templates legible. Combine with repeat and minmax for robust layouts.", date: "2021-02-11" },
  { id: 5, title: "TypeScript basics for React devs", body: "Props, discriminated unions, generics, and how to type hooks without pain.", date: "2022-08-30" },
  { id: 6, title: "CSS container queries in practice", body: "Component-first responsive design using container query units and inline-size containment.", date: "2023-05-05" },
  { id: 7, title: "Next.js data fetching essentials", body: "Client vs server components, caching, and when to opt into dynamic rendering.", date: "2024-01-20" },
  { id: 8, title: "Grid vs Flexbox: choose the right tool", body: "Layout strategies, mental models, and performance considerations when mixing Grid and Flexbox.", date: "2019-11-02" },
  { id: 9, title: "Accessible modals without a library", body: "Focus trapping, aria attributes, inert backgrounds, and escape handling.", date: "2020-06-18" },
  { id: 10, title: "Highlighting search terms with RegExp", body: "Escape user input, match case-insensitive, and wrap with mark tags for visibility.", date: "2017-04-22" },
];

function escapeRegex(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function highlight(text: string, q: string) {
  if (!q.trim()) return text;
  const re = new RegExp(`(${escapeRegex(q)})`, "gi");
  return text.split(re).map((part, i) =>
    re.test(part) ? (
      <mark key={i} className="bg-yellow-200 px-1 rounded">
        {part}
      </mark>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export default function Page() {
  const [q, setQ] = useState("");
  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return ARTICLES;
    return ARTICLES.filter(
      (a) => a.title.toLowerCase().includes(s) || a.body.toLowerCase().includes(s)
    );
  }, [q]);

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-12">

        <h1 className="text-3xl font-bold mb-4">Search</h1>

        <div className="relative mb-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles..."
            aria-label="articles"
            className="w-full border border-gray-300 rounded-0 px-4 py-3 pr-10 bg-white text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black"
          />
          {q && (
            <button
              onClick={() => setQ("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black text-lg"
              aria-label="Clear search"
            >
              x
            </button>
          )}
        </div>

        <p className="text-black-800 mb-8">
          <strong>{results.length} {results.length === 1 ? "post" : "posts"}</strong> were found
        </p>

        <section className="space-y-8">
          {results.map((a) => (
            <article key={a.id}>
              <h2 className="text-xl font-semibold leading-snug mb-1">
                {highlight(a.title, q)}
              </h2>
              <div className="text-sm text-black-400 mb-2 italic">
                {new Date(a.date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })} 
              </div>
              <p className="text-gray-800 leading-relaxed">{highlight(a.body, q)}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}