const bookingUrl = process.env.NEXT_PUBLIC_BOOKING_URL || "";
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "";

export default function BookingEmbed() {
  if (!bookingUrl) {
    return (
      <section className="border-t border-hair bg-background py-16 text-foreground">
        <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
          <div className="max-w-2xl rounded-2xl border border-hair bg-surface p-8">
            <h2 className="text-2xl font-bold tracking-tight">Book a call</h2>
            <p className="mt-3 text-muted">
              Our calendar link is not set up yet.{" "}
              {contactEmail ? (
                <>
                  Email us at{" "}
                  <a
                    href={`mailto:${contactEmail}`}
                    className="text-signal hover:underline"
                  >
                    {contactEmail}
                  </a>{" "}
                  and we will arrange a time.
                </>
              ) : (
                "Send us a message through the form below and we will arrange a time."
              )}
            </p>
            <a
              href="#inquiry-form"
              className="mt-6 inline-block text-sm font-medium text-signal hover:underline"
            >
              Use the inquiry form
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="border-t border-hair bg-background py-16 text-foreground">
      <div className="mx-auto w-full max-w-[1280px] px-6 md:px-10">
        <div className="max-w-4xl">
          <h2 className="text-2xl font-bold tracking-tight">Book a call</h2>
          <p className="mt-3 text-muted">
            Pick a time that works for you.
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-hair bg-surface">
            <iframe
              src={bookingUrl}
              title="Booking calendar"
              className="h-[640px] w-full"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <p className="mt-3 text-sm text-muted">
            If the calendar does not load,{" "}
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-signal hover:underline"
            >
              open it in a new tab
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
