// Validation helpers shared by the contact form (UI) and the inquiry API route (later).
export function validateInquiry(values) {
  const errors = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = "Please enter your name (at least 2 characters).";
  }

  if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.need) {
    errors.need = "Please choose what you need.";
  }

  if (!values.budget) {
    errors.budget = "Please choose a budget range.";
  }

  if (!values.timeline) {
    errors.timeline = "Please choose a timeline.";
  }

  if (!values.message || values.message.trim().length < 10) {
    errors.message = "Please tell us a bit more (at least 10 characters).";
  }

  // Honeypot: any value means a bot.
  if (values.company) {
    errors.company = "Submission rejected.";
  }

  return errors;
}
