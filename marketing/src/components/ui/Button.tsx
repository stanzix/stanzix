interface ButtonProps {
  variant?: "primary" | "secondary";
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

const baseStyles =
  "inline-flex items-center justify-center font-medium px-6 py-3 rounded-md transition-colors";

const variantStyles = {
  primary: "bg-accent text-background hover:bg-accent-hover",
  secondary: "border border-accent text-accent hover:bg-accent/10",
};

export default function Button({
  variant = "primary",
  href,
  onClick,
  children,
  className = "",
}: ButtonProps) {
  const classes = `${baseStyles} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
