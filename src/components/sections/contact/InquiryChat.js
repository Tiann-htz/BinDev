"use client";

import { useEffect, useRef, useState } from "react";
import {
  FIELD_LABELS,
  FIELD_ORDER,
  READY_TEXT,
  askAI,
  emptyFields,
  nextField,
  readAnswer,
  scriptedPrompt,
  toPayload,
} from "@/lib/inquiryChat";

const bubble = "max-w-[85%] whitespace-pre-wrap break-words rounded-2xl px-4 py-2.5 text-sm leading-relaxed";
const chipClass =
  "rounded-full border border-hair bg-background px-4 py-2 text-sm transition hover:border-signal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal";

const firstMessages = () => [{ role: "assistant", ...scriptedPrompt("name", emptyFields()) }];

export default function InquiryChat() {
  const [messages, setMessages] = useState(firstMessages);
  const [fields, setFields] = useState(emptyFields);
  const [mode, setMode] = useState("ai");
  const [status, setStatus] = useState("idle");
  const [input, setInput] = useState("");
  const [editing, setEditing] = useState(null);
  const logRef = useRef(null);
  const inputRef = useRef(null);
  const abortRef = useRef(null);
  const mounted = useRef(false);

  useEffect(() => () => abortRef.current?.abort(), []);

  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, status]);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const log = logRef.current;
    if (status === "idle") inputRef.current?.focus();
    else if (status === "summary") log?.querySelector("[data-confirm]")?.focus();
    else if (status === "editPick") log?.querySelector("[data-chip]")?.focus();
  }, [status, messages]);

  const say = (text, chips = null) =>
    setMessages((m) => [...m, { role: "assistant", text, chips }]);

  function startEdit(field, note) {
    const prompt = scriptedPrompt(field, fields);
    setEditing(field);
    setStatus("idle");
    say(note || `What should the new ${FIELD_LABELS[field].toLowerCase()} be?`, prompt.chips);
  }

  function answerScripted(text) {
    const field = nextField(fields);
    if (!field) return;
    const result =
      field === "name" && (text.length > 40 || /[@\d]/.test(text))
        ? { error: "Just your name is fine." }
        : readAnswer(field, text);
    if (result.error) {
      say(result.error, scriptedPrompt(field, fields).chips);
      return;
    }
    const updated = { ...fields, [field]: result.value };
    setFields(updated);
    const next = nextField(updated);
    if (next) {
      const prompt = scriptedPrompt(next, updated);
      say(prompt.text, prompt.chips);
    } else {
      say(READY_TEXT);
      setStatus("summary");
    }
  }

  async function send(raw) {
    const text = raw.trim();
    if (!text || status !== "idle") return;
    setInput("");
    const userMsg = { role: "user", text };

    if (editing) {
      const result = readAnswer(editing, text);
      setMessages((m) => [...m, userMsg]);
      if (result.error) {
        say(result.error, scriptedPrompt(editing, fields).chips);
        return;
      }
      setFields({ ...fields, [editing]: result.value });
      setEditing(null);
      say(READY_TEXT);
      setStatus("summary");
      return;
    }

    const history = [...messages, userMsg];
    setMessages(history);

    if (mode === "ai") {
      setStatus("thinking");
      const controller = new AbortController();
      abortRef.current = controller;
      const data = await askAI(
        history.map(({ role, text: t }) => ({ role, text: t })),
        fields,
        controller.signal
      );
      if (controller.signal.aborted) return;
      if (data) {
        setFields(data.fields);
        const chips = data.next ? scriptedPrompt(data.next, data.fields).chips : null;
        say(data.reply, chips);
        setStatus(data.ready ? "summary" : "idle");
        return;
      }
      setMode("script");
      setStatus("idle");
    }
    answerScripted(text);
  }

  function onChip(chip) {
    if (status === "editPick") {
      const field = FIELD_ORDER.find((f) => FIELD_LABELS[f] === chip);
      if (field) startEdit(field);
      return;
    }
    send(chip);
  }

  function pickEdit() {
    setStatus("editPick");
    say("What would you like to change?", FIELD_ORDER.map((f) => FIELD_LABELS[f]));
  }

  async function submit() {
    setStatus("submitting");
    try {
      const res = await fetch("/api/inquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(toPayload(fields)),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        const bad = data.errors && FIELD_ORDER.find((f) => data.errors[f]);
        if (bad) {
          startEdit(bad, data.errors[bad]);
          return;
        }
        say(data.error || "Something went wrong. Please try again.");
        setStatus("summary");
        return;
      }
      setStatus("success");
    } catch {
      say("Network error. Please try again.");
      setStatus("summary");
    }
  }

  function reset() {
    abortRef.current?.abort();
    setMessages(firstMessages());
    setFields(emptyFields());
    setMode("ai");
    setEditing(null);
    setInput("");
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div id="inquiry-form" className="text-foreground">
        <div className="max-w-xl rounded-2xl border border-signal/30 bg-surface p-8">
          <h2 className="text-2xl font-bold tracking-tight">Thanks, we got your message.</h2>
          <p className="mt-3 text-muted">
            We will reply within one business day with a few questions or a time to talk.
          </p>
          <button
            type="button"
            onClick={reset}
            className="mt-6 text-sm font-medium text-signal hover:underline"
          >
            Send another message
          </button>
        </div>
      </div>
    );
  }

  const showChips = status === "idle" || status === "editPick";
  const busy = status !== "idle";

  return (
    <div id="inquiry-form" className="text-foreground">
      <div className="max-w-2xl">
        <h2 className="text-3xl font-bold tracking-tight">Tell us about your project</h2>
        <p className="mt-3 text-muted">
          Answer a few quick questions and we will come back with a plan and a quote.
        </p>
      </div>

      <div className="mt-10 max-w-2xl overflow-hidden rounded-2xl border border-hair bg-surface">
        <div
          ref={logRef}
          role="log"
          aria-live="polite"
          aria-label="Inquiry chat"
          className="flex max-h-[28rem] min-h-[20rem] flex-col gap-3 overflow-y-auto p-5"
        >
          {messages.map((m, i) => (
            <div key={i} className={m.role === "user" ? "flex flex-col items-end" : "flex flex-col items-start gap-3"}>
              <p
                className={`${bubble} ${
                  m.role === "user"
                    ? "rounded-br-md bg-signal text-signal-ink"
                    : "rounded-bl-md border border-hair bg-background"
                }`}
              >
                {m.text}
              </p>
              {m.chips && i === messages.length - 1 && showChips && (
                <div className="flex flex-wrap gap-2">
                  {m.chips.map((chip) => (
                    <button key={chip} type="button" data-chip onClick={() => onChip(chip)} className={chipClass}>
                      {chip}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}

          {status === "thinking" && (
            <p
              role="status"
              className="self-start rounded-2xl rounded-bl-md border border-hair bg-background px-4 py-2.5 text-sm text-muted motion-safe:animate-pulse"
            >
              <span className="sr-only">Assistant is typing</span>
              <span aria-hidden="true">...</span>
            </p>
          )}

          {(status === "summary" || status === "submitting") && (
            <div className="rounded-2xl border border-signal/30 bg-background p-4">
              <dl className="space-y-2 text-sm">
                {FIELD_ORDER.map((f) => (
                  <div key={f} className="grid grid-cols-[7rem_minmax(0,1fr)] gap-3">
                    <dt className="text-muted">{FIELD_LABELS[f]}</dt>
                    <dd className="[overflow-wrap:anywhere]">{fields[f]}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  type="button"
                  data-confirm
                  onClick={submit}
                  disabled={status === "submitting"}
                  className="rounded-full bg-signal px-5 py-2.5 text-sm font-semibold text-signal-ink transition active:scale-[0.98] disabled:opacity-60"
                >
                  {status === "submitting" ? "Sending..." : "Looks good ✓"}
                </button>
                <button
                  type="button"
                  onClick={pickEdit}
                  disabled={status === "submitting"}
                  className="rounded-full border border-hair px-5 py-2.5 text-sm font-medium transition hover:border-signal disabled:opacity-60"
                >
                  Make an edit
                </button>
              </div>
            </div>
          )}
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex items-end gap-3 border-t border-hair p-3"
        >
          <label htmlFor="chat-input" className="sr-only">
            Your answer
          </label>
          <textarea
            id="chat-input"
            ref={inputRef}
            rows={2}
            maxLength={1000}
            value={input}
            disabled={busy}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey && !e.nativeEvent.isComposing) {
                e.preventDefault();
                send(input);
              }
            }}
            placeholder={busy ? "" : "Type your answer"}
            className="min-h-12 w-full resize-none rounded-xl border border-hair bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-signal disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={busy || !input.trim()}
            className="rounded-full bg-signal px-5 py-3 text-sm font-semibold text-signal-ink transition active:scale-[0.98] disabled:opacity-50"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
}
