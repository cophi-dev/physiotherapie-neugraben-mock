type Props = {
  id: string;
  title: string;
  dark?: boolean;
  children: React.ReactNode;
};

export function Section({ id, title, dark = false, children }: Props) {
  const headingId = `${id}-titel`;
  return (
    <section
      id={id}
      aria-labelledby={headingId}
      className={dark ? "bg-ink text-paper" : "border-b border-line"}
    >
      <div className="shell grid gap-8 py-16 lg:grid-cols-12 lg:gap-12 lg:py-24">
        <div className="lg:col-span-4">
          <h2 id={headingId} className="text-[2.125rem] leading-[1.1] font-semibold lg:text-5xl">
            {title}
          </h2>
          <div className="mt-5 h-1 w-12 bg-accent" aria-hidden="true" />
        </div>
        <div className="lg:col-span-8">{children}</div>
      </div>
    </section>
  );
}
