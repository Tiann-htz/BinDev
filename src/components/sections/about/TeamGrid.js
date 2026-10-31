import Image from "next/image";
import Container from "@/components/ui/Container";
import { team, teamPhoto } from "@/data/team";

// "Jeff Harell Climaco" -> "JC"
function getInitials(name) {
  const parts = name.trim().split(" ");
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

export default function TeamGrid() {
  return (
    <section className="border-t border-white/10 bg-navy text-white">
      <Container className="py-16 sm:py-20">
        <p className="text-sm font-semibold uppercase tracking-wide text-brand">
          The team
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Meet the people behind BinDev.
        </h2>
        <p className="mt-4 max-w-2xl text-lg text-white/75">
          We are a small team, so you talk directly to the people building your
          project.
        </p>

        {/* Team photo (placeholder until the real one is added in data/team.js) */}
        <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-white/5">
          <Image
            src={teamPhoto.src}
            alt={teamPhoto.alt}
            fill
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover"
          />
        </div>

        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member) => (
            <li
              key={member.name}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-5"
            >
              <span
                aria-hidden="true"
                className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand/15 text-lg font-bold text-brand"
              >
                {getInitials(member.name)}
              </span>
              <div>
                <p className="font-semibold">{member.name}</p>
                <p className="text-sm text-white/70">{member.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
