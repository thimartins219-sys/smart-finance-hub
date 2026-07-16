import { useEffect, useState } from "react";

export function Typewriter({
  words,
  className = "",
  typeSpeed = 55,
  eraseSpeed = 30,
  holdMs = 1800,
}: {
  words: string[];
  className?: string;
  typeSpeed?: number;
  eraseSpeed?: number;
  holdMs?: number;
}) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [erasing, setErasing] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    if (!erasing && text === word) {
      const t = setTimeout(() => setErasing(true), holdMs);
      return () => clearTimeout(t);
    }
    if (erasing && text === "") {
      setErasing(false);
      setI((v) => v + 1);
      return;
    }
    const t = setTimeout(
      () => {
        setText((cur) =>
          erasing ? cur.slice(0, -1) : word.slice(0, cur.length + 1),
        );
      },
      erasing ? eraseSpeed : typeSpeed,
    );
    return () => clearTimeout(t);
  }, [text, erasing, i, words, typeSpeed, eraseSpeed, holdMs]);

  return (
    <span className={className}>
      {text}
      <span className="ml-1 inline-block h-[0.8em] w-[2px] animate-pulse bg-[--primary-orange] align-middle" />
    </span>
  );
}
