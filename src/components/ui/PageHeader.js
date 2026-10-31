import Container from "@/components/ui/Container";

// Top section for inner pages (Services, Pricing, About, Work).
// Same look as the Hero: navy, small badge, big title, short intro.
export default function PageHeader({ badge, title, intro, children }) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_60%_at_85%_0%,rgba(3,222,254,0.15),transparent)]"
      />
      <Container className="relative py-16 sm:py-24">
        {badge && (
          <p className="inline-flex items-center rounded-full border border-white/20 px-3 py-1 text-xs font-medium text-brand">
            {badge}
          </p>
        )}
        <h1 className="mt-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
          {title}
        </h1>
        {intro && (
          <p className="mt-6 max-w-2xl text-lg text-white/75">{intro}</p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </Container>
    </section>
  );
}
