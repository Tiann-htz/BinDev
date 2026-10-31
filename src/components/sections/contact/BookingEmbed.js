import Container from "@/components/ui/Container";
import { site } from "@/data/site";

export default function BookingEmbed() {
  const hasBooking = Boolean(site.bookingUrl);
  const isDev = process.env.NODE_ENV === "development";

  // No booking link yet: hide on the live site, show a hint only while developing.
  if (!hasBooking && !isDev) return null;

  return (
    <section className="border-t border-white/10 bg-navy text-white">
      <Container className="py-16 sm:py-20">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Or pick a time that works for you
          </h2>
          <p className="mt-4 text-lg text-white/75">
            Choose a time for a free call. We will talk about your project and
            answer your questions.
          </p>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white">
          {hasBooking ? (
            <iframe
              src={site.bookingUrl}
              title="Book a free call with BinDev"
              loading="lazy"
              className="h-[700px] w-full"
            />
          ) : (
            <div className="flex h-64 items-center justify-center bg-navy/95 p-6 text-center text-sm text-white/60">
              Dev hint: set `bookingUrl` in src/data/site.js to show the booking
              calendar here. This box is hidden on the live site.
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
