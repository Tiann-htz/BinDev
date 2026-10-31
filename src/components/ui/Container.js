export default function Container({
  as: Tag = "div",
  className = "",
  children,
  ...props
}) {
  return (
    <Tag
      className={`mx-auto w-full max-w-[1280px] px-6 md:px-10 ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
}
