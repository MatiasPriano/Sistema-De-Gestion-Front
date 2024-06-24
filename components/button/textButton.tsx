interface TextButtonProps {
  name: string;
  type?: "button" | "submit" | "reset";
  style?: "primary" | "secondary" | "red" | "transparent";
  onClick?: () => void;
  disabled?: boolean;
}

export default function TextButton({
  name,
  type = "button",
  style = "primary",
  onClick,
  disabled = false,
}: TextButtonProps) {
  let className: string =
    "rounded-md px-3 py-2 text-sm font-semibold transition-colors duration-300 ease-in-out";
  if (style === "primary") {
    className +=
      " bg-primary disabled:bg-backgroundAccent text-darkTitle disabled:text-title shadow-md hover:shadow-lg hover:bg-primaryHover";
  } else if (style === "secondary") {
    className +=
      " bg-secondary disabled:bg-backgroundAccent text-title shadow-md hover:shadow-lg hover:bg-secondaryHover";
  } else if (style === "red") {
    className +=
      " bg-red disabled:bg-backgroundAccent text-background disabled:text-title shadow-md hover:shadow-lg hover:bg-redHover";
  } else {
    className +=
      " bg-transparent disabled:bg-backgroundAccent text-title hover:bg-backgroundAccent";
  }

  return (
    <button
      title={name}
      type={type}
      onClick={onClick}
      className={className}
      disabled={disabled}
    >
      {name}
    </button>
  );
}
