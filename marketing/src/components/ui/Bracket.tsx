interface BracketProps {
  children: React.ReactNode;
  className?: string;
}

export default function Bracket({ children, className = "" }: BracketProps) {
  return (
    <span className={className}>
      <span className="text-accent font-sans" aria-hidden="true">
        [{" "}
      </span>
      {children}
      <span className="text-accent font-sans" aria-hidden="true">
        {" "}]
      </span>
    </span>
  );
}
