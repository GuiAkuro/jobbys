import { ButtonHTMLAttributes, forwardRef } from "react";
import { VariantProps, tv } from "tailwind-variants";

const button = tv({
  base: "bg-purple-500 h-10 flex items-center px-4 rounded text-sm hover:bg-purple-600",
  variants: {
    intent: {
      primary: "",
    },
    outlined: {
      true: "bg-transparent border hover:bg-transparent",
    },
  },

  defaultVariants: {
    intent: "primary",
    outlined: false,
  },

  compoundVariants: [
    {
      intent: "primary",
      outlined: true,
      class: "border-purple-500",
    },
  ],
});

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof button> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button className={button({ className })} {...props} ref={ref}>
        {children}
      </button>
    );
  },
);

Button.displayName = "Button";

export { Button, button };
