import React from "react";
import type { Emote } from "./useEmotes";

export function parseEmotes(text: string, emotes: Emote[]) {
  if (!emotes.length) return text;
  return text.split(/(\s+)/).map((part, i) => {
    const emote = emotes.find((e) => e.name === part);
    if (emote) {
      return (
        <img
          key={i}
          src={emote.url}
          alt={emote.name}
          title={emote.name}
          style={{ display: "inline", height: "1.5em", verticalAlign: "middle" }}
        />
      );
    }
    return part;
  });
}
