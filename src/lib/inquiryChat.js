import { inquiryNeeds, inquiryBudgets, inquiryTimelines } from "@/data/inquiry";
import { validateInquiry } from "@/lib/validation";

export const FIELD_ORDER = ["name", "email", "need", "budget", "timeline", "message"];

export const FIELD_LABELS = {
  name: "Name",
  email: "Email",
  need: "What you need",
  budget: "Budget",
  timeline: "Timeline",
  message: "Project",
};

const CHIPS = {
  need: inquiryNeeds,
  budget: inquiryBudgets,
  timeline: inquiryTimelines,
};

const PROMPTS = {
  name: () => "Hi, I'm the BinDev assistant. What's your name?",
  email: (c) => `Nice to meet you, ${c.name}. What email should we reply to?`,
  need: () => "What do you need us to build?",
  budget: () => "What budget range do you have in mind?",
  timeline: () => "When do you need it?",
  message: () => "Last one: tell us a bit about the project.",
};

export const READY_TEXT = "That's everything I need. Please check the summary below.";

export function emptyFields() {
  return { name: null, email: null, need: null, budget: null, timeline: null, message: null };
}

export function nextField(fields) {
  return FIELD_ORDER.find((f) => !fields[f]) || null;
}

export function scriptedPrompt(field, fields) {
  return { text: PROMPTS[field](fields), chips: CHIPS[field] || null };
}

export function readAnswer(field, text) {
  const raw = (text || "").trim();
  if (CHIPS[field]) {
    const hit = CHIPS[field].find((o) => o.toLowerCase() === raw.toLowerCase());
    return hit ? { value: hit } : { error: "Please pick one of the options." };
  }
  const error = validateInquiry({ [field]: raw })[field];
  return error ? { error } : { value: raw };
}

export function toPayload(fields) {
  return { ...fields, company: "" };
}

export function isComplete(fields) {
  return Object.keys(validateInquiry({ ...fields, company: "" })).length === 0;
}

export async function askAI(messages, fields, signal) {
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ messages, collected: fields }),
      signal,
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data?.ok && data.reply ? data : null;
  } catch {
    return null;
  }
}
