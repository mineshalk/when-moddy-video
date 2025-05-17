import { useEffect, useState } from "react";
import { request, gql } from "graphql-request";

export type Emote = {
  name: string;
  url: string;
  provider: string;
};

type Platform = "7tv"; // можно расширить

type UseEmotesOptions = {
  platform: Platform;
  channelId: string; // id пользователя 7tv
  page?: number;
  token?: string; // если нужен Bearer-токен
};

const ENDPOINTS = {
  "7tv": "https://api.7tv.app/v4/gql",
};

const EMOTES_QUERY = gql`
  query UserActiveEmotes($id: Id!, $page: Int!) {
    users {
      user(id: $id) {
        style {
          activeEmoteSet {
            emotes(page: $page, perPage: 10000) {
              items {
                alias
                emote {
                  id
                  defaultName
                  images { url }
                }
              }
            }
          }
        }
      }
    }
  }
`;

export function useEmotes({ platform, channelId, page = 1, token }: UseEmotesOptions) {
  const [emotes, setEmotes] = useState<Emote[]>([]);
  useEffect(() => {
    const cacheKey = `emotes_${platform}_${channelId}_${page}`;
    const cached = typeof window !== "undefined" ? localStorage.getItem(cacheKey) : null;
    if (cached) {
      try {
        setEmotes(JSON.parse(cached));
      } catch {}
    }

    if (platform === "7tv") {
      request(
        ENDPOINTS[platform],
        EMOTES_QUERY,
        { id: channelId, page },
        token ? { Authorization: `Bearer ${token}` } : undefined
      )
        .then((data: any) => {
          const items = data?.users?.user?.style?.activeEmoteSet?.emotes?.items || [];
          const emotes: Emote[] = items.map((item: any) => ({
            name: item.alias || item.emote.defaultName,
            url: item.emote.images?.[0]?.url || "",
            provider: "7tv",
          }));
          setEmotes(emotes);
          if (typeof window !== "undefined") {
            localStorage.setItem(cacheKey, JSON.stringify(emotes));
          }
        })
        .catch(() => {});
    }
    // Здесь можно добавить другие платформы
  }, [platform, channelId, page, token]);
  return emotes;
}
