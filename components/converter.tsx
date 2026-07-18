"use client";

import {
  Check,
  ChevronDown,
  Copy,
  Dices,
  Heart,
  Search,
  Sparkles,
  WandSparkles,
  X,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { StyleCategory, textStyles } from "@/lib/fonts";

const samples = [
  "Make it quietly unforgettable.",
  "Less noise, more meaning.",
  "Main character energy ✦",
  "Good things take time.",
];

const categories: Array<"All" | StyleCategory | "Saved"> = [
  "All",
  "Tiny",
  "Classic",
  "Decorated",
  "Playful",
  "Saved",
];

type ConverterProps = {
  initialStyle?: string;
  title?: string;
  description?: string;
};

export function Converter({ initialStyle, title, description }: ConverterProps) {
  const [text, setText] = useState(samples[0]);
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState(Boolean(initialStyle));
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [aiOpen, setAiOpen] = useState(false);
  const [aiTopic, setAiTopic] = useState("");
  const [aiTone, setAiTone] = useState("confident");
  const [aiStatus, setAiStatus] = useState<"idle" | "loading" | "error">("idle");
  const [aiMessage, setAiMessage] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      try {
        const saved = window.localStorage.getItem("tinyglyph:favorites");
        if (saved) setFavorites(JSON.parse(saved));
      } catch {
        // Storage can be unavailable in strict privacy modes; the tool still works.
      }
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const node = textareaRef.current;
    if (!node) return;
    node.style.height = "0px";
    node.style.height = `${Math.min(Math.max(node.scrollHeight, 142), 280)}px`;
  }, [text]);

  const orderedStyles = useMemo(() => {
    if (!initialStyle) return textStyles;
    return [...textStyles].sort((a, b) => {
      if (a.slug === initialStyle) return -1;
      if (b.slug === initialStyle) return 1;
      return 0;
    });
  }, [initialStyle]);

  const filteredStyles = useMemo(() => {
    return orderedStyles.filter((style) => {
      const matchesCategory =
        category === "All" ||
        (category === "Saved" ? favorites.includes(style.slug) : style.category === category);
      const haystack = `${style.name} ${style.description} ${style.category}`.toLowerCase();
      return matchesCategory && haystack.includes(query.toLowerCase().trim());
    });
  }, [category, favorites, orderedStyles, query]);

  const visibleStyles = expanded ? filteredStyles : filteredStyles.slice(0, 9);

  async function copy(value: string, slug: string) {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const fallback = document.createElement("textarea");
      fallback.value = value;
      fallback.style.position = "fixed";
      fallback.style.opacity = "0";
      document.body.appendChild(fallback);
      fallback.select();
      document.execCommand("copy");
      fallback.remove();
    }
    setCopied(slug);
    window.setTimeout(() => setCopied((current) => (current === slug ? null : current)), 1600);
  }

  function toggleFavorite(slug: string) {
    setFavorites((current) => {
      const next = current.includes(slug)
        ? current.filter((favorite) => favorite !== slug)
        : [...current, slug];
      try {
        window.localStorage.setItem("tinyglyph:favorites", JSON.stringify(next));
      } catch {
        // Keep in-memory favorites if persistence is unavailable.
      }
      return next;
    });
  }

  async function generateIdea(event: React.FormEvent) {
    event.preventDefault();
    if (!aiTopic.trim()) return;
    setAiStatus("loading");
    setAiMessage("");

    try {
      const response = await fetch("/api/ideas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: aiTopic.trim(), tone: aiTone }),
      });
      const payload = (await response.json()) as { idea?: string; error?: string };
      if (!response.ok || !payload.idea) throw new Error(payload.error ?? "Could not generate an idea.");
      setText(payload.idea);
      setAiOpen(false);
      setAiStatus("idle");
      textareaRef.current?.focus();
    } catch (error) {
      setAiStatus("error");
      setAiMessage(error instanceof Error ? error.message : "Could not generate an idea.");
    }
  }

  function pickSample() {
    const currentIndex = samples.indexOf(text);
    setText(samples[(currentIndex + 1 + samples.length) % samples.length]);
    textareaRef.current?.focus();
  }

  return (
    <section className="generator" id="generator" aria-labelledby="generator-title">
      <div className="generator-heading">
        <div>
          <span className="eyebrow"><Sparkles size={15} aria-hidden="true" /> Live Unicode studio</span>
          <h2 id="generator-title">{title ?? "Type once. Try every style."}</h2>
        </div>
        <p>{description ?? "Every result updates as you type. No uploads, no account, no waiting."}</p>
      </div>

      <div className="input-card">
        <div className="input-toolbar">
          <label htmlFor="text-input">Your text</label>
          <span className="character-count">{text.length.toLocaleString()} / 2,000</span>
        </div>
        <div className="textarea-wrap">
          <textarea
            id="text-input"
            ref={textareaRef}
            value={text}
            maxLength={2000}
            spellCheck
            placeholder="Type or paste something here…"
            onChange={(event) => setText(event.target.value)}
          />
          {text && (
            <button className="clear-button" type="button" aria-label="Clear text" onClick={() => setText("")}>
              <X size={18} aria-hidden="true" />
            </button>
          )}
        </div>
        <div className="input-actions">
          <button className="sample-button" type="button" onClick={pickSample}>
            <Dices size={17} aria-hidden="true" /> Try a sample
          </button>
          <button className="ai-button" type="button" aria-expanded={aiOpen} onClick={() => setAiOpen((value) => !value)}>
            <WandSparkles size={17} aria-hidden="true" /> AI caption starter
          </button>
        </div>

        {aiOpen && (
          <form className="ai-panel" onSubmit={generateIdea}>
            <div>
              <span className="ai-kicker">Powered by Hugging Face</span>
              <h3>Give your text a head start.</h3>
              <p>Describe the moment and get one short caption to style.</p>
            </div>
            <label>
              <span>Topic</span>
              <input
                value={aiTopic}
                maxLength={160}
                placeholder="e.g. a quiet Sunday coffee"
                onChange={(event) => setAiTopic(event.target.value)}
              />
            </label>
            <label>
              <span>Tone</span>
              <select value={aiTone} onChange={(event) => setAiTone(event.target.value)}>
                <option value="confident">Confident</option>
                <option value="playful">Playful</option>
                <option value="minimal">Minimal</option>
                <option value="dreamy">Dreamy</option>
              </select>
            </label>
            <button className="generate-button" type="submit" disabled={!aiTopic.trim() || aiStatus === "loading"}>
              {aiStatus === "loading" ? "Writing…" : "Generate caption"}
            </button>
            {aiStatus === "error" && <p className="ai-error" role="alert">{aiMessage}</p>}
          </form>
        )}
      </div>

      <div className="result-controls">
        <div className="category-tabs" role="group" aria-label="Filter text styles">
          {categories.map((item) => (
            <button
              type="button"
              className={category === item ? "active" : ""}
              aria-pressed={category === item}
              onClick={() => setCategory(item)}
              key={item}
            >
              {item}{item === "Saved" && favorites.length > 0 ? ` ${favorites.length}` : ""}
            </button>
          ))}
        </div>
        <label className="style-search">
          <Search size={17} aria-hidden="true" />
          <span className="sr-only">Search text styles</span>
          <input value={query} placeholder="Find a style" onChange={(event) => setQuery(event.target.value)} />
        </label>
      </div>

      <div className="results-summary" aria-live="polite">
        <span>{filteredStyles.length} styles</span>
        <span>Tap any result to copy</span>
      </div>

      {visibleStyles.length > 0 ? (
        <div className="result-grid">
          {visibleStyles.map((style, index) => {
            const result = style.transform(text);
            const isCopied = copied === style.slug;
            const isFavorite = favorites.includes(style.slug);

            return (
              <article className={`result-card${style.slug === initialStyle ? " featured-result" : ""}`} key={style.slug}>
                <div className="result-meta">
                  <div>
                    <span className="result-number">{String(index + 1).padStart(2, "0")}</span>
                    <h3>{style.name}</h3>
                  </div>
                  <button
                    type="button"
                    className={`favorite-button${isFavorite ? " saved" : ""}`}
                    aria-label={isFavorite ? `Remove ${style.name} from saved styles` : `Save ${style.name}`}
                    aria-pressed={isFavorite}
                    onClick={() => toggleFavorite(style.slug)}
                  >
                    <Heart size={17} fill={isFavorite ? "currentColor" : "none"} aria-hidden="true" />
                  </button>
                </div>
                <button
                  type="button"
                  className="result-value"
                  disabled={!text}
                  aria-label={`Copy ${style.name}: ${result}`}
                  onClick={() => copy(result, style.slug)}
                >
                  <span>{result || "Your result will appear here"}</span>
                  <span className={`copy-pill${isCopied ? " copied" : ""}`}>
                    {isCopied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                    {isCopied ? "Copied" : "Copy"}
                  </span>
                </button>
                <p>{style.description}</p>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="empty-results">
          <span>Nothing hiding here.</span>
          <p>Try a different search or save a few styles first.</p>
          <button type="button" onClick={() => { setQuery(""); setCategory("All"); }}>Reset filters</button>
        </div>
      )}

      {!expanded && filteredStyles.length > 9 && (
        <button className="show-more" type="button" onClick={() => setExpanded(true)}>
          Show all {filteredStyles.length} styles <ChevronDown size={18} aria-hidden="true" />
        </button>
      )}
      <p className="copy-announcement sr-only" aria-live="polite">
        {copied ? `${textStyles.find((style) => style.slug === copied)?.name} copied to clipboard.` : ""}
      </p>
    </section>
  );
}
