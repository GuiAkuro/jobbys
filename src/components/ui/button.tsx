import { forwardRef } from "react";

interface ButtonProps {}

const Button = forwardRef<HTMLDivElement, ButtonProps>(({}, ref) => {
  return (
    <div>
      <p>Button</p>
    </div>
  );
});

Button.displayName = "Button";

export { Button };
