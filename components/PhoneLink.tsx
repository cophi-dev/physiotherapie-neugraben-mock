import { site } from "@/lib/site";

type Props = {
  className?: string;
  noteClassName?: string;
};

export function PhoneLink({ className = "link", noteClassName = "text-muted" }: Props) {
  return (
    <span>
      <a href={site.phoneHref} className={className}>
        {site.phone}
      </a>{" "}
      <span className={noteClassName}>({site.phoneNote})</span>
    </span>
  );
}
