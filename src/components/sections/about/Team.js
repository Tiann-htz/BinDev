import Image from "next/image";
import Container from "@/components/ui/Container";
import Reveal from "@/components/ui/Reveal";
import { team } from "@/data/team";

function Photo({ member, sizes }) {
  if (member.image) {
    return (
      <Image
        src={member.image}
        alt={member.name}
        fill
        sizes={sizes}
        className="object-cover object-top"
      />
    );
  }
  return (
    <div className="flex h-full w-full items-center justify-center text-muted">
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-20 w-20 opacity-60"
        aria-hidden="true"
      >
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
      </svg>
    </div>
  );
}

function FeaturedCard({ member }) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-hair bg-surface sm:flex-row">
      <div className="relative aspect-[4/5] w-full bg-background sm:w-[45%] sm:shrink-0">
        <Photo
          member={member}
          sizes="(min-width: 1024px) 270px, (min-width: 640px) 220px, 100vw"
        />
      </div>
      <div className="flex flex-1 flex-col justify-center p-6 lg:p-8">
        <h3 className="text-2xl font-semibold tracking-tight">{member.name}</h3>
        <p className="mt-2 font-mono text-xs uppercase tracking-wide text-signal">
          {member.role}
        </p>
        {member.line && (
          <p className="mt-4 text-base leading-relaxed text-muted">
            {member.line}
          </p>
        )}
      </div>
    </div>
  );
}

function SmallCard({ member }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-hair bg-surface">
      <div className="relative aspect-[4/5] w-full bg-background">
        <Photo
          member={member}
          sizes="(min-width: 1024px) 288px, 50vw"
        />
      </div>
      <div className="p-4">
        <h3 className="text-base font-semibold leading-snug">{member.name}</h3>
        <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-signal">
          {member.role}
        </p>
      </div>
    </div>
  );
}

export default function Team() {
  const published = team.filter((member) => member.published);
  const featured = published.filter((member) => member.featured);
  const others = published.filter((member) => !member.featured);

  if (published.length === 0) return null;

  return (
    <section className="border-t border-hair bg-background py-16 text-foreground">
      <Container>
        <Reveal>
          <h2 className="text-2xl font-bold tracking-tight">
            The people behind BinDev
          </h2>
        </Reveal>

        {featured.length > 0 && (
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {featured.map((member, index) => (
              <Reveal key={member.name} delay={index * 80}>
                <FeaturedCard member={member} />
              </Reveal>
            ))}
          </div>
        )}

        {others.length > 0 && (
          <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
            {others.map((member, index) => (
              <Reveal key={member.name} delay={index * 80}>
                <SmallCard member={member} />
              </Reveal>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
