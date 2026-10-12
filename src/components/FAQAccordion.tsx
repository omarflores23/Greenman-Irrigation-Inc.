"use client";

import { useId, useMemo, useState } from "react";

export type FAQItem = { question: string; answer: string };

export function FAQAccordion({
  items,
  searchable = false,
}: {
  items: FAQItem[];
  searchable?: boolean;
}) {
  const [query, setQuery] = useState("");
  const searchId = useId();
  const visibleItems = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    return items.filter((item) =>
      `${item.question} ${item.answer}`.toLocaleLowerCase().includes(term),
    );
  }, [items, query]);

  return (
    <div className="faq-accordion">
      {searchable && (
        <div className="faq-search">
          <label htmlFor={searchId}>Search frequently asked questions</label>
          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try repairs, winterization, or installation"
          />
          <p role="status" aria-live="polite">
            {visibleItems.length}{" "}
            {visibleItems.length === 1 ? "answer" : "answers"} found
          </p>
        </div>
      )}
      <div className="faq-items">
        {visibleItems.map((item) => (
          <details key={item.question} className="faq-item">
            <summary>
              {item.question}
              <span aria-hidden="true">+</span>
            </summary>
            <div className="faq-answer">
              <p>{item.answer}</p>
            </div>
          </details>
        ))}
      </div>
      {visibleItems.length === 0 && (
        <p>
          No answers match your search. Try a different phrase or send us your
          question.
        </p>
      )}
    </div>
  );
}

export default FAQAccordion;
