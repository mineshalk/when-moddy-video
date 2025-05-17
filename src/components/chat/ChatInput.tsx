import { useState, useRef, useEffect } from "react";
import type { Emote } from "../../utils/useEmotes";

type Props = {
  value: string;
  onChange: (v: string) => void;
  emotes: Emote[];
  onSend: (e: React.FormEvent) => void;
};

export default function ChatInput({ value, onChange, emotes, onSend }: Props) {
  const [suggestions, setSuggestions] = useState<Emote[]>([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const match = value.split(/\s/).pop() || "";
    if (match.length > 0) {
      const filtered = emotes.filter(e => e.name.toLowerCase().includes(match.toLowerCase())).slice(0, 8);
      setSuggestions(filtered);
      setShow(filtered.length > 0);
      setSelected(0);
    } else {
      setShow(false);
    }
  }, [value, emotes]);

  const insertEmote = (emote: Emote) => {
    const words = value.split(/\s/);
    words[words.length - 1] = emote.name;
    onChange(words.join(" ") + " ");
    setShow(false);
    inputRef.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!show) return;
    if (e.key === "ArrowDown") {
      setSelected((s) => (s + 1) % suggestions.length);
      e.preventDefault();
    } else if (e.key === "ArrowUp") {
      setSelected((s) => (s - 1 + suggestions.length) % suggestions.length);
      e.preventDefault();
    } else if ((e.key === "Enter" || e.key === "Tab") && suggestions[selected]) {
      insertEmote(suggestions[selected]);
      e.preventDefault();
    }
  };

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        className="flex-1 rounded px-2 py-1 border text-sm w-full"
        placeholder="Сообщение (до 128 символов)"
        maxLength={128}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        autoComplete="off"
        onBlur={() => setTimeout(() => setShow(false), 100)}
        onFocus={() => {
          if (suggestions.length > 0) setShow(true);
        }}
      />
      {show && (
        <div className="absolute left-0 bottom-full mb-1 w-full bg-white dark:bg-neutral-900 border rounded shadow z-50 max-h-48 overflow-y-auto">
          {suggestions.map((emote, i) => (
            <div
              key={emote.name}
              className={`flex items-center gap-2 px-2 py-1 cursor-pointer ${i === selected ? "bg-blue-100 dark:bg-blue-800" : ""}`}
              onMouseDown={() => insertEmote(emote)}
            >
              <img src={emote.url} alt={emote.name} className="h-6 w-6" />
              <span>{emote.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 