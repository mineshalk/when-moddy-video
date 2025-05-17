"use client";
import { useEffect, useRef, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useEmotes } from "../../utils/useEmotes";
import { parseEmotes } from "../../utils/parseEmotes";
import ChatInput from "./ChatInput";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const EMOTE_PLATFORM = "7tv";
const SEVENTV_CHANNEL_ID = "01FZRFC1WG00043DV38E2EW32P";

type Message = {
  id: string;
  nickname: string;
  text: string;
  created_at: string;
};


export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [nickname, setNickname] = useState("");
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Загружаем эмодзи только если есть channelId
  const emotes = useEmotes({ platform: EMOTE_PLATFORM, channelId: SEVENTV_CHANNEL_ID });

  // Загрузка сообщений и подписка на новые
  useEffect(() => {
    supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: true })
      .then(({ data }) => {
        setMessages(data || []);
        setLoading(false);
      });

    const subscription = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((msgs) => {
            if (msgs.some((m) => m.id === payload.new.id)) return msgs;
            return [...msgs, payload.new as Message];
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, []);

  // Скролл вниз при новых сообщениях
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Загружаем ник из localStorage при монтировании
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedNick = localStorage.getItem("chat_nickname");
      if (savedNick) setNickname(savedNick);
    }
  }, []);

  // Сохраняем ник в localStorage при изменении
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chat_nickname", nickname);
    }
  }, [nickname]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!nickname.trim() || !text.trim()) return;
    await supabase.from("messages").insert([{ nickname, text }]).select();
    setText("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 w-[340px] max-w-[95vw] bg-white/90 dark:bg-neutral-900/90 rounded-xl shadow-lg flex flex-col h-[420px] sm:h-[480px]">
      <div className="p-3 border-b font-bold text-lg text-center">Публичный чат</div>
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-2">
        {loading ? (
          <div className="text-center text-gray-400">Загрузка...</div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="break-words">
              <span className="font-semibold text-blue-700 dark:text-blue-300">{msg.nickname}:</span>{" "}
              <span>{parseEmotes(msg.text, emotes)}</span>
              <span className="ml-2 text-xs text-gray-400">
                {new Date(msg.created_at + 'Z').toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      <form onSubmit={sendMessage} className="flex flex-col gap-2 p-3 border-t">
        <input
          className="rounded px-2 py-1 border text-sm"
          placeholder="Ваш ник (до 32 символов)"
          maxLength={32}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          required
        />
        <div className="flex gap-2">
          <ChatInput
            value={text}
            onChange={setText}
            emotes={emotes}
            onSend={sendMessage}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 text-sm"
            disabled={!nickname.trim() || !text.trim()}
          >
            Отправить
          </button>
        </div>
      </form>
    </div>
  );
}
