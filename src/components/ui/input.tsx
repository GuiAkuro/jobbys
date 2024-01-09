import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    return (
      <div className="h-10 rounded bg-neutral-100">
        <input
          className="h-full w-full bg-transparent px-4 text-neutral-900"
          {...props}
          ref={ref}
        />
      </div>
    );
  },
);

Input.displayName = "Input";

export { Input };
