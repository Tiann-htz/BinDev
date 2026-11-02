export const metadata = {
  title: "Contact BinDev",
  description:
    "Tell us about your project. BinDev builds websites, web apps, and custom software for small businesses.",
};

import InquiryForm from "@/components/sections/contact/InquiryForm";
import BookingEmbed from "@/components/sections/contact/BookingEmbed";
import Container from "@/components/ui/Container";

export default function ContactPage() {
  return (
    <section className="bg-background py-20 text-foreground">
      <Container>
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="font-mono text-[10.5px] uppercase tracking-[0.22em] text-muted">
              Contact
            </p>
            <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
              Tell us what you need.
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">
              The first call is free. Share a few details and we will come back
              with a simple plan and a quote.
            </p>
            <div className="mt-12">
              <BookingEmbed />
            </div>
          </div>
          <div className="lg:col-span-7">
            <InquiryForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
