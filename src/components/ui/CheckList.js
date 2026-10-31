// A list with cyan check marks. Use on navy backgrounds.
export default function CheckList({ items, className = "" }) {
  return (
    <ul className={`space-y-3 ${className}`}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3 text-white/80">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="mt-1 h-5 w-5 shrink-0 text-brand"
          >
            <path d="m5 12 5 5 9-10" />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
