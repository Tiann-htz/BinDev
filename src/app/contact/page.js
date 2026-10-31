import Container from "@/components/ui/Container";
import InquiryForm from "@/components/sections/contact/InquiryForm";
import BookingEmbed from "@/components/sections/contact/BookingEmbed";

export const metadata = {
  title: "Contact | BinDev",
  description:
    "Tell BinDev about your project and book a free call. Websites, web apps, and custom software for small businesses.",
};

export default function ContactPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy text-white">
        {/* Soft cyan glow, same style as the Hero */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_0%,rgba(3,222,254,0.15),transparent)]"
        />

        <Container className="relative py-16 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <div>
              <p className="inline-flex items-center rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-brand">
                Contact
              </p>
              <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                Book a free call
              </h1>
              <p className="mt-6 max-w-md text-lg text-white/75">
                Tell us a little about your project. The first call is free,
                and there is no pressure to hire us.
              </p>
              <ul className="mt-8 space-y-3 text-white/75">
                <li>Simple websites start at $175.</li>
                <li>
                  We will tell you honestly what makes sense for your business.
                </li>
                <li>No technical knowledge needed.</li>
              </ul>
            </div>

            <InquiryForm />
          </div>
        </Container>
      </section>

      <BookingEmbed />
    </>
  );
}
