import type { CSSProperties } from "react";

/**
 * Words that rise out of a mask on load. CSS only, and it never splits a word
 * into letters, so Arabic stays joined.
 */
export default function SplitWords({ text, start = 0 }: { text: string; start?: number }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <span key={i}>
          <span className="word-mask">
            <span className="word" style={{ "--i": start + i } as CSSProperties}>
              {word}
            </span>
          </span>{" "}
        </span>
      ))}
    </>
  );
}
