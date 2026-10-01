type Props = {
  title: string;
  children: React.ReactNode;
};

export function LegalPage({ title, children }: Props) {
  return (
    <div className="shell grid gap-8 py-14 lg:grid-cols-12 lg:gap-12 lg:py-20">
      <div className="lg:col-span-4">
        <h1 className="text-[2.5rem] leading-[1.08] font-semibold lg:text-[3.5rem]">{title}</h1>
      </div>
      <div className="prose-legal lg:col-span-8">{children}</div>
    </div>
  );
}
