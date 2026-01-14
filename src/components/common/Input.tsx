import type { InputHTMLAttributes } from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";
import { twMerge } from "tailwind-merge";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    fullWidth?: boolean;
    registration?: UseFormRegisterReturn;
    error?: FieldError;
}

function Input({ fullWidth = true, registration, error,className, ...props }: InputProps) {
    return (
        <div className={twMerge([fullWidth && "w-full"])}>
            {/*autoComplete : 자동완성을 막아주도록함 */}
            <input
                className={twMerge(
                    ["w-full", "p-4"],
                    ["border", "border-gray-300", "text-sm"],
                    ["focus:outline-none", "focus:border-black"],
                    ["transition-all", "placeholder:text-gray-400"],
                    error ? "border-red-500" : "",
                    className
                )}
                {...registration}
                {...props}
                autoComplete={"off"}

            />
            {error && <p className={twMerge()}>{error.message}</p>}
        </div>
    );
}
export default Input;
