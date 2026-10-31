import Image from "next/image";

// Card image for a project. Shows a text placeholder when `image` is null.
export default function ProjectImage({ project }) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt={`${project.title} screenshot`}
        width={800}
        height={500}
        className="h-full w-full object-cover object-top"
      />
    );
  }

  return (
    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(70%_70%_at_50%_0%,rgba(3,222,254,0.2),transparent)]">
      <span className="text-sm font-medium text-white/50">
        Screenshot coming soon
      </span>
    </div>
  );
}
